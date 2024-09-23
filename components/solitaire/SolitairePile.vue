<template>
  <div>
    <SolitaireCard
      v-if="cards.length > 0 && !fanned"
      v-bind="cards[cards.length - 1]"
    />
    <SolitaireCard
      v-else-if="cards.length > 0 && fanned"
      v-for="card in cards"
      v-bind="card"
    />
    <SolitaireBase v-else :suit="suit" />
  </div>
</template>

<script setup lang="ts">
import type { Card, Suit } from "@/assets/types/card";
import type { DeepReadonly } from "vue";

const props = defineProps<{
  cards: DeepReadonly<Card[]>;
  suit?: Suit;
  fanned?: boolean;
}>();
</script>
