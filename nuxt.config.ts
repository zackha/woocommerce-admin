export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxthub/core'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'WooCommerce Admin',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  runtimeConfig: {
    wcUrl: process.env.NUXT_WC_URL,
    wcKey: process.env.NUXT_WC_KEY,
    wcSecret: process.env.NUXT_WC_SECRET,
    public: {
      defaultPerPage: process.env.NUXT_DEFAULT_PER_PAGE,
    },
  },
});
