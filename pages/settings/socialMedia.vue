<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{$t('settings.socialMedia')}}
          </v-card-title>
          <v-card-text>
            <v-row v-if="settings.length >= 1">
              <v-col md="4" cols="12" v-for="(item, i) in settings" :key="i">
                <label>
                  {{item.key}}
                </label>
                <v-text-field
                  v-if="!item.key.includes('enable')"
                  v-model="item.value"
                  outlined
                  dense
                  :placeholder="$t('settings.key')"
                  >
                </v-text-field>
                <v-checkbox
                v-else
                v-model="item.value"
                :label="item.value == 0 ? 'Disabled' : 'Enabled'"
                false-value="0"
                true-value="1"
              ></v-checkbox>
              </v-col>
              <!-- <v-col md="4" cols="12">
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
              </v-col> -->
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
      const data = await this.$axios.$get("/dashboard/settings/social-login");
      this.settings = data.data
    },
    async submitFrom() {
      const formData = new FormData()
        this.settings.forEach((item) => {
          // Object.keys(this.settings).forEach((key) => {
          // if(item.key === key && item.key === 'business_name') {
          //     this.settings.business_name = item.value
          // }
          // if(item.key === key && item.key === 'phone') {
          //       this.settings.phone = item.value
          // }
          // if(item.key === key && item.key === 'whatsapp') {
          //       this.settings.whatsapp = item.value
          // }
          // if(item.key === key && item.key === 'email_address') {
          //       this.settings.email_address = item.value
          // }
          // if(item.key === key && item.key === 'country') {
          //       this.settings.country = item.value
          // }
          // if(item.key === key && item.key === 'state') {
          //       this.settings.state = item.value
          // }
          // if(item.key === key && item.key === 'city') {
          //       this.settings.city = item.value
          // }
          // if(item.key === key && item.key === 'icon') {
          //       this.settings.icon = item.value
          // }
          // if(item.key === key && item.key === 'logo') {
          //       this.settings.logo = item.value
          // }
          formData.append(item.key, item.value);
        })
      // });
      // formData.append("business_name", this.settings.business_name);
      // formData.append("phone", this.settings.phone);
      // formData.append("whatsapp", this.settings.whatsapp);
      // formData.append("email_address", this.settings.email_address);
      // formData.append("country", this.settings.country);
      // formData.append("state", this.settings.state);
      // formData.append("city", this.settings.city);
      // formData.append("icon", this.settings.icon);
      // formData.append("logo", this.settings.logo);
      const data = await this.$axios.$post("/dashboard/settings/social-login", formData);
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
