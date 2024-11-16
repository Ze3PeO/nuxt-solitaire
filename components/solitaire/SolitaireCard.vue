<template>
  <div
    class="card"
    :class="{
      'card--facedown': !flipped,
      'card--red': suit === 'diamonds' || suit === 'hearts',
      'card--selected': selected && flipped,
      'card--upturned': flipped,
      'card--covered': covered && flipped,
    }"
  >
    <div v-if="flipped" class="flex justify-between">
      <span>
        {{ formatRank(rank) }}
      </span>
      <span>
        {{ formatSuit(suit) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/assets/types/card";

const props = withDefaults(
  defineProps<{
    suit: Card["suit"];
    rank: Card["rank"];
    flipped: Card["flipped"];
    id: Card["id"];
    covered: boolean;
  }>(),
  {
    suit: "clubs",
    rank: 0,
    flipped: false,
    id: "",
    covered: false,
  }
);

const selected = ref(false);

const selectedCard = inject(selectedCardKey, ref(null));

watch(selectedCard, () => {
  selected.value = selectedCard.value?.cardId === props.id;
});
</script>

<style lang="postcss" scoped>
.card {
  @apply focus:ring-4 focus:ring-red-600 focus:outline-none ring-yellow-600 select-none transition-[margin] aspect-[5/7] text-black rounded p-0.5 sm:p-1 bg-white border-2 border-slate-300 shadow-md text-lg;
}

.card--facedown {
  @apply bg-blue-600 border-blue-700;
}

.card--red {
  @apply text-red-600;
}

.card--selected {
  @apply ring-4;
}

.card--upturned {
  @apply cursor-pointer md:hover:ring-2;
}

.card--covered {
  @apply focus:-mt-4;
}
</style>
