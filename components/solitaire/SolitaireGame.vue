<template>
  <div
    class="mx-auto max-w-screen-sm w-full min-h-0 h-full sm:p-2 relative max-sm:grid max-sm:grid-rows-[1fr,auto]"
  >
    <div
      class="sm:h-full bg-green-800 p-2 gap-x-1 gap-y-2 grid grid-rows-[auto,1fr] grid-cols-7 overflow-hidden sm:border-2 border-green-950 sm:rounded-lg"
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
    <SolitaireActions
      :time="time"
      :score="score"
      :restart="restart"
      :can-auto-finish="canAutoFinish"
      :auto-finish="autoFinish"
      :can-undo="canUndo"
      :undo="undo"
      :can-redo="canRedo"
      :redo="redo"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardSelection } from "@/assets/types/game";

const {
  moveCard,
  clickStock,
  canAutoFinish,
  autoFinish,
  restart,
  canUndo,
  undo,
  canRedo,
  redo,
  foundations,
  waste,
  stock,
  tableauPiles,
  score,
  time,
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

    // Reset focus
    // ToDo also on missclick
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  } else {
    currentSelection.value = selection;
  }
});
</script>
