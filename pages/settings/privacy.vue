<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <!-- {{$t('settings.generalSettings')}} -->
            اعدادات الخصوصية
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <label>
                  تعليمات الخصوصية بالعربي
                </label>
                <!-- :editor-toolbar="toolbarEditor" -->
                <VueEditor v-model="settings.privacy_policy_ar" placeholder="تعليمات الخصوصية بالعربي" />
              </v-col>
              <v-col cols="12">
                <label>
                  تعليمات الخصوصية بالانجليزي
                </label>
                <VueEditor v-model="settings.privacy_policy_en" placeholder="تعليمات الخصوصية بالانجليزي" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-auto" color="success" @click="submitFrom()">
              {{ $t('roles.edit') }}
            </v-btn>
          </v-card-actions>
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
      settings: {
        privacy_policy_ar: "",
        privacy_policy_en: "",
      },
      toolbarEditor: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: "left" }, { align: "center" }, { align: "right"}, { align: "justify"}],
            [{ color: "color-picker" }],
            ["code-block"],
        ],
    }
  },
  created () {
    this.getAllSettings()
  },
  methods: {
    async getAllSettings() {
      const data = await this.$axios.$get("/dashboard/settings/privacy");
      this.settings = data.data
    },
    async submitFrom() {
      const formData = new FormData()
      formData.append("privacy_policy_ar", this.settings.privacy_policy_ar);
      formData.append("privacy_policy_en", this.settings.privacy_policy_en);
      const data = await this.$axios.$post("/dashboard/settings/privacy/update", formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getAllSettings()
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
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
