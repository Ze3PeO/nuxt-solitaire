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
        <UButton
          icon="icons:restart"
          color="primary"
          variant="solid"
          @click="restart"
        >
          <template #trailing>
            <span class="max-sm:hidden">{{ $t('game.restart') }}</span>
          </template>
        </UButton>
        <UButton
          icon="icons:check"
          color="primary"
          variant="solid"
          @click="autoFinish"
          :disabled="!canAutoFinish"
        >
          <template #trailing>
            <span class="max-sm:hidden">{{ $t('game.finish') }}</span>
          </template>
        </UButton>
      </div>
      <div class="flex gap-2">
        <UButton
          icon="icons:undo"
          color="primary"
          variant="solid"
          @click="undo"
          :disabled="!canUndo"
        >
          <template #trailing>
            <span class="max-sm:hidden">{{ $t('game.undo') }}</span>
          </template>
        </UButton>
        <UButton
          icon="icons:redo"
          color="primary"
          variant="solid"
          @click="redo"
          :disabled="!canRedo"
        >
          <template #trailing>
            <span class="max-sm:hidden">{{ $t('game.redo') }}</span>
          </template>
        </UButton>
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
