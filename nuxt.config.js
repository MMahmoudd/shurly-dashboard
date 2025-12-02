import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - shurrly_dashboard',
    title: 'shurrly_dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"preconnect", href: "https://fonts.googleapis.com"},
      { rel:"preconnect", href:"https://fonts.gstatic.com"},
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/style/main.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/axios" },
    {src: '~/plugins/Vuelidate.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "nuxt-i18n",
    '@nuxtjs/toast',
    "cookie-universal-nuxt",
    "vue2-editor/nuxt",
  ],
  toast: {
    position: "top-center",
    duration: 5000,
    keepOnHover: true,
    iconPack: "mdi",
    theme: "bubble",
    singleton: true,
  },
  router: {
    middleware: 'route',
  },
  publicRuntimeConfig: {
    axios: {
      imgURL: process.env.VUE_APP_API_URL,
      baseURL: process.env.VUE_APP_API_URL,
    },
  },
  i18n: {
    // parsePages: false,
    locales: [
      { code: "ar", iso: "ar-EG", file: "ar.js" },
      { code: "en", iso: "en-US", file: "en.js" },
    ],
    detectBrowserLanguage: false,
    defaultLocale: "ar",
    strategy: "prefix",
    lazy: true,
    langDir: "locales/",
    vueI18n: {
      fallbackLocale: "ar",
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
