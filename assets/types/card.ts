export const Suits = ["clubs", "diamonds", "hearts", "spades"] as const;
export type Suit = (typeof Suits)[number];

export type Card = {
  suit: Suit;
  rank: number;
  flipped: boolean;
  id: string;
};
