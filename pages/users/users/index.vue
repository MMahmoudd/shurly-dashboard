<template>
  <div class="roles-page">
    <v-card>
      <v-card-title>
        {{$t('sideMenu.users')}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" to="/users/users/form">
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
  <!-- <template v-slot:[`item.name`]="{ item }">
    <div class="d-flex align-center ">
      <v-img max-width="50" max-height="50" :src="item.image" alt="user image" />
      <p class="mx-3">
        {{(item.f_name ? item.f_name : '') + ' ' + (item.l_name ? item.l_name : '')}}
      </p>
    </div>
  </template> -->
  <template v-slot:[`item.is_profile_approved`]="{ item }">
    <span v-if="item.is_profile_approved">
      approved
    </span>
    <span v-else>
      Not approved
    </span>
  </template>
  <template v-slot:[`item.blocked`]="{ item }">
    <span v-if="item.blocked">
      blocked
    </span>
    <span v-else>
      Not blocked
    </span>
  </template>
  <template v-slot:[`item.is_profile_completed`]="{ item }">
    <span v-if="item.is_profile_completed">
      completed
    </span>
    <span v-else>
      Not completed
    </span>
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-btn icon outlined color="success" :to="`/users/users/form?id=${item.id}`">
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="red" @click="confirmdDeleteItem(item)">
      <v-icon>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="info" v-if="item.is_profile_approved == 0" @click="confirmdActiveItem(item)">
      <v-icon>
        mdi-check
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="orange" v-if="item.blocked == 0" @click="confirmdBlockItem(item)">
      <v-icon>
        mdi-account-cancel-outline
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="orange" v-if="item.blocked == 1" @click="confirmdBlockItem(item)">
      <v-icon>
        mdi-account-check-outline
      </v-icon>
    </v-btn>
    <v-btn icon outlined color="info" @click="openConvertDialog(item)" v-if="item.profile_type === 'seeker'">
      <v-icon>
        mdi-account-convert
      </v-icon>
    </v-btn>
  </template>
</v-data-table>
    </v-card>
    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>
          تأكيد حذف
        </v-card-title>
        <v-card-text>
          هل انت متأكد من حذف هذا المستخدم؟
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteItem()">
            تأكيد
          </v-btn>
          <v-btn color="success" @click="confirmDeleteDialog = false">
            الغاء
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmBlockDialog" max-width="400">
      <v-card>
        <v-card-title>
          {{item.blocked ? 'الغاء حظر' : 'تأكيد حظر'}}
        </v-card-title>
        <v-card-text>
          {{item.blocked ? 'هل انت متأكد من الغاء حظر هذا المستخدم؟' : 'هل انت متأكد من حظر هذا المستخدم؟'}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="toggleBlockItem()">
            تأكيد
          </v-btn>
          <v-btn color="success"  @click="confirmBlockDialog = false">
            الغاء
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmActiveDialog" max-width="400">
      <v-card>
        <v-card-title>
          تأكيد الموافقة علي المستخدم
        </v-card-title>
        <v-card-text>
          هل انت متأكد من تآكيد الموافقة هذا المستخدم؟
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="activeItem()">
            تأكيد
          </v-btn>
          <v-btn color="error" @click="confirmActiveDialog = false">
            الغاء
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="changeTypeDialog" max-width="900">
      <v-card class="change-type-dialog">
        <v-card-title>
          تغيير نوع العميل
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="6">
              <v-text-field
              outlined
              v-model="form.full_name"
              dense
              label="الاسم"
              hide-details
              disabled
              />
            </v-col>
            <v-col md="6">
              <v-text-field outlined
                v-model="form.email"
                dense
                label="البريد الإلكتروني"
                hide-details
                disabled
              />
            </v-col>
            <v-col md="6">
              <v-text-field
              outlined v-model="form.phone" dense label="الهاتف" hide-details
              disabled
              />
            </v-col>
            <v-col md="6">
              <v-text-field outlined v-model="form.language" dense label="اللغة" hide-details
              disabled
              />
            </v-col>
            <v-col cols="12">
              <v-file-input v-model="form.video" outlined dense label="الفيديو" hide-details
              accept="video/*"
              @change="handleVideoChange"
              />
            </v-col>
            <v-col cols="12">
            <div v-for="(sessionRate, index) in form.session_rates" :key="index" class="border rounded p-2 mb-2">
              <v-btn icon outlined color="error" @click="removeSessionRate(index)" class="mt-0">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
            <v-btn icon outlined color="success" @click="addSessionRate" class="mt-0">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
              <v-row class="mt-2">
                <v-col md="6">
                  <v-text-field outlined v-model="sessionRate.duration" dense label="المدة" hide-details/>
                </v-col>
                <v-col md="6">
                  <v-text-field outlined v-model="sessionRate.notice_period" dense label="المدة المتبقية" hide-details/>
                </v-col>
                <v-col md="6">
                  <v-switch v-model="sessionRate.auto_accept" dense label="التقييم التلقائي" hide-details/>
                </v-col>
                <v-col md="6">
                  <v-text-field outlined v-model="sessionRate.break_time" dense label="الوقت المتاح للكسر" hide-details/>
                </v-col>
                <v-col md="6">
                  <v-text-field outlined v-model="sessionRate.price" dense label="السعر" hide-details/>
                </v-col>
              </v-row>
            </div>
            </v-col>
            <v-col cols="12">
            <div v-for="(availability, index) in form.availabilities" :key="index" class="border rounded p-2 mb-2">
              <v-btn icon outlined color="error" @click="removeAvailability(index)" class="mt-0">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn icon outlined color="success" @click="addAvailability" class="mt-0">
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
              <v-row class="mt-2">
                <v-col cols="12">
                  <v-select outlined v-model="availability.day" dense label="اليوم" hide-details
                  :items="days"
                  item-text="text"
                  item-value="value"
                  :rules="[rules.required]"
                  />
                </v-col>
                <v-col md="6" v-for="(period, periodIndex) in availability.periods" :key="periodIndex">
                  <div class="border rounded p-2 mb-2">
                    <v-btn outlined color="success" @click="addPeriod(index, periodIndex)" class="mt-0">
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                    <v-btn outlined color="error" @click="removePeriod(index, periodIndex)" class="mt-0">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
                <v-row class="mt-2">
                  <v-col md="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="period.from"
                          label="من"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details
                          dense
                          outlined
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu"
                        v-model="period.from"
                        full-width
                        @change="menu = false"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="6">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="period.to"
                          label="الي"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details
                          dense
                          outlined
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="period.to"
                        full-width
                        @change="menu2 = false"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                  </div>
                </v-col>
              </v-row>
            </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="changeType()">
            تأكيد
          </v-btn>
          <v-btn  color="error">
            اغلاق
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
            value: 'full_name',
          },
          { text: vm.$t('admins.email'), value: 'email' },
          { text: vm.$t('admins.phone'), value: 'phone' },
          { text: vm.$t('admins.profileType'), value: 'profile_type' },
          { text: vm.$t('admins.approved'), value: 'is_profile_approved' },
          { text: vm.$t('admins.blocked'), value: 'blocked' },
          { text: vm.$t('admins.is_profile_completed'), value: 'is_profile_completed' },
          { text: vm.$t('roles.actions'), value: 'actions' },
        ],
        roles: [],
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        },
        days: [
          {
            text: 'الاثنين',
            value: 1
          },
          {
            text: 'الثلاثاء',
            value: 2
          },
          {
            text: 'الأربعاء',
            value: 3
          },
          {
            text: 'الخميس',
            value: 4
          },
          {
            text: 'الجمعة',
            value: 5
          },
          {
            text: 'السبت',
            value: 6
          },
          {
            text: 'الأحد',
            value: 7
          },
        ],
        confirmDeleteDialog: false,
        changeTypeDialog: false,
        confirmBlockDialog: false,
        confirmActiveDialog: false,
        item: {},
        form: {
          username: "",
          phone: "",
          professional_summary: "",
          services_offer: "",
          language: "",
          image: null,
          video: "",
          area_of_expertises: [],
          skills: [],
          categories: [],
          session_rates: [{
            duration: 0,
            notice_period: 0,
            auto_accept: true,
            break_time: 0,
            price: 0
          }],
          availabilities: [{
            day: 0,
            periods: [{
              from: null,
              to: null
            }],

          }],
          is_featured: 0
        },
        menu: false,
        menu2: false,
      }
    },
    created () {
      this.getItems()
    },
    methods: {
      async getItems() {
        const data = await this.$axios.$get("/dashboard/users/seekers");
        console.log('data :>> ', data);
        if(data.statusCode === 200) {
          this.roles = data.data.data
        }
      },
      confirmdDeleteItem(item) {
        this.item = item
        this.confirmDeleteDialog = true
      },
      async deleteItem() {
        const data = await this.$axios.$post(`/dashboard/users/delete/${this.item.id}?_method=delete`);
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.confirmDeleteDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      confirmdBlockItem(item) {
        this.item = item
        this.confirmBlockDialog = true
      },
      async toggleBlockItem() {
        const data = await this.$axios.$post(`/dashboard/users/${this.item.id}/block?_method=PUT`);
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.confirmBlockDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      confirmdActiveItem(item) {
        this.item = item
        this.confirmActiveDialog = true
      },
      async activeItem() {
        const data = await this.$axios.$post(`/dashboard/users/${this.item.id}/activation?_method=PUT`);
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.confirmActiveDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      },
      openConvertDialog(item) {
        this.changeTypeDialog = true
        this.form.id = item.id
        this.form.full_name = item.full_name
        this.form.email = item.email
        this.form.phone = item.phone
        this.form.language = item.language
      },
      addSessionRate() {
        this.form.session_rates.push({
          duration: 0,
          notice_period: 0,
          auto_accept: 0,
          break_time: 0,
          price: 0
        })
      },
      removeSessionRate(index) {
        this.form.session_rates.splice(index, 1)
      },
      addAvailability() {
        this.form.availabilities.push({
          day: 0,
          periods: [{
            from: null,
            to: null
          }]
        })
      },
      removeAvailability(index) {
        this.form.availabilities.splice(index, 1)
      },
      addPeriod(index, periodIndex) {
        this.form.availabilities[index].periods.push({
          from: null,
          to: null
        })
      },
      removePeriod(index, periodIndex) {
        this.form.availabilities[index].periods.splice(periodIndex, 1)
      },
      handleVideoChange(file) {
        console.log('file', file)
        this.form.video = file
        },
      async changeType() {
        const formData = new FormData()
        formData.append('video', this.form.video)
        this.form.session_rates.forEach((rate, index) => {
          formData.append(`session_rates[${index}][duration]`, rate.duration)
          formData.append(`session_rates[${index}][notice_period]`, rate.notice_period)
          formData.append(`session_rates[${index}][auto_accept]`, rate.auto_accept ? 1 : 0)
          formData.append(`session_rates[${index}][break_time]`, rate.break_time)
          formData.append(`session_rates[${index}][price]`, rate.price)
        })
        this.form.availabilities.forEach((availability, index) => {
          formData.append(`availabilities[${index}][day]`, availability.day)
          availability.periods.forEach((period, periodIndex) => {
            formData.append(`availabilities[${index}][periods][${periodIndex}][from]`, period.from)
            formData.append(`availabilities[${index}][periods][${periodIndex}][to]`, period.to)
          })
        })
        const data = await this.$axios.$post(`/dashboard/advisor-applications/create/${this.form.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (data.statusCode === 201) {
          this.$toast.success(data.message, { icon: 'mdi-check' })
          this.getItems()
          this.changeTypeDialog = false
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      }
    }
  }
</script>
<style lang="scss">
  .change-type-dialog {
      .border {
        border: 1px solid #e0e0e0;
        border-radius: 25px;
        padding: 15px;
        margin-bottom: 10px;
      }
  }
</style>
