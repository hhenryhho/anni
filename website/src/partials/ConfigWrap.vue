<template>
  <v-card :class="[ 'config-wrap', style ]">
    <v-card-title @click="toggle(show)" class="toggle" v-if="title">
      {{ title }}

      <v-dialog v-model="info" width="500" v-if="$slots.help">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon small color="grey">mdi-help-circle</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            {{ title }} Help <v-spacer />
            <v-btn icon @click="info = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <slot name="help"></slot>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-spacer /> <v-icon class="toggle">{{ arrow }}</v-icon>
    </v-card-title>

    <v-card-text v-show="show">
      <slot name="text"></slot>
      
      <v-row v-if="$slots.opts">
        <slot name="opts"></slot>
      </v-row>
    </v-card-text>

    <div class="item-fabs">
      <!-- Undo Button -->
      <v-fab-transition>
        <v-btn fab small color="accent" 
          @click="$emit('undo')"
          v-show="(edit || diff) && show">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-fab-transition>
      <!-- Save Button -->
      <v-fab-transition>
        <v-btn class="save"
          fab color="primary" 
          @click="$emit('save')"
          v-show="diff && show">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
  </v-card>
</template>

<script>
  export default { 
    name: 'ConfigWrap',
    props: {
      title: String,
      hide: Boolean,
      diff: Boolean,
      edit: Boolean,
    },
    data() { return { show: true, info: false } },
    mounted() { this.toggle(this.hide) },
    watch: { hide(hide) { this.toggle(!hide) } },
    computed: { 
      arrow() { return this.show ? 'mdi-chevron-up' : 'mdi-chevron-down' },
      style() { return { diff: this.diff, edit: this.edit } },
      edits() { return this.diff && this.show },
      clear() { return this.edit && this.show }
    },
    methods: { 
      toggle(val) { this.show = !val  }
    }
  }
</script>

<style scoped>
  .config-wrap { margin: 5px 5px 15px; }
  .config-wrap >>> p:last-of-type { margin-bottom: 0; }
  .config-wrap >>> .v-input--checkbox { margin: -30px 0 -20px; }

  .toggle { cursor: pointer; }
  .toggle .v-icon { vertical-align: middle; }
</style>