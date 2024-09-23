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
        pileType: "tableauPile",
        id: useId(),
      });
    }
  );

  // Reveal to top card of the soon to be stock pile
  shuffledDeck[shuffledDeck.length - 1].flipped = true;

  return {
    piles: [
      {
        cards: [],
        suit: "clubs",
        pileType: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "diamonds",
        pileType: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "hearts",
        pileType: "foundation",
        id: useId(),
      },
      {
        cards: [],
        suit: "spades",
        pileType: "foundation",
        id: useId(),
      },
      {
        cards: shuffledDeck,
        pileType: "stock",
        id: useId(),
      },
      {
        cards: [],
        pileType: "waste",
        id: useId(),
      },
      ...tableauPiles,
    ],
  };
}
