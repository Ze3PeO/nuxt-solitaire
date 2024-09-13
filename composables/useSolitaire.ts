import type { Game } from "@/assets/types/game";

export const useSolitaire = () => {
  const game: Ref<Game> = useState("game", () => generateGame());

  // ToDo game logic

  console.log(game);

  return {
    game: readonly(game),
  };
};
