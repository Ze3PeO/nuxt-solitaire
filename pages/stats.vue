<template>
  <div class="mx-auto max-w-screen-xl w-full h-full p-2">
    <h1 class="text-center mb-4">
      {{ $t("stats.title") }}
    </h1>
    <ClientOnly fallback-tag="span" fallback="Loading stats...">
      <StatsTable />
    </ClientOnly>
  </div>
</template>
