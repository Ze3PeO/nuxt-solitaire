<script setup lang="ts">
definePageMeta({
  layout: "game",
});
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="Loading game...">
    <SolitaireGame />
  </ClientOnly>
</template>
