<template>
  <v-card class="side">
    <v-navigation-drawer floating permanent>
      <slot></slot>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default { name: 'NavFloater' }
</script>

<style scoped>
  .side { 
    width: 100%;
    padding: 10px 0;
    max-width: 185px; 
    margin: 7px auto !important;
  }
</style>