<template>
  <div class="h-svh w-screen sm:grid sm:grid-rows-[auto,1fr,auto] bg-slate-100">
    <AppHeader class="max-sm:hidden" />
    <slot />
    <AppFooter class="max-sm:hidden" />
  </div>
</template>
