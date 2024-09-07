<template>
  <div
    class="bg-green-800 mx-auto max-h-full aspect-[9/16] p-1 gap-x-1 gap-y-4 grid grid-rows-[auto,1fr] grid-cols-7"
  >
    <div class="col-span-4 grid grid-cols-4 gap-1">
      <SolitaireCard :flipped="true" />
      <SolitaireCard :flipped="true" />
      <SolitaireCard :flipped="true" />
      <SolitaireCard :flipped="true" />
    </div>
    <div></div>
    <div class="col-span-2 grid grid-cols-2 gap-1">
      <SolitaireCard v-for="card in game.waste.cards" v-bind="card" />
      <SolitaireCard v-for="card in game.stock.cards" v-bind="card" />
    </div>
    <div class="col-span-7 grid grid-cols-7 gap-1">
      <SolitaireCard :flipped="true" :rank="2" />
      <SolitaireCard :flipped="true" />
      <SolitaireCard :flipped="true" />
      <SolitaireCard :flipped="true" suit="hearts" />
      <SolitaireCard :flipped="true" suit="diamonds" />
      <SolitaireCard :flipped="true" :selected="true" />
      <SolitaireCard :flipped="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { game } = useSolitaire();
</script>
