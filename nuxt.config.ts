// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nuxt Solitaire",
      meta: [
        {
          name: "description",
          content: "Soliatire implementation made with Nuxt",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@vueuse/nuxt", "@nuxthub/core", "@nuxt/icon", "@nuxtjs/i18n"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    "/": { ssr: false },
    "/stats": { ssr: false },
    "/about": { prerender: true },
  },
  icon: {
    clientBundle: {
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
    customCollections: [
      {
        prefix: "icons",
        dir: "./assets/icons",
      },
    ],
  },
  i18n: {
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },
});
