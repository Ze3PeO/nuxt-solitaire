import type { InjectionKey } from "vue";
import type { CardSelection } from "@/assets/types/game";

export const selectedCardKey = Symbol() as InjectionKey<
  Ref<CardSelection | null>
>;

export const onCardClickKey = Symbol() as InjectionKey<
  (selection: CardSelection) => void
>;
