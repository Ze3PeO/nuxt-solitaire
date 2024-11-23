<template>
  <header class="p-2 border-b-2 border-green-950 bg-green-900 text-white">
    <nav class="w-full">
      <ul class="flex gap-2 justify-center text-lg">
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            to="/"
            >{{ $t("global.home") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            to="/stats"
            >{{ $t("global.stats") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            to="/about"
            >{{ $t("global.about") }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.link {
  @apply p-2 md:hover:bg-black/25 rounded-lg;
}
</style>
