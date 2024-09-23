import type { CardSelection, Game, Pile } from "@/assets/types/game";
import type { Card } from "@/assets/types/card";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => generateGame());

  const clickStock = () => {
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
      if (moveCardToTableauPile(cardSrc, pileSrc, pileDest, cardDest))
        return "success";
    }

    if (pileDest.type === "foundation") {
      if (moveCardToFoundation(cardSrc, pileSrc, pileDest, cardDest))
        return "success";
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
    }

    pileDest.cards.push(...toMove);

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

  const getCardColor = (card: Card): "black" | "red" => {
    if (card.suit === "hearts" || card.suit === "diamonds") {
      return "red";
    } else if (card.suit === "spades" || card.suit === "clubs") {
      return "black";
    }
    return "black";
  };

  const foundations = game.value.piles.filter(
    (pile) => pile.type === "foundation"
  );

  const waste = game.value.piles.find((pile) => pile.type === "waste");

  const stock = game.value.piles.find((pile) => pile.type === "stock");

  const tableauPiles = game.value.piles.filter(
    (pile) => pile.type === "tableauPile"
  );

  return {
    foundations: readonly(foundations),
    waste: readonly(waste!),
    stock: readonly(stock!),
    tableauPiles: readonly(tableauPiles),
    moveCard,
    clickStock,
  };
};
