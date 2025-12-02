<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{$t('sideMenu.supportRequests')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/supportRequests/form">
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
  <template v-slot:[`item.message`]="{ item }">
    <!-- <div class="d-flex">
      <p class="mx-3"> -->
        {{item.message.substr(0, 150).replace(/\w*$/,'')+'........'}}
      <!-- </p>
    </div> -->
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon outlined color="success" @click="openDialog(item)">
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
  </template>
</v-data-table>
    </v-card>
    <v-dialog v-model="editDialog" max-width="700">
      <v-card>
        <v-card-title class="d-block">
          <div>
            <b>
            موضوع:
          </b>
          {{item.subject}}
          </div>
          <div>
            <b>
            البريد الالكتروني: 
          </b>
          {{item.email}}
          </div>
        </v-card-title>
        <v-card-text class="mt-5">
          <b>
            الرسالة: 
          </b>
          
          {{item.message}}
          <br>
          <div class="mt-6">
            <v-label>
              <b>
                الحالة
              </b>
            </v-label>
            <v-select
              v-model="item.status"
              :items="options"
              placeholder="تحديث الحالة"
              item-text="name"
              item-value="value"
              outlined
              dense
            >
            </v-select>
          </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="confirmEdit()">
            تأكيد
          </v-btn>
          <v-btn color="error">
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
            text: vm.$t('roles.name'),
            sortable: false,
            value: 'subject',
          },
          { text: vm.$t('categories.email'), value: 'email' },
          { text: vm.$t('categories.message'), value: 'message' },
          { text: vm.$t('categories.status'), value: 'readable_status' },
          // { text: vm.$t('categories.readable_status'), value: 'readable_status' },
          { text: vm.$t('roles.actions'), value: 'actions' },
        ],
        roles: [],
        options: [
          {name: 'pending', value: 'pending'},
          {name: 'In progress', value: 'in_progress'},
          {name: 'resolved', value: 'resolved'}
        ],
        editDialog: false,
        item: {}
      }
    },
    created () {
      this.getItems()
    },
    methods: {
      openDialog (item) {
        this.item = item
        this.editDialog = true
      },
      async getItems() {
        const data = await this.$axios.$get("/dashboard/support-requests");
        console.log('data :>> ', data);
        if(data.statusCode === 200) {
          this.roles = data.data.data
        }
      },
      async confirmEdit() {
        const data = await this.$axios.$put(`/dashboard/support-requests/${this.item.id}/update-status?_method=PUT`, {
          status: this.item.status
        });
        if (data.statusCode === 200) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.editDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      confirmdDeleteItem(item) {
        this.item = item
        this.confirmDeleteDialog = true
      },
      async deleteItem() {
        const data = await this.$axios.$post(`/dashboard/support-requests/delete/${this.item.id}?_method=delete`);
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
