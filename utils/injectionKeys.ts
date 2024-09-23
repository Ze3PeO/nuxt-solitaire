import type { InjectionKey } from "vue";
import type { CardSelection } from "@/assets/types/game";

export const selectedCardKey = Symbol() as InjectionKey<
  Ref<CardSelection | null>
>;

export const onCardSelectKey = Symbol() as InjectionKey<
  (selection: CardSelection) => void
>;

export const onStockClickKey = Symbol() as InjectionKey<() => void>;
