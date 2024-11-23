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
    <div
      class="flex flex-col p-2 sm:p-4 relative sm:absolute sm:bottom-0 sm:inset-x-0 max-sm:border-t-2 max-sm:border-green-950 max-sm:bg-green-900"
    >
      <div
        class="flex justify-between mb-2 max-sm:m-2 gap-2 max-sm:absolute max-sm:bottom-full max-sm:inset-x-0 text-white font-mono"
      >
        <div class="flex gap-1 items-center">
          <Icon name="icons:timer" class="h-5 w-5" />
          <span>{{ formatTime(time) }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <Icon name="icons:score" class="h-5 w-5" />
          <span>{{ score }}</span>
        </div>
      </div>
      <div class="flex justify-between gap-2">
        <div class="flex gap-2">
          <button class="btn btn-primary btn-icon" @click="restart">
            <Icon name="icons:restart" />
            <span class="max-sm:hidden">Restart</span>
          </button>
          <button
            v-if="isAutoFinishPossible"
            class="btn btn-primary btn-icon"
            @click="autoFinish"
          >
            <Icon name="icons:check" />
            <span class="max-sm:hidden">Finish</span>
          </button>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary btn-icon" @click="undo">
            <Icon name="icons:undo" />
            <span class="max-sm:hidden">Undo</span>
          </button>
          <button class="btn btn-primary btn-icon" @click="redo">
            <Icon name="icons:redo" />
            <span class="max-sm:hidden">Redo</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardSelection } from "@/assets/types/game";

const {
  moveCard,
  clickStock,
  autoFinish,
  restart,
  undo,
  redo,
  foundations,
  waste,
  stock,
  tableauPiles,
  score,
  time,
  isAutoFinishPossible,
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
