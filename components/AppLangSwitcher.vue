<script setup lang="ts">
const { locale: activeLocale, locales, setLocale } = useI18n();
</script>

<template>
  <AppDropdown>
    <template #trigger>
      <div class="p-2 h-9 w-9 md:hover:bg-black/25 rounded-lg">
        <Icon name="icons:translate" class="h-full w-full" />
      </div>
    </template>
    <template #content>
      <ul
        class="bg-slate-100 text-black p-1 rounded-lg border-black border-2 min-w-40"
      >
        <li v-for="locale in locales" :key="locale.code">
          <a
            class="py-1 px-2 md:hover:bg-black/25 rounded-lg block"
            :class="{
              'underline font-bold': locale.code === activeLocale,
            }"
            href="#"
            @click.prevent.stop="setLocale(locale.code)"
          >
            {{ locale.name }}
          </a>
        </li>
      </ul>
    </template>
  </AppDropdown>
</template>
