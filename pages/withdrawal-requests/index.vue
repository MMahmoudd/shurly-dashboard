<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{$t('sideMenu.withdrawalRequests')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
    :search="search"
    :headers="headers"
    :items="roles"
    :items-per-page="15"
    class="elevation-1"
  >
  <template v-slot:[`item.message`]="{ }">
    <!-- <div class="d-flex">
      <p class="mx-3"> -->
        <!-- {{item.message.substr(0, 150).replace(/\w*$/,'')+'........'}} -->
      <!-- </p>
    </div> -->
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon outlined color="success" @click="openApproveDialog(item)">
      <v-icon>
        mdi-check
      </v-icon>
    </v-btn>
        <v-btn icon outlined color="error" @click="openRejectDialog(item)">
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="primary" @click="openViewDialog(item)">
      <v-icon>
        mdi-eye
      </v-icon>
    </v-btn>
  </template>
</v-data-table>
    </v-card>
    <v-dialog v-model="editDialog" max-width="700">
      <v-card>
        <v-card-title class="d-block">
          <div>
            موافقة علي المعاملة
          </div>
        </v-card-title>
        <v-card-text class="mt-5" v-if="item.advisor">
          <div>
            <b>
            مقدم الخدمة:
          </b>
          {{item.advisor.name}}
          </div>
          <b>
            الرسالة: 
          </b>
          <v-textarea v-model="item.transaction_note" outlined dense ></v-textarea>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="approve()">
            موافقة
          </v-btn>
          <v-btn color="error" @click="editDialog = false">
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog v-model="rejectDialog" max-width="700">
      <v-card>
        <v-card-title class="d-block">
          <div>
            رفض المعاملة
          </div>
        </v-card-title>
        <v-card-text class="mt-5" v-if="item.advisor">
          <div>
            <b>
            مقدم الخدمة:
          </b>
          {{item.advisor.name}}
          </div>
          <b>
            الرسالة: 
          </b>
          <v-textarea v-model="item.transaction_note" outlined dense ></v-textarea>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="reject()">
            رفض
          </v-btn>
          <v-btn color="error" @click="rejectDialog = false">
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="requestData.admin_wallet">
        <v-card-title>
          المعاملة
        </v-card-title>
        <v-card-text>
          <div>
            <b>محفظة المدير</b>
            <br>
            <br>
            <div class="d-flex justify-space-between">
              <span class="d-flex">
                <b>رصيد حساب: </b>
                {{requestData.admin_wallet.balance}}
              </span>
              <span class="d-flex">
                <b> الرصيد المعلق: </b>
                {{requestData.admin_wallet.held_balance}}
              </span>
            </div>
            </div>
            <v-divider class="my-5"></v-divider>
            <div>
              <b>المستشار</b>
              <br>
              <br>
              <div class="d-flex justify-space-between">
                <span>
                  <b> الاسم: </b>
                    <br>
                  {{requestData.withdrawal_request.advisor.name}}
                </span>
                <span >
                  <b> البريد الاليكتروني: </b>
                  <br>
                  {{requestData.withdrawal_request.advisor.email}}
                </span>
              </div>
              <div class="d-flex justify-space-between my-2">
                <span class="d-flex">
                  <b> رصيد المحفظة: </b>
                  {{requestData.withdrawal_request.advisor.wallet.balance}}
                </span>
                <span class="d-flex">
                  <b> رصيد المحفظة المتاح: </b>
                  {{requestData.withdrawal_request.advisor.wallet.available_balance}}
                </span>
              </div>
              <div class="d-flex justify-space-between my-2">
                <span class="d-flex">
                  <b> قيمة الطلبات المعلقة: </b>
                  {{requestData.withdrawal_request.advisor.wallet.pending_withdraw}}
                </span>
                <span class="d-flex">
                  <b> إجمالي الدخل: </b>
                  {{requestData.withdrawal_request.advisor.wallet.total_earning}}
                </span>
              </div>
              <div class="d-flex justify-space-between my-2">
                <span class="d-flex">
                  <b> إجمالي المسحوبات: </b>
                  {{requestData.withdrawal_request.advisor.wallet.total_withdrawn}}
                </span>
                <span class="d-flex">
                  <b> الرصيد غير المتاح: </b>
                  {{requestData.withdrawal_request.advisor.wallet.unavailable_balance}}
                </span>
              </div>
            </div>
            <v-divider class="my-5"></v-divider>
            <div>
              <b>طلب سحب</b>
              <br>
              <br>
              <div class="d-flex justify-space-between">
                <span class="d-flex">
                  <b> المبلغ: </b>
                  {{requestData.withdrawal_request.amount}}
                </span>
                <span class="d-flex">
                  <b> الحالة: </b>
                  {{requestData.withdrawal_request.readable_status}}
                </span>
              </div>
              <div class="d-flex justify-space-between my-2">
                <span class="d-flex">
                  <b> التاريخ: </b>
                  {{requestData.withdrawal_request.readable_created_at}}
                </span>
              </div>
              <div>
                <div>
                  <span class="d-flex my-3">
                  <b> المعاملة: </b>
                  {{requestData.withdrawal_request.transaction_note}}
                </span>
                </div>
                <span>
                  <b> الصورة: </b>
                  <v-img :src="requestData.withdrawal_request.image_path" width="200"></v-img>
                </span>
              </div>

            </div>
          <!-- <div>admin_wallet: {{requestData.admin_wallet}}</div>
          <div>advisor_wallet: {{requestData.advisor_wallet}}</div>
          <div>amount: {{requestData.amount}}</div>
          <div>status: {{requestData.readable_status}}</div>
          <div>created_at: {{requestData.created_at}}</div>
          <div>transaction_note: {{requestData.transaction_note}}</div> -->
        </v-card-text>
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
          { text: vm.$t('categories.email'), value: 'advisor.email' },
          { text: vm.$t('sideMenu.advisor'), value: 'advisor.name' },
          { text: vm.$t('categories.status'), value: 'readable_status' },
          { text: vm.$t('categories.transaction_note'), value: 'transaction_note' },
          { text: vm.$t('roles.actions'), value: 'actions' },
        ],
        roles: [],
        options: [
          {name: 'pending', value: 'pending'},
          {name: 'In progress', value: 'in_progress'},
          {name: 'resolved', value: 'resolved'}
        ],
        editDialog: false,
        rejectDialog: false,
        viewDialog: false,
        item: {},
        requestData: {},
        requestHeaders: [
          { text: 'المبلغ', value: 'amount' },
          { text: 'الحالة', value: 'readable_status' },
          { text: 'التاريخ', value: 'created_at' },
          { text: 'المعاملة', value: 'transaction_note' },
        ]
      }
    },
    created () {
      this.getItems()
    },
    methods: {
      openApproveDialog (item) {
        this.item = item
        this.editDialog = true
      },
      openRejectDialog (item) {
        this.item = item
        this.rejectDialog = true
      },
      async openViewDialog (item) {
        this.item = item
        const data = await this.$axios.$get(`/dashboard/withdrawal-requests/show/${item.id}`);
        if(data.statusCode === 200) {
          this.requestData = data.data
        }
        console.log('this.requestData :>> ', this.requestData);
        this.viewDialog = true
      },
      async getItems() {
        const data = await this.$axios.$get("/dashboard/withdrawal-requests/all");
        if(data.statusCode === 200) {
          this.roles = data.data.data
        }
      },
      async approve() {
        const data = await this.$axios.$post(`/dashboard/withdrawal-requests/approve-request/${this.item.id}?_method=PUT`,
        {
          transaction_note: this.item.transaction_note
        }
        );
        if (data.statusCode === 200) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.editDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      async reject() {
        const data = await this.$axios.$post(`/dashboard/withdrawal-requests/approve-request/${this.item.id}?_method=PUT`,
        {
          transaction_note: this.item.transaction_note
        }
        );
        if (data.statusCode === 200) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.rejectDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      async confirmEdit() {
        const data = await this.$axios.$put(`/dashboard/withdrawal-requests/${this.item.id}/update-status?_method=PUT`, {
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
