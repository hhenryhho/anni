<template>
  <v-card v-if="nouser || invite">
    <!-- Header -->
    <v-list-item two-line>
      <v-list-item-content>
        <div class="overline">{{ header }}</div>
        <v-list-item-title class="headline">{{ byline }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile size="70" class="mb-0">
        <v-img :src="require('@/assets/icon.png')" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-text>
      <!-- Login -->
      <div v-if="nouser">
        <p>The <strong>Dashboard</strong> makes working with Anni a little bit easier. You can update your profile, change your server settings, and manage your actions all from the web.</p>
        <!-- <p>While Anni is still in beta, the dashboard is not access restricted. In the future, the dashboard will be a Gold feature, requiring voting or subscribing to unlock.</p> -->
      </div>
      <!-- Loading -->
      <v-progress-linear v-if="loader" indeterminate color="primary" />
      <!-- Invite -->
      <div v-if="invite">
        <p v-if="!conf">
          You're not an admin so you can't invite Anni to this server. Maybe mention all of the features <em>(maybe link them to this site!)</em> to an admin. You never know, you could get lucky and they'll invite <strong>Anni</strong> to <strong>{{ name }}</strong>.
        </p>
        <p v-if="conf">
          <strong>Invite Anni to {{ name }}</strong> to enjoy all of Anni's features. You can make <strong>custom profiles</strong>, that track <strong>birthdays</strong>, local user <strong>timezones</strong>, and (if you use the included <strong>starboard</strong>, combined <strong>starboard statistics</strong>. 
        </p>
        <p v-if="conf">
          Not to mention the <strong>actions</strong> and other features!
        </p>
      </div>
    </v-card-text>

    <v-card-actions v-if="nouser || (invite && conf)">
      <v-btn v-if="nouser" outlined color="primary" :href="$urlLogins">
        Continue With Discord
      </v-btn>
      <v-btn v-if="invite && conf" outlined color="primary" :href="$urlInvite">
        Invite Anni to {{ name }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'AnniChecks',
    props: [ 'auth', 'user', 'anni', 'name', 'conf' ],
    computed: {
      nouser() { return !this.auth },
      loader() { return !this.user && this.auth },
      invite() { return !this.anni && this.user && this.name },

      header() {
        if (this.nouser) return "Log In With Discord"
        if (this.loader) return "Fetching Your Data"
        if (this.invite) return "Nothing Found Here"
        return ""
      },
      byline() {
        if (this.nouser) return "I have no idea who you are."
        if (this.loader) return "This could take a moment."
        if (this.invite) return "I don't think I'm in this server."
        return ""
      }
    }
  }
</script>

<style scoped>
  .v-card__actions { justify-content: center; padding-bottom: 30px; }
</style>