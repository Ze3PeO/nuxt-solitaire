<template>
  <div>
    <SolitaireCard
      v-if="cards.length > 0 && !fanned"
      v-bind="cards[cards.length - 1]"
      :pile-id="pileId"
      @click="onCardClick?.({ cardId: cards[cards.length - 1].id, pileId })"
      @keydown.enter="
        onCardClick?.({ cardId: cards[cards.length - 1].id, pileId })
      "
    />
    <SolitaireCard
      v-else-if="cards.length > 0 && fanned"
      v-for="card in cards"
      v-bind="card"
      :pile-id="pileId"
      @click="onCardClick?.({ cardId: card.id, pileId })"
      @keydown.enter="onCardClick?.({ cardId: card.id, pileId })"
    />
    <SolitaireBase v-else :suit="suit" />
  </div>
</template>

<script setup lang="ts">
import type { Card, Suit } from "@/assets/types/card";
import type { DeepReadonly } from "vue";
import type { Pile } from "@/assets/types/game";

const props = defineProps<{
  cards: DeepReadonly<Card[]>;
  suit?: Suit;
  fanned?: boolean;
  pileId: Pile["id"];
}>();

const onCardClick = inject(onCardClickKey);
</script>
