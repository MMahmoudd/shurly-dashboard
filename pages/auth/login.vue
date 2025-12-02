<template>
  <div class="login-page">
    <v-row justify="center" align="center" class="ma-auto">
      <v-col cols="12">
        <v-card>
          <img class="login-image d-flex justify-center" src="../../assets/images/Screenshot.svg" />
          <v-card-title class="headline text-center justify-center">
          {{ $t('login.login') }}
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="$t('login.email')"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :label="$t('login.password')"
                required
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="ma-auto text-center">
            <!-- <v-spacer /> -->
            <v-btn
            class="ma-auto text-center"
              color="#26bdbe"
              nuxt
              @click="login()"
            >
            {{ $t('login.login') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
export default {
  layout: 'auth',
  name: 'LoginPage',
  middleware: 'unauthenticated',
    data: (vm) => ({
      valid: true,
      email: '',
      password: '',
      emailRules: [
        v => !!v || vm.$t('login.emailRequired'),
        v => /.+@.+\..+/.test(v) || vm.$t('login.validEmail'),
      ],
      passwordRules: [
        v => !!v || vm.$t('login.passwordRequired'),
      ],
    }),

    methods: {
      async login () {
        if (this.$refs.form.validate()) {
          const loginData = {
            email: this.email,
            password: this.password
          }
          const response = await this.$axios.$post(`/dashboard/auth/login`, loginData)
          if(response.statusCode === 200){
            this.$cookies.set('token', response.data.token)
            this.$cookies.set('userInfo', response.data.user)
            this.$router.push('/')
          } else {
            this.$toast.error(response.message, { icon: 'mdi-alert-circle' })
          }
        }
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>
<style lang="scss">
  .login-page{
    width: 40%;
    margin: 15% auto 0 auto;
    .login-image{
      width: 200px;
      margin: auto;
    }
    .v-card{
      background-color: #0c132f;
      color: #fff;
      *{
        color: #fff !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .login-page{
      width: 80%;
    }
  }
</style>