import type { Card } from "@/assets/types/card";

export const useSolitaire = () => {
  const cards: Ref<Card[]> = useState("cards", () => [
    {
      rank: 0,
      suit: "clubs",
      flipped: true,
    },
    {
      rank: 3,
      suit: "diamonds",
      flipped: false,
    },
  ]);

  // ToDo Add types and state for foundations, piles, stacks etc.

  return {
    cards: readonly(cards),
  };
};
