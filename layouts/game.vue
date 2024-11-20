<template>
  <div
    class="h-svh w-screen grid grid-rows-[auto,1fr] sm:grid-rows-[auto,1fr,auto] bg-slate-100"
  >
    <AppHeader />
    <slot />
    <AppFooter class="max-sm:hidden" />
  </div>
</template>
