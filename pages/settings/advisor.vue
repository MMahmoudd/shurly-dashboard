<template>
    <div class="settings-page">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <!-- {{$t('settings.advisors')}} -->
              إضافة علامه مستشار خبير

            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col md="4" cols="12">
                  <label>تمكين الخبير التلقائي
                  </label>
                  <!-- <v-text-field
                    v-model="settings.advisor_auto_expert_enabled"
                    outlined
                    dense
                    :placeholder="$t('settings.key')"
                    >
                  </v-text-field> -->
                      <v-switch
                        v-model="settings.advisor_auto_expert_enabled"
                        
                      ></v-switch>
                      <!-- :label="$t('settings.key')" -->
                </v-col>
                <v-col md="4" cols="12">
                  <label>عتبة الخبير المستشار
                  </label>
                  <v-text-field
                    v-model="settings.advisor_expert_threshold"
                    outlined
                    dense
                    :placeholder="$t('settings.key')"
                    >
                  </v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <label>نوع الخبير المستشار
                  </label>
                  <v-select
                    :items="items"
                    v-model="settings.advisor_expert_type"
                    outlined
                    dense
                    placeholder="نوع الخبير المستشار"
                    >
                  </v-select>
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
        settings: {},
        items: ['sessions', 'hours']
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
        const data = await this.$axios.$get("/dashboard/settings/advisor-settings");
        console.log('data :>> ', data);
        if(data.data.advisor_auto_expert_enabled == '1') {
          data.data.advisor_auto_expert_enabled = true
        } else {
          data.data.advisor_auto_expert_enabled = false
        }
        this.settings = data.data
      },
      async submitFrom() {
        // const formData = new FormData()
          // this.settings.forEach((item) => {
          //   formData.append(item.key, item.value);
          // })
        const data = await this.$axios.$post("/dashboard/settings/advisor-settings", this.settings);
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
  