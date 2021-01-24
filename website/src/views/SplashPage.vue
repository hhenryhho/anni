<template>
  <v-container fluid>
    <div class="splash">
      <v-row no-gutters>
        <v-col cols="12" md="6" align-self="center">
          <img src="@/assets/icon.png" class="avatar">
        </v-col>
        <v-col cols="12" md="6" align-self="center">
          <div class="leadin">
            <h1 class="sayhey">Say Hello To Anni.</h1>
            <h2>The Profile Bot For Discord.</h2>

            <v-btn :href="$urlInvite" block color="primary" class="invite">
              Invite To Your Server
            </v-btn>

            <p>Track birthdays and timezones, combined starboard statistics, and any custom profile field you want!</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="detail">
      <v-card>
        <v-card-title>Birthday Reminders</v-card-title>
        <v-card-text>Anni will keep track of your birthday, and can send out announcements on the day of, and/or reminders a week in advance!</v-card-text>
      </v-card>
      <v-card>
        <v-card-title>Local Timezones</v-card-title>
        <v-card-text>With timezone tracking, Anni can tell you what time it is locally for another user, or for all users in a server!</v-card-text>
      </v-card>
      <!-- <v-card>
        <v-card-title>Premium Features</v-card-title>
        <v-card-text>Anni has a handful of <strong>premium</strong> features, like the <router-link to="/dash"><strong>dashboard</strong></router-link>, as well as some more intensive commands. You can get premium by joining the <a :href="$urlGoGold"><strong>Patreon</strong></a> for as little as <strong>$1/mo</strong> or by simpy voting or Anni! <em>Voting for the bot will unlock Premium for your account for the next 6 hours.</em></v-card-text>
      </v-card> -->
      <div class="things">
        <v-btn text to="/docs">Help & Docs</v-btn>
        <v-btn text to="/dash">Dashboard</v-btn>
        <v-btn text :href="$urlServer">Support Server</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    computed: {
      mobile() { return this.$vuetify.breakpoint.md ? '' : 'mobile' }
    }
  }
</script>

<style scoped>
  .splash { margin: 50px 0;  }
  .mobile .splash { text-align: center; }
  .invite { margin: 10px 0 15px; }
  .avatar { width: 75%; max-width: 300px; }
  .detail { width: 100%; margin: 0 auto; }
  .things { text-align: center; margin-top: 30px; }
  .things .v-btn { margin: 0 10px 10px; }

  .v-card { margin-bottom: 25px; }

  #anni:not(.mobile) .avatar { float: right; }
  #anni:not(.mobile) .leadin { max-width: 300px; }
  #anni:not(.mobile) .detail { max-width: 600px }
</style>