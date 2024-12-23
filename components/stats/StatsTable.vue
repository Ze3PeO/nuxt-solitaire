<template>
  <UTable 
    :columns="columns"
    :rows="rows"
    :empty-state="{ label: $t('stats.table.empty') }"
    v-model:sort="sort"
    sort-asc-icon="icons:arrow-drop-up"
    sort-desc-icon="icons:arrow-drop-down"
    sort-mode="manual"
    :sortButton="{
      icon: 'icons:swap-vert'
    }"
  >
    <template #date-data="{ row }">
      <span>{{ new Date(row.date).toLocaleString() }}</span>
    </template>
    <template #time-data="{ row }">
      <span>{{ formatTime(row.time) }}</span>
    </template>
  </UTable>
  <div class="flex flex-col gap-4 mt-4">
    <!-- ToDo use custom icons for pagination -->
    <UPagination
      class="self-center"   
      v-model="currentPage" 
      :page-count="pageSize" 
      :total="stats.length"
      show-first
      show-last
    />
    <UButton
      class="self-end"
      icon="icons:delete"
      color="primary"
      variant="solid"
      :label="$t('stats.table.reset')"
      :trailing="false"
      @click="onResetStats"
      :disabled="stats.length === 0"
    />
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import type { Stat } from "@/assets/types/stats";
const { t } = useI18n();

const pageSize = ref<number>(10);
const currentPage = ref<number>(1);
const sort = ref({ column: 'date', direction: 'asc' as const })
const stats: Ref<Stat[]> = useStorage("stats", []);

const rows = computed(() => {
  return stats.value
    .sort((a: Stat, b: Stat) => {
        let modifier = 1;
        if (sort.value.direction === "desc") modifier = -1;
        if (a[sort.value.column] < b[sort.value.column])
          return -1 * modifier;
        if (a[sort.value.column] > b[sort.value.column])
          return 1 * modifier;
        return 0;
      })
    .filter((row: Stat, index: number) => {
      let start = (currentPage.value - 1) * pageSize.value;
      let end = currentPage.value * pageSize.value;
      if (index >= start && index < end) return true;
    });
})

const columns = [{
  key: 'date',
  label: t('stats.table.header.date'),
  sortable: true,
}, {
  key: 'time',
  label: t('stats.table.header.time'),
  sortable: true,
}, {
  key: 'score',
  label: t('stats.table.header.score'),
  sortable: true,
}];

const onResetStats = () => {
  stats.value = [];
};
</script>
