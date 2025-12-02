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
          <v-col md="6" cols="12">
            <label>
              {{$t('slider.permalink')}}
            </label>
            <v-text-field v-model="form.permalink" outlined dense :label="$t('slider.permalink')">

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('slider.link')}}
            </label>
            <v-text-field v-model="form.link" outlined dense :label="$t('slider.link')">

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('slider.order')}}
            </label>
            <v-text-field type="number" v-model="form.order" outlined dense :label="$t('slider.order')">

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
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
          <v-col md="6" cols="12">
            <label>
              {{$t('slider.isActive')}}
            </label>
              <v-switch
              v-model="form.is_active"
              :label="`${form.is_active.toString()}`"
            ></v-switch>
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
        permalink: "",
        link: "",
        image: null,
        is_active: true,
        order: ''
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
      const data = await this.$axios.$get(`/dashboard/sliders/show/${id}`);
      this.form = data.data
    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", id);
      formData.append("permalink", this.form.permalink);
      formData.append("link", this.form.link);
      formData.append("image", this.form.image);
      formData.append("is_active", this.form.is_active ? 1 : 0);
      formData.append("order", this.form.order);
      const data = await this.$axios.$post(`/dashboard/sliders/update?_method=PUT`, formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getItem(this.$route.query.id)
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    },
    async addForm() {
      const formData = new FormData()
      formData.append("permalink", this.form.permalink);
      formData.append("link", this.form.link);
      formData.append("image", this.form.image);
      formData.append("is_active", this.form.is_active ? 1 : 0);
      formData.append("order", this.form.order);
      const data = await this.$axios.$post("/dashboard/sliders/store", formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.form = {
          permalink: "",
        link: "",
        image: null,
        is_active: true,
        order: ''
        }
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
