<template>
  <div
    class="bg-green-800 mx-auto max-h-full aspect-[9/16] p-1 gap-x-1 gap-y-2 grid grid-rows-[auto,1fr] grid-cols-7"
  >
    <div class="col-span-4 grid grid-cols-4 gap-1">
      <SolitairePile
        v-for="foundation in foundations"
        :cards="foundation.cards"
        :suit="foundation.suit"
        :id="foundation.id"
        :type="foundation.type"
      />
    </div>
    <div></div>
    <div class="col-span-2 grid grid-cols-2 gap-1">
      <SolitairePile :cards="waste.cards" :id="waste.id" :type="waste.type" />
      <SolitairePile :cards="stock.cards" :id="stock.id" :type="stock.type" />
    </div>
    <div class="col-span-7 grid grid-cols-7 gap-1">
      <SolitairePile
        v-for="pile in tableauPiles"
        :cards="pile.cards"
        :fanned="true"
        :id="pile.id"
        :type="pile.type"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardSelection } from "@/assets/types/game";

const { moveCard, clickStock, foundations, waste, stock, tableauPiles } =
  useSolitaire();

const currentSelection = ref<CardSelection | null>(null);

provide(selectedCardKey, currentSelection);

provide(onStockClickKey, () => {
  currentSelection.value = null;
  clickStock();
});

provide(onCardSelectKey, (selection: CardSelection) => {
  if (currentSelection.value === null) {
    currentSelection.value = selection;
    return;
  }

  if (currentSelection.value.cardId === selection.cardId) {
    currentSelection.value = null;
    return;
  }

  const result = moveCard(currentSelection.value, selection);

  console.log(result);

  currentSelection.value = null;
});
</script>
