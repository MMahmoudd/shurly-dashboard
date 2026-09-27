import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7af8ba3b = () => interopDefault(import('../pages/answers/index.vue' /* webpackChunkName: "pages/answers/index" */))
const _7abeb356 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _2eb3a56c = () => interopDefault(import('../pages/categories/index.vue' /* webpackChunkName: "pages/categories/index" */))
const _38de5852 = () => interopDefault(import('../pages/expertises/index.vue' /* webpackChunkName: "pages/expertises/index" */))
const _445c35ed = () => interopDefault(import('../pages/faqs/index.vue' /* webpackChunkName: "pages/faqs/index" */))
const _1d3c5d9d = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _31afc7f3 = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _50e8ca92 = () => interopDefault(import('../pages/skills/index.vue' /* webpackChunkName: "pages/skills/index" */))
const _6bebc871 = () => interopDefault(import('../pages/slider/index.vue' /* webpackChunkName: "pages/slider/index" */))
const _47dc35f9 = () => interopDefault(import('../pages/supportRequests/index.vue' /* webpackChunkName: "pages/supportRequests/index" */))
const _2c97dc99 = () => interopDefault(import('../pages/webinars/index.vue' /* webpackChunkName: "pages/webinars/index" */))
const _427b8662 = () => interopDefault(import('../pages/withdrawal-requests/index.vue' /* webpackChunkName: "pages/withdrawal-requests/index" */))
const _c81c8a1a = () => interopDefault(import('../pages/advisor/approved.vue' /* webpackChunkName: "pages/advisor/approved" */))
const _15238f0b = () => interopDefault(import('../pages/advisor/pending.vue' /* webpackChunkName: "pages/advisor/pending" */))
const _2f5d2d3a = () => interopDefault(import('../pages/advisor/rejected.vue' /* webpackChunkName: "pages/advisor/rejected" */))
const _3234676b = () => interopDefault(import('../pages/answers/form.vue' /* webpackChunkName: "pages/answers/form" */))
const _0fa6a662 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _5a5ace4b = () => interopDefault(import('../pages/blocks/categories/index.vue' /* webpackChunkName: "pages/blocks/categories/index" */))
const _57fc5376 = () => interopDefault(import('../pages/blocks/reasons/index.vue' /* webpackChunkName: "pages/blocks/reasons/index" */))
const _50c6d21a = () => interopDefault(import('../pages/categories/form.vue' /* webpackChunkName: "pages/categories/form" */))
const _2101909f = () => interopDefault(import('../pages/disputes/reasons/index.vue' /* webpackChunkName: "pages/disputes/reasons/index" */))
const _fab1ab18 = () => interopDefault(import('../pages/expertises/form.vue' /* webpackChunkName: "pages/expertises/form" */))
const _5179ad79 = () => interopDefault(import('../pages/faqs/form.vue' /* webpackChunkName: "pages/faqs/form" */))
const _43c22d28 = () => interopDefault(import('../pages/sessions/approved.vue' /* webpackChunkName: "pages/sessions/approved" */))
const _27ca2d72 = () => interopDefault(import('../pages/sessions/pending.vue' /* webpackChunkName: "pages/sessions/pending" */))
const _718a5bb3 = () => interopDefault(import('../pages/sessions/rejected.vue' /* webpackChunkName: "pages/sessions/rejected" */))
const _757cccbe = () => interopDefault(import('../pages/settings/advisor.vue' /* webpackChunkName: "pages/settings/advisor" */))
const _afbf226e = () => interopDefault(import('../pages/settings/general.vue' /* webpackChunkName: "pages/settings/general" */))
const _7755a009 = () => interopDefault(import('../pages/settings/notifications.vue' /* webpackChunkName: "pages/settings/notifications" */))
const _80384e56 = () => interopDefault(import('../pages/settings/payout.vue' /* webpackChunkName: "pages/settings/payout" */))
const _654b8d2e = () => interopDefault(import('../pages/settings/privacy.vue' /* webpackChunkName: "pages/settings/privacy" */))
const _74b58350 = () => interopDefault(import('../pages/settings/socialMedia.vue' /* webpackChunkName: "pages/settings/socialMedia" */))
const _48a4f3b0 = () => interopDefault(import('../pages/settings/terms.vue' /* webpackChunkName: "pages/settings/terms" */))
const _62657034 = () => interopDefault(import('../pages/skills/form.vue' /* webpackChunkName: "pages/skills/form" */))
const _002bba75 = () => interopDefault(import('../pages/slider/form.vue' /* webpackChunkName: "pages/slider/form" */))
const _14ce5f8a = () => interopDefault(import('../pages/users/admins/index.vue' /* webpackChunkName: "pages/users/admins/index" */))
const _d1ddba08 = () => interopDefault(import('../pages/users/roles/index.vue' /* webpackChunkName: "pages/users/roles/index" */))
const _0a8ac087 = () => interopDefault(import('../pages/users/users/index.vue' /* webpackChunkName: "pages/users/users/index" */))
const _45cefd66 = () => interopDefault(import('../pages/webinars/form.vue' /* webpackChunkName: "pages/webinars/form" */))
const _7337915b = () => interopDefault(import('../pages/blocks/categories/form.vue' /* webpackChunkName: "pages/blocks/categories/form" */))
const _100b3ad0 = () => interopDefault(import('../pages/blocks/reasons/form.vue' /* webpackChunkName: "pages/blocks/reasons/form" */))
const _0e453487 = () => interopDefault(import('../pages/disputes/reasons/form.vue' /* webpackChunkName: "pages/disputes/reasons/form" */))
const _7839916b = () => interopDefault(import('../pages/users/admins/form.vue' /* webpackChunkName: "pages/users/admins/form" */))
const _a2093aec = () => interopDefault(import('../pages/users/roles/form.vue' /* webpackChunkName: "pages/users/roles/form" */))
const _6862679f = () => interopDefault(import('../pages/users/users/form.vue' /* webpackChunkName: "pages/users/users/form" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/answers",
    component: _7af8ba3b,
    name: "answers"
  }, {
    path: "/ar",
    component: _7abeb356,
    name: "index___ar"
  }, {
    path: "/categories",
    component: _2eb3a56c,
    name: "categories"
  }, {
    path: "/en",
    component: _7abeb356,
    name: "index___en"
  }, {
    path: "/expertises",
    component: _38de5852,
    name: "expertises"
  }, {
    path: "/faqs",
    component: _445c35ed,
    name: "faqs"
  }, {
    path: "/inspire",
    component: _1d3c5d9d,
    name: "inspire"
  }, {
    path: "/settings",
    component: _31afc7f3,
    name: "settings"
  }, {
    path: "/skills",
    component: _50e8ca92,
    name: "skills"
  }, {
    path: "/slider",
    component: _6bebc871,
    name: "slider"
  }, {
    path: "/supportRequests",
    component: _47dc35f9,
    name: "supportRequests"
  }, {
    path: "/webinars",
    component: _2c97dc99,
    name: "webinars"
  }, {
    path: "/withdrawal-requests",
    component: _427b8662,
    name: "withdrawal-requests"
  }, {
    path: "/advisor/approved",
    component: _c81c8a1a,
    name: "advisor-approved"
  }, {
    path: "/advisor/pending",
    component: _15238f0b,
    name: "advisor-pending"
  }, {
    path: "/advisor/rejected",
    component: _2f5d2d3a,
    name: "advisor-rejected"
  }, {
    path: "/answers/form",
    component: _3234676b,
    name: "answers-form"
  }, {
    path: "/ar/answers",
    component: _7af8ba3b,
    name: "answers___ar"
  }, {
    path: "/ar/categories",
    component: _2eb3a56c,
    name: "categories___ar"
  }, {
    path: "/ar/expertises",
    component: _38de5852,
    name: "expertises___ar"
  }, {
    path: "/ar/faqs",
    component: _445c35ed,
    name: "faqs___ar"
  }, {
    path: "/ar/inspire",
    component: _1d3c5d9d,
    name: "inspire___ar"
  }, {
    path: "/ar/settings",
    component: _31afc7f3,
    name: "settings___ar"
  }, {
    path: "/ar/skills",
    component: _50e8ca92,
    name: "skills___ar"
  }, {
    path: "/ar/slider",
    component: _6bebc871,
    name: "slider___ar"
  }, {
    path: "/ar/supportRequests",
    component: _47dc35f9,
    name: "supportRequests___ar"
  }, {
    path: "/ar/webinars",
    component: _2c97dc99,
    name: "webinars___ar"
  }, {
    path: "/ar/withdrawal-requests",
    component: _427b8662,
    name: "withdrawal-requests___ar"
  }, {
    path: "/auth/login",
    component: _0fa6a662,
    name: "auth-login"
  }, {
    path: "/blocks/categories",
    component: _5a5ace4b,
    name: "blocks-categories"
  }, {
    path: "/blocks/reasons",
    component: _57fc5376,
    name: "blocks-reasons"
  }, {
    path: "/categories/form",
    component: _50c6d21a,
    name: "categories-form"
  }, {
    path: "/disputes/reasons",
    component: _2101909f,
    name: "disputes-reasons"
  }, {
    path: "/en/answers",
    component: _7af8ba3b,
    name: "answers___en"
  }, {
    path: "/en/categories",
    component: _2eb3a56c,
    name: "categories___en"
  }, {
    path: "/en/expertises",
    component: _38de5852,
    name: "expertises___en"
  }, {
    path: "/en/faqs",
    component: _445c35ed,
    name: "faqs___en"
  }, {
    path: "/en/inspire",
    component: _1d3c5d9d,
    name: "inspire___en"
  }, {
    path: "/en/settings",
    component: _31afc7f3,
    name: "settings___en"
  }, {
    path: "/en/skills",
    component: _50e8ca92,
    name: "skills___en"
  }, {
    path: "/en/slider",
    component: _6bebc871,
    name: "slider___en"
  }, {
    path: "/en/supportRequests",
    component: _47dc35f9,
    name: "supportRequests___en"
  }, {
    path: "/en/webinars",
    component: _2c97dc99,
    name: "webinars___en"
  }, {
    path: "/en/withdrawal-requests",
    component: _427b8662,
    name: "withdrawal-requests___en"
  }, {
    path: "/expertises/form",
    component: _fab1ab18,
    name: "expertises-form"
  }, {
    path: "/faqs/form",
    component: _5179ad79,
    name: "faqs-form"
  }, {
    path: "/sessions/approved",
    component: _43c22d28,
    name: "sessions-approved"
  }, {
    path: "/sessions/pending",
    component: _27ca2d72,
    name: "sessions-pending"
  }, {
    path: "/sessions/rejected",
    component: _718a5bb3,
    name: "sessions-rejected"
  }, {
    path: "/settings/advisor",
    component: _757cccbe,
    name: "settings-advisor"
  }, {
    path: "/settings/general",
    component: _afbf226e,
    name: "settings-general"
  }, {
    path: "/settings/notifications",
    component: _7755a009,
    name: "settings-notifications"
  }, {
    path: "/settings/payout",
    component: _80384e56,
    name: "settings-payout"
  }, {
    path: "/settings/privacy",
    component: _654b8d2e,
    name: "settings-privacy"
  }, {
    path: "/settings/socialMedia",
    component: _74b58350,
    name: "settings-socialMedia"
  }, {
    path: "/settings/terms",
    component: _48a4f3b0,
    name: "settings-terms"
  }, {
    path: "/skills/form",
    component: _62657034,
    name: "skills-form"
  }, {
    path: "/slider/form",
    component: _002bba75,
    name: "slider-form"
  }, {
    path: "/users/admins",
    component: _14ce5f8a,
    name: "users-admins"
  }, {
    path: "/users/roles",
    component: _d1ddba08,
    name: "users-roles"
  }, {
    path: "/users/users",
    component: _0a8ac087,
    name: "users-users"
  }, {
    path: "/webinars/form",
    component: _45cefd66,
    name: "webinars-form"
  }, {
    path: "/ar/advisor/approved",
    component: _c81c8a1a,
    name: "advisor-approved___ar"
  }, {
    path: "/ar/advisor/pending",
    component: _15238f0b,
    name: "advisor-pending___ar"
  }, {
    path: "/ar/advisor/rejected",
    component: _2f5d2d3a,
    name: "advisor-rejected___ar"
  }, {
    path: "/ar/answers/form",
    component: _3234676b,
    name: "answers-form___ar"
  }, {
    path: "/ar/auth/login",
    component: _0fa6a662,
    name: "auth-login___ar"
  }, {
    path: "/ar/blocks/categories",
    component: _5a5ace4b,
    name: "blocks-categories___ar"
  }, {
    path: "/ar/blocks/reasons",
    component: _57fc5376,
    name: "blocks-reasons___ar"
  }, {
    path: "/ar/categories/form",
    component: _50c6d21a,
    name: "categories-form___ar"
  }, {
    path: "/ar/disputes/reasons",
    component: _2101909f,
    name: "disputes-reasons___ar"
  }, {
    path: "/ar/expertises/form",
    component: _fab1ab18,
    name: "expertises-form___ar"
  }, {
    path: "/ar/faqs/form",
    component: _5179ad79,
    name: "faqs-form___ar"
  }, {
    path: "/ar/sessions/approved",
    component: _43c22d28,
    name: "sessions-approved___ar"
  }, {
    path: "/ar/sessions/pending",
    component: _27ca2d72,
    name: "sessions-pending___ar"
  }, {
    path: "/ar/sessions/rejected",
    component: _718a5bb3,
    name: "sessions-rejected___ar"
  }, {
    path: "/ar/settings/advisor",
    component: _757cccbe,
    name: "settings-advisor___ar"
  }, {
    path: "/ar/settings/general",
    component: _afbf226e,
    name: "settings-general___ar"
  }, {
    path: "/ar/settings/notifications",
    component: _7755a009,
    name: "settings-notifications___ar"
  }, {
    path: "/ar/settings/payout",
    component: _80384e56,
    name: "settings-payout___ar"
  }, {
    path: "/ar/settings/privacy",
    component: _654b8d2e,
    name: "settings-privacy___ar"
  }, {
    path: "/ar/settings/socialMedia",
    component: _74b58350,
    name: "settings-socialMedia___ar"
  }, {
    path: "/ar/settings/terms",
    component: _48a4f3b0,
    name: "settings-terms___ar"
  }, {
    path: "/ar/skills/form",
    component: _62657034,
    name: "skills-form___ar"
  }, {
    path: "/ar/slider/form",
    component: _002bba75,
    name: "slider-form___ar"
  }, {
    path: "/ar/users/admins",
    component: _14ce5f8a,
    name: "users-admins___ar"
  }, {
    path: "/ar/users/roles",
    component: _d1ddba08,
    name: "users-roles___ar"
  }, {
    path: "/ar/users/users",
    component: _0a8ac087,
    name: "users-users___ar"
  }, {
    path: "/ar/webinars/form",
    component: _45cefd66,
    name: "webinars-form___ar"
  }, {
    path: "/blocks/categories/form",
    component: _7337915b,
    name: "blocks-categories-form"
  }, {
    path: "/blocks/reasons/form",
    component: _100b3ad0,
    name: "blocks-reasons-form"
  }, {
    path: "/disputes/reasons/form",
    component: _0e453487,
    name: "disputes-reasons-form"
  }, {
    path: "/en/advisor/approved",
    component: _c81c8a1a,
    name: "advisor-approved___en"
  }, {
    path: "/en/advisor/pending",
    component: _15238f0b,
    name: "advisor-pending___en"
  }, {
    path: "/en/advisor/rejected",
    component: _2f5d2d3a,
    name: "advisor-rejected___en"
  }, {
    path: "/en/answers/form",
    component: _3234676b,
    name: "answers-form___en"
  }, {
    path: "/en/auth/login",
    component: _0fa6a662,
    name: "auth-login___en"
  }, {
    path: "/en/blocks/categories",
    component: _5a5ace4b,
    name: "blocks-categories___en"
  }, {
    path: "/en/blocks/reasons",
    component: _57fc5376,
    name: "blocks-reasons___en"
  }, {
    path: "/en/categories/form",
    component: _50c6d21a,
    name: "categories-form___en"
  }, {
    path: "/en/disputes/reasons",
    component: _2101909f,
    name: "disputes-reasons___en"
  }, {
    path: "/en/expertises/form",
    component: _fab1ab18,
    name: "expertises-form___en"
  }, {
    path: "/en/faqs/form",
    component: _5179ad79,
    name: "faqs-form___en"
  }, {
    path: "/en/sessions/approved",
    component: _43c22d28,
    name: "sessions-approved___en"
  }, {
    path: "/en/sessions/pending",
    component: _27ca2d72,
    name: "sessions-pending___en"
  }, {
    path: "/en/sessions/rejected",
    component: _718a5bb3,
    name: "sessions-rejected___en"
  }, {
    path: "/en/settings/advisor",
    component: _757cccbe,
    name: "settings-advisor___en"
  }, {
    path: "/en/settings/general",
    component: _afbf226e,
    name: "settings-general___en"
  }, {
    path: "/en/settings/notifications",
    component: _7755a009,
    name: "settings-notifications___en"
  }, {
    path: "/en/settings/payout",
    component: _80384e56,
    name: "settings-payout___en"
  }, {
    path: "/en/settings/privacy",
    component: _654b8d2e,
    name: "settings-privacy___en"
  }, {
    path: "/en/settings/socialMedia",
    component: _74b58350,
    name: "settings-socialMedia___en"
  }, {
    path: "/en/settings/terms",
    component: _48a4f3b0,
    name: "settings-terms___en"
  }, {
    path: "/en/skills/form",
    component: _62657034,
    name: "skills-form___en"
  }, {
    path: "/en/slider/form",
    component: _002bba75,
    name: "slider-form___en"
  }, {
    path: "/en/users/admins",
    component: _14ce5f8a,
    name: "users-admins___en"
  }, {
    path: "/en/users/roles",
    component: _d1ddba08,
    name: "users-roles___en"
  }, {
    path: "/en/users/users",
    component: _0a8ac087,
    name: "users-users___en"
  }, {
    path: "/en/webinars/form",
    component: _45cefd66,
    name: "webinars-form___en"
  }, {
    path: "/users/admins/form",
    component: _7839916b,
    name: "users-admins-form"
  }, {
    path: "/users/roles/form",
    component: _a2093aec,
    name: "users-roles-form"
  }, {
    path: "/users/users/form",
    component: _6862679f,
    name: "users-users-form"
  }, {
    path: "/ar/blocks/categories/form",
    component: _7337915b,
    name: "blocks-categories-form___ar"
  }, {
    path: "/ar/blocks/reasons/form",
    component: _100b3ad0,
    name: "blocks-reasons-form___ar"
  }, {
    path: "/ar/disputes/reasons/form",
    component: _0e453487,
    name: "disputes-reasons-form___ar"
  }, {
    path: "/ar/users/admins/form",
    component: _7839916b,
    name: "users-admins-form___ar"
  }, {
    path: "/ar/users/roles/form",
    component: _a2093aec,
    name: "users-roles-form___ar"
  }, {
    path: "/ar/users/users/form",
    component: _6862679f,
    name: "users-users-form___ar"
  }, {
    path: "/en/blocks/categories/form",
    component: _7337915b,
    name: "blocks-categories-form___en"
  }, {
    path: "/en/blocks/reasons/form",
    component: _100b3ad0,
    name: "blocks-reasons-form___en"
  }, {
    path: "/en/disputes/reasons/form",
    component: _0e453487,
    name: "disputes-reasons-form___en"
  }, {
    path: "/en/users/admins/form",
    component: _7839916b,
    name: "users-admins-form___en"
  }, {
    path: "/en/users/roles/form",
    component: _a2093aec,
    name: "users-roles-form___en"
  }, {
    path: "/en/users/users/form",
    component: _6862679f,
    name: "users-users-form___en"
  }, {
    path: "/",
    component: _7abeb356,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
