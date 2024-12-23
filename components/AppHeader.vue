<script setup lang="ts">
import AppLangSwitcher from "./AppLangSwitcher.vue";
const { t } = useI18n();

const localePath = useLocalePath();

const links = [{
  label: t('global.home'),
  to: localePath('/')
}, {
  label: t('global.stats'),
  to: localePath('/stats')
}, {
  label: t('global.about'),
  to: localePath('/about')
}]
</script>

<template>
  <header class="flex gap-4 justify-between items-center px-2">
    <UHorizontalNavigation :links="links" />
    <AppLangSwitcher />
  </header>
</template>
