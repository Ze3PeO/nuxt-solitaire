<template>
  <div
    class="bg-green-800 mx-auto max-h-full aspect-[9/16] p-1 gap-x-1 gap-y-2 grid grid-rows-[auto,1fr] grid-cols-7"
  >
    <div class="col-span-4 grid grid-cols-4 gap-1">
      <SolitairePile
        v-for="foundation in foundations"
        :cards="foundation.cards"
        :suit="foundation.suit"
        :pile-id="foundation.id"
      />
    </div>
    <div></div>
    <div class="col-span-2 grid grid-cols-2 gap-1">
      <SolitairePile :cards="waste?.cards ?? []" :pile-id="waste?.id ?? ''" />
      <SolitairePile :cards="stock?.cards ?? []" :pile-id="stock?.id ?? ''" />
    </div>
    <div class="col-span-7 grid grid-cols-7 gap-1">
      <SolitairePile
        v-for="pile in tableauPiles"
        :cards="pile.cards"
        :fanned="true"
        :pile-id="pile.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardSelection } from "@/assets/types/game";

const { moveCard, foundations, waste, stock, tableauPiles } = useSolitaire();

const currentSelection = ref<CardSelection | null>(null);

provide(selectedCardKey, currentSelection);

provide(onCardClickKey, (selection: CardSelection) => {
  if (currentSelection.value?.cardId === selection.cardId) {
    currentSelection.value = null;
    return;
  }

  if (currentSelection.value === null) {
    currentSelection.value = selection;
    return;
  }

  moveCard(currentSelection.value.cardId, selection.cardId);
  currentSelection.value = null;

  console.log(selection.pileId);

  // set selected card
  // maybe use id
  // if another card is already selected try a move
  // if card is on the stock dont select and just move to waste
});
</script>
