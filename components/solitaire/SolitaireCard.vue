<template>
  <div
    class="card"
    :class="{
      'card--cover': !flipped,
      'card--red': suit === 'diamonds' || suit === 'hearts',
      'card--selected': selected && flipped,
    }"
    @click="
      onCardClick?.({
        suit,
        rank,
        flipped,
        id,
      })
    "
    @keydown.enter="
      onCardClick?.({
        suit,
        rank,
        flipped,
        id,
      })
    "
    :tabindex="flipped ? 0 : -1"
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
import { type Card } from "@/assets/types/card";

const props = withDefaults(
  defineProps<{
    suit: Card["suit"];
    rank: Card["rank"];
    flipped: Card["flipped"];
    id: Card["id"];
  }>(),
  {
    suit: "clubs",
    rank: 0,
    flipped: false,
    id: "",
  }
);

const selected = ref(false);

const onCardClick = inject(onCardClickKey);
const selectedCardId = inject(selectedCardIdKey, ref(null));

watch(selectedCardId, () => {
  selected.value = selectedCardId.value === props.id;
});

// ToDo Custom focus styling
</script>

<style lang="postcss" scoped>
.card {
  @apply select-none aspect-[5/7] text-black rounded p-1 bg-white border-2 border-slate-300 shadow-md;
}

.card--cover {
  @apply bg-blue-600 border-blue-700;
}

.card--red {
  @apply text-red-600;
}

.card--selected {
  @apply ring-2 ring-yellow-600;
}
</style>
