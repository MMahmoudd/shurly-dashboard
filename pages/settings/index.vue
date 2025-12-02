<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            شائع
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="4">
                <nuxt-link to="/settings/general" class="link">
                  <h2>
                    <v-icon>
                    mdi-cog
                  </v-icon>
                  عام
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعداداتك العامة وتنشيط الترخيص</p>
              </v-col>
              <v-col md="4">
                <nuxt-link to="/settings/socialMedia" class="link">
                  <h2>
                    <v-icon>
                    mdi-folder-key-network
                  </v-icon>
                  تسجيل الدخول الاجتماعي
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات تسجيل الدخول إلى وسائل التواصل الاجتماعي الخاصة بك</p>
              </v-col>
              <v-col md="4">
                <nuxt-link to="/settings/advisor" class="link">
                  <h2>
                    <v-icon>
                    mdi-account-cog
                  </v-icon>
                  طريقة إضافة علامه مستشار خبير
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات طريقة إضافة علامه مستشار خبير</p>
              </v-col>
              <v-col md="4">
                <nuxt-link to="/settings/privacy" class="link">
                  <h2>
                    <v-icon>
                    mdi-vpn
                  </v-icon>
                  الخصوصية
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات الخصوصية الخاصة بك</p>
              </v-col>
                <v-col md="4">
                <nuxt-link to="/settings/terms" class="link">
                  <h2>
                    <v-icon>
                    mdi-file-document-outline
                  </v-icon>
                  الشروط والأحكام
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات الشروط والأحكام الخاصة بك</p>
              </v-col>
              <v-col md="4">
                <nuxt-link to="/settings/payout" class="link">
                  <h2>
                    <v-icon>
                    mdi-currency-usd
                  </v-icon>
                  الدفع
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات الدفع الخاصة بك</p>
              </v-col>
                            <v-col md="4">
                <nuxt-link to="/settings/notifications" class="link">
                  <h2>
                    <v-icon>
                    mdi-bell-outline
                  </v-icon>
                  الاشعارات
                  </h2>
                </nuxt-link>
                <p>عرض وتحديث إعدادات الاشعارات الخاصة بك</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      settings: {}
    }
  },
  created () {
    this.getAllSettings()
  },
  methods: {
    async getAllSettings() {
      const data = await this.$axios.$get("/dashboard/settings/general");
      // console.log('data :>> ', data);
      this.settings = data.data
    }
  }
}
</script>
<style lang="scss">
  .settings-page{
    .link{
      text-decoration: unset;
    }
  }
</style>
