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
      <SolitairePile v-for="pile in game.piles" :cards="pile.cards" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { game } = useSolitaire();
</script>
