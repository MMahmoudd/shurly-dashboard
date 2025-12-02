<template>
  <div class="settings-page">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <!-- {{$t('settings.generalSettings')}} -->
            اعدادات سحب الاموال
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="4" cols="12">
                <label>
                  الحد الادني لسحب الاموال للمستشار
                </label>
                <v-text-field
                  v-model="settings.minimum_withdrawal_amount"
                  placeholder="الحد الادني لسحب الاموال للمستشار"
                  outlined
                  dense
                  hide-details
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  عدد ايام سحب الاموال للمستشار
                </label>
                <v-text-field
                  v-model="settings.days_to_withdraw"
                  placeholder="عدد ايام سحب الاموال للمستشار"
                  outlined
                  dense
                  hide-details
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  فترة السحب أيام
                </label>
                <v-text-field
                  v-model="settings.withdrawal_interval_days"
                  placeholder="فترة السحب أيام"
                  outlined
                  dense
                  hide-details
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  نسبة التطبيق
                </label>
                <v-text-field
                  v-model="settings.user_fees"
                  placeholder="نسبة التطبيق"
                  outlined
                  dense
                  hide-details
                                    type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="4" cols="12">
                <label>
                  طريقة حساب نسبة التطبيق
                </label>
                <v-select
                  v-model="settings.fee_type"
                  :items="types"
                  item-text="item_ar"
                  item-value="item_en"
                  placeholder="طريقة حساب نسبة التطبيق"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
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
      settings: {
        minimum_withdrawal_amount: "",
        days_to_withdraw: "",
        withdrawal_interval_days: "",
        user_fees: "",
        fee_type: ""
      },
      types: [
        {item_ar: "نسبة مئوية", item_en: "percentage"},
        {item_ar: "قيمة ثابتة", item_en: "fixed"}
      ],
      toolbarEditor: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: "left" }, { align: "center" }, { align: "right"}, { align: "justify"}],
            [{ color: "color-picker" }],
            ["code-block"],
        ],
    }
  },
  created () {
    this.getAllSettings()
  },
  methods: {
    async getAllSettings() {
      const data = await this.$axios.$get("/dashboard/settings/payout");
      this.settings = data.data
    },
    async submitFrom() {
      const formData = new FormData()
      formData.append("minimum_withdrawal_amount", this.settings.minimum_withdrawal_amount);
      formData.append("days_to_withdraw", this.settings.days_to_withdraw);
      formData.append("withdrawal_interval_days", this.settings.withdrawal_interval_days);
      formData.append("user_fees", this.settings.user_fees);
      formData.append("fee_type", this.settings.fee_type);

      const data = await this.$axios.$post("/dashboard/settings/payout/update", formData);
      if (data.statusCode === 201) {
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
