<template>
    <div class="roles-page">
      <v-card>
        <v-card-title>
          {{$t('sideMenu.sessions')}}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- <v-btn outlined color="success" to="/users/admins/form">
            <v-icon>
              mdi-plus
            </v-icon>
            {{$t('roles.add')}}
          </v-btn> -->
        </v-card-title>
      <v-data-table
      :search="search"
      :headers="headers"
      :items="roles"
      :items-per-page="20"
      class="elevation-1"
    >
    <template v-slot:[`item.advisor`]="{ item }">
        <!-- <div class="d-flex"> -->
            <p @click="openAdvisorDetails(item.advisor)">
                {{item.advisor.name}}
            </p>
        <!-- </div> -->
    </template>
    <template v-slot:[`item.seeker`]="{ item }">
      <!-- <div class="d-flex"> -->
          <p @click="openAdvisorDetails(item.seeker)">
              {{item.seeker.name}}
          </p>
      <!-- </div> -->
  </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- <v-btn icon outlined color="success" @click="viewItem(item)">
        <v-icon>
          mdi-eye
        </v-icon>
      </v-btn> -->
    </template>
  </v-data-table>
      </v-card>
      <v-dialog v-model="confirmDeleteDialog" max-width="400">
        <v-card>
          <v-card-title>
            Delete Confirmation
          </v-card-title>
          <v-card-text>
            Are you sure to delete this Admin?
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
      <v-dialog v-model="advisorDetailsDialog" max-width="700">
        <v-card>
          <v-card-title>
            تفاصيل الجلسة
          </v-card-title>
          <v-card-text v-if="item && item.id">
            <v-row>
              <v-col md="6" cols="12">
                <h3 class="mb-3">
                  مقدم الخدمة
                </h3>
                <v-avatar class="d-flex justify-center ma-auto">
                  <img
                    :src="item.advisor.image_path"
                    alt="advisor image"
                  >
                </v-avatar>
                <p class="mb-1">
                  <b>
                    البريد الاليكتروني:
                  </b>
                  {{ item.advisor.email }}
                </p>
                <p class="mb-1">
                  <b>
                    الاسم:
                  </b>
                  {{ item.advisor.name }}
                </p>
                <p class="mb-1">
                  <b>
                    رقم الهاتف: 
                  </b>
                  {{ item.advisor.phone }}
                </p>
                <p class="mb-1">
                  <b>
                    ملاحظات مقدم الخدمة: 
                  </b>
                  {{ item.advisor_note ? item.advisor_note : '---' }}
                </p>
              </v-col>
              <v-col md="6" cols="12">
                <h3 class="mb-3">
                  طالب الخدمة
                </h3>
                <v-avatar class="d-flex justify-center ma-auto">
                  <img
                    :src="item.seeker.image_path"
                    alt="seeker image"
                  >
                </v-avatar>
                <p class="mb-1">
                  <b>
                    البريد الاليكتروني:
                  </b>
                  {{ item.seeker.email }}
                </p>
                <p class="mb-1">
                  <b>
                    الاسم:
                  </b>
                  {{ item.seeker.name }}
                </p>
                <p class="mb-1">
                  <b>
                    رقم الهاتف: 
                  </b>
                  {{ item.seeker.phone }}
                </p>
                <p class="mb-1">
                  <b>
                    ملاحظات مقدم الخدمة: 
                  </b>
                  {{ item.seeker_note ? item.seeker_note : '---' }}
                </p>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-3">
                  تفاصيل الجلسة
                </h3>
                <p class="mb-1">
                  <b>
                    المدة:
                  </b>
                  {{ item.advisor_session_rate.duration + ' ' + item.advisor_session_rate.duration_type}}
                </p>
                <p class="mb-1">
                  <b>
                    السعر:
                  </b>
                  {{ item.advisor_session_rate.price }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="advisorDetailsDialog = false">
              اغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-dialog v-model="seekerDetailsDialog" max-width="400">
        <v-card>
          <v-card-title>
            {{advisorDetails.name}}
          </v-card-title>
          <v-card-text v-if="advisorDetails" class="text-center">
            <v-avatar>
              <img
                :src="advisorDetails.image_path"
                alt="advisor image"
              >
            </v-avatar>
            <p>
              {{advisorDetails.email}}
            </p>
            <p>
              {{advisorDetails.phone}}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="advisorDetailsDialog = false">
              اغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
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
              text: vm.$t('sessions.advisor'),
              sortable: false,
              value: 'advisor',
            },
            { text: vm.$t('sessions.seeker'), value: 'seeker' },
            { text: vm.$t('sessions.advisorNote'), value: 'advisor_note' },
            { text: vm.$t('sessions.seekerNote'), value: 'seeker_note' },
            { text: vm.$t('sessions.status'), value: 'status' },
            { text: vm.$t('roles.actions'), value: 'actions' },
          ],
          roles: [],
          confirmDeleteDialog: false,
          item: {},
          advisorDetails: {},
          advisorDetailsDialog: false,
          seekerDetailsDialog: false,
          videoDialog: false
        }
      },
      created () {
        this.getItems()
      },
      methods: {
        openAdvisorDetails(item) {
            this.advisorDetails = item
            this.advisorDetailsDialog = true
        },
        async getItems() {
          const data = await this.$axios.$get("/dashboard/sessions?status=accepted");
          if(data.statusCode === 200) {
            this.roles = data.data.data
          }
        },
        async viewItem(item){
          const data = await this.$axios.$get(`/dashboard/sessions/show/${item.id}`);
          if (data.statusCode === 200) {
            this.item = data.data
            this.advisorDetailsDialog = true
          }
        },
        confirmdDeleteItem(item) {
          this.item = item
          this.confirmDeleteDialog = true
        },
        async deleteItem() {
          const data = await this.$axios.$post(`/dashboard/sessions/delete/${this.item.id}?_method=delete`);
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
  <style lang="scss">
  .v-image__image--cover {
    background-size: contain !important;
}

  </style>