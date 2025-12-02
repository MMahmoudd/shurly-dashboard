<template>
  <v-app dark>
    <v-main class="auth-layout">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  middleware: 'unauthenticated',
  data () {
    return {
      title: 'Auth'
    }
  }
}
</script>
<style>
.auth-layout{
  background-color: #0c132f;
}
</style>