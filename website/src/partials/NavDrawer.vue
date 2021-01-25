<template>
  <v-navigation-drawer
    clipped app temporary :value="open"
    @input="$emit('input', $event)">

    <v-list nav dense>
      <v-list-item href="" @click="close">
        <v-list-item-icon><v-icon>mdi-close</v-icon></v-list-item-icon>
        <v-list-item-title>Close Menu</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item to="/" @click="close">
        <img src="@/assets/icon.png" alt="anni" id="home">
        <v-list-item-title>Anni Home</v-list-item-title>
      </v-list-item>

      <v-list-item to="/docs" @click="close">
        <v-list-item-icon><v-icon>mdi-help-circle</v-icon></v-list-item-icon>
        <v-list-item-title>Help Docs</v-list-item-title>
      </v-list-item>

      <v-list-item to="/dash" @click="close">
        <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item :href="$urlInvite" target="_blank" @click="close">
        <v-list-item-icon>
          <v-icon color="primary">mdi-plus-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Invite Anni</v-list-item-title>
      </v-list-item>

      <!-- <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="red">mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Vote 4 Anni</v-list-item-title>
        </template>

        <v-list-item :href="$urlVotes1" target="_blank">
          <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
          <v-list-item-title>Top.gg</v-list-item-title>
        </v-list-item>

        <v-list-item :href="$urlVotes2" target="_blank">
          <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
          <v-list-item-title>BotsForDiscord</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item :href="$urlGoGold" target="_blank">
        <v-list-item-icon>
          <v-icon color="orange">mdi-patreon</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Get Premium</v-list-item-title>
      </v-list-item> -->

      <v-divider />

      <v-list-item :href="$urlServer" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-discord</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Support Server</v-list-item-title>
      </v-list-item>

      <v-list-item :href="$urlTrello" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-trello</v-icon>
        </v-list-item-icon>
        <v-list-item-title>What's Next?</v-list-item-title>
      </v-list-item>

      <v-list-item :href="$urlGithub" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-title>On Github</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavDrawer',
    props: [ 'open' ],
    methods: { close() { this.$emit('input', false) } }
  }
</script>

<style>
  .v-divider { margin: 10px 0; }
</style>