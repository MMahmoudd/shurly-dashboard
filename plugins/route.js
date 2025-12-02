export default ({ app, store, route, redirect}) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    // console.log('to :>> ', to);
    // console.log('app.$cookies.ge :>> ', app.$cookies.get('filter'));
    // if(to.path.includes('units') === false) {
    //   // console.log('check if path is not units')
    //   if (app.$cookies.get('filter')) {
    //     // console.log('remove filter')
    //     app.$cookies.remove('filter')
    //   }
    // }
  })
}
