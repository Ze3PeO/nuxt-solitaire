import type { Game } from "@/assets/types/game";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => ({
    foundations: [
      {
        cards: [],
        suit: "clubs",
      },
      {
        cards: [],
        suit: "diamonds",
      },
      {
        cards: [],
        suit: "hearts",
      },
      {
        cards: [],
        suit: "spades",
      },
    ],
    stock: {
      cards: [
        {
          rank: 0,
          suit: "clubs",
          flipped: false,
        },
        {
          rank: 3,
          suit: "diamonds",
          flipped: true,
        },
      ],
    },
    waste: {
      cards: [],
    },
    piles: [
      {
        cards: [],
      },
      {
        cards: [],
      },
      {
        cards: [],
      },
      {
        cards: [],
      },
      {
        cards: [],
      },
      {
        cards: [],
      },
      {
        cards: [],
      },
    ],
  }));

  // ToDo Add state for foundations, piles, stacks etc.

  return {
    game: readonly(game),
  };
};
