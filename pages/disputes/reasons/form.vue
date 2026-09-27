<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/disputes/reasons">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        {{ $route.query.id ? $t('roles.edit') : $t('roles.add') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12">
            <label>{{ $t('disputes.reason_ar') }}</label>
            <v-text-field
              v-model="form.reason.ar"
              outlined
              dense
              :label="$t('disputes.reason_ar')"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>{{ $t('disputes.reason_en') }}</label>
            <v-text-field
              v-model="form.reason.en"
              outlined
              dense
              :label="$t('disputes.reason_en')"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-auto" color="success" :loading="submitting" @click="submitForm">
          {{ $route.query.id ? $t('roles.edit') : $t('roles.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      form: {
        reason: {
          ar: '',
          en: '',
        },
      },
      submitting: false,
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
  },
  methods: {
    setReasonFromPayload(payload) {
      this.form.reason.ar = payload?.reason?.ar || payload?.reason_ar || ''
      this.form.reason.en = payload?.reason?.en || payload?.reason_en || ''
    },
    async getItem(id) {
      try {
        const data = await this.$axios.$get(`/dashboard/disputes/reasons/show/${id}`)
        if (data.statusCode === 200) {
          this.setReasonFromPayload(data.data || {})
        } else {
          this.$toast.error(data.message || this.$t('disputes.load_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('disputes.load_failed'), { icon: 'mdi-alert-circle' })
      }
    },
    submitForm() {
      if (this.$route.query.id) {
        this.editForm(this.$route.query.id)
      } else {
        this.addForm()
      }
    },
    async editForm(id) {
      this.submitting = true
      try {
        const payload = {
          id: Number(id),
          reason: {
            ar: this.form.reason.ar,
            en: this.form.reason.en,
          },
        }
        const data = await this.$axios.$put('/dashboard/disputes/reasons/update', payload)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItem(id)
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('disputes.save_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.submitting = false
      }
    },
    async addForm() {
      this.submitting = true
      try {
        const payload = {
          reason: {
            ar: this.form.reason.ar,
            en: this.form.reason.en,
          },
        }
        const data = await this.$axios.$post('/dashboard/disputes/reasons/store', payload)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.form = {
            reason: {
              ar: '',
              en: '',
            },
          }
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('disputes.save_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>
