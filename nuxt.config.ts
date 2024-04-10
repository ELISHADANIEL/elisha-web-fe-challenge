// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',"@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",],
   app: {
    head: {
     link: [{ rel: 'icon', type: 'image/png', href: '/ecvvvvv.webp' }],
      title: "To Do",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true 
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
  plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      "postcss-nested": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/iconify.ts', // Path to your Iconify plugin file
  ],
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  tailwindcss: {
    exposeConfig: true,
  },
})
