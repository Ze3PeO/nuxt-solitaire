import type { CardSelection, Game, Pile } from "@/assets/types/game";
import type { Card } from "@/assets/types/card";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => generateGame());

  // ToDo game logic

  const clickStock = () => {
    console.log("click");

    if (!stock || !waste) return;

    if (stock.cards.length === 0) {
      console.log("click1");
      for (let i = 0; i < waste.cards.length; i++) {
        const card = waste.cards.pop();

        if (!card) continue;

        card.flipped = false;
        stock.cards.push(card);
      }

      waste.cards = [];
      return;
    }

    console.log("click2");
    const toMove = stock.cards.pop();

    if (!toMove) return;

    toMove.flipped = true;
    waste.cards.push(toMove);
  };

  const moveCard = (
    src: CardSelection,
    dest: CardSelection
  ): "success" | "failure" => {
    const pileSrc = game.value.piles.find((pile) => pile.id === src.pileId);
    const pileDest = game.value.piles.find((pile) => pile.id === dest.pileId);

    if (!pileSrc || !pileDest) return "failure";

    // determine pile types and handle accordingly

    const cardSrc = pileSrc.cards.find((card: Card) => {
      return card.id === src.cardId;
    });
    const cardDest = pileDest.cards.find((card: Card) => {
      return card.id === dest.cardId;
    });

    if (!cardSrc || !cardDest) return "failure";
    if (cardSrc.rank !== cardDest.rank - 1) return "failure";
    if (cardSrc.suit === "clubs" && cardDest.suit === "clubs") return "failure";
    if (cardSrc.suit === "clubs" && cardDest.suit === "spades")
      return "failure";
    if (cardSrc.suit === "spades" && cardDest.suit === "clubs")
      return "failure";
    if (cardSrc.suit === "spades" && cardDest.suit === "spades")
      return "failure";
    if (cardSrc.suit === "hearts" && cardDest.suit === "hearts")
      return "failure";
    if (cardSrc.suit === "hearts" && cardDest.suit === "diamonds")
      return "failure";
    if (cardSrc.suit === "diamonds" && cardDest.suit === "diamonds")
      return "failure";
    if (cardSrc.suit === "diamonds" && cardDest.suit === "hearts")
      return "failure";

    const idx = pileSrc.cards.findIndex((card: Card) => {
      return card.id === src.cardId;
    });

    const toMove = pileSrc.cards.splice(idx, pileSrc.cards.length - idx);

    if (pileSrc.cards.length > 0) {
      pileSrc.cards[pileSrc.cards.length - 1].flipped = true;
    }

    pileDest.cards.push(...toMove);

    return "success";
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
