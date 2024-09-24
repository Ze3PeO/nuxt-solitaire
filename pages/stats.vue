<template>
  <div>
    <h1>Welcome to the stats page</h1>
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
    <button @click="onResetStats">Reset stats</button>
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
