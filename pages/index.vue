<template>
  <div class="dashboard-page">
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="8">
        <h1 class="text-h5 mb-1">{{ $t('dashboard.title') }}</h1>
        <p class="text-body-2 mb-0">{{ $t('dashboard.subtitle') }}</p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-md-end">
        <v-btn color="primary" :loading="loading" @click="fetchDashboardData">
          {{ $t('dashboard.refresh') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="errorI18nKey" type="error" dense outlined class="mb-4">
      {{ $t(errorI18nKey) }}
    </v-alert>

    <v-row v-if="visibleTopCards.length">
      <v-col
        v-for="card in visibleTopCards"
        :key="card.key"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card class="fill-height">
          <v-card-text>
            <p class="text-caption mb-1 grey--text text--darken-1">{{ $t(card.titleKey) }}</p>
            <p class="text-h6 mb-0">{{ formatKpiValue(card.value, card.type) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showHomeChartsRow" class="mt-1">
      <v-col v-if="showSessionsChart" cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ sessionsChartTitle }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="chartData.sessionsTrend"
              color="primary"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showNoShowChart" cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.noShowTrend') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="chartData.noShowTrend"
              color="warning"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showRevenueChart" cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.revenueTrend') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="chartData.revenueTrend"
              color="success"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="showSnipsSection">
    <v-row class="mt-4" align="center">
      <v-col cols="12">
        <h2 class="text-h6 mb-0">{{ $t('dashboard.section.snipsTitle') }}</h2>
        <!-- <p class="text-caption grey--text mb-0">{{ $t('dashboard.section.snipsHint') }}</p> -->
      </v-col>
    </v-row>

    <v-row v-if="visibleSnipsKpiCards.length" class="mt-1">
      <v-col
        v-for="card in visibleSnipsKpiCards"
        :key="card.key"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="fill-height">
          <v-card-text>
            <p class="text-caption mb-1 grey--text text--darken-1">{{ $t(card.titleKey) }}</p>
            <p class="text-h6 mb-0">{{ formatKpiValue(card.value, card.type) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showSnipsChartsRow" class="mt-1">
      <v-col v-if="showSnipsViewsSparkline" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.viewsCurrentPage') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="snipsCharts.viewsPerVideoPage"
              color="deep-orange"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showSnipsMostWatchedSparkline" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.mostWatchedByViews') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="snipsCharts.mostWatchedSeries"
              color="orange darken-2"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showSnipsTablesRow" class="mt-1">
      <v-col v-if="showSnipsViewsTable" cols="12" md="6">
        <v-card :loading="snipsListLoading">
          <v-card-title class="text-subtitle-1 d-flex flex-wrap align-center">
            {{ $t('dashboard.cards.viewsPerVideo') }}
            <v-spacer />
            <span class="text-caption grey--text">{{ snipsViewsMetaCaption }}</span>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-data-table
              dense
              :headers="snipsVideoTableHeaders"
              :items="snipsTables.viewsPerVideo"
              :items-per-page="-1"
              hide-default-footer
              class="elevation-0"
            >
              <template #[`item.advisorCell`]="{ item }">
                <div class="d-flex align-center py-1">
                  <v-avatar v-if="item.advisor_image" size="28" class="mr-2">
                    <img :src="item.advisor_image" alt="">
                  </v-avatar>
                  <v-avatar v-else size="28" color="grey lighten-2" class="mr-2">
                    <v-icon x-small color="grey darken-1">mdi-account</v-icon>
                  </v-avatar>
                  <span>{{ item.advisor_name }}</span>
                </div>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                  v-if="item.video_url"
                  icon
                  small
                  :href="item.video_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
                <span v-else>{{ $t('dashboard.emDash') }}</span>
              </template>
            </v-data-table>
            <v-pagination
              v-if="snipsViewsPagination.lastPage > 1"
              v-model="snipsPage"
              class="mt-3"
              :length="snipsViewsPagination.lastPage"
              :disabled="snipsListLoading"
              @input="onSnipsPageChange"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showSnipsMostWatchedTable" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.mostWatchedVideos') }}</v-card-title>
          <v-data-table
            dense
            :headers="snipsVideoTableHeaders"
            :items="snipsTables.mostWatchedVideos"
            :items-per-page="10"
            class="elevation-0"
          >
            <template #[`item.advisorCell`]="{ item }">
              <div class="d-flex align-center py-1">
                <v-avatar v-if="item.advisor_image" size="28" class="mr-2">
                  <img :src="item.advisor_image" alt="">
                </v-avatar>
                <v-avatar v-else size="28" color="grey lighten-2" class="mr-2">
                  <v-icon x-small color="grey darken-1">mdi-account</v-icon>
                </v-avatar>
                <span>{{ item.advisor_name }}</span>
              </div>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-btn
                v-if="item.video_url"
                icon
                small
                :href="item.video_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon small>mdi-open-in-new</v-icon>
              </v-btn>
              <span v-else>{{ $t('dashboard.emDash') }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    </template>

    <template v-if="showMaterialsSection">
    <v-row class="mt-4" align="center">
      <v-col cols="12">
        <h2 class="text-h6 mb-0">{{ $t('dashboard.section.materialsTitle') }}</h2>
        <!-- <p class="text-caption grey--text mb-0">{{ $t('dashboard.section.materialsHint') }}</p> -->
      </v-col>
    </v-row>

    <v-row v-if="visibleMaterialsKpiCards.length" class="mt-1">
      <v-col
        v-for="card in visibleMaterialsKpiCards"
        :key="card.key"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="fill-height">
          <v-card-text>
            <p class="text-caption mb-1 grey--text text--darken-1">{{ $t(card.titleKey) }}</p>
            <p class="text-h6 mb-0">{{ formatKpiValue(card.value, card.type) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showMaterialsChartsRow" class="mt-1">
      <v-col v-if="showMaterialsDownloadsChart" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.downloadsPerItem') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="materialsCharts.downloadsPerItem"
              color="cyan"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showMaterialsTopTypesChart" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.topSellingContentTypes') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="materialsCharts.topSellingTypes"
              color="amber darken-2"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showMaterialsRevenueOrDownloadsRow" class="mt-1">
      <v-col v-if="showMaterialsRevenueTable" cols="12" md="6">
        <v-card :loading="materialsListLoading">
          <v-card-title class="text-subtitle-1 d-flex flex-wrap align-center">
            {{ $t('dashboard.cards.revenuePerMaterial') }}
            <v-spacer />
            <span class="text-caption grey--text">
              {{ materialsRevenueMetaCaption }}
            </span>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-data-table
              dense
              :headers="materialsRevenueHeaders"
              :items="materialsTables.revenuePerMaterial"
              :items-per-page="-1"
              hide-default-footer
              class="elevation-0"
            />
            <v-pagination
              v-if="materialsRevenuePagination.lastPage > 1"
              v-model="materialsPage"
              class="mt-3"
              :length="materialsRevenuePagination.lastPage"
              :disabled="materialsListLoading"
              @input="onMaterialsPageChange"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showMaterialsDownloadsTable" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.downloadsDetail') }}</v-card-title>
          <v-data-table
            dense
            :headers="materialsDownloadsHeaders"
            :items="materialsTables.downloadsPerItem"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showMaterialsConversionOrTypesRow" class="mt-1">
      <v-col v-if="showMaterialsConversionTable" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.conversionPerMaterial') }}</v-card-title>
          <v-data-table
            dense
            :headers="materialsConversionHeaders"
            :items="materialsTables.conversionPerMaterial"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
      <v-col v-if="showMaterialsTopTypesTable" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.topTypesDetail') }}</v-card-title>
          <v-data-table
            dense
            :headers="materialsTopTypesHeaders"
            :items="materialsTables.topSellingContentTypes"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
    </v-row>
    </template>

    <template v-if="showCommunitySection">
    <v-row class="mt-4" align="center">
      <v-col cols="12">
        <h2 class="text-h6 mb-0">{{ $t('dashboard.section.communityTitle') }}</h2>
        <!-- <p class="text-caption grey--text mb-0">{{ $t('dashboard.section.communityHint') }}</p> -->
      </v-col>
    </v-row>

    <v-row v-if="showCommunityChartsRow" class="mt-1">
      <v-col v-if="showCommunityQuestionsPerDayChart" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.questionsPerDay') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="communityCharts.questionsPerDay"
              color="deep-purple"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="showCommunityQuestionsPerWeekChart" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.chart.questionsPerWeek') }}</v-card-title>
          <v-card-text>
            <v-sparkline
              :value="communityCharts.questionsPerWeek"
              color="indigo"
              line-width="2"
              padding="16"
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showCommunityTablesRow1" class="mt-1">
      <v-col v-if="communityTables.engagementPerTopic.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.engagementPerTopic') }}</v-card-title>
          <v-data-table
            dense
            :headers="communityEngagementHeaders"
            :items="communityTables.engagementPerTopic"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
      <v-col v-if="communityTables.activeUsers.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.activeUsers') }}</v-card-title>
          <v-data-table
            dense
            :headers="communityActiveUsersHeaders"
            :items="communityTables.activeUsers"
            :items-per-page="8"
            class="elevation-0"
          >
            <template #[`item.name`]="{ item }">
              <div class="d-flex align-center py-1">
                <v-avatar v-if="item.image" size="32" class="mr-2">
                  <img :src="item.image" alt="">
                </v-avatar>
                <v-avatar v-else size="32" color="grey lighten-2" class="mr-2">
                  <v-icon small color="grey darken-1">mdi-account</v-icon>
                </v-avatar>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showCommunityTablesRow2" class="mt-1">
      <v-col v-if="communityTables.answersPerQuestion.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.answersPerQuestion') }}</v-card-title>
          <v-data-table
            dense
            :headers="communityAnswersPerQuestionHeaders"
            :items="communityTables.answersPerQuestion"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
      <v-col v-if="communityTables.likesPerAnswer.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.likesPerAnswer') }}</v-card-title>
          <v-data-table
            dense
            :headers="communityLikesPerAnswerHeaders"
            :items="communityTables.likesPerAnswer"
            :items-per-page="8"
            class="elevation-0"
          />
        </v-card>
      </v-col>
    </v-row>
    </template>

    <v-row v-if="showMentorsSection" class="mt-4" align="center">
      <v-col cols="12">
        <h2 class="text-h6 mb-0">{{ $t('dashboard.section.mentorsTitle') }}</h2>
        <p class="text-caption grey--text mb-0">{{ $t('dashboard.section.mentorsHint') }}</p>
      </v-col>
    </v-row>

    <v-row v-if="showMentorsRow1" class="mt-1">
      <v-col v-if="tables.topMentorsByReliability.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.topMentorsReliability') }}</v-card-title>
          <v-data-table
            dense
            :headers="reliabilityHeaders"
            :items="tables.topMentorsByReliability"
            :items-per-page="5"
            class="elevation-0"
          />
        </v-card>
      </v-col>
      <v-col v-if="tables.topMentorsByEarnings.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.topMentorsEarnings') }}</v-card-title>
          <v-data-table
            dense
            :headers="earningsHeaders"
            :items="tables.topMentorsByEarnings"
            :items-per-page="5"
            class="elevation-0"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="showMentorsRow2" class="mt-1">
      <v-col v-if="tables.riskyMentors.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.riskyMentors') }}</v-card-title>
          <v-data-table
            dense
            :headers="riskyHeaders"
            :items="tables.riskyMentors"
            :items-per-page="5"
            class="elevation-0"
          />
        </v-card>
      </v-col>
      <v-col v-if="tables.recentFailedSessions.length" cols="12" md="6">
        <v-card>
          <v-card-title class="text-subtitle-1">{{ $t('dashboard.cards.recentFailedSessions') }}</v-card-title>
          <v-data-table
            dense
            :headers="failedSessionsHeaders"
            :items="tables.recentFailedSessions"
            :items-per-page="5"
            class="elevation-0"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['authenticated'],
  data() {
    return {
      loading: false,
      errorI18nKey: '',
      analyticsRaw: {},
      materialsAnalyticsRaw: {},
      snipsAnalyticsRaw: {},
      communityAnalyticsRaw: {},
      materialsPage: 1,
      materialsListLoading: false,
      snipsPage: 1,
      snipsListLoading: false,
    }
  },
  computed: {
    mergedAnalytics() {
      return {
        ...this.analyticsRaw,
      }
    },
    reliabilityHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.mentor'), value: 'name' },
        { text: this.$t('dashboard.table.completed'), value: 'completedSessions' },
        { text: this.$t('dashboard.table.accepted'), value: 'acceptedSessions' },
        { text: this.$t('dashboard.table.reliabilityPercent'), value: 'reliabilityScore' },
      ]
    },
    earningsHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.mentor'), value: 'name' },
        { text: this.$t('dashboard.table.earnings'), value: 'earnings' },
      ]
    },
    riskyHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.mentor'), value: 'name' },
        { text: this.$t('dashboard.table.misses'), value: 'misses' },
        { text: this.$t('dashboard.table.reliabilityPercent'), value: 'reliabilityScore' },
      ]
    },
    failedSessionsHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.session'), value: 'sessionId' },
        { text: this.$t('dashboard.table.mentor'), value: 'mentorName' },
        { text: this.$t('dashboard.table.reason'), value: 'reason' },
        { text: this.$t('dashboard.table.date'), value: 'date' },
      ]
    },
    communityEngagementHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.topic'), value: 'name' },
        { text: this.$t('dashboard.table.questions'), value: 'questions_count' },
        { text: this.$t('dashboard.table.answers'), value: 'answers_count' },
        { text: this.$t('dashboard.table.likes'), value: 'likes_count' },
      ]
    },
    communityAnswersPerQuestionHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.question'), value: 'question_text' },
        { text: this.$t('dashboard.table.answers'), value: 'answers_count' },
      ]
    },
    communityLikesPerAnswerHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.answer'), value: 'answer_text' },
        { text: this.$t('dashboard.table.likes'), value: 'likes_count' },
      ]
    },
    communityActiveUsersHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.user'), value: 'name', sortable: false },
        { text: this.$t('dashboard.table.questions'), value: 'questions_posted' },
        { text: this.$t('dashboard.table.answers'), value: 'answers_posted' },
        { text: this.$t('dashboard.table.likesGiven'), value: 'likes_given' },
        { text: this.$t('dashboard.table.totalActivity'), value: 'total_activity' },
      ]
    },
    materialsRevenueHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.material'), value: 'label' },
        { text: this.$t('dashboard.table.revenue'), value: 'revenue_display' },
      ]
    },
    materialsDownloadsHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.item'), value: 'label' },
        { text: this.$t('dashboard.table.downloads'), value: 'downloads' },
      ]
    },
    materialsConversionHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.material'), value: 'label' },
        { text: this.$t('dashboard.table.conversionPercent'), value: 'rate_display' },
      ]
    },
    materialsTopTypesHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.type'), value: 'label' },
        { text: this.$t('dashboard.table.countShare'), value: 'count_display' },
      ]
    },
    snipsVideoTableHeaders() {
      void this.$i18n.locale
      return [
        { text: this.$t('dashboard.table.title'), value: 'title' },
        { text: this.$t('dashboard.table.advisor'), value: 'advisorCell', sortable: false },
        { text: this.$t('dashboard.table.views'), value: 'views_count' },
        { text: this.$t('dashboard.table.created'), value: 'created_at' },
        { text: '', value: 'actions', sortable: false, width: '48px' },
      ]
    },
    snipsPayload() {
      return this.snipsAnalyticsRaw && typeof this.snipsAnalyticsRaw === 'object'
        ? this.snipsAnalyticsRaw
        : {}
    },
    snipsViewsPaginator() {
      const s = this.snipsPayload
      const paginator = s.views_per_video || s.viewsPerVideo
      if (paginator && typeof paginator === 'object' && Array.isArray(paginator.data)) {
        return paginator
      }
      return { data: [], current_page: 1, last_page: 1, total: 0, per_page: 20 }
    },
    snipsViewsPagination() {
      const p = this.snipsViewsPaginator
      return {
        currentPage: Number(p.current_page || p.currentPage || 1),
        lastPage: Math.max(1, Number(p.last_page || p.lastPage || 1)),
        total: Number(p.total || 0),
        perPage: Number(p.per_page || p.perPage || 20),
      }
    },
    snipsViewsMetaCaption() {
      const { currentPage, lastPage, total } = this.snipsViewsPagination
      return this.$t('dashboard.paginationShort', {
        current: currentPage,
        last: lastPage,
        total,
      })
    },
    snipsKpiCards() {
      const s = this.snipsPayload
      return [
        {
          key: 'totalVideoUploads',
          fieldKeys: ['total_video_uploads', 'totalVideoUploads'],
          titleKey: 'dashboard.kpi.totalVideoUploads',
          type: 'number',
          value: this.pickNumber(s, ['total_video_uploads', 'totalVideoUploads']),
        },
      ]
    },
    visibleSnipsKpiCards() {
      return this.snipsKpiCards.filter((card) => this.keysPresentOnPayload(this.snipsPayload, card.fieldKeys))
    },
    showSnipsViewsSparkline() {
      return (this.snipsViewsPaginator.data || []).length > 0
    },
    showSnipsMostWatchedSparkline() {
      return this.pickArray(this.snipsPayload, ['most_watched_videos', 'mostWatchedVideos']).length > 0
    },
    showSnipsChartsRow() {
      return this.showSnipsViewsSparkline || this.showSnipsMostWatchedSparkline
    },
    showSnipsViewsTable() {
      return this.showSnipsViewsSparkline || this.snipsViewsPagination.total > 0
    },
    showSnipsMostWatchedTable() {
      return this.snipsTables.mostWatchedVideos.length > 0
    },
    showSnipsTablesRow() {
      return this.showSnipsViewsTable || this.showSnipsMostWatchedTable
    },
    showSnipsSection() {
      return (
        this.visibleSnipsKpiCards.length > 0 ||
        this.showSnipsChartsRow ||
        this.showSnipsTablesRow
      )
    },
    snipsCharts() {
      const pageRows = [...(this.snipsViewsPaginator.data || [])]
      pageRows.sort((a, b) => String(a.created_at || '').localeCompare(String(b.created_at || '')))
      const most = [...this.pickArray(this.snipsPayload, ['most_watched_videos', 'mostWatchedVideos'])]
      most.sort((a, b) => this.pickNumber(b, ['views_count', 'viewsCount']) - this.pickNumber(a, ['views_count', 'viewsCount']))
      return {
        viewsPerVideoPage: pageRows.length ? this.mapPointsToSeriesValues(pageRows) : [0],
        mostWatchedSeries: most.length ? this.mapPointsToSeriesValues(most) : [0],
      }
    },
    snipsTables() {
      const mapRow = (row, index) => {
        const advisor = row.advisor && typeof row.advisor === 'object' ? row.advisor : {}
        const name = this.pickText(advisor, ['name'])
        return {
          id: row.id ?? index,
          title:
            this.pickText(row, ['title']) === '-'
              ? this.$t('dashboard.fallback.video', { id: row.id ?? index })
              : this.pickText(row, ['title']),
          advisorCell: '',
          advisor_name: name === '-' ? this.$t('dashboard.emDash') : name,
          advisor_image: advisor.image || null,
          views_count: this.pickNumber(row, ['views_count', 'viewsCount']),
          created_at: this.pickText(row, ['created_at', 'createdAt']),
          video_url: this.pickText(row, ['video_full_path', 'videoFullPath']) === '-'
            ? ''
            : this.pickText(row, ['video_full_path', 'videoFullPath']),
        }
      }
      const viewsRows = (this.snipsViewsPaginator.data || []).map((row, i) => mapRow(row, i))
      const mostRows = this.pickArray(this.snipsPayload, ['most_watched_videos', 'mostWatchedVideos']).map((row, i) =>
        mapRow(row, i),
      )
      mostRows.sort((a, b) => b.views_count - a.views_count)
      return {
        viewsPerVideo: viewsRows,
        mostWatchedVideos: mostRows,
      }
    },
    materialsPayload() {
      return this.materialsAnalyticsRaw && typeof this.materialsAnalyticsRaw === 'object'
        ? this.materialsAnalyticsRaw
        : {}
    },
    materialsRevenuePaginator() {
      const m = this.materialsPayload
      const paginator = m.revenue_per_material || m.revenuePerMaterial
      if (paginator && typeof paginator === 'object' && Array.isArray(paginator.data)) {
        return paginator
      }
      return { data: [], current_page: 1, last_page: 1, total: 0, per_page: 20 }
    },
    materialsRevenuePagination() {
      const p = this.materialsRevenuePaginator
      return {
        currentPage: Number(p.current_page || p.currentPage || 1),
        lastPage: Math.max(1, Number(p.last_page || p.lastPage || 1)),
        total: Number(p.total || 0),
        perPage: Number(p.per_page || p.perPage || 20),
      }
    },
    materialsRevenueMetaCaption() {
      const { currentPage, lastPage, total } = this.materialsRevenuePagination
      return this.$t('dashboard.paginationShort', {
        current: currentPage,
        last: lastPage,
        total,
      })
    },
    materialsKpiCards() {
      const m = this.materialsPayload
      const totalAppRevenue = this.pickNumber(m, ['total_app_revenue', 'totalAppRevenue'])
      return [
        {
          key: 'totalMaterials',
          fieldKeys: ['total_materials_uploaded', 'totalMaterialsUploaded'],
          titleKey: 'dashboard.kpi.totalMaterialsUploaded',
          type: 'number',
          value: this.pickNumber(m, ['total_materials_uploaded', 'totalMaterialsUploaded']),
        },
        {
          key: 'totalAppRevenue',
          fieldKeys: ['total_app_revenue', 'totalAppRevenue'],
          titleKey: 'dashboard.kpi.totalAppRevenueMaterials',
          type: 'currency',
          value: totalAppRevenue,
        },
      ]
    },
    visibleMaterialsKpiCards() {
      return this.materialsKpiCards.filter((card) => this.keysPresentOnPayload(this.materialsPayload, card.fieldKeys))
    },
    showMaterialsDownloadsChart() {
      return this.pickArray(this.materialsPayload, ['downloads_per_item', 'downloadsPerItem']).length > 0
    },
    showMaterialsTopTypesChart() {
      return this.pickArray(this.materialsPayload, ['top_selling_content_types', 'topSellingContentTypes']).length > 0
    },
    showMaterialsChartsRow() {
      return this.showMaterialsDownloadsChart || this.showMaterialsTopTypesChart
    },
    showMaterialsRevenueTable() {
      return (
        this.materialsTables.revenuePerMaterial.length > 0 || this.materialsRevenuePagination.total > 0
      )
    },
    showMaterialsDownloadsTable() {
      return this.materialsTables.downloadsPerItem.length > 0
    },
    showMaterialsRevenueOrDownloadsRow() {
      return this.showMaterialsRevenueTable || this.showMaterialsDownloadsTable
    },
    showMaterialsConversionTable() {
      return this.materialsTables.conversionPerMaterial.length > 0
    },
    showMaterialsTopTypesTable() {
      return this.materialsTables.topSellingContentTypes.length > 0
    },
    showMaterialsConversionOrTypesRow() {
      return this.showMaterialsConversionTable || this.showMaterialsTopTypesTable
    },
    showMaterialsSection() {
      return (
        this.visibleMaterialsKpiCards.length > 0 ||
        this.showMaterialsChartsRow ||
        this.showMaterialsRevenueOrDownloadsRow ||
        this.showMaterialsConversionOrTypesRow
      )
    },
    materialsCharts() {
      const m = this.materialsPayload
      const downloads = this.pickArray(m, ['downloads_per_item', 'downloadsPerItem'])
      const topTypes = this.pickArray(m, ['top_selling_content_types', 'topSellingContentTypes'])
      return {
        downloadsPerItem: downloads.length ? this.mapPointsToSeriesValues(downloads) : [0],
        topSellingTypes: topTypes.length ? this.mapPointsToSeriesValues(topTypes) : [0],
      }
    },
    materialsTables() {
      const m = this.materialsPayload
      const labelFrom = (row) =>
        this.pickText(row, [
          'title',
          'name',
          'material_title',
          'materialTitle',
          'content_title',
          'contentTitle',
          'label',
        ])
      const revenueRows = (this.materialsRevenuePaginator.data || []).map((row, index) => {
        const revenue = this.pickNumber(row, ['revenue', 'total_revenue', 'totalRevenue', 'amount', 'total', 'price'])
        return {
          id: row.id ?? `r-${index}`,
          label:
            labelFrom(row) === '-'
              ? this.$t('dashboard.fallback.material', { id: row.id ?? index })
              : labelFrom(row),
          revenue_display: this.formatKpiValue(revenue, 'currency'),
        }
      })
      const downloadsRows = this.pickArray(m, ['downloads_per_item', 'downloadsPerItem']).map((row, index) => ({
        id: row.id ?? `d-${index}`,
        label:
          labelFrom(row) === '-'
            ? this.$t('dashboard.fallback.item', { id: row.id ?? index })
            : labelFrom(row),
        downloads: this.pickNumber(row, ['downloads', 'downloads_count', 'downloadsCount', 'count', 'total']),
      }))
      const conversionRows = this.pickArray(m, ['conversion_rate_per_material', 'conversionRatePerMaterial']).map(
        (row, index) => {
          const rate = this.pickNumber(row, [
            'conversion_rate',
            'conversionRate',
            'rate',
            'percentage',
            'percent',
          ])
          return {
            id: row.id ?? `c-${index}`,
            label:
              labelFrom(row) === '-'
                ? this.$t('dashboard.fallback.material', { id: row.id ?? index })
                : labelFrom(row),
            rate_display: `${Number(rate || 0).toFixed(2)}%`,
          }
        },
      )
      const topTypesRows = this.pickArray(m, ['top_selling_content_types', 'topSellingContentTypes']).map(
        (row, index) => {
          const cnt = this.pickNumber(row, ['count', 'total', 'sales', 'sales_count', 'quantity', 'amount'])
          return {
            id: row.id ?? `t-${index}`,
            label: this.pickText(row, ['type', 'content_type', 'contentType', 'name', 'label']),
            count_display: cnt.toLocaleString(),
          }
        },
      )
      return {
        revenuePerMaterial: revenueRows,
        downloadsPerItem: downloadsRows,
        conversionPerMaterial: conversionRows,
        topSellingContentTypes: topTypesRows,
      }
    },
    communityPayload() {
      return this.communityAnalyticsRaw && typeof this.communityAnalyticsRaw === 'object'
        ? this.communityAnalyticsRaw
        : {}
    },
    communityCharts() {
      const c = this.communityPayload
      const perDay = [...this.pickArray(c, ['questions_per_day', 'questionsPerDay'])]
      perDay.sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
      const perWeek = [...this.pickArray(c, ['questions_per_week', 'questionsPerWeek'])]
      perWeek.sort((a, b) => Number(a.year_week || 0) - Number(b.year_week || 0))
      return {
        questionsPerDay: perDay.length ? this.mapPointsToSeriesValues(perDay) : [0],
        questionsPerWeek: perWeek.length ? this.mapPointsToSeriesValues(perWeek) : [0],
      }
    },
    communityTables() {
      const c = this.communityPayload
      const truncate = (s, max = 72) => {
        const t = s !== undefined && s !== null ? `${s}`.trim() : ''
        if (!t) return this.$t('dashboard.emDash')
        return t.length > max ? `${t.slice(0, max)}…` : t
      }
      const engagement = this.pickArray(c, ['engagement_per_topic', 'engagementPerTopic']).map((row) => ({
        id: row.id,
        name: this.pickText(row, ['name']),
        questions_count: this.pickNumber(row, ['questions_count', 'questionsCount']),
        answers_count: this.pickNumber(row, ['answers_count', 'answersCount']),
        likes_count: this.pickNumber(row, ['likes_count', 'likesCount']),
      }))
      const answersPerQ = this.pickArray(c, ['answers_per_question', 'answersPerQuestion']).map((row) => ({
        id: row.id,
        question_text: truncate(this.pickText(row, ['question_text', 'questionText'])),
        answers_count: this.pickNumber(row, ['answers_count', 'answersCount']),
      }))
      const likesPerA = this.pickArray(c, ['likes_per_answer', 'likesPerAnswer']).map((row) => ({
        id: row.id,
        answer_text: truncate(this.pickText(row, ['answer_text', 'answerText'])),
        likes_count: this.pickNumber(row, ['likes_count', 'likesCount']),
      }))
      const active = [...this.pickArray(c, ['active_users', 'activeUsers'])].map((row) => ({
        id: row.id,
        name:
          this.pickText(row, ['name']) === '-'
            ? this.$t('dashboard.fallback.user', { id: row.id })
            : this.pickText(row, ['name']),
        image: row.image || null,
        questions_posted: this.pickNumber(row, ['questions_posted', 'questionsPosted']),
        answers_posted: this.pickNumber(row, ['answers_posted', 'answersPosted']),
        likes_given: this.pickNumber(row, ['likes_given', 'likesGiven']),
        total_activity: this.pickNumber(row, ['total_activity', 'totalActivity']),
      }))
      active.sort((a, b) => b.total_activity - a.total_activity)
      return {
        engagementPerTopic: engagement,
        answersPerQuestion: answersPerQ,
        likesPerAnswer: likesPerA,
        activeUsers: active,
      }
    },
    topCards() {
      const data = this.mergedAnalytics
      return [
        {
          key: 'totalBookings',
          fieldKeys: ['total_bookings', 'total_sessions', 'totalSessions', 'sessions_total'],
          titleKey: 'dashboard.kpi.totalBookings',
          type: 'number',
          value: this.pickNumber(data, ['total_bookings', 'total_sessions', 'totalSessions', 'sessions_total']),
        },
        {
          key: 'bookingConversionRate',
          fieldKeys: ['booking_conversion_rate', 'bookingConversionRate'],
          titleKey: 'dashboard.kpi.bookingConversionRate',
          type: 'percentage',
          value: this.pickNumber(data, ['booking_conversion_rate', 'bookingConversionRate']),
        },
        {
          key: 'sessionCompletionRate',
          fieldKeys: ['session_completion_rate', 'sessionCompletionRate', 'success_rate', 'successRate'],
          titleKey: 'dashboard.kpi.sessionCompletionRate',
          type: 'percentage',
          value: this.pickNumber(data, ['session_completion_rate', 'sessionCompletionRate', 'success_rate', 'successRate']),
        },
        {
          key: 'cancelledOrRescheduled',
          fieldKeys: ['cancelled_or_rescheduled_sessions', 'cancelledOrRescheduledSessions', 'emergency_cancellations', 'emergencyCancellations'],
          titleKey: 'dashboard.kpi.cancelledOrRescheduled',
          type: 'number',
          value: this.pickNumber(data, ['cancelled_or_rescheduled_sessions', 'cancelledOrRescheduledSessions', 'emergency_cancellations', 'emergencyCancellations']),
        },
        {
          key: 'avgTimeToNextSlot',
          fieldKeys: ['average_time_to_next_available_slot', 'averageTimeToNextAvailableSlot'],
          titleKey: 'dashboard.kpi.avgTimeToNextSlot',
          type: 'text',
          value: this.pickText(data, ['average_time_to_next_available_slot', 'averageTimeToNextAvailableSlot']),
        },
        {
          key: 'mentorNoShowRate',
          fieldKeys: ['mentor_no_show_rate', 'mentorNoShowRate', 'no_show_rate', 'noShowRate'],
          titleKey: 'dashboard.kpi.mentorNoShowRate',
          type: 'percentage',
          value: this.pickNumber(data, ['mentor_no_show_rate', 'mentorNoShowRate', 'no_show_rate', 'noShowRate']),
        },
        {
          key: 'refundValue',
          fieldKeys: ['refund_value', 'refundValue', 'refunds_total'],
          titleKey: 'dashboard.kpi.refundValue',
          type: 'currency',
          value: this.pickNumber(data, ['refund_value', 'refundValue', 'refunds_total']),
        },
        {
          key: 'netRevenue',
          fieldKeys: ['net_revenue', 'netRevenue', 'revenue_net'],
          titleKey: 'dashboard.kpi.netRevenue',
          type: 'currency',
          value: this.pickNumber(data, ['net_revenue', 'netRevenue', 'revenue_net']),
        },
      ]
    },
    visibleTopCards() {
      return this.topCards.filter((card) => this.keysPresentOnPayload(this.analyticsRaw, card.fieldKeys))
    },
    showSessionsChart() {
      const d = this.mergedAnalytics
      return (
        this.pickArray(d, ['sessions_trend', 'sessionsTrend', 'sessions_over_time']).length > 0 ||
        this.pickArray(d, ['popular_booking_hours', 'popularBookingHours']).length > 0
      )
    },
    showNoShowChart() {
      return this.pickArray(this.mergedAnalytics, ['no_show_trend', 'noShowTrend']).length > 0
    },
    showRevenueChart() {
      return this.pickArray(this.mergedAnalytics, ['revenue_trend', 'revenueTrend']).length > 0
    },
    showHomeChartsRow() {
      return this.showSessionsChart || this.showNoShowChart || this.showRevenueChart
    },
    showCommunityQuestionsPerDayChart() {
      return this.pickArray(this.communityPayload, ['questions_per_day', 'questionsPerDay']).length > 0
    },
    showCommunityQuestionsPerWeekChart() {
      return this.pickArray(this.communityPayload, ['questions_per_week', 'questionsPerWeek']).length > 0
    },
    showCommunityChartsRow() {
      return this.showCommunityQuestionsPerDayChart || this.showCommunityQuestionsPerWeekChart
    },
    showCommunityTablesRow1() {
      return this.communityTables.engagementPerTopic.length > 0 || this.communityTables.activeUsers.length > 0
    },
    showCommunityTablesRow2() {
      return this.communityTables.answersPerQuestion.length > 0 || this.communityTables.likesPerAnswer.length > 0
    },
    showCommunitySection() {
      return (
        this.showCommunityChartsRow ||
        this.showCommunityTablesRow1 ||
        this.showCommunityTablesRow2
      )
    },
    showMentorsSection() {
      return (
        this.tables.topMentorsByReliability.length > 0 ||
        this.tables.topMentorsByEarnings.length > 0 ||
        this.tables.riskyMentors.length > 0 ||
        this.tables.recentFailedSessions.length > 0
      )
    },
    showMentorsRow1() {
      return this.tables.topMentorsByReliability.length > 0 || this.tables.topMentorsByEarnings.length > 0
    },
    showMentorsRow2() {
      return this.tables.riskyMentors.length > 0 || this.tables.recentFailedSessions.length > 0
    },
    sessionsChartTitle() {
      const data = this.mergedAnalytics
      const hasSessionsTrend = this.pickArray(data, ['sessions_trend', 'sessionsTrend', 'sessions_over_time']).length > 0
      const hasPopularHours = this.pickArray(data, ['popular_booking_hours', 'popularBookingHours']).length > 0
      if (hasPopularHours && !hasSessionsTrend) {
        return this.$t('dashboard.chart.popularBookingHours')
      }
      return this.$t('dashboard.chart.sessionsTrend')
    },
    chartData() {
      const data = this.mergedAnalytics
      return {
        sessionsTrend: this.resolveSessionsTrendSeries(data),
        noShowTrend: this.pickSeries(data, ['no_show_trend', 'noShowTrend']),
        revenueTrend: this.pickSeries(data, ['revenue_trend', 'revenueTrend']),
      }
    },
    tables() {
      const data = this.mergedAnalytics
      const reliabilityItems = this.pickArray(data, ['top_mentors_by_reliability', 'topMentorsByReliability']).map((item) => {
        const completed = this.pickNumber(item, ['completed_sessions', 'completedSessions'])
        const accepted = this.pickNumber(item, ['accepted_sessions', 'acceptedSessions'])
        const apiScore = this.pickNumber(item, ['reliability_score', 'reliabilityScore'])
        const reliabilityScore = accepted > 0 ? (completed / accepted) * 100 : apiScore

        return {
          name: this.pickText(item, ['mentor_name', 'mentorName', 'name']),
          completedSessions: completed,
          acceptedSessions: accepted,
          reliabilityScore: Number(reliabilityScore || 0).toFixed(2),
        }
      })

      return {
        topMentorsByReliability: reliabilityItems,
        topMentorsByEarnings: this.pickArray(data, ['top_mentors_by_earnings', 'topMentorsByEarnings']).map((item) => ({
          name: this.pickText(item, ['mentor_name', 'mentorName', 'name']),
          earnings: this.formatKpiValue(this.pickNumber(item, ['earnings', 'total_earnings', 'earning']), 'currency'),
        })),
        riskyMentors: this.pickArray(data, ['risky_mentors', 'riskyMentors']).map((item) => ({
          name: this.pickText(item, ['mentor_name', 'mentorName', 'name']),
          misses: this.pickNumber(item, ['misses', 'no_shows', 'repeated_misses']),
          reliabilityScore: Number(this.pickNumber(item, ['reliability_score', 'reliabilityScore'])).toFixed(2),
        })),
        recentFailedSessions: this.pickArray(data, ['recent_failed_sessions', 'recentFailedSessions']).map((item) => ({
          sessionId: this.pickText(item, ['session_id', 'sessionId', 'id']),
          mentorName: this.pickText(item, ['mentor_name', 'mentorName', 'name']),
          reason: this.pickText(item, ['reason', 'failure_reason', 'status']),
          date: this.pickText(item, ['date', 'created_at', 'createdAt']),
        })),
      }
    },
  },
  created() {
    this.fetchDashboardData()
  },
  methods: {
    async fetchDashboardData() {
      this.loading = true
      this.errorI18nKey = ''

      try {
        const [analytics, materialsAnalytics, snipsAnalytics, communityAnalytics] = await Promise.all([
          this.$axios.$get('/dashboard/home/analytics'),
          this.$axios.$get('/dashboard/home/materials-analytics', { params: { page: this.materialsPage } }),
          this.$axios.$get('/dashboard/home/snips-analytics', { params: { page: this.snipsPage } }),
          this.$axios.$get('/dashboard/home/community-analytics'),
        ])

        this.analyticsRaw = this.pickObject(analytics)
        this.materialsAnalyticsRaw = this.pickObject(materialsAnalytics)
        this.snipsAnalyticsRaw = this.pickObject(snipsAnalytics)
        this.communityAnalyticsRaw = this.pickObject(communityAnalytics)
        const mp = this.materialsRevenuePagination
        this.materialsPage = mp.currentPage
        const sp = this.snipsViewsPagination
        this.snipsPage = sp.currentPage
      } catch (error) {
        this.errorI18nKey = 'dashboard.errors.loadAll'
        this.$toast.error(this.$t('dashboard.errors.loadAll'), { icon: 'mdi-alert-circle' })
      } finally {
        this.loading = false
      }
    },
    async onSnipsPageChange(page) {
      const currentFromApi = this.snipsViewsPagination.currentPage
      if (!page || page === currentFromApi) {
        return
      }
      this.snipsListLoading = true
      try {
        const res = await this.$axios.$get('/dashboard/home/snips-analytics', { params: { page } })
        this.snipsAnalyticsRaw = this.pickObject(res)
        this.snipsPage = this.snipsViewsPagination.currentPage
      } catch (error) {
        this.snipsPage = currentFromApi
        this.$toast.error(this.$t('dashboard.errors.loadSnipsPage'), { icon: 'mdi-alert-circle' })
      } finally {
        this.snipsListLoading = false
      }
    },
    async onMaterialsPageChange(page) {
      const currentFromApi = this.materialsRevenuePagination.currentPage
      if (!page || page === currentFromApi) {
        return
      }
      this.materialsListLoading = true
      try {
        const res = await this.$axios.$get('/dashboard/home/materials-analytics', { params: { page } })
        this.materialsAnalyticsRaw = this.pickObject(res)
        this.materialsPage = this.materialsRevenuePagination.currentPage
      } catch (error) {
        this.materialsPage = currentFromApi
        this.$toast.error(this.$t('dashboard.errors.loadMaterialsPage'), { icon: 'mdi-alert-circle' })
      } finally {
        this.materialsListLoading = false
      }
    },
    pickObject(response) {
      if (!response || typeof response !== 'object') {
        return {}
      }

      return response.data && typeof response.data === 'object' ? response.data : response
    },
    keysPresentOnPayload(payload, keys) {
      if (!payload || typeof payload !== 'object') {
        return false
      }
      for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(payload, key)) {
          continue
        }
        const v = payload[key]
        if (v === null || v === undefined) {
          continue
        }
        if (typeof v === 'string' && v.trim() === '') {
          continue
        }
        if (Array.isArray(v) && v.length === 0) {
          continue
        }
        if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) {
          continue
        }
        return true
      }
      return false
    },
    pickNumber(source, keys) {
      for (const key of keys) {
        const rawValue = source ? source[key] : undefined
        if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
          const numberValue = Number(rawValue)
          if (!Number.isNaN(numberValue)) {
            return numberValue
          }
        }
      }
      return 0
    },
    pickText(source, keys) {
      for (const key of keys) {
        const value = source ? source[key] : ''
        if (value !== undefined && value !== null && `${value}`.trim() !== '') {
          return `${value}`
        }
      }
      return '-'
    },
    pickArray(source, keys) {
      for (const key of keys) {
        const value = source ? source[key] : undefined
        if (Array.isArray(value)) {
          return value
        }
      }
      return []
    },
    pickSeries(source, keys) {
      const series = this.pickArray(source, keys)

      if (!series.length) {
        return [0]
      }

      return this.mapPointsToSeriesValues(series)
    },
    mapPointsToSeriesValues(series) {
      return series.map((entry) => {
        if (typeof entry === 'number') {
          return entry
        }
        if (typeof entry === 'object' && entry !== null) {
          const value = this.pickNumber(entry, [
            'questions_count',
            'answers_count',
            'likes_count',
            'views_count',
            'viewsCount',
            'downloads_count',
            'downloadsCount',
            'downloads',
            'sales_count',
            'sales',
            'quantity',
            'value',
            'count',
            'total',
          ])
          return value
        }
        return Number(entry) || 0
      })
    },
    resolveSessionsTrendSeries(data) {
      const trendKeys = ['sessions_trend', 'sessionsTrend', 'sessions_over_time']
      const trendArr = this.pickArray(data, trendKeys)
      if (trendArr.length) {
        return this.mapPointsToSeriesValues(trendArr)
      }
      const popular = this.pickArray(data, ['popular_booking_hours', 'popularBookingHours'])
      if (popular.length) {
        return this.mapPointsToSeriesValues(popular)
      }
      return [0]
    },
    formatKpiValue(value, type) {
      if (type === 'text') {
        const text = value !== undefined && value !== null ? `${value}`.trim() : ''
        return text || this.$t('dashboard.emDash')
      }

      const numberValue = Number(value) || 0

      if (type === 'percentage') {
        return `${numberValue.toFixed(2)}%`
      }
      if (type === 'currency') {
        return `${numberValue.toFixed(2)}${this.$t('dashboard.currencySuffix')}`
      }

      return numberValue.toLocaleString()
    },
  },
}
</script>

<style scoped>
.dashboard-page {
  padding: 8px;
}
</style>
