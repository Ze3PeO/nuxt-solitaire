import type { Game, Pile } from "@/assets/types/game";
import type { Card } from "@/assets/types/card";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => generateGame());

  // ToDo game logic

  console.log(game);

  const moveCard = (cardIdSrc: Card["id"], cardIdDest: Card["id"]) => {
    const pileSrc = findPileByCardId(cardIdSrc);
    const pileDest = findPileByCardId(cardIdDest);

    if (!pileSrc || !pileDest) return;

    const cardSrc = findCardByCardId(cardIdSrc, pileSrc);
    const cardDest = findCardByCardId(cardIdDest, pileDest);

    if (!cardSrc || !cardDest) return;
    if (cardSrc.rank !== cardDest.rank - 1) return;
    if (cardSrc.suit === "clubs" && cardDest.suit === "clubs") return;
    if (cardSrc.suit === "clubs" && cardDest.suit === "spades") return;
    if (cardSrc.suit === "spades" && cardDest.suit === "clubs") return;
    if (cardSrc.suit === "spades" && cardDest.suit === "spades") return;
    if (cardSrc.suit === "hearts" && cardDest.suit === "hearts") return;
    if (cardSrc.suit === "hearts" && cardDest.suit === "diamonds") return;
    if (cardSrc.suit === "diamonds" && cardDest.suit === "diamonds") return;
    if (cardSrc.suit === "diamonds" && cardDest.suit === "hearts") return;

    const idx = pileSrc.cards.findIndex((card: Card) => {
      return card.id === cardIdSrc;
    });

    const toMove = pileSrc.cards.splice(idx, pileSrc.cards.length - idx);

    if (pileSrc.cards.length > 0) {
      pileSrc.cards[pileSrc.cards.length - 1].flipped = true;
    }

    pileDest.cards.push(...toMove);
  };

  const findCardByCardId = (cardId: Card["id"], pile: Pile) => {
    return pile.cards.find((card: Card) => {
      return card.id === cardId;
    });
  };

  const findPileByCardId = (cardId: Card["id"]) => {
    return game.value.piles.find((pile: Pile) => {
      return pile.cards.some((card) => card.id === cardId);
    });
  };

  const foundations = game.value.piles.filter(
    (pile) => pile.pileType === "foundation"
  );
  const waste = game.value.piles.find((pile) => pile.pileType === "waste");

  const stock = game.value.piles.find((pile) => pile.pileType === "stock");

  const tableauPiles = game.value.piles.filter(
    (pile) => pile.pileType === "tableauPile"
  );

  return {
    foundations: readonly(foundations),
    waste: waste ? readonly(waste) : null,
    stock: stock ? readonly(stock) : null,
    tableauPiles: readonly(tableauPiles),
    moveCard,
  };
};
