<script setup lang="ts">
const { locale: activeLocale, locales, setLocale } = useI18n();

const test = computed(() => [
  locales.value.map((locale) => {
    return {
      label: locale.name,
      click: () => setLocale(locale.code),
      labelClass: locale.code === activeLocale.value ? 'underline font-semibold' : ''
    }
  })
])
</script>

<template>
  <UDropdown :items="test" :popper="{ placement: 'bottom-end' }">
    <UButton
      icon="icons:translate"
      color="primary"
      variant="solid"
    />
  </UDropdown>
</template>
