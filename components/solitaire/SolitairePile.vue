<template>
  <div
    class="pile"
    :class="{
      'pile--fanned': fanned,
    }"
  >
    <SolitaireCard
      v-if="cards.length > 0 && !fanned"
      v-bind="cards[cards.length - 1]"
      :pile-id="id"
      @click="onCardClick(cards[cards.length - 1])"
      @keydown.enter="onCardClick(cards[cards.length - 1])"
      :class="{
        'cursor-pointer': type === 'stock',
      }"
      :tabindex="cards[cards.length - 1].flipped || type === 'stock' ? 0 : -1"
    />
    <SolitaireCard
      v-else-if="cards.length > 0 && fanned"
      v-for="(card, index) in cards"
      v-bind="card"
      :pile-id="id"
      @click="onCardClick(card)"
      @keydown.enter="onCardClick(card)"
      :tabindex="card.flipped ? 0 : -1"
      :covered="index < cards.length - 1"
    />
    <SolitaireBase
      v-else
      :suit="suit"
      @click="onCardClick(null)"
      @keydown.enter="onCardClick(null)"
      :class="{
        'cursor-pointer': type === 'stock',
      }"
      :tabindex="type !== 'waste' ? 0 : -1"
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

  if (!card) {
    onCardSelect?.({ pileId: props.id });
    return;
  }

  onCardSelect?.({ cardId: card.id, pileId: props.id });
};
</script>

<style lang="postcss" scoped>
.pile {
  @apply grid relative h-auto min-h-0;
}

.pile--fanned {
  @apply grid grid-cols-1 auto-rows-[4%] sm:auto-rows-[5%];
}
</style>
