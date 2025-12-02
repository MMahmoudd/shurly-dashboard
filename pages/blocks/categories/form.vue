<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/blocks/categories">
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
              {{$t('categories.name_ar')}}
            </label>
            <v-text-field v-model="form.name_ar" outlined dense :label="$t('categories.name_ar')">

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.name_en')}}
            </label>
            <v-text-field v-model="form.name_en" outlined dense :label="$t('categories.name_en')">

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.status')}}
            </label>
            <v-select
              v-model="form.status"
              :items="status"
              outlined
              dense
              :label="$t('categories.status')"
              >

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
        name_ar: "",
        name_en: "",
        status: "",
      },
      status: [
        'inactive',
        'active'
      ],
      list: []
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
    this.getList()
  },
  methods: {
    async getList() {
        const data = await this.$axios.$get("/dashboard/blocks/categories");
        if(data.statusCode === 200) {
        console.log('data :>> ', data);
          this.list = data.data.data
        }
      },
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
      const data = await this.$axios.$get(`/dashboard/blocks/categories/show/${id}`);
      this.form = data.data

    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", this.form.id);
      formData.append("name[ar]", this.form.name_ar);
      formData.append("name[en]", this.form.name_en);
      formData.append("status", this.form.status);

      const data = await this.$axios.$post(`/dashboard/blocks/categories/update?_method=PUT`, formData);
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
      formData.append("status", this.form.status);
      const data = await this.$axios.$post("/dashboard/blocks/categories/store", formData);
      console.log('data :>> ', data);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.form = {
          name: "",
          permissions: []
        }
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
