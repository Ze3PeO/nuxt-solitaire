<template>
  <div
    class="bg-green-800 mx-auto max-h-full aspect-[9/16] p-1 gap-x-1 gap-y-2 grid grid-rows-[auto,1fr] grid-cols-7"
  >
    <div class="col-span-4 grid grid-cols-4 gap-1">
      <SolitairePile
        v-for="foundation in game.foundations"
        :cards="foundation.cards"
        :suit="foundation.suit"
      />
    </div>
    <div></div>
    <div class="col-span-2 grid grid-cols-2 gap-1">
      <SolitairePile :cards="game.waste.cards" />
      <SolitairePile :cards="game.stock.cards" />
    </div>
    <div class="col-span-7 grid grid-cols-7 gap-1">
      <SolitairePile
        v-for="pile in game.piles"
        :cards="pile.cards"
        :fanned="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/assets/types/card";

const { game, moveCard } = useSolitaire();

const selectedCardId = ref<Card["id"] | null>(null);

provide(selectedCardIdKey, selectedCardId);

provide(onCardClickKey, (card: Card) => {
  if (selectedCardId.value === card.id) {
    selectedCardId.value = null;
    return;
  }

  if (selectedCardId.value === null) {
    selectedCardId.value = card.id;
    return;
  }

  moveCard(selectedCardId.value, card.id);
  selectedCardId.value = null;

  // set selected card
  // maybe use id
  // if another card is already selected try a move
  // if card is on the stock dont select and just move to waste
});
</script>
