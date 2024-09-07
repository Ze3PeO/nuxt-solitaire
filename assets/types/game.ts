import type { Card, Suit } from "@/assets/types/card";

export type Pile = {
  cards: Card[];
};

export type Foundation = Pile & {
  suit: Suit;
};

export type Game = {
  foundations: Foundation[];
  stock: Pile;
  waste: Pile;
  piles: Pile[];
};
