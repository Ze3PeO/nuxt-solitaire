import { type Suit } from "@/assets/types/card";

export default function (suit: Suit): string {
  const suitLabels: { [key in Suit]: string } = {
    clubs: "♣",
    diamonds: "♦",
    hearts: "♥",
    spades: "♠",
  };

  return suitLabels[suit];
}
