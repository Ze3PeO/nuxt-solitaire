<script setup lang="ts">
import AppLangSwitcher from "./AppLangSwitcher.vue";

const localePath = useLocalePath();
</script>

<template>
  <header class="p-1 border-b-2 border-green-950 bg-green-900 text-white">
    <nav class="w-full">
      <ul
        class="flex gap-2 justify-start sm:justify-center text-lg items-center relative"
      >
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            :to="localePath('/')"
            >{{ $t("global.home") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            :to="localePath('/stats')"
            >{{ $t("global.stats") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            :to="localePath('/about')"
            >{{ $t("global.about") }}</NuxtLink
          >
        </li>
        <li class="absolute right-0">
          <AppLangSwitcher />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.link {
  @apply py-1 px-2 md:hover:bg-black/25 rounded-lg block;
}
</style>
