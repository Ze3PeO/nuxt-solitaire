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
  modules: ["@vueuse/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
