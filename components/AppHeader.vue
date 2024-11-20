<template>
  <header class="p-2 border-b-2 border-green-950 bg-green-900 text-white">
    <nav class="w-full">
      <ul class="flex gap-2 justify-center text-lg">
        <li>
          <NuxtLink class="link" active-class="font-semibold underline" to="/"
            >Home</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            to="/stats"
            >Stats</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="link"
            active-class="font-semibold underline"
            to="/about"
            >About</NuxtLink
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
