<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/users/roles">
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        {{$route.query.id ? $t('roles.edit') : $t('roles.add') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.name" outlined dense :label="$t('roles.name')">

            </v-text-field>
          </v-col>
          <v-col cols="2" v-for="item in permissions" :key="item.id">
            <v-checkbox
              v-model="form.permissions"
              :label="item.name"
              :value="item.id"
              dense
              class="my-0"
              >
            </v-checkbox>
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
        permissions: []
      },
      permissions: []
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
    this.getPermissions()
  },
  methods: {
    async getItem(id) {
      const data = await this.$axios.$get(`/dashboard/roles/show/${id}`);
      console.log('data :>> ', data);
      this.form.name = data.data.name
      data.data.permissions.forEach(item => (
        // console.log('item :>> ', item)
        this.form.permissions.push(item.id)
      ))
    },
    async getPermissions() {
      const data = await this.$axios.$get("/dashboard/roles/permissions");
      // console.log('data :>> ', data);
      this.permissions = data.data
    },
    submitFrom() {
      if (this.$route.query.id) {
        this.editFrom(this.$route.query.id)
      } else {
        this.addForm()
      }
    },
    async editFrom(id) {
      const data = await this.$axios.$post(`/dashboard/roles/update/${id}?_method=PUT`, this.form);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const data = await this.$axios.$post("/dashboard/roles/store", this.form);
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
