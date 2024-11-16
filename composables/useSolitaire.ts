import type { CardSelection, Game, Pile } from "@/assets/types/game";
import type { Card } from "@/assets/types/card";
import type { Stat } from "@/assets/types/stats";
import { useStorage } from "@vueuse/core";
import { useRefHistory } from "@vueuse/core";

export const useSolitaire = () => {
  const game: Ref<Game> = ref<Game>(generateGame());
  const { history, undo, redo } = useRefHistory(game, {
    deep: true,
  });
  // ToDo Moving cards directly from the Waste stack to a Foundation scores 10 points.
  // However, if the card is first moved to a Tableau, and then to a Foundation,
  // an extra 5 points are scored making a total of 15.
  // Thus, to score the most points, no cards should be moved directly from the Waste to Foundation.
  const score = ref<number>(0);
  const start = ref<number>(Date.now());
  const stats: Ref<Stat[]> = useStorage("stats", []);

  // Track two timestamps one for the timer and one for the score
  const timestamp = useTimestamp();

  const { pause: pauseScore, resume: resumeScore } = useTimestamp({
    interval: 10000,
    controls: true,
    callback: () => {
      score.value = Math.max(score.value - 2, 0);
    },
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
    if (!canBePlacedOnTableauPile(cardSrc, cardDest)) return false;

    const idx = pileSrc.cards.findIndex((card: Card) => {
      return card.id === cardSrc.id;
    });

    const toMove = pileSrc.cards.splice(idx, pileSrc.cards.length - idx);

    if (pileSrc.cards.length > 0 && pileSrc.type === "tableauPile") {
      pileSrc.cards[pileSrc.cards.length - 1].flipped = true;
      score.value += 5;
    }

    pileDest.cards.push(...toMove);

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

    checkForWin();

    return true;
  };

  const canBePlacedOnTableauPile = (
    cardToMove: Card,
    topCard?: Card
  ): boolean => {
    if (!topCard && cardToMove.rank === 12) return true;
    if (!topCard) return false;
    if (cardToMove.rank !== topCard.rank - 1) return false;
    if (getCardColor(cardToMove) === getCardColor(topCard)) return false;

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

  const checkForWin = () => {
    let win = true;

    game.value.piles.forEach((pile) => {
      if (pile.type === "foundation" && pile.cards.length !== 13) win = false;
      if (pile.type !== "foundation" && pile.cards.length > 0) win = false;
    });

    if (win) {
      pauseScore();

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
        alert("You have won");
      }, 1000);
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

  const reset = () => {
    game.value = generateGame();

    score.value = 0;
    resumeScore();

    start.value = Date.now();
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

  const time = computed(() => timestamp.value - start.value);

  return {
    foundations: foundations,
    waste: waste,
    stock: stock,
    tableauPiles: tableauPiles,
    moveCard,
    clickStock,
    reset,
    undo,
    redo,
    score: readonly(score),
    time: readonly(time),
  };
};
