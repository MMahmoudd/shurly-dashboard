export default ({ app, store, route, redirect}) => {
  // Every time the route changes (fired on initialization too)
  // console.log('app', app)
  // console.log('app.router :>> ', app.router);
  // app.router.afterEach((to, from) => {
    // console.log('to', to)
    // console.log('route', route)
    // // console.log('from', from)
    // console.log('i18n', app.i18n)
    // console.log('app', app.$cookies.get('i18n_redirected'))
    const lang = app.i18n.localeProperties.code
    // const path = to.path
    // console.log('to.path', to.path)
    // console.log('lang', app.i18n.localeProperties.code)
    // console.log('route.path.includes(lang)', route.path.includes(lang))
    // console.log('route.path', route.path)
    if(!route.path.includes(lang)) {
      // console.log('lang+path', '/' + lang + path)
      // const nextRoute = route.path.replaceAll('/' + lang + path)
      const { path, query, hash } = route;
      const nextPath = path.replace(path, '/' + lang + path);
      const nextRoute = { path: nextPath, query, hash };
      // console.log('nextRoute',  nextRoute)
      redirect(nextRoute)
           // app.router.go(lang + to.path)
      // app.i18n.setLocale(lang()
      // console.log('app.i18n.localeProperties.code', app.i18n.localeProperties.code)
      // console.log('i18n', app.i18n)
    }
    // if (app.$auth.loggedIn && from.path.includes('login')) {
      //  console.log('to', to)
      //  console.log('from', from)
      //  console.log('app.router :>> ', app);
      //  app.router.go('/')
        // store.dispatch('setBaseRoute', from)
    // }
  // })
}
