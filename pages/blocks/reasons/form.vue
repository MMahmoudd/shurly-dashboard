<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/blocks/reasons">
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
            <v-text-field v-model="form.name_ar" outlined dense>

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('skills.name_en')}}
            </label>
            <v-text-field v-model="form.name_en" outlined dense>

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              <!-- {{$t('skills.categories')}} -->
              الفئة
            </label>
            <v-select
              v-model="form.block_reason_category_id"
              :items="block_reason_category"
              item-text="name"
              item-value="id"
              outlined
              label="الفئة"
              dense
            ></v-select>
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
        block_reason_category_id: ""
      },
      block_reason_category: []
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
    this.getItems()
  },
  methods: {
      async getItems() {
        const data = await this.$axios.$get("/dashboard/blocks/categories");
        if(data.statusCode === 200) {
          this.block_reason_category = data.data.data
        }
      },
      submitFrom() {
      if (this.$route.query.id) {
        this.editFrom(this.$route.query.id)
      } else {
        this.addForm()
      }
    },
    async getItem(id) {
      const data = await this.$axios.$get(`/dashboard/blocks/reasons/show/${id}`);
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
      formData.append("name[ar]", this.form.name_ar);
      formData.append("name[en]", this.form.name_en);
      formData.append("block_reason_category_id", this.form.block_reason_category_id);
      const data = await this.$axios.$post(`/dashboard/blocks/reasons/update?_method=PUT`, formData);
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
      formData.append("block_reason_category_id", this.form.block_reason_category_id);

      const data = await this.$axios.$post("/dashboard/blocks/reasons/store", formData);
      if (data.statusCode === 201) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.form = {
          name_ar: "",
          name_en: "",
          image: null,
          status: true,
        }
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
