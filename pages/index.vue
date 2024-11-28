<script setup lang="ts">
definePageMeta({
  layout: "game",
});
</script>

<template>
  <ClientOnly fallback-tag="fallback">
    <SolitaireGame />
    <template #fallback>
      <div class="w-full h-full flex justify-center items-center">
        <AppLoadingSpinner />
      </div>
    </template>
  </ClientOnly>
</template>
