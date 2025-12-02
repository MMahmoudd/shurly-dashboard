<template>
    <div class="roles-page">
      <v-card>
        <v-card-title>
          {{$t('sideMenu.advisor')}}
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
      :items-per-page="15"
      class="elevation-1"
    >
    <template v-slot:[`item.username`]="{ item }">
        <div class="d-flex">
            <v-img :src="item.image_path" width="30" height="30"></v-img>
            <p class="mx-2">
                {{item.username}}
            </p>
        </div>
    </template>
    <template v-slot:[`item.video`]="{ item }">
        <v-img :src="item.image_path" width="50" @click="openVideoDialog(item)"></v-img>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn icon outlined color="success" @click="openDetailsDialog(item)">
        <v-icon>
          mdi-eye
        </v-icon>
      </v-btn>
    <!-- <template v-slot:[`item.actions`]="{ item }">
      <v-btn icon outlined color="success" :to="`/users/admins/form?id=${item.id}`">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon outlined color="red" @click="confirmdDeleteItem(item)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>-->
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
      <v-dialog v-model="videoDialog" max-width="400">
        <v-card>
          <v-card-title>
            الفيديو
          </v-card-title>
          <v-card-text>
            <video width="320" height="240" controls>
                <source :src="itemDetails.video_path" type="video/mp4">
              Your browser does not support the video tag.
              </video>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="videoDialog = false">
              اغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="detailsDialog" max-width="600" v-if="itemDetails && itemDetails.user">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            التفاصيل
          </v-card-title>
          <v-card-text>
            <p>
              <b>الاسم:</b>
              {{itemDetails.user.name}}
            </p>
            <p>
              <b>البريد الإلكتروني:</b>
              {{itemDetails.user.email}}
            </p>
            <p>
              <b>النوع:</b>
              {{itemDetails.user.profile_type}}
            </p>
            <p>
              <b>الوظيفة:</b>
              {{itemDetails.user.profile.job_title}}
            </p>
            <p>
              <b>السيرة الذاتية:</b>
              {{itemDetails.user.profile.bio}}
            </p>
            <p>
              <b>سنين الخبرة:</b>
              {{itemDetails.user.profile.years_of_experience}}
            </p>
            <p>
              <b>البلد:</b>
              {{itemDetails.user.profile.zone.name}}
            </p>
            <p>
              <b>مكان العمل:</b>
              {{itemDetails.user.profile.work_place}}
            </p>
            <p>
              <b>المهارات:</b>
              <span v-for="skill in itemDetails.user.skills" :key="skill.id">
                {{skill.name + ","}}
              </span>
            </p>
            <p>
              <b>المواعيد:</b>
              <br>
              <span  v-for="availability in itemDetails.application.availabilities" :key="availability.id">
                {{availability.day_name}} :
                <br>
                <span v-for="(time, index) in availability.periods" :key="index">
                  {{time.from + " - " + time.to}}
                  <br>
                </span>
                <br>
              </span>
            </p>

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
            {
              text: vm.$t('roles.name'),
              sortable: false,
              value: 'user.name',
            },
            { text: vm.$t('admins.email'), value: 'user.email' },
            { text: vm.$t('admins.summary'), value: 'professional_summary' },
            { text: vm.$t('admins.phone'), value: 'user.phone' },
            { text: vm.$t('admins.profileType'), value: 'user.profile_type' },
            { text: vm.$t('admins.rejection_reason'), value: 'rejection_reason' },
            // { text: vm.$t('admins.image'), value: 'image' },
            { text: vm.$t('admins.video'), value: 'video' },

            { text: vm.$t('roles.actions'), value: 'actions' },
          ],
          roles: [],
          confirmDeleteDialog: false,
          item: {},
          itemDetails: {},
          videoDialog: false,
          detailsDialog: false
        }
      },
      created () {
        this.getItems()
      },
      methods: {
        openVideoDialog(item) {
            this.itemDetails = item
            this.videoDialog = true
        },
        async openDetailsDialog(item) {
            const data = await this.$axios.$get(`/dashboard/advisor-applications/${item.id}`)
            this.itemDetails = data.data
            this.detailsDialog = true
        },
        async getItems() {
          const data = await this.$axios.$get("/dashboard/advisor-applications/new-applications?status=rejected");
          if(data.statusCode === 200 && data.data) {
            this.roles = data.data.data
          }
        },
        confirmdDeleteItem(item) {
          this.item = item
          this.confirmDeleteDialog = true
        },
        async deleteItem() {
          const data = await this.$axios.$post(`/dashboard/advisor-applications/new-applications/delete/${this.item.id}?_method=delete`);
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