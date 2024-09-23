import type { Card, Suit } from "@/assets/types/card";

export type PileType = "tableauPile" | "waste" | "stock" | "foundation";

export type Pile = {
  cards: Card[];
  pileType: PileType;
  suit?: Suit;
  id: string;
};

export type Game = {
  piles: Pile[];
};

export type CardSelection = {
  cardId: string;
  pileId: string;
};
