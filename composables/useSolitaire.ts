import type { Game } from "@/assets/types/game";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => ({
    foundations: [],
    stock: {
      cards: [
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
      ],
    },
    waste: {
      cards: [],
    },
    piles: [],
  }));

  // ToDo Add types and state for foundations, piles, stacks etc.

  return {
    game: readonly(game),
  };
};
