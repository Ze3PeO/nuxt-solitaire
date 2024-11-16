<template>
  <div
    class="mx-auto max-w-screen-sm h-full grid grid-rows-[auto,1fr,auto] gap-2 py-2"
  >
    <div class="flex gap-2 justify-between max-sm:px-2">
      <div>Timer: {{ formatTime(timestamp) }}</div>
      <div>Score: {{ score }}</div>
    </div>
    <div
      class="bg-green-800 p-1 gap-x-1 gap-y-2 grid grid-rows-[auto,1fr] grid-cols-7 overflow-hidden max-sm:border-y-2 sm:border-2 border-black sm:rounded-lg"
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
        <SolitairePile
          :cards="waste!.cards"
          :id="waste!.id"
          :type="waste!.type"
        />
        <SolitairePile
          :cards="stock!.cards"
          :id="stock!.id"
          :type="stock!.type"
        />
      </div>
      <div class="col-span-7 grid grid-cols-7 gap-1 min-h-0">
        <SolitairePile
          v-for="pile in tableauPiles"
          :cards="pile.cards"
          :fanned="true"
          :id="pile.id"
          :type="pile.type"
        />
      </div>
    </div>
    <div class="flex gap-2 justify-between max-sm:px-2">
      <button class="btn btn-primary" @click="reset">Reset</button>
      <div class="flex gap-2">
        <button disabled class="cursor-not-allowed btn btn-primary">
          Undo
        </button>
        <button disabled class="cursor-not-allowed btn btn-primary">
          Redo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardSelection } from "@/assets/types/game";

const {
  moveCard,
  clickStock,
  reset,
  foundations,
  waste,
  stock,
  tableauPiles,
  score,
  timestamp,
} = useSolitaire();

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

  if (result === "success") {
    currentSelection.value = null;
  } else {
    currentSelection.value = selection;
  }
});
</script>
