import type { CardSelection, Game, Pile } from "@/assets/types/game";
import type { Card } from "@/assets/types/card";
import type { Stat } from "@/assets/types/stats";
import { useStorage, useRefHistory, useDocumentVisibility } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";

export const useSolitaire = () => {
  const game: Ref<Game> = ref<Game>(generateGame());
  const { commit, clear, canUndo, undo, canRedo, redo } = useRefHistory(game, {
    deep: true,
  });
  // ToDo Moving cards directly from the Waste stack to a Foundation scores 10 points.
  // However, if the card is first moved to a Tableau, and then to a Foundation,
  // an extra 5 points are scored making a total of 15.
  // Thus, to score the most points, no cards should be moved directly from the Waste to Foundation.
  const score = ref<number>(0);
  const timerOffset = ref<number>(Date.now());
  const pauseStartTime = ref<number>(0);
  const gameHasStarted = ref<boolean>(false);
  const autoFinishWasTriggered = ref<boolean>(false);
  const stats: Ref<Stat[]> = useStorage("stats", []);
  const visibility = useDocumentVisibility();

  // Track two timestamps one for the timer and one for the score
  const {
    timestamp: timer,
    pause: pauseTimer,
    resume: resumeTimer,
  } = useTimestamp({
    controls: true,
  });

  const { pause: pauseScore, resume: resumeScore } = useTimestamp({
    interval: 10000,
    controls: true,
    callback: () => {
      if (!gameHasStarted.value) return;

      score.value = Math.max(score.value - 2, 0);
    },
  });

  watch(visibility, (current, previous) => {
    if (current === "visible" && previous === "hidden") {
      // add time since pause start to timer offset
      timerOffset.value += Date.now() - pauseStartTime.value;
      resumeTimer();
      resumeScore();
    } else if (current === "hidden" && previous === "visible") {
      pauseStartTime.value = Date.now();
      pauseTimer();
      pauseScore();
    }
  });

  const clickStock = () => {
    const stock = game.value.piles.find((pile) => pile.type === "stock");
    const waste = game.value.piles.find((pile) => pile.type === "waste");

    if (!stock || !waste) return;

    if (stock.cards.length > 0) {
      const card = stock.cards.pop();

      if (!card) return;

      card.flipped = true;
      waste.cards.push(card);
    } else {
      waste.cards.forEach((card) => (card.flipped = false));
      stock.cards = waste.cards.reverse();
      waste.cards = [];
      score.value = Math.max(score.value - 100, 0);
    }

    startGame();
  };

  const moveCard = (
    src: CardSelection,
    dest: CardSelection
  ): "success" | "failure" => {
    const pileSrc = game.value.piles.find((pile) => pile.id === src.pileId);
    const pileDest = game.value.piles.find((pile) => pile.id === dest.pileId);

    if (!pileSrc || !pileDest) return "failure";

    const cardSrc = pileSrc.cards.find((card: Card) => {
      return card.id === src.cardId;
    });

    const cardDest = pileDest.cards.find((card: Card) => {
      return card.id === dest.cardId;
    });

    if (!cardSrc) return "failure";

    if (pileDest.type === "tableauPile") {
      if (moveCardToTableauPile(cardSrc, pileSrc, pileDest, cardDest)) {
        if (pileSrc.type === "waste") score.value += 5;
        if (pileSrc.type === "foundation")
          score.value = Math.max(score.value - 15, 0);

        return "success";
      }
    }

    if (pileDest.type === "foundation") {
      if (moveCardToFoundation(cardSrc, pileSrc, pileDest, cardDest)) {
        if (pileSrc.type === "waste") score.value += 10;
        if (pileSrc.type === "tableauPile") score.value += 10;

        return "success";
      }
    }

    return "failure";
  };

  const moveCardToTableauPile = (
    cardSrc: Card,
    pileSrc: Pile,
    pileDest: Pile,
    cardDest?: Card
  ): boolean => {
    if (!canBePlacedOnTableauPile(cardSrc, pileDest, cardDest)) return false;

    const idx = pileSrc.cards.findIndex((card: Card) => {
      return card.id === cardSrc.id;
    });

    const toMove = pileSrc.cards.splice(idx, pileSrc.cards.length - idx);

    if (pileSrc.cards.length > 0 && pileSrc.type === "tableauPile") {
      pileSrc.cards[pileSrc.cards.length - 1].flipped = true;
      score.value += 5;
    }

    pileDest.cards.push(...toMove);

    startGame();

    return true;
  };

  const moveCardToFoundation = (
    cardSrc: Card,
    pileSrc: Pile,
    pileDest: Pile,
    cardDest?: Card
  ): boolean => {
    if (!canBePlacedOnFoundation(cardSrc, pileDest, cardDest)) return false;

    const idx = pileSrc.cards.findIndex((card: Card) => {
      return card.id === cardSrc.id;
    });

    const toMove = pileSrc.cards.splice(idx, pileSrc.cards.length - idx);

    if (toMove.length > 1) return false;

    if (pileSrc.cards.length > 0 && pileSrc.type === "tableauPile") {
      pileSrc.cards[pileSrc.cards.length - 1].flipped = true;
      score.value += 5;
    }

    pileDest.cards.push(...toMove);

    startGame();

    checkForWin();

    return true;
  };

  const canBePlacedOnTableauPile = (
    cardToMove: Card,
    tableauPile: Pile,
    topCard?: Card
  ): boolean => {
    if (!topCard && cardToMove.rank === 12) return true;
    if (!topCard) return false;
    if (cardToMove.rank !== topCard.rank - 1) return false;
    if (getCardColor(cardToMove) === getCardColor(topCard)) return false;

    if (
      tableauPile.cards.findIndex((card: Card) => card.id === topCard.id) !==
      tableauPile.cards.length - 1
    ) {
      return false;
    }

    return true;
  };

  const canBePlacedOnFoundation = (
    cardToMove: Card,
    foundation: Pile,
    topCard?: Card
  ): boolean => {
    if (cardToMove.suit !== foundation.suit) return false;
    if (!topCard && cardToMove.rank === 0) return true;
    if (!topCard) return false;
    if (cardToMove.rank !== topCard.rank + 1) return false;
    if (cardToMove.suit !== topCard.suit) return false;

    return true;
  };

  const startGame = () => {
    if (gameHasStarted.value) return;

    gameHasStarted.value = true;

    timerOffset.value = Date.now();
  };

  const autoFinish = () => {
    if (!canAutoFinish.value) return;
    if (autoFinishWasTriggered.value) return;

    autoFinishWasTriggered.value = true;

    // count remaining cards from the tableau and for each add 10 points to the score
    tableauPiles.value.forEach((pile) => {
      score.value += pile.cards.length * 10;
    });

    // If stock also has a card left add those 10 points
    if (stock.value.cards.length === 1) {
      score.value += 10;
    }

    // Empty each pile and then simply put kings onto the foundation piles to mock a win
    game.value.piles.forEach((pile) => {
      pile.cards = [];
    });

    game.value.piles
      .filter((pile) => pile.type === "foundation")
      .forEach((pile) => {
        if (!pile.suit) return;

        pile.cards.push({
          suit: pile.suit,
          rank: 12,
          flipped: true,
          id: uuidv4(),
        });
      });

    win();
  };

  const checkForWin = () => {
    let isWin = true;

    game.value.piles.forEach((pile) => {
      if (pile.type === "foundation" && pile.cards.length !== 13) isWin = false;
      if (pile.type !== "foundation" && pile.cards.length > 0) isWin = false;
    });

    if (isWin) {
      win();
    }
  };

  const getCardColor = (card: Card): "black" | "red" => {
    if (card.suit === "hearts" || card.suit === "diamonds") {
      return "red";
    } else if (card.suit === "spades" || card.suit === "clubs") {
      return "black";
    }
    return "black";
  };

  const win = () => {
    pauseScore();
    pauseTimer();

    // Add Bonus points
    if (time.value > 30000) {
      score.value += Math.round(700000 / (time.value / 1000));
    }

    stats.value.push({
      time: time.value,
      score: score.value,
      date: Date.now(),
    });

    useTimeoutFn(() => {
      if (confirm("You have won! Play again?")) {
        restart();
      }
    }, 100);
  };

  const restart = () => {
    game.value = generateGame();
    score.value = 0;
    gameHasStarted.value = false;
    autoFinishWasTriggered.value = false;

    // commit newly generated game and clear the rest of the history
    commit();
    clear();

    resumeScore();
    resumeTimer();
  };

  const foundations = computed(() =>
    game.value.piles.filter((pile) => pile.type === "foundation")
  );

  const waste = computed(
    () => game.value.piles.find((pile) => pile.type === "waste")!
  );

  const stock = computed(
    () => game.value.piles.find((pile) => pile.type === "stock")!
  );

  const tableauPiles = computed(() =>
    game.value.piles.filter((pile) => pile.type === "tableauPile")
  );

  const time = computed(() => {
    if (!gameHasStarted.value) return 0;

    return timer.value - timerOffset.value;
  });

  const canAutoFinish = computed(() => {
    if (autoFinishWasTriggered.value) return false;

    let result = true;

    // check if all cards are flipped
    game.value.piles.forEach((pile) => {
      pile.cards.forEach((card) => {
        if (!card.flipped) {
          result = false;
        }
      });
    });

    // check if stock and waste are empty
    if (stock.value.cards.length !== 0 || waste.value.cards.length !== 0) {
      result = false;
    }

    return result;
  });

  // ToDo maybe bundle actions in one object?
  return {
    foundations,
    waste,
    stock,
    tableauPiles,
    moveCard,
    clickStock,
    autoFinish,
    canAutoFinish,
    restart,
    canUndo,
    undo,
    canRedo,
    redo,
    score,
    time,
  };
};
