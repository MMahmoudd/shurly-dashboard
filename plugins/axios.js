
import Vue from 'vue';
import axios from 'axios';
export default function ({ $axios, redirect, $auth, $toast, app, store, $nuxt, $cookies }) {
    $axios.onRequest(config => {
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token')
      }
        // config.headers.app = 'tenant'
        config.headers['Accept-Language'] = app.i18n.locale
        // config.headers.'Content-type': 'application/json'
        //   headers: {
        //     'Content-type': 'application/json'
        // }
    })
  $axios.onResponse(response => {
    return response
  })
    $axios.onError(error => {
      console.log(error.response)
      // $toast.error(err, { icon: 'mdi-alert-circle' })
      if (error.response.status == 401) {
        if ($cookies.get('token')) {
          $cookies.removeAll()
          redirect('/auth/login')
          return error.response
        }
    }
      if (error.response.data.errors) {
        const errors = Object.values(error.response.data.errors)
        errors.forEach(err => {
            $toast.error(err, { icon: 'mdi-alert-circle' })
        })
    }
      return error.response
    })
}
Vue.use(axios);
