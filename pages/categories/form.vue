<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/categories">
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
              {{$t('categories.description_ar')}}
            </label>
            <v-textarea v-model="form.description_ar" outlined dense :label="$t('categories.description_ar')">

            </v-textarea>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.description_en')}}
            </label>
            <v-textarea v-model="form.description_en" outlined dense :label="$t('categories.description_en')">

            </v-textarea>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.meta_title_ar')}}
            </label>
            <v-text-field
              v-model="form.meta_title_ar"
              outlined
              dense
              :label="$t('categories.meta_title_ar')"
              >

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.meta_title_en')}}
            </label>
            <v-text-field
              v-model="form.meta_title_en"
              outlined
              dense
              :label="$t('categories.meta_title_en')"
              >

            </v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.meta_description_ar')}}
            </label>
            <v-textarea
              v-model="form.meta_description_ar"
              outlined
              dense
              :label="$t('categories.meta_description_ar')"
              >

            </v-textarea>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.meta_description_en')}}
            </label>
            <v-textarea
              v-model="form.meta_description_en"
              outlined
              dense
              :label="$t('categories.meta_description_en')"
              >

            </v-textarea>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.permalink')}}
            </label>
            <v-text-field
              v-model="form.permalink"
              outlined
              dense
              :label="$t('categories.permalink')"
              >

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
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.parent')}}
            </label>
            <v-select
              v-model="form.parent_id"
              :items="list"
              outlined
              dense
              item-text="name"
              item-value="id"
              :label="$t('categories.parent')"
              >

            </v-select>
          </v-col>
          <v-col md="6" cols="12">
            <label>
              {{$t('categories.is_featured')}}
            </label>
            <v-radio-group
              v-model="form.is_featured"
              row
            >
              <v-radio
                :label="$t('categories.yes')"
                :value="0"
              ></v-radio>
              <v-radio
                :label="$t('categories.no')"
                :value="1"
              ></v-radio>
            </v-radio-group>
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
        description_ar: "",
        description_en: "",
        meta_title_ar: "",
        meta_title_en: "",
        meta_description_ar: "",
        meta_description_en: "",
        is_featured: 0,
        status: "",
        permalink: "",
        parent_id: ""
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
        const data = await this.$axios.$get("/dashboard/categories");
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
      const data = await this.$axios.$get(`/dashboard/categories/show/${id}`);
      this.form = data.data

    },
    async editFrom(id) {
      const formData = new FormData()
      formData.append("id", this.form.id);
      formData.append("name[ar]", this.form.name_ar);
      formData.append("name[en]", this.form.name_en);
      formData.append("permalink", this.form.permalink);
      formData.append("status", this.form.status);
      formData.append("is_featured", this.form.is_featured);
      formData.append("parent_id", this.form.parent_id);
      formData.append("description[ar]", this.form.description_ar);
      formData.append("description[en]", this.form.description_en);
      formData.append("meta_title[ar]", this.form.meta_title_ar);
      formData.append("meta_title[en]", this.form.meta_title_en);
      formData.append("meta_description[ar]", this.form.meta_description_ar);
      formData.append("meta_description[en]", this.form.meta_description_en);

      const data = await this.$axios.$post(`/dashboard/categories/update?_method=PUT`, formData);
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
      formData.append("permalink", this.form.permalink);
      formData.append("status", this.form.status);
      formData.append("is_featured", this.form.is_featured);
      formData.append("parent_id", this.form.parent_id);
      formData.append("description[ar]", this.form.description_ar);
      formData.append("description[en]", this.form.description_en);
      formData.append("meta_title[ar]", this.form.meta_title_ar);
      formData.append("meta_title[en]", this.form.meta_title_en);
      formData.append("meta_description[ar]", this.form.meta_description_ar);
      formData.append("meta_description[en]", this.form.meta_description_en);
      const data = await this.$axios.$post("/dashboard/categories/store", formData);
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
