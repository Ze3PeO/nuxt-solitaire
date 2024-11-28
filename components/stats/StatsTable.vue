<template>
  <table>
    <thead>
      <tr>
        <th v-for="statKey in statKeys" @click="onHeaderCellClick(statKey)">
          <div class="flex items-center">
            <span>{{ $t(`stats.table.header.${statKey}`) }}</span>
            <Icon
              name="icons:arrow-drop-up"
              class="h-5 w-5"
              :class="{
                'invisible opacity-0': currentSortValue !== statKey,
                'rotate-180': currentSortDir === 'desc',
              }"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(stat, index) in sortedStats" :key="index">
        <td>{{ new Date(stat.date).toLocaleString() }}</td>
        <td>{{ formatTime(stat.time) }}</td>
        <td>{{ stat.score }}</td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-center items-center mt-4 gap-4">
    <button
      class="btn btn-primary btn-icon"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      <Icon name="icons:arrow-back" />
      <span class="max-sm:hidden">{{ $t("stats.table.previous") }}</span>
    </button>
    <span> {{ currentPage }} / {{ Math.ceil(stats.length / pageSize) }} </span>
    <button
      class="btn btn-primary btn-icon"
      @click="nextPage"
      :disabled="currentPage * pageSize >= stats.length"
    >
      <span class="max-sm:hidden">{{ $t("stats.table.next") }}</span>
      <Icon name="icons:arrow-forward" />
    </button>
  </div>
  <div class="flex justify-end mt-4">
    <button
      class="btn btn-primary btn-icon"
      :disabled="stats.length === 0"
      @click="onResetStats"
    >
      <Icon name="icons:delete" />
      <span>{{ $t("stats.table.reset") }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import type { Stat } from "@/assets/types/stats";

type StatKey = keyof Stat;

const stats: Ref<Stat[]> = useStorage("stats", []);

const currentSortValue = ref<StatKey>("date");
const currentSortDir = ref<"asc" | "desc">("asc");
const statKeys: StatKey[] = ["date", "time", "score"];
const pageSize = ref<number>(10);
const currentPage = ref<number>(1);

const onHeaderCellClick = (statValue: keyof Stat) => {
  if (statValue === currentSortValue.value) {
    currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
  }

  currentSortValue.value = statValue;
};

const nextPage = () => {
  if (currentPage.value * pageSize.value < stats.value.length)
    currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const onResetStats = () => {
  stats.value = [];
};

const sortedStats = computed(() =>
  stats.value
    .sort((a: Stat, b: Stat) => {
      let modifier = 1;
      if (currentSortDir.value === "desc") modifier = -1;
      if (a[currentSortValue.value] < b[currentSortValue.value])
        return -1 * modifier;
      if (a[currentSortValue.value] > b[currentSortValue.value])
        return 1 * modifier;
      return 0;
    })
    .filter((row, index) => {
      let start = (currentPage.value - 1) * pageSize.value;
      let end = currentPage.value * pageSize.value;
      if (index >= start && index < end) return true;
    })
);
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
  @apply text-left bg-black text-white font-bold cursor-pointer;
}
</style>
