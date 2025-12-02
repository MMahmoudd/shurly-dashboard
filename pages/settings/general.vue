<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{$t('settings.generalSettings')}}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.businessName')}}
                </label>
                <v-text-field
                  v-model="settings.business_name"
                  outlined
                  dense
                  :placeholder="$t('settings.businessName')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.phone')}}
                </label>
                <v-text-field
                  v-model="settings.phone"
                  outlined
                  dense
                  :placeholder="$t('settings.phone')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.whatsapp')}}
                </label>
                <v-text-field
                  v-model="settings.whatsapp"
                  outlined
                  dense
                  :placeholder="$t('settings.whatsapp')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.email')}}
                </label>
                <v-text-field
                  v-model="settings.email_address"
                  outlined
                  dense
                  :placeholder="$t('settings.email')"
                  type="email"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.country')}}
                </label>
                <v-text-field
                  v-model="settings.country"
                  outlined
                  dense
                  :placeholder="$t('settings.country')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.state')}}
                </label>
                <v-text-field
                  v-model="settings.state"
                  outlined
                  dense
                  :placeholder="$t('settings.state')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.city')}}
                </label>
                <v-text-field
                  v-model="settings.city"
                  outlined
                  dense
                  :placeholder="$t('settings.city')"
                  >
                </v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.logo')}}
                </label>
                <v-file-input
                outlined
                dense
                :label="$t('settings.logo')"
                @change="uploadLogo"
                >
            </v-file-input>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  {{$t('settings.icon')}}
                </label>
                <v-file-input
                outlined
                dense
                :label="$t('settings.icon')"
                @change="uploadIcon"
                >
            </v-file-input>
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
        business_name: "",
        phone: "",
        whatsapp: "",
        email_address: "",
        country: "",
        state: "",
        city: "",
        icon: null,
        logo: null
      }
    }
  },
  created () {
    this.getAllSettings()
  },
  methods: {
    uploadLogo (event) {
      this.settings.logo = event
    },
    uploadIcon (event) {
      this.settings.icon = event
    },
    async getAllSettings() {
      const data = await this.$axios.$get("/dashboard/settings/general");
      data.data.forEach((item) => {
        Object.keys(this.settings).forEach((key) => {
          if(item.key === key && item.key === 'business_name') {
              this.settings.business_name = item.value
          }
          if(item.key === key && item.key === 'phone') {
                this.settings.phone = item.value
          }
          if(item.key === key && item.key === 'whatsapp') {
                this.settings.whatsapp = item.value
          }
          if(item.key === key && item.key === 'email_address') {
                this.settings.email_address = item.value
          }
          if(item.key === key && item.key === 'country') {
                this.settings.country = item.value
          }
          if(item.key === key && item.key === 'state') {
                this.settings.state = item.value
          }
          if(item.key === key && item.key === 'city') {
                this.settings.city = item.value
          }
          if(item.key === key && item.key === 'icon') {
                this.settings.icon = item.value
          }
          if(item.key === key && item.key === 'logo') {
                this.settings.logo = item.value
          }
        })
      });
    },
    async submitFrom() {
      const formData = new FormData()
      formData.append("business_name", this.settings.business_name);
      formData.append("phone", this.settings.phone);
      formData.append("whatsapp", this.settings.whatsapp);
      formData.append("email_address", this.settings.email_address);
      formData.append("country", this.settings.country);
      formData.append("state", this.settings.state);
      formData.append("city", this.settings.city);
      formData.append("icon", this.settings.icon);
      formData.append("logo", this.settings.logo);
      const data = await this.$axios.$post("/dashboard/settings/general", formData);
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
