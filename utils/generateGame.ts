import { Suits, type Card, type Suit } from "@/assets/types/card";
import type { Game, Pile } from "~/assets/types/game";

export default function (): Game {
  const deck: Card[] = [];
  const tableauPiles: Pile[] = [];

  // Generate deck of 52 cards (https://en.wikipedia.org/wiki/Standard_52-card_deck)
  Suits.forEach((suit: Suit) => {
    Array.from({ length: 13 }, (value, index) => index).forEach((rank) => {
      deck.push({
        suit,
        rank,
        flipped: false,
        id: useId(),
      });
    });
  });

  // Shuffle the deck
  const shuffledDeck = shuffleArray(deck);

  // Create and fill the 7 tableauPiles with cards going from 1 card to 7 cards
  Array.from({ length: 7 }, (value, index) => index + 1).forEach(
    (pileLength) => {
      tableauPiles.push({
        cards: shuffledDeck
          .splice(0, pileLength)
          .map((card: Card, index: number) => {
            card.flipped = index + 1 === pileLength;
            return card;
          }),
        type: "tableauPile",
        id: useId(),
      });
    }
  );

  const foundationPiles: Pile[] = [];

  Suits.forEach((suit: Suit) => {
    const cards: Card[] = [];

    Array.from({ length: 12 }, (value, index) => index).forEach((rank) => {
      cards.push({
        suit,
        rank,
        flipped: true,
        id: useId(),
      });
    });

    foundationPiles.push({
      cards,
      suit,
      type: "foundation",
      id: useId(),
    });
  });

  /*
  return {
    piles: [
      {
        cards: [],
        suit: "clubs",
        type: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "diamonds",
        type: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "hearts",
        type: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "spades",
        type: "foundation",
        id: useId(),
      },
      {
        cards: shuffledDeck,
        type: "stock",
        id: useId(),
      },
      {
        cards: [],
        type: "waste",
        id: useId(),
      },
      ...tableauPiles,
    ],
  };*/

  return {
    piles: [
      ...foundationPiles,
      {
        cards: [],
        type: "stock",
        id: useId(),
      },
      {
        cards: [],
        type: "waste",
        id: useId(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [
          {
            suit: "clubs",
            rank: 12,
            flipped: true,
            id: useId(),
          },
        ],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [
          {
            suit: "diamonds",
            rank: 12,
            flipped: true,
            id: useId(),
          },
        ],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [
          {
            suit: "hearts",
            rank: 12,
            flipped: true,
            id: useId(),
          },
        ],
        type: "tableauPile",
        id: useId(),
      },
      {
        cards: [
          {
            suit: "spades",
            rank: 12,
            flipped: true,
            id: useId(),
          },
        ],
        type: "tableauPile",
        id: useId(),
      },
    ],
  };
}
