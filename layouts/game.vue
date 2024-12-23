<template>
  <div
    class="h-svh w-screen grid grid-rows-[auto,1fr] sm:grid-rows-[auto,1fr,auto,auto]"
  >
    <AppHeader />
    <slot />
    <UDivider class="max-sm:hidden"/>
    <AppFooter class="max-sm:hidden" />
  </div>
</template>
