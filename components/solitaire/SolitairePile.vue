<template>
  <div>
    <SolitaireCard v-if="cards.length > 0" v-bind="cards[cards.length - 1]" />
    <SolitaireBase v-else :suit="suit" />
  </div>
</template>

<script setup lang="ts">
import { type Pile } from "@/assets/types/game";
import type { DeepReadonly } from "vue";
import type { Suit } from "~/assets/types/card";

const props = defineProps<{
  cards: DeepReadonly<Pile["cards"]>;
  suit?: Suit;
}>();
</script>
