<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{ $t('sideMenu.disputeReasons') }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('disputes.search')"
          single-line
          hide-details
          @input="debouncedGetItems"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/disputes/reasons/form">
          <v-icon>mdi-plus</v-icon>
          {{ $t('roles.add') }}
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="reasons"
        :loading="loading"
        :items-per-page="perPage"
        class="elevation-1"
      >
        <template v-slot:[`item.reason_ar`]="{ item }">
          {{ item.reason_ar || '-' }}
        </template>

        <template v-slot:[`item.reason_en`]="{ item }">
          {{ item.reason_en || '-' }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon outlined color="success" :to="`/disputes/reasons/form?id=${item.id}`">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon outlined color="red" @click="confirmDeleteItem(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- <v-card-actions class="justify-end">
        <v-pagination
          v-model="page"
          :length="lastPage"
          total-visible="7"
          @input="getItems"
        ></v-pagination>
      </v-card-actions> -->
    </v-card>

    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>
          {{ $t('disputes.delete_title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('disputes.delete_message') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteItem">
            {{ $t('disputes.confirm') }}
          </v-btn>
          <v-btn color="success" @click="confirmDeleteDialog = false">
            {{ $t('disputes.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data(vm) {
    return {
      search: '',
      headers: [
        { text: vm.$t('roles.id'), value: 'id' },
        { text: vm.$t('disputes.reason_ar'), value: 'reason_ar' },
        { text: vm.$t('disputes.reason_en'), value: 'reason_en' },
        { text: vm.$t('roles.actions'), value: 'actions', sortable: false },
      ],
      reasons: [],
      confirmDeleteDialog: false,
      item: {},
      loading: false,
      page: 1,
      perPage: 10,
      lastPage: 1,
      debounceTimer: null,
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    normalizeItem(item) {
      return {
        ...item,
        reason_ar: item?.reason?.ar || item?.reason_ar || item?.name_ar || '',
        reason_en: item?.reason?.en || item?.reason_en || item?.name_en || '',
      }
    },
    async getItems() {
      this.loading = true
      try {
        const data = await this.$axios.$get('/dashboard/disputes/reasons', {
          params: {
            per_page: this.perPage,
            search: this.search || undefined,
            page: this.page,
          },
        })

        if (data.statusCode === 200) {
          this.reasons = (data.data?.data || []).map(this.normalizeItem)
          this.lastPage = Number(data.data?.last_page || 1)
          this.page = Number(data.data?.current_page || 1)
        } else {
          this.$toast.error(data.message || this.$t('disputes.load_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('disputes.load_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.loading = false
      }
    },
    debouncedGetItems() {
      this.page = 1
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.getItems()
      }, 400)
    },
    confirmDeleteItem(item) {
      this.item = item
      this.confirmDeleteDialog = true
    },
    async deleteItem() {
      try {
        const data = await this.$axios.$delete(`/dashboard/disputes/reasons/delete/${this.item.id}`)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.confirmDeleteDialog = false
          this.getItems()
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('disputes.delete_failed'), { icon: 'mdi-alert-circle' })
      }
    },
  },
}
</script>
