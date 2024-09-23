<template>
  <div class="base">
    <span v-if="suit">{{ formatSuit(suit) }}</span>
  </div>
</template>

<script setup lang="ts">
import { type Suit } from "@/assets/types/card";

const props = defineProps<{
  suit?: Suit;
}>();
</script>

<style lang="postcss" scoped>
.base {
  @apply select-none aspect-[5/7] text-3xl text-green-700 rounded p-1 bg-green-900 border-2 border-green-950 shadow-md flex items-center justify-center;
}
</style>
