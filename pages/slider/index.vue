<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{$t('sideMenu.slider')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/slider/form">
          <v-icon>
            mdi-plus
          </v-icon>
          {{$t('roles.add')}}
        </v-btn>
      </v-card-title>
    <v-data-table
    :search="search"
    :headers="headers"
    :items="roles"
    :items-per-page="15"
    class="elevation-1"
  >
  <template v-slot:[`item.image_path`]="{ item }">
    <div class="d-flex align-center ">
      <v-img max-width="50" max-height="50" :src="item.image_path" alt="user image" />
    </div>
  </template>
  <template v-slot:[`item.link`]="{ item }">
    <div class="d-flex align-center ">
      <a :src="item.link" alt="user image" target="_blank"> {{item.link}} </a>
    </div>
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon outlined color="success" :to="`/slider/form?id=${item.id}`">
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="red" @click="confirmdDeleteItem(item)">
      <v-icon>
        mdi-delete
      </v-icon>
    </v-btn>
  </template>
</v-data-table>
    </v-card>
    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>
          تأكيد الحذف
        </v-card-title>
        <v-card-text>
          هل أنت متأكد من حذف هذا العنصر؟
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteItem()">
            تأكيد
          </v-btn>
          <v-btn color="success">
            الغاء
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    middleware: ['authenticated'],
    data (vm) {
      return {
        search: '',
        headers: [
          { text: vm.$t('roles.id'), value: 'id' },
          {
            text: vm.$t('slider.parmaLink'),
            sortable: false,
            value: 'permalink',
          },
          { text: vm.$t('slider.link'), value: 'link' },
          { text: vm.$t('admins.image'), value: 'image_path' },
          { text: vm.$t('roles.actions'), value: 'actions' },
        ],
        roles: [],
        confirmDeleteDialog: false,
        item: {}
      }
    },
    created () {
      this.getItems()
    },
    methods: {
      async getItems() {
        const data = await this.$axios.$get("/dashboard/sliders");
        console.log('data.data :>> ', data.data);
        if(data.statusCode === 200) {
          this.roles = data.data.data
        }
      },
      confirmdDeleteItem(item) {
        this.item = item
        this.confirmDeleteDialog = true
      },
      async deleteItem() {
        const data = await this.$axios.$post(`/dashboard/sliders/delete/${this.item.id}?_method=delete`);
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.confirmDeleteDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      }
    }
  }
</script>
