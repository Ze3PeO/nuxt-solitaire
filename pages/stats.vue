<template>
  <div class="mx-auto max-w-screen-xl w-full h-full p-2">
    <h1 class="text-center mb-4">
      {{ $t("stats.title") }}
    </h1>
    <ClientOnly fallback-tag="fallback">
      <StatsTable />
      <template #fallback>
        <div class="w-full h-full flex justify-center items-center">
          <AppLoadingSpinner />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
