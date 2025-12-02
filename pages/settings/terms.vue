<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <!-- {{$t('settings.generalSettings')}} -->
            اعدادات الشروط والأحكام
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <label>
                  تعليمات الشروط والأحكام بالعربي
                </label>
                <!-- :editor-toolbar="toolbarEditor" -->
                <VueEditor v-model="settings.terms_ar" placeholder="تعليمات الشروط والأحكام بالعربي" />
              </v-col>
              <v-col cols="12">
                <label>
                  تعليمات الشروط والأحكام بالانجليزي
                </label>
                <VueEditor v-model="settings.terms_en" placeholder="تعليمات الشروط والأحكام بالانجليزي" />
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
        terms_ar: "",
        terms_en: "",
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
      const data = await this.$axios.$get("/dashboard/settings/terms");
      this.settings = data.data
    },
    async submitFrom() {
      const formData = new FormData()
      formData.append("terms_ar", this.settings.terms_ar);
      formData.append("terms_en", this.settings.terms_en);
      const data = await this.$axios.$post("/dashboard/settings/terms/update", formData);
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
