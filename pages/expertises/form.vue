<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/expertises">
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
            <v-text-field v-model="form.name_ar" outlined dense :label="$t('skills.name_ar')">
            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.name_en')}}
            </label>
            <v-text-field v-model="form.name_en" outlined dense :label="$t('skills.name_en')">
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
        id: null,
        name_ar: "",
        name_en: "",
      },
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
  },
  methods: {
    submitFrom() {
      if (this.$route.query.id) {
        this.editFrom(this.$route.query.id)
      } else {
        this.addForm()
      }
    },
    async getItem(id) {
      const data = await this.$axios.$get(`/dashboard/area-expertises/show/${id}`);
      const item = data.data || {}
      this.form = {
        id: item.id ?? id,
        name_ar: item.name_ar || '',
        name_en: item.name_en || '',
      }
    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", this.form.id || id);
      formData.append("name[ar]", this.form.name_ar);
      formData.append("name[en]", this.form.name_en);

      const data = await this.$axios.$post(`/dashboard/area-expertises/update?_method=PUT`, formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const formData = new FormData()
      formData.append("name[ar]", this.form.name_ar);
      formData.append("name[en]", this.form.name_en);
      const data = await this.$axios.$post("/dashboard/area-expertises/store", formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.form = {
          id: null,
          name_ar: "",
          name_en: "",
        }
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
