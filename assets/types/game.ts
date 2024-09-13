import type { Card, Suit } from "@/assets/types/card";

export type PileType = "pile" | "waste" | "stock" | "foundation";

export type Pile = {
  cards: Card[];
  pileType: PileType;
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
