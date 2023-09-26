// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    azureApiEndpoint: process.env.AZURE_API_ENDPOINT,
    azureApiVersion: process.env.AZURE_API_VERSION,
    azureApiKey: process.env.AZURE_API_KEY,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/content"],
  css: ["~/assets/css/main.css"],
});
