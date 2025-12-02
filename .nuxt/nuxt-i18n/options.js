import locale770bf1f0 from '../../locales/ar.js'

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
}
export const nuxtOptions = {
  isUniversalMode: false,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"ar"},
  vueI18nLoader: false,
  locales: [{"code":"ar","iso":"ar-EG","file":"ar.js"},{"code":"en","iso":"en-US","file":"en.js"}],
  defaultLocale: "ar",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "prefix",
  lazy: true,
  langDir: "/Users/mahmoud/Documents/Projects/Fulltime/rakam/shurly/locales",
  rootRedirect: null,
  detectBrowserLanguage: false,
  differentDomains: false,
  seo: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncLocale":false,"syncMessages":false,"syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  beforeLanguageSwitch: () => null,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"ar","iso":"ar-EG","file":"ar.js"},{"code":"en","iso":"en-US","file":"en.js"}],
  localeCodes: ["ar","en"],
}

export const localeMessages = {
  'ar.js': () => Promise.resolve(locale770bf1f0),
  'en.js': () => import('../../locales/en.js' /* webpackChunkName: "lang-en.js" */),
}
