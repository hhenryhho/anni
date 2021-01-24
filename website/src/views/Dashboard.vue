<template>
  <v-container fluid>
    <div id="sidebar">
      <v-tabs vertical v-model="tab">
        <v-list-item-avatar>
          <v-img :src="avatar" />
        </v-list-item-avatar>

        <v-tab v-if="!token" key="getauth">Discord Log In</v-tab>

        <v-tab v-if="user" key="profile">
          <div class="narrow">{{ user.username }}#{{ user.discriminator }}</div>
        </v-tab>

        <v-divider v-if="list.length" />
        <v-menu v-if="list.length" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-subheader v-bind="attrs" v-on="on">
              <strong class="narrow">{{ guild.name || "Select Server" }}</strong>
            </v-subheader>
          </template>
          <v-list>
            <v-list-item v-for="(g, i) in list" :key="i" @click="setGuild(g)">
              <v-list-item-title>{{ g.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tab v-if="config" key="configs">Configs</v-tab>
        <v-tab v-if="config" key="actions">Actions</v-tab>
        <v-tab v-if="config" key="options">Options</v-tab>
      </v-tabs>
    </div>

    <div id="content">
      <div class="switch panel" v-if="list.length">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text v-bind="attrs" v-on="on" class="toggle">
              {{ `Current Server: ${server}` }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(g, i) in list" :key="i" @click="setGuild(g)">
              <v-list-item-title>{{ g.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-tabs-items v-model="tab">  
        <v-tab-item v-if="nouser" key="getauth" />

        <v-tab-item v-if="authed" key="profile">
          <profile-panel :user="user" :guild="guild" :anni="bot" />
        </v-tab-item>
        
        <v-tab-item v-if="config" key="configs">
          <configs-panel :user="user" :guild="guild" :anni="bot" />
        </v-tab-item>
        
        <v-tab-item v-if="config" key="actions">
          <actions-panel :user="user" :guild="guild" :anni="bot" />
        </v-tab-item>
        
        <v-tab-item v-if="config" key="options">
          <options-panel :user="user" :guild="guild" :anni="bot" />
        </v-tab-item>
      </v-tabs-items>

      <div class="panel">
        <anni-checks v-bind="checks" />

        <v-divider class="mb-5" />

        <v-card class="mt-5">
          <v-card-text class="text-center">
            <em>
              Bug? Suggestion?
              Ping <strong>@tech</strong> in the 
              <a :href="$urlServer" class="linked" target="_blank">
                <strong>Support Server.</strong>
              </a>
            </em>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
  import ProfilePanel from '@/panels/ProfilePanel.vue'
  import ConfigsPanel from '@/panels/ConfigsPanel.vue'
  import ActionsPanel from '@/panels/ActionsPanel.vue'
  import OptionsPanel from '@/panels/OptionsPanel.vue'

  export default {
    components: { ProfilePanel, ConfigsPanel, ActionsPanel, OptionsPanel },
    data() {
      return { token: 0, user: 0, guild: 0, icon: 0, list: [], tab: 0, bot: 0 }
    },
    computed: {
      authed() { return this.token && this.user },
      logged() { return this.token && !this.user },
      nouser() { return !this.token && !this.user },
      avatar() { return this.icon || 'https://i.imgur.com/ZOKp8LH.png' },
      server() { return this.guild ? this.guild.name : 'Select Server' },
      config() { return this.guild ? this.guild.admin && this.bot : false },
      checks() { 
        return { 
          auth: this.token, 
          user: this.user, 
          anni: this.bot, 
          name: this.guild ? this.guild.name : '',
          conf: this.guild ? this.guild.admin : false
        } 
      }
    },
    methods: { 
      setGuild(g) { 
        this.guild = g
        localStorage.guild = g.id
        this.loadAnni()
      },
      async loadAnni() {
        let data = await this.$getConfigs(this.guild)
        let conf = data.configs
        this.bot = conf && !conf.error && !conf.empty
      }
    },
    async mounted() {
      this.token = localStorage.token; 
      let auth = await this.$Auth()
      if (auth) for (let prop in auth) this[prop] = auth[prop]
      await this.loadAnni()
    }
  }
</script>

<style scoped>
  .discord { font-size: 60px; }
  .linked { text-decoration: none; }
  .narrow { max-width: 105px; overflow: hidden; text-overflow: ellipsis; }
  .toggle { justify-content: flex-start; padding: 0 17px !important; }
  .switch { margin: 0 0 10px; }
  .v-menu { z-index: 15; }
</style>