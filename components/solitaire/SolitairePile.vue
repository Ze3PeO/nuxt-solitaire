<template>
  <div class="flex flex-col gap-1">
    <SolitaireCard
      v-if="cards.length > 0 && !fanned"
      v-bind="cards[cards.length - 1]"
      :pile-id="id"
      @click="onCardClick(cards[cards.length - 1])"
      @keydown.enter="onCardClick(cards[cards.length - 1])"
    />
    <SolitaireCard
      v-else-if="cards.length > 0 && fanned"
      v-for="card in cards"
      v-bind="card"
      :pile-id="id"
      @click="onCardClick(card)"
      @keydown.enter="onCardClick(card)"
    />
    <SolitaireBase
      v-else
      :suit="suit"
      @click="onCardClick(null)"
      @keydown.enter="onCardClick(null)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card, Suit } from "@/assets/types/card";
import type { DeepReadonly } from "vue";
import type { Pile } from "@/assets/types/game";

const props = defineProps<{
  cards: DeepReadonly<Card[]>;
  suit?: Suit;
  fanned?: boolean;
  id: Pile["id"];
  type: Pile["type"];
}>();

const onCardSelect = inject(onCardSelectKey);
const onStockClick = inject(onStockClickKey);

const onCardClick = (card: Card | null) => {
  if (props.type === "stock") {
    onStockClick?.();
    return;
  }

  if (!card) return;

  onCardSelect?.({ cardId: card.id, pileId: props.id });
};
</script>
