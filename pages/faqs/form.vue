<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/faqs">
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        {{$route.query.id ? $t('roles.edit') : $t('roles.add') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.name_ar')}}
            </label>
            <v-text-field v-model="form.question_ar" outlined dense>

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.name_en')}}
            </label>
            <v-text-field v-model="form.question_en" outlined dense>

            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-auto" color="success" @click="submitFrom()">
          {{$route.query.id ? $t('roles.edit') : $t('roles.add') }}
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
        question_ar: "",
        question_en: "",
      },
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
  },
  methods: {
      uploadImage(event) {
        this.form.image = event
      },
      submitFrom() {
      if (this.$route.query.id) {
        this.editFrom(this.$route.query.id)
      } else {
        this.addForm()
      }
    },
    async getItem(id) {
      const data = await this.$axios.$get(`/dashboard/faq/show/${id}`);
      this.form = data.data
      if (this.form.status === 'active') {
        this.form.status = true
      } else {
        this.form.status = false
      }
    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", id);
      formData.append("question[ar]", this.form.question_ar);
      formData.append("question[en]", this.form.question_en);
      const data = await this.$axios.$post(`/dashboard/faq/update?_method=PUT`, formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const formData = new FormData()
      formData.append("question[ar]", this.form.question_ar);
      formData.append("question[en]", this.form.question_en);
      const data = await this.$axios.$post("/dashboard/faq/store", formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.form = {
          question_ar: "",
          question_en: "",
        }
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
