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
            <v-text-field v-model="form.answer_ar" outlined dense>

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.name_en')}}
            </label>
            <v-text-field v-model="form.answer_en" outlined dense>
            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.question')}}
            </label>
            <v-select
              :items="faqsList"
              item-text="question"
              item-value="id"
              v-model="form.question"
              outlined
              dense>
            </v-select>
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
        answer_ar: "",
        answer_en: "",
        faq_id: ''
      },
      faqsList: []
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
    this.getListOfFaqs()
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
      const data = await this.$axios.$get(`/dashboard/faq/answers/show/${id}`);
      this.form = data.data
      this.form.faq_id = data.data.question.id
    },
    async getListOfFaqs() {
      const data = await this.$axios.$get(`/dashboard/faq`);
      this.faqsList = data.data.data
    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", id);
      formData.append("answer[ar]", this.form.answer_ar);
      formData.append("answer[en]", this.form.answer_en);
      formData.append("faq_id", this.form.faq_id);

      const data = await this.$axios.$post(`/dashboard/faq/answers/update?_method=PUT`, formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const formData = new FormData()
      formData.append("answer[ar]", this.form.answer_ar);
      formData.append("answer[en]", this.form.answer_en);
      formData.append("faq_id", this.form.faq_id);
      const data = await this.$axios.$post("/dashboard/faq/answers/store", formData);
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
