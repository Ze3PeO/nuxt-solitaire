<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t("stats.table.header.date") }}</th>
        <th>{{ $t("stats.table.header.time") }}</th>
        <th>{{ $t("stats.table.header.score") }}</th>
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
      {{ $t("stats.table.reset") }}
    </button>
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
