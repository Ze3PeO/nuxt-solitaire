import { Suits, type Card, type Suit } from "@/assets/types/card";
import type { Game, Pile } from "~/assets/types/game";
import { v4 as uuidv4 } from "uuid";

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
        id: uuidv4(),
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
        id: uuidv4(),
      });
    }
  );

  /*const foundationPiles: Pile[] = [];

  Suits.forEach((suit: Suit) => {
    const cards: Card[] = [];

    Array.from({ length: 12 }, (value, index) => index).forEach((rank) => {
      cards.push({
        suit,
        rank,
        flipped: true,
        id: uuidv4(),
      });
    });

    foundationPiles.push({
      cards,
      suit,
      type: "foundation",
      id: uuidv4(),
    });
  });*/

  return {
    piles: [
      {
        cards: [],
        suit: "clubs",
        type: "foundation",
        id: uuidv4(),
      },
      {
        cards: [],
        suit: "diamonds",
        type: "foundation",
        id: uuidv4(),
      },
      {
        cards: [],
        suit: "hearts",
        type: "foundation",
        id: uuidv4(),
      },
      {
        cards: [],
        suit: "spades",
        type: "foundation",
        id: uuidv4(),
      },
      {
        cards: shuffledDeck,
        type: "stock",
        id: uuidv4(),
      },
      {
        cards: [],
        type: "waste",
        id: uuidv4(),
      },
      ...tableauPiles,
    ],
  };

  /*return {
    piles: [
      ...foundationPiles,
      {
        cards: [],
        type: "stock",
        id: uuidv4(),
      },
      {
        cards: [],
        type: "waste",
        id: uuidv4(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [
          {
            suit: "clubs",
            rank: 12,
            flipped: true,
            id: uuidv4(),
          },
        ],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [
          {
            suit: "diamonds",
            rank: 12,
            flipped: true,
            id: uuidv4(),
          },
        ],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [
          {
            suit: "hearts",
            rank: 12,
            flipped: true,
            id: uuidv4(),
          },
        ],
        type: "tableauPile",
        id: uuidv4(),
      },
      {
        cards: [
          {
            suit: "spades",
            rank: 12,
            flipped: true,
            id: uuidv4(),
          },
        ],
        type: "tableauPile",
        id: uuidv4(),
      },
    ],
  };*/
}
