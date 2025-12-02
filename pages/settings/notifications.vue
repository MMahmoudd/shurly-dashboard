<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12" v-if="settings.new_user_registered">
        <v-card>
          <v-card-title>
            اعدادات الاشعارات
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-expansion-panels multiple v-model="panels" focusable>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    تسجيل مستخدم جديد
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.new_user_registered.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.new_user_registered.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.new_user_registered.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    التحقق من البريد الإلكتروني
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.email_verified.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.email_verified.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.email_verified.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    طلبات الملف الشخصي المكتملة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.profile_complete_requests.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.profile_complete_requests.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.profile_complete_requests.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    الملف الشخصي المعتمد
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.profile_approved.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.profile_approved.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.profile_approved.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    أصبح مستشارا
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.become_advisor.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.become_advisor.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.become_advisor.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    الطلب المعتمد
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.approved_application.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.approved_application.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.approved_application.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    الطلب المرفوض
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.rejected_application.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.rejected_application.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.rejected_application.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    اقتراح جلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.propose_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.propose_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.propose_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    قبول الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.accept_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.accept_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.accept_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    رفض الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.reject_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.reject_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.reject_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    انتهت الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.completed_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.completed_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.completed_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    بدء الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.started_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.started_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.started_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    الغاء الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.canceled_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.canceled_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.canceled_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    إعادة جدولة الجلسة
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.reschedule_session.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.reschedule_session.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.reschedule_session.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    طلب الدفع
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.payment_required.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.payment_required.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.payment_required.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    تفعيل الحساب
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col md="2" cols="12">
                        <v-switch
                          v-model="settings.profile_activation.status"
                          label="تفعيل"
                        ></v-switch>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة العربي
                        </label>
                        <v-text-field
                          v-model="settings.profile_activation.message_ar"
                          placeholder="الرسالة العربي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col md="5" cols="12">
                        <label>
                          الرسالة بالانجليزي
                        </label>
                        <v-text-field
                          v-model="settings.profile_activation.message_en"
                          placeholder="الرسالة بالانجليزي"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>

            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ma-auto" color="success" @click="submitFrom()">
              {{ $t('roles.edit') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      panels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      settings: {},
      types: [
        {item_ar: "نسبة مئوية", item_en: "percentage"},
        {item_ar: "قيمة ثابتة", item_en: "fixed"}
      ],
    }
  },
  created () {
    this.getAllSettings()
  },
  methods: {
    async getAllSettings() {
      const data = await this.$axios.$get("/dashboard/settings/notifications");
      // const obdata = JSON.parse(Object.values(data.data))
      // console.log('json :>> ', obdata);
      // console.log('data.data :>> ', JSON.parse(Object.values(data.data)) );
      this.settings = data.data
    },
    async submitFrom() {
      // const formData = new FormData()
      // formData.append("new_user_registered_status", this.settings.new_user_registered.status);
      // formData.append("new_user_registered_message_ar", this.settings.new_user_registered.message_ar);
      // formData.append("new_user_registered_message_en", this.settings.new_user_registered.message_en);

      // formData.append("email_verified_status", this.settings.email_verified.status);
      // formData.append("email_verified_message_ar", this.settings.email_verified.message_ar);
      // formData.append("email_verified_message_en", this.settings.email_verified.message_en);

      // formData.append("profile_complete_requests_status", this.settings.profile_complete_requests.status);
      // formData.append("profile_complete_requests_message_ar", this.settings.profile_complete_requests.message_ar);
      // formData.append("profile_complete_requests_message_en", this.settings.profile_complete_requests.message_en);

      // formData.append("profile_approved_status", this.settings.profile_approved.status);
      // formData.append("profile_approved_message_ar", this.settings.profile_approved.message_ar);
      // formData.append("profile_approved_message_en", this.settings.profile_approved.message_en);

      // formData.append("become_advisor_status", this.settings.become_advisor.status);
      // formData.append("become_advisor_message_ar", this.settings.become_advisor.message_ar);
      // formData.append("become_advisor_message_en", this.settings.become_advisor.message_en);

      // formData.append("approved_application_status", this.settings.approved_application.status);
      // formData.append("approved_application_message_ar", this.settings.approved_application.message_ar);
      // formData.append("approved_application_message_en", this.settings.approved_application.message_en);

      // formData.append("rejected_application_status", this.settings.rejected_application.status);
      // formData.append("rejected_application_message_ar", this.settings.rejected_application.message_ar);
      // formData.append("rejected_application_message_en", this.settings.rejected_application.message_en);

      // formData.append("propose_session_status", this.settings.propose_session.status);
      // formData.append("propose_session_message_ar", this.settings.propose_session.message_ar);
      // formData.append("propose_session_message_en", this.settings.propose_session.message_en);

      // formData.append("accept_session_status", this.settings.accept_session.status);
      // formData.append("accept_session_message_ar", this.settings.accept_session.message_ar);
      // formData.append("accept_session_message_en", this.settings.accept_session.message_en);

      // formData.append("reject_session_status", this.settings.reject_session.status);
      // formData.append("reject_session_message_ar", this.settings.reject_session.message_ar);
      // formData.append("reject_session_message_en", this.settings.reject_session.message_en);

      // formData.append("completed_session_status", this.settings.completed_session.status);
      // formData.append("completed_session_message_ar", this.settings.completed_session.message_ar);
      // formData.append("completed_session_message_en", this.settings.completed_session.message_en);

      // formData.append("started_session_status", this.settings.started_session.status);
      // formData.append("started_session_message_ar", this.settings.started_session.message_ar);
      // formData.append("started_session_message_en", this.settings.started_session.message_en);

      // formData.append("canceled_session_status", this.settings.canceled_session.status);
      // formData.append("canceled_session_message_ar", this.settings.canceled_session.message_ar);
      // formData.append("canceled_session_message_en", this.settings.canceled_session.message_en);

      // formData.append("reschedule_session_status", this.settings.reschedule_session.status);
      // formData.append("reschedule_session_message_ar", this.settings.reschedule_session.message_ar);
      // formData.append("reschedule_session_message_en", this.settings.reschedule_session.message_en);
      const form= {
        new_user_registered_status: this.settings.new_user_registered.status,
        new_user_registered_message_ar: this.settings.new_user_registered.message_ar,
        new_user_registered_message_en: this.settings.new_user_registered.message_en,

        email_verified_status: this.settings.email_verified.status,
        email_verified_message_ar: this.settings.email_verified.message_ar,
        email_verified_message_en: this.settings.email_verified.message_en,

        profile_complete_requests_status: this.settings.profile_complete_requests.status,
        profile_complete_requests_message_ar: this.settings.profile_complete_requests.message_ar,
        profile_complete_requests_message_en: this.settings.profile_complete_requests.message_en,

        profile_approved_status: this.settings.profile_approved.status,
        profile_approved_message_ar: this.settings.profile_approved.message_ar,
        profile_approved_message_en: this.settings.profile_approved.message_en,

        become_advisor_status: this.settings.become_advisor.status,
        become_advisor_message_ar: this.settings.become_advisor.message_ar,
        become_advisor_message_en: this.settings.become_advisor.message_en,

        approved_application_status: this.settings.approved_application.status,
        approved_application_message_ar: this.settings.approved_application.message_ar,
        approved_application_message_en: this.settings.approved_application.message_en,

        approved_application_status: this.settings.approved_application.status,
        approved_application_message_ar: this.settings.approved_application.message_ar,
        approved_application_message_en: this.settings.approved_application.message_en,

        rejected_application_status: this.settings.rejected_application.status,
        rejected_application_message_ar: this.settings.rejected_application.message_ar,
        rejected_application_message_en: this.settings.rejected_application.message_en,

        propose_session_status: this.settings.propose_session.status,
        propose_session_message_ar: this.settings.propose_session.message_ar,
        propose_session_message_en: this.settings.propose_session.message_en,

        accept_session_status: this.settings.accept_session.status,
        accept_session_message_ar: this.settings.accept_session.message_ar,
        accept_session_message_en: this.settings.accept_session.message_en,

        accept_session_status: this.settings.accept_session.status,
        accept_session_message_ar: this.settings.accept_session.message_ar,
        accept_session_message_en: this.settings.accept_session.message_en,

        accept_session_status: this.settings.accept_session.status,
        accept_session_message_ar: this.settings.accept_session.message_ar,
        accept_session_message_en: this.settings.accept_session.message_en,

        reject_session_status: this.settings.reject_session.status,
        reject_session_message_ar: this.settings.reject_session.message_ar,
        reject_session_message_en: this.settings.reject_session.message_en,

        completed_session_status: this.settings.completed_session.status,
        completed_session_message_ar: this.settings.completed_session.message_ar,
        completed_session_message_en: this.settings.completed_session.message_en,

        started_session_status: this.settings.started_session.status,
        started_session_message_ar: this.settings.started_session.message_ar,
        started_session_message_en: this.settings.started_session.message_en,

        canceled_session_status: this.settings.canceled_session.status,
        canceled_session_message_ar: this.settings.canceled_session.message_ar,
        canceled_session_message_en: this.settings.canceled_session.message_en,

        reschedule_session_status: this.settings.reschedule_session.status,
        reschedule_session_message_ar: this.settings.reschedule_session.message_ar,
        reschedule_session_message_en: this.settings.reschedule_session.message_en,

        payment_required_status: this.settings.payment_required.status,
        payment_required_message_ar: this.settings.payment_required.message_ar,
        payment_required_message_en: this.settings.payment_required.message_en,

        profile_activation_status: this.settings.profile_activation.status,
        profile_activation_message_ar: this.settings.profile_activation.message_ar,
        profile_activation_message_en: this.settings.profile_activation.message_en,
      }
      // console.log('form :>> ', form);
      
      const data = await this.$axios.$post("/dashboard/settings/notifications/update", form);
      if (data.statusCode === 200) {
        this.$toast.success(data.message, { icon: 'mdi-check' })
        this.getAllSettings()
      } else {
        this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
      }
    }
  }
}
</script>
<style lang="scss">
  .settings-page{
    .link{
      text-decoration: unset;
    }
  }
</style>
