<template>
  <div
    class="flex flex-col px-4 pt-2 pb-safe-2 sm:p-4 relative sm:absolute sm:bottom-0 sm:inset-x-0 max-sm:border-t-2 max-sm:border-green-950 max-sm:bg-green-900"
  >
    <div
      class="flex justify-between mb-2 max-sm:m-2 gap-2 max-sm:absolute max-sm:bottom-full max-sm:inset-x-0 text-white font-mono"
    >
      <div class="flex gap-1 items-center">
        <Icon name="icons:timer" class="h-5 w-5" />
        <span>{{ formatTime(time) }}</span>
      </div>
      <div class="flex gap-1 items-center">
        <Icon name="icons:score" class="h-5 w-5" />
        <span>{{ score }}</span>
      </div>
    </div>
    <div class="flex justify-between gap-8">
      <div class="flex gap-2">
        <button class="btn btn-primary btn-icon" @click="restart">
          <Icon name="icons:restart" />
          <span class="max-sm:hidden">{{ $t("game.restart") }}</span>
        </button>
        <button
          class="btn btn-primary btn-icon"
          @click="autoFinish"
          :disabled="!canAutoFinish"
        >
          <Icon name="icons:check" />
          <span class="max-sm:hidden">{{ $t("game.finish") }}</span>
        </button>
      </div>
      <div class="flex gap-2">
        <button
          class="btn btn-primary btn-icon"
          @click="undo"
          :disabled="!canUndo"
        >
          <Icon name="icons:undo" />
          <span class="max-sm:hidden">{{ $t("game.undo") }}</span>
        </button>
        <button
          class="btn btn-primary btn-icon"
          @click="redo"
          :disabled="!canRedo"
        >
          <Icon name="icons:redo" />
          <span class="max-sm:hidden">{{ $t("game.redo") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  time: number;
  score: number;
  restart: () => void;
  canAutoFinish: boolean;
  autoFinish: () => void;
  canUndo: boolean;
  undo: () => void;
  canRedo: boolean;
  redo: () => void;
}>();
</script>
