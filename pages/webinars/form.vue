<template>
  <div class="roleForm-component">
    <v-card>
      <v-card-title>
        <v-btn icon to="/webinars">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        {{ isEditMode ? $t('roles.edit') : $t('roles.add') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" cols="12">
            <label>{{ $t('webinars.title') }}</label>
            <v-text-field v-model="form.title" outlined dense :label="$t('webinars.title')"></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>{{ $t('webinars.scheduled_at') }}</label>
            <v-text-field
              v-model="form.scheduled_at"
              type="datetime-local"
              outlined
              dense
              :label="$t('webinars.scheduled_at')"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>{{ $t('webinars.duration_minutes') }}</label>
            <v-text-field
              v-model.number="form.duration_minutes"
              type="number"
              outlined
              dense
              :label="$t('webinars.duration_minutes')"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <label>{{ $t('webinars.host_user_id') }}</label>
            <v-autocomplete
              v-model.number="form.host_user_id"
              :items="advisorsPicker"
              :loading="advisorsLoading"
              item-text="display_name"
              item-value="id"
              :filter="filterAdvisorPicker"
              outlined
              dense
              clearable
              :label="$t('webinars.host_user_id')"
              @input="syncHostParticipant"
            ></v-autocomplete>
          </v-col>
          <v-col md="6" cols="12">
            <label>{{ $t('webinars.max_audience') }}</label>
            <v-text-field
              v-model.number="form.max_audience"
              type="number"
              outlined
              dense
              :label="$t('webinars.max_audience')"
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <v-switch
              v-model="form.is_private"
              dense
              :label="$t('webinars.is_private')"
            ></v-switch>
          </v-col>
          <v-col md="6" cols="12">
            <v-switch
              v-model="form.requires_join_password"
              dense
              :label="$t('webinars.requires_join_password')"
            ></v-switch>
          </v-col>
          <v-col md="6" cols="12" v-if="form.requires_join_password">
            <label>{{ $t('webinars.join_password') }}</label>
            <v-text-field
              v-model="form.join_password"
              outlined
              dense
              :label="$t('webinars.join_password')"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <label>{{ $t('webinars.description') }}</label>
            <v-textarea
              v-model="form.description"
              outlined
              dense
              :label="$t('webinars.description')"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center mb-2">
              <label>{{ $t('webinars.participants') }}</label>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="primary"
                small
                class="mx-2"
                v-if="isEditMode"
                @click="openInvitationsDialog"
              >
                <v-icon small>mdi-account-plus</v-icon>
                {{ $t('webinars.invite_users') }}
              </v-btn>
              <v-btn outlined color="success" small @click="addParticipant">
                <v-icon small>mdi-plus</v-icon>
                {{ $t('webinars.add_participant') }}
              </v-btn>
            </div>
            <div
              v-for="(participant, index) in form.participants"
              :key="index"
              class="border rounded p-2 mb-2"
            >
              <v-row>
                <v-col md="5" cols="12">
                  <v-autocomplete
                    v-model.number="participant.user_id"
                    :items="usersPicker"
                    :loading="participant.usersLoading"
                    item-text="display_name"
                    item-value="id"
                    :filter="filterUserPicker"
                    outlined
                    dense
                    hide-details
                    :label="$t('webinars.participant_user_id')"
                    @focus="activeUserSearchIndex = index"
                    @blur="activeUserSearchIndex = null"
                    @update:search-input="onUsersSearch($event, participant, index)"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ $t('webinars.user_not_found') }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            text
                            small
                            color="primary"
                            @click="openInvitationsDialog"
                          >
                            {{ $t('webinars.invite_users') }}
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col md="5" cols="12">
                  <v-select
                    v-model="participant.role"
                    :items="participantRoleOptions"
                    item-text="label"
                    item-value="value"
                    outlined
                    dense
                    hide-details
                    :label="$t('webinars.participant_role')"
                  ></v-select>
                </v-col>
                <v-col md="2" cols="12" class="d-flex align-center">
                  <v-btn icon outlined color="error" @click="removeParticipant(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
                <v-col v-if="participant.name || participant.email || participant.phone" cols="12">
                  <small>
                    {{ participant.name || participant.email || participant.phone }}
                    <span v-if="participant.email && participant.name"> - {{ participant.email }}</span>
                    <span v-if="participant.phone"> - {{ participant.phone }}</span>
                  </small>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-auto" color="success" :loading="submitting" @click="submitForm">
          {{ isEditMode ? $t('roles.edit') : $t('roles.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="invitationsDialog" max-width="900">
      <v-card>
        <v-card-title>
          {{ $t('webinars.invite_users') }}
          <v-spacer></v-spacer>
          <v-btn icon @click="invitationsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div
            v-for="(invitation, index) in invitationRows"
            :key="index"
            class="border rounded p-2 mb-2"
          >
            <v-row>
              <v-col md="4" cols="12">
                <v-text-field
                  v-model="invitation.email"
                  type="email"
                  outlined
                  dense
                  hide-details
                  :label="$t('webinars.invitation_email')"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-text-field
                  v-model="invitation.phone"
                  outlined
                  dense
                  hide-details
                  :label="$t('webinars.invitation_phone')"
                ></v-text-field>
              </v-col>
              <v-col md="3" cols="12">
                <v-select
                  v-model="invitation.role"
                  :items="participantRoleOptions"
                  item-text="label"
                  item-value="value"
                  outlined
                  dense
                  hide-details
                  :label="$t('webinars.participant_role')"
                ></v-select>
              </v-col>
              <v-col md="2" cols="12" class="d-flex align-center">
                <v-btn icon outlined color="error" @click="removeInvitation(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-btn outlined color="success" small @click="addInvitation">
            <v-icon small>mdi-plus</v-icon>
            {{ $t('webinars.add_invitation') }}
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :loading="invitationsSubmitting" @click="submitInvitations">
            {{ $t('webinars.send_invitations') }}
          </v-btn>
          <v-btn color="error" @click="invitationsDialog = false">
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
      form: {
        title: '',
        description: '',
        scheduled_at: '',
        duration_minutes: null,
        host_user_id: null,
        is_private: false,
        requires_join_password: false,
        join_password: '',
        max_audience: null,
        participants: [{ user_id: null, role: 'host', usersLoading: false }],
      },
      participantRoleOptions: [
        { label: vm.$t('webinars.role_host'), value: 'host' },
        { label: vm.$t('webinars.role_co_host'), value: 'co_host' },
        { label: vm.$t('webinars.role_speaker'), value: 'speaker' },
        { label: vm.$t('webinars.role_participant'), value: 'participant' },
      ],
      advisorsPicker: [],
      advisorsLoading: false,
      usersPicker: [],
      usersLoading: false,
      usersSearchTimer: null,
      activeUserSearchIndex: null,
      invitationsDialog: false,
      invitationsSubmitting: false,
      invitationRows: [{ email: '', phone: '', role: 'participant' }],
      webinarId: null,
      submitting: false,
    }
  },
  computed: {
    effectiveWebinarId() {
      return this.$route.query.id || this.webinarId
    },
    isEditMode() {
      return Boolean(this.effectiveWebinarId)
    },
  },
  created() {
    this.webinarId = this.$route.query.id || null
    this.getAdvisorsPicker()
    this.getUsersPicker()
    if (this.$route.query.id) {
      this.getItem(this.$route.query.id)
    }
  },
  methods: {
    formatDateTimeForInput(value) {
      if (!value) return ''
      const match = String(value).match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/)
      if (match) {
        return `${match[1]}T${match[2]}`
      }
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return value
      const pad = (n) => String(n).padStart(2, '0')
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
    },
    formatDateTimeForPayload(value) {
      if (!value) return null
      const normalized = String(value).trim().replace(' ', 'T')
      const match = normalized.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::\d{2})?/)
      if (!match) return null

      const datePart = match[1]
      const hours = match[2]
      const minutes = match[3]
      const date = new Date(`${datePart}T${hours}:${minutes}`)
      const pad = (n) => String(n).padStart(2, '0')
      const offsetMin = Number.isNaN(date.getTime())
        ? -new Date().getTimezoneOffset()
        : -date.getTimezoneOffset()
      const sign = offsetMin >= 0 ? '+' : '-'
      const absOffset = Math.abs(offsetMin)
      return `${datePart}T${hours}:${minutes}:00${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`
    },
    getAdvisorDisplayName(advisor) {
      const user = advisor.user || advisor
      return user.name || user.email || user.phone || `${this.$t('webinars.host_user_id')} ${user.id}`
    },
    normalizeAdvisorItem(advisor) {
      const user = advisor.user || advisor
      return {
        id: user.id,
        display_name: this.getAdvisorDisplayName(advisor),
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }
    },
    filterAdvisorPicker(item, queryText) {
      if (!queryText) return true
      const query = queryText.toString().toLowerCase()
      return [
        item.display_name,
        item.name,
        item.email,
        item.phone,
        item.id,
      ].some((value) => String(value || '').toLowerCase().includes(query))
    },
    mergeAdvisorsPicker(advisors) {
      advisors
        .map((advisor) => this.normalizeAdvisorItem(advisor))
        .filter((advisor) => advisor.id !== null && advisor.id !== undefined)
        .forEach((advisor) => {
          const index = this.advisorsPicker.findIndex((item) => item.id === advisor.id)
          if (index === -1) {
            this.advisorsPicker.push(advisor)
          } else {
            this.advisorsPicker.splice(index, 1, { ...this.advisorsPicker[index], ...advisor })
          }
        })
    },
    async getAdvisorsPicker() {
      this.advisorsLoading = true
      try {
        const data = await this.$axios.$get('/dashboard/advisor-applications/new-applications', {
          params: { status: 'approved' },
        })
        const advisors = Array.isArray(data?.data?.data) ? data.data.data : []
        if (data.statusCode === 200 || advisors.length) {
          this.mergeAdvisorsPicker(advisors)
        } else {
          this.$toast.error(data.message || this.$t('webinars.load_advisors_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.load_advisors_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.advisorsLoading = false
      }
    },
    getUserDisplayName(user) {
      return user.name || user.full_name || user.text || user.email || user.phone || `${this.$t('webinars.participant_user_id')} ${user.id ?? user.user_id ?? user.value ?? user.participant?.user_id}`
    },
    normalizeUserPickerItem(user) {
      return {
        id: user.id ?? user.user_id ?? user.value ?? user.participant?.user_id,
        display_name: this.getUserDisplayName(user),
        name: user.name || user.full_name || user.text || '',
        email: user.email || '',
        phone: user.phone || '',
      }
    },
    getPickerList(response) {
      if (Array.isArray(response?.data?.data)) return response.data.data
      if (Array.isArray(response?.data)) return response.data
      if (Array.isArray(response)) return response
      return []
    },
    filterUserPicker(item, queryText) {
      if (!queryText) return true
      const query = queryText.toString().toLowerCase()
      return [
        item.display_name,
        item.name,
        item.email,
        item.phone,
        item.id,
      ].some((value) => String(value || '').toLowerCase().includes(query))
    },
    getParticipantSelectedUser(participant) {
      return this.usersPicker.find((user) => user.id === participant.user_id)
    },
    isSelectedUserSearch(search, participant) {
      const selectedUser = this.getParticipantSelectedUser(participant)
      if (!selectedUser) return false
      const query = String(search || '').toLowerCase()
      return [
        selectedUser.display_name,
        selectedUser.name,
        selectedUser.email,
        selectedUser.phone,
      ].some((value) => String(value || '').toLowerCase() === query)
    },
    onUsersSearch(search, participant, index) {
      const searchText = String(search || '').trim()
      if (index !== this.activeUserSearchIndex || !searchText || this.isSelectedUserSearch(searchText, participant)) {
        return
      }

      clearTimeout(this.usersSearchTimer)
      this.usersSearchTimer = setTimeout(() => {
        this.getUsersPicker(searchText, participant)
      }, 400)
    },
    mergeUsersPicker(users) {
      const normalizedUsers = users
        .map((user) => this.normalizeUserPickerItem(user))
        .filter((user) => user.id !== null && user.id !== undefined)

      normalizedUsers.forEach((user) => {
        const index = this.usersPicker.findIndex((item) => item.id === user.id)
        if (index === -1) {
          this.usersPicker.push(user)
        } else {
          const currentUser = this.usersPicker[index]
          const nextUser = { ...currentUser, ...user }
          if (!user.name && currentUser.name) {
            nextUser.name = currentUser.name
            nextUser.display_name = currentUser.display_name
          }
          this.usersPicker.splice(index, 1, nextUser)
        }
      })
    },
    async getUsersPicker(search = '', participant = null) {
      if (participant) {
        this.$set(participant, 'usersLoading', true)
      } else {
        this.usersLoading = true
      }
      try {
        const data = await this.$axios.$get('/dashboard/users/picker?per_page=100000', {
          params: {
            search: search || undefined,
          },
        })
        const users = this.getPickerList(data)
        if (data.statusCode === 200 || users.length) {
          this.mergeUsersPicker(users)
        } else {
          this.$toast.error(data.message || this.$t('webinars.load_users_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.load_users_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        if (participant) {
          this.$set(participant, 'usersLoading', false)
        } else {
          this.usersLoading = false
        }
      }
    },
    async getItem(id) {
      try {
        const data = await this.$axios.$get(`/dashboard/webinars/show/${id}`)
        if (data.statusCode === 200) {
          const item = data.data || {}
          this.webinarId = item.id ?? id
          this.form.title = item.title || ''
          this.form.description = item.description || ''
          this.form.scheduled_at = this.formatDateTimeForInput(item.scheduled_at)
          this.form.duration_minutes = item.duration_minutes ?? null
          this.form.is_private = Boolean(item.is_private)
          this.form.requires_join_password = Boolean(item.requires_join_password)
          this.form.join_password = ''
          this.form.max_audience = item.max_audience ?? null
          this.form.host_user_id = item.host_user_id ?? null
          if (item.host_user_id) {
            const hostParticipant = (item.participants || []).find((p) => p.user_id === item.host_user_id)
            this.mergeAdvisorsPicker([{
              user: {
                id: item.host_user_id,
                name: hostParticipant?.name || '',
                email: hostParticipant?.email || '',
                phone: hostParticipant?.phone || '',
              },
            }])
          }
          this.form.participants = Array.isArray(item.participants) && item.participants.length
            ? item.participants.map((participant) => ({
              user_id: participant.user_id,
              role: participant.role || 'participant',
              name: participant.name || '',
              email: participant.email || '',
              phone: participant.phone || '',
              usersLoading: false,
            }))
            : [{ user_id: item.host_user_id ?? null, role: 'host', usersLoading: false }]
          this.mergeUsersPicker(this.form.participants.map((participant) => ({
            id: participant.user_id,
            name: participant.name,
            email: participant.email,
            phone: participant.phone,
          })))
          this.syncHostParticipant()
        } else {
          this.$toast.error(data.message || this.$t('webinars.load_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.load_failed'), { icon: 'mdi-alert-circle' })
      }
    },
    submitForm() {
      if (!this.form.scheduled_at) {
        this.$toast.error(this.$t('webinars.scheduled_at_required'), { icon: 'mdi-alert-circle' })
        return
      }
      if (this.isEditMode) {
        this.editForm(this.effectiveWebinarId)
      } else {
        this.addForm()
      }
    },
    addParticipant() {
      this.form.participants.push({ user_id: null, role: 'participant', usersLoading: false })
    },
    removeParticipant(index) {
      this.form.participants.splice(index, 1)
    },
    openInvitationsDialog() {
      if (!this.effectiveWebinarId) {
        this.$toast.error(this.$t('webinars.save_before_invites'), { icon: 'mdi-alert-circle' })
        return
      }
      this.invitationsDialog = true
    },
    addInvitation() {
      this.invitationRows.push({ email: '', phone: '', role: 'participant' })
    },
    removeInvitation(index) {
      if (this.invitationRows.length === 1) {
        this.invitationRows = [{ email: '', phone: '', role: 'participant' }]
        return
      }
      this.invitationRows.splice(index, 1)
    },
    resetInvitations() {
      this.invitationRows = [{ email: '', phone: '', role: 'participant' }]
    },
    getInvitationPayload() {
      return this.invitationRows
        .filter((invitation) => invitation.email || invitation.phone)
        .map((invitation) => ({
          email: invitation.email || null,
          phone: invitation.phone || null,
          role: invitation.role || 'participant',
        }))
    },
    getInvitationResultItems(response) {
      if (Array.isArray(response?.data?.results)) {
        return response.data.results
          .filter((result) => result.participant?.user_id)
          .map((result) => ({
            user_id: result.participant.user_id,
            role: result.participant.role || result.role || 'participant',
            name: result.participant.name || result.name || result.full_name || '',
            email: result.participant.email || result.email || '',
            phone: result.participant.phone || result.phone || '',
            kind: result.kind || '',
          }))
      }
      if (Array.isArray(response?.data?.participants)) return response.data.participants
      if (Array.isArray(response?.data?.invitations)) return response.data.invitations
      if (Array.isArray(response?.data?.data)) return response.data.data
      if (Array.isArray(response?.data)) return response.data
      return []
    },
    mergeInvitedParticipants(items) {
      items.forEach((item) => {
        const userId = item.user_id ?? item.id ?? null
        if (userId === null || userId === undefined) return

        const exists = this.form.participants.some((participant) => {
          return participant.user_id === userId
        })

        if (!exists) {
          this.form.participants.push({
            user_id: userId,
            role: item.role || 'participant',
            name: item.name || item.full_name || '',
            email: item.email || '',
            phone: item.phone || '',
            usersLoading: false,
          })
        }
      })
    },
    async submitInvitations() {
      const webinarId = this.effectiveWebinarId
      if (!webinarId) {
        this.$toast.error(this.$t('webinars.save_before_invites'), { icon: 'mdi-alert-circle' })
        return
      }

      const invitations = this.getInvitationPayload()
      if (!invitations.length) {
        this.$toast.error(this.$t('webinars.invitation_required'), { icon: 'mdi-alert-circle' })
        return
      }

      this.invitationsSubmitting = true
      try {
        const data = await this.$axios.$post(`/dashboard/webinars/${webinarId}/invitations`, { invitations })
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message || this.$t('webinars.invitation_success'), { icon: 'mdi-check' })
          const invitedParticipants = this.getInvitationResultItems(data)
          this.resetInvitations()
          this.invitationsDialog = false
          await this.getUsersPicker()
          await this.getItem(webinarId)
          this.mergeUsersPicker(invitedParticipants)
          this.mergeInvitedParticipants(invitedParticipants)
        } else {
          this.$toast.error(data.message || this.$t('webinars.invitation_failed'), { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.invitation_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.invitationsSubmitting = false
      }
    },
    toNullableNumber(value) {
      if (value === null || value === undefined || value === '') return null
      const number = Number(value)
      return Number.isNaN(number) ? null : number
    },
    syncHostParticipant() {
      const hostUserId = this.toNullableNumber(this.form.host_user_id)
      if (!hostUserId) return

      const advisor = this.advisorsPicker.find((item) => item.id === hostUserId)
      const existingIndex = this.form.participants.findIndex((participant) => participant.user_id === hostUserId)

      if (existingIndex !== -1) {
        this.$set(this.form.participants[existingIndex], 'role', 'host')
        return
      }

      const emptyHostIndex = this.form.participants.findIndex(
        (participant) => participant.role === 'host' && !participant.user_id
      )
      const hostData = {
        user_id: hostUserId,
        role: 'host',
        name: advisor?.name || '',
        email: advisor?.email || '',
        phone: advisor?.phone || '',
        usersLoading: false,
      }

      if (emptyHostIndex !== -1) {
        this.$set(this.form.participants, emptyHostIndex, hostData)
      } else {
        this.form.participants.push(hostData)
      }

      if (advisor) {
        this.mergeUsersPicker([advisor])
      }
    },
    getPayload() {
      this.syncHostParticipant()
      const scheduledAt = this.formatDateTimeForPayload(this.form.scheduled_at)
      return {
        title: this.form.title,
        description: this.form.description,
        scheduled_at: scheduledAt,
        duration_minutes: this.toNullableNumber(this.form.duration_minutes),
        is_private: Boolean(this.form.is_private),
        join_password: this.form.requires_join_password ? this.form.join_password || null : null,
        max_audience: this.toNullableNumber(this.form.max_audience),
        host_user_id: this.toNullableNumber(this.form.host_user_id),
        participants: this.form.participants
          .filter((participant) => participant.user_id !== null && participant.user_id !== undefined && participant.user_id !== '')
          .map((participant) => ({
            user_id: this.toNullableNumber(participant.user_id),
            role: participant.role,
          })),
      }
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        scheduled_at: '',
        duration_minutes: null,
        host_user_id: null,
        is_private: false,
        requires_join_password: false,
        join_password: '',
        max_audience: null,
        participants: [{ user_id: null, role: 'host', usersLoading: false }],
      }
    },
    async addForm() {
      this.submitting = true
      try {
        const payload = this.getPayload()

        const data = await this.$axios.$post('/dashboard/webinars/store', payload)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message || this.$t('webinars.create_success'), { icon: 'mdi-check' })
          const newId = data.data?.id ?? data.data?.data?.id
          if (newId) {
            this.webinarId = newId
            await this.$router.replace({
              path: this.$route.path,
              query: { ...this.$route.query, id: String(newId) },
            })
          } else {
            this.resetForm()
          }
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.save_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.submitting = false
      }
    },
    async editForm(id) {
      this.submitting = true
      try {
        const payload = this.getPayload()
        const data = await this.$axios.$put(`/dashboard/webinars/update/${id}`, payload)
        if (data.statusCode === 200 || data.statusCode === 201) {
          this.$toast.success(data.message || this.$t('webinars.update_success'), { icon: 'mdi-check' })
          this.$router.push('/webinars')
        } else {
          this.$toast.error(data.message, { icon: 'mdi-alert-circle' })
        }
      } catch (error) {
        this.$toast.error(this.$t('webinars.save_failed'), { icon: 'mdi-alert-circle' })
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>
