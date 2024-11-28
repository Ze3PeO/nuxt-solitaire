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
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/icons/icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/icons/icon-180x180.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
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
    lazy: true,
    langDir: "./locales",
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "de",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
      },
    ],
  },
});
