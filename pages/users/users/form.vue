<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/users/users">
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        {{$route.query.id ? $t('roles.edit') : $t('roles.add') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="4" cols="12">
            <label>
              {{$t('roles.f_name')}}
            </label>
            <v-text-field v-model="form.name" outlined dense :label="$t('roles.name')">

            </v-text-field>
          </v-col>
          <!-- <v-col md="4" cols="12">
            <label>
              {{$t('roles.l_name')}}
            </label>
            <v-text-field v-model="form.l_name" outlined dense :label="$t('roles.l_name')">

            </v-text-field>
          </v-col> -->
          <v-col md="4" cols="12">
            <label>
              {{$t('admins.email')}}
            </label>
            <v-text-field v-model="form.email" outlined dense :label="$t('admins.email')">

            </v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <label>
              {{$t('admins.phone')}}
            </label>
            <v-text-field v-model="form.phone" outlined dense :label="$t('admins.phone')">

            </v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <label>
              {{$t('admins.password')}}
            </label>
            <v-text-field
              v-model="form.password"
              outlined
              dense
              type="password"
              :label="$t('admins.password')"
              >

            </v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <label>
              {{$t('admins.confirmPass')}}
            </label>
            <v-text-field
              v-model="form.password_confirmation"
              outlined
              dense
              type="password"
              :label="$t('admins.confirmPass')"
              >

            </v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <label>
              {{$t('admins.image')}}
            </label>
            <v-file-input
              v-model="form.image"
              outlined
              dense
              :label="$t('admins.image')"
              @change="uploadImage"
              >
          </v-file-input>
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
        email: "",
        phone: "",
        image: null,
        password: "",
        password_confirmation: "",
      },
      roles: []
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
    this.getRoles()
  },
  methods: {
    async getRoles() {
        const data = await this.$axios.$get("/dashboard/roles");
        if(data.statusCode === 200) {
          this.roles = data.data
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
      const data = await this.$axios.$get(`/dashboard/users/show/${id}`);
      // console.log('data :>> ', data);
      this.form = data.data
    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("name", this.form.name);
      // formData.append("l_name", this.form.l_name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      formData.append("image", this.form.image);
      formData.append("password", this.form.password);
      formData.append("password_confirmation", this.form.password_confirmation);
      const data = await this.$axios.$post(`/dashboard/users/update/${id}?_method=PUT`, formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const formData = new FormData()
      formData.append("name", this.form.name);
      // formData.append("l_name", this.form.l_name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      formData.append("image", this.form.image);
      formData.append("password", this.form.password);
      formData.append("password_confirmation", this.form.password_confirmation);
      const data = await this.$axios.$post("/dashboard/users/store", formData);
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
