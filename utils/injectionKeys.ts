import type { InjectionKey } from "vue";
import type { Card } from "@/assets/types/card";

export const selectedCardIdKey = Symbol() as InjectionKey<
  Ref<Card["id"] | null>
>;

export const onCardClickKey = Symbol() as InjectionKey<(card: Card) => void>;
