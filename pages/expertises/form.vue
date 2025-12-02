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
              {{$t('categories.name')}}
            </label>
            <v-text-field v-model="form.name" outlined dense :label="$t('categories.name')">

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
        name: "",
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
      const data = await this.$axios.$get(`/dashboard/area-expertises/show/${id}`);
      this.form = data.data

    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", this.form.id);
      formData.append("name", this.form.name);

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
      formData.append("name", this.form.name_ar);
      const data = await this.$axios.$post("/dashboard/area-expertises/store", formData);
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
