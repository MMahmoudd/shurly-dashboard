<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{ $t('sideMenu.webinars') }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('webinars.search')"
          single-line
          hide-details
          @input="debouncedGetItems"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/webinars/form">
          <v-icon>mdi-plus</v-icon>
          {{ $t('roles.add') }}
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col md="4" cols="12">
            <v-select
              v-model="filters.status"
              :items="statusOptions"
              item-text="label"
              item-value="value"
              :label="$t('webinars.status')"
              clearable
              outlined
              dense
              @change="onFilterChange"
            ></v-select>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field
              v-model="filters.from_date"
              type="date"
              :label="$t('webinars.from_date')"
              outlined
              dense
              @change="onFilterChange"
            ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field
              v-model="filters.to_date"
              type="date"
              :label="$t('webinars.to_date')"
              outlined
              dense
              @change="onFilterChange"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="webinars"
        :loading="loading"
        :items-per-page="perPage"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon outlined color="success" :to="`/webinars/form?id=${item.id}`">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon outlined color="warning" @click="openActionDialog('cancel', item)">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
          <v-btn icon outlined color="blue" @click="openActionDialog('end', item)">
            <v-icon>mdi-stop-circle</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="actionDialog" max-width="420">
      <v-card>
        <v-card-title>
          {{ actionType === 'cancel' ? $t('webinars.cancel_title') : $t('webinars.end_title') }}
        </v-card-title>
        <v-card-text>
          {{ actionType === 'cancel' ? $t('webinars.cancel_message') : $t('webinars.end_message') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" :loading="actionLoading" @click="submitAction">
            {{ $t('webinars.confirm') }}
          </v-btn>
          <v-btn color="success" @click="actionDialog = false">
            {{ $t('webinars.cancel') }}
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
        { text: vm.$t('webinars.title'), value: 'title' },
        { text: vm.$t('webinars.scheduled_at'), value: 'scheduled_at' },
        { text: vm.$t('webinars.duration_minutes'), value: 'duration_minutes' },
        { text: vm.$t('webinars.status'), value: 'status' },
        { text: vm.$t('roles.actions'), value: 'actions', sortable: false },
      ],
      webinars: [],
      loading: false,
      perPage: 10,
      page: 1,
      filters: {
        status: null,
        from_date: null,
        to_date: null,
      },
      statusOptions: [
        { label: vm.$t('webinars.all'), value: null },
        { label: vm.$t('webinars.scheduled'), value: 'scheduled' },
        { label: vm.$t('webinars.ended'), value: 'ended' },
        { label: vm.$t('webinars.cancelled'), value: 'cancelled' },
      ],
      debounceTimer: null,
      actionDialog: false,
      actionType: null,
      selectedItem: null,
      actionLoading: false,
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    async getItems() {
      this.loading = true
      try {
        const data = await this.$axios.$get('/dashboard/webinars', {
          params: {
            per_page: this.perPage,
            page: this.page,
            search: this.search || undefined,
            status: this.filters.status || undefined,
            from_date: this.filters.from_date || undefined,
            to_date: this.filters.to_date || undefined,
          },
        })
        if (data.statusCode === 200) {
          this.webinars = data.data?.data || []
        } else {
          this.$toast.error(data.message || this.$t('webinars.load_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.load_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.loading = false
      }
    },
    debouncedGetItems() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => this.getItems(), 400)
    },
    onFilterChange() {
      this.getItems()
    },
    openActionDialog(type, item) {
      this.actionType = type
      this.selectedItem = item
      this.actionDialog = true
    },
    async submitAction() {
      if (!this.selectedItem?.id || !this.actionType) return
      this.actionLoading = true
      try {
        const endpoint = this.actionType === 'cancel' ? 'cancel' : 'end'
        const data = await this.$axios.$post(`/dashboard/webinars/${endpoint}/${this.selectedItem.id}`)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.actionDialog = false
          this.getItems()
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.action_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.actionLoading = false
      }
    },
  },
}
</script>
