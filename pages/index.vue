<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo d-flex justify-center">
        <img class="w-100" src="../assets/images/Screenshot.svg"/>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          اهلا بكم في لوحة تحكم شورلى
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/users/roles"
          >
            استمرار
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['authenticated'],
}
</script>
