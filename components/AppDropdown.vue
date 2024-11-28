<script setup lang="ts">
const open = ref<boolean>(false);
const el = ref();

function close() {
  open.value = false;
}

onClickOutside(el, close);
</script>

<template>
  <div class="relative overflow-visible" ref="el">
    <button class="flex items-center justify-center" @click="open = !open">
      <slot name="trigger"></slot>
    </button>
    <div class="absolute top-full right-0 z-10" v-if="open">
      <slot name="content"></slot>
    </div>
  </div>
</template>
