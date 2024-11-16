<template>
  <div class="mx-auto max-w-screen-xl w-full h-full p-2">
    <h1 class="text-center mb-4">Your solitaire statistics</h1>
    <!-- ssr? -->
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stat, index) in stats" :key="index">
          <td>{{ new Date(stat.date).toLocaleString() }}</td>
          <td>{{ formatTime(stat.time) }}</td>
          <td>{{ stat.score }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end">
      <button class="btn btn-primary mt-4" @click="onResetStats">
        Reset stats
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import type { Stat } from "@/assets/types/stats";

const stats: Ref<Stat[]> = useStorage("stats", []);

const onResetStats = () => {
  stats.value = [];
};
</script>

<style lang="postcss" scoped>
table {
  @apply w-full border-collapse;
}

table,
th,
td {
  @apply border-2 border-black;
}

th,
td {
  @apply p-2;
}

th {
  @apply text-left bg-black text-white font-bold;
}
</style>
