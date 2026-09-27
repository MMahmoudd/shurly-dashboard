<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="right"
      fixed
      app
    >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
      <v-list>
        <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </template>
          <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{child.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in muneItems"
            :key="index"
          >
            <v-list-item-title @click="item.title === 'logout' ? logout() : null" link>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'authenticated',
  data (vm) {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          title: vm.$t('sideMenu.users'),
          action: 'mdi-account-group',
          items: [
            {
              title: vm.$t('sideMenu.users'),
              to: '/users/users'
            }
          ],
        },
        {
          title: vm.$t('sideMenu.admins'),
          action: 'mdi-account-key',
          items: [
            {
              title: vm.$t('sideMenu.roles'),
              to: '/users/roles'
            },
            {
              title: vm.$t('sideMenu.admins'),
              to: '/users/admins'
            },
          ],
        },
        {
          title: vm.$t('sideMenu.settings'),
          action: 'mdi-cog',
          items: [
            {
              title: vm.$t('sideMenu.settings'),
              to: "/settings",
            }
          ],
        },
        {
          title: vm.$t('sideMenu.categories'),
          action: 'mdi-shape-plus',
          items: [
            {
              title: vm.$t('sideMenu.categories'),
              to: "/categories",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.websiteContent'),
          action: 'mdi-content-paste',
          items: [
            {
              title: vm.$t('sideMenu.slider'),
              to: "/slider",
            },
            {
              title: vm.$t('sideMenu.faqs'),
              to: "/faqs",
            },
                        {
              title: vm.$t('sideMenu.answers'),
              to: "/answers",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.areaExpertises'),
          action: 'mdi-briefcase',
          items: [
            {
              title: vm.$t('sideMenu.areaExpertises'),
              to: "/expertises",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.skills'),
          action: 'mdi-file-arrow-left-right',
          items: [
            {
              title: vm.$t('sideMenu.skills'),
              to: "/skills",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.advisor'),
          action: 'mdi-account-tie',
          items: [
            {
              title: vm.$t('sideMenu.pending'),
              to: "/advisor/pending",
            },
            {
              title: vm.$t('sideMenu.approved'),
              to: "/advisor/approved",
            },
            {
              title: vm.$t('sideMenu.rejected'),
              to: "/advisor/rejected",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.sessions'),
          action: 'mdi-account-tie',
          items: [
            {
              title: vm.$t('sideMenu.pending'),
              to: "/sessions/pending",
            },
            {
              title: vm.$t('sideMenu.approved'),
              to: "/sessions/approved",
            },
            {
              title: vm.$t('sideMenu.rejected'),
              to: "/sessions/rejected",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.blocks'),
          action: 'mdi-block-helper',
          items: [
            {
              title: vm.$t('sideMenu.categories'),
              to: "/blocks/categories",
            },
            {
              title: vm.$t('sideMenu.reasons'),
              to: "/blocks/reasons",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.disputes'),
          action: 'mdi-gavel',
          items: [
            {
              title: vm.$t('sideMenu.disputeReasons'),
              to: "/disputes/reasons",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.webinars'),
          action: 'mdi-video',
          items: [
            {
              title: vm.$t('sideMenu.webinars'),
              to: "/webinars",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.supportRequests'),
          action: 'mdi-face-agent',
          items: [
            {
              title: vm.$t('sideMenu.supportRequests'),
              to: "/supportRequests",
            },
          ],
        },
        {
          title: vm.$t('sideMenu.withdrawalRequests'),
          action: 'mdi-currency-usd',
          items: [
            {
              title: vm.$t('sideMenu.withdrawalRequests'),
              to: "/withdrawal-requests",
            },
          ],
        },
      ],
      muneItems: [
        { title: 'logout', to: 'logout' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    logout(){
        this.$cookies.removeAll()
        this.$router.push('/auth/login')
      },
  }
}
</script>
