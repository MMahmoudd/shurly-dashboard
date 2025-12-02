<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{$t('sideMenu.roles')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/users/roles/form">
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
  <!-- <template v-slot:[`item.permissions`]="{ item }">
    <v-chip
      v-for="permission in item.permissions"
      :key="permission.id"
      small
      outlined
      class="mx-1"
      color="primary"
      >
      {{permission.name}}
    </v-chip>
  </template> -->
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon outlined color="success" :to="`/users/roles/form?id=${item.id}`">
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
          Delete Confirmation
        </v-card-title>
        <v-card-text>
          Are you sure to delete this role?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteItem()">
            confirm
          </v-btn>
          <v-btn color="success">
            cancel
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
            value: 'name',
          },
          // { text: vm.$t('roles.permissions'), value: 'permissions' },
          { text: vm.$t('roles.actions'), value: 'actions' },
        ],
        roles: [],
        confirmDeleteDialog: false,
        item: {}
      }
    },
    created () {
      this.getRoles()
    },
    methods: {
      async getRoles() {
        const data = await this.$axios.$get("/dashboard/roles");
        if(data.statusCode === 200) {
          this.roles = data.data
        }
      },
      confirmdDeleteItem(item) {
        this.item = item
        this.confirmDeleteDialog = true
      },
      async deleteItem() {
        const data = await this.$axios.$post(`/dashboard/roles/delete/${this.item.id}?_method=delete`);
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getRoles()
          this.confirmDeleteDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      }
    }
  }
</script>
