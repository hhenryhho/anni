<template> 
  <v-sheet class="config-list">
    <h3>{{ title }}</h3>
    <v-expansion-panels
      v-bind:value="value" 
      v-on:change="$emit('input', $event)">
      <slot></slot>
    </v-expansion-panels>
  </v-sheet>
</template>

<script>
  export default {
    name: 'ConfigList',
    props: [ 'title', 'value' ]
  }
</script>

<style scoped>
  .config-list {
    margin: 0 -5px;
    padding: 0 10px 10px;
  }
</style>