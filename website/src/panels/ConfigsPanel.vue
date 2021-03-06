<template>
  <div class="panel">
    <config-wrap v-if="haveConfigs"
      title="Triggers"
      :diff="diffTrigger"
      @save="saveConfigs"
      @undo="undoTrigger">
      <template v-slot:help>
        <p>The triggers are how you call commands. Anni has a <strong>prefix</strong> and a <strong>suffix</strong>. As for the prefix, for some bots it's as simple as <kbd>!</kbd> or <kbd>^</kbd>. The default prefix is <kbd>anni.</kbd> which will always work.</p>
        <p><strong>Popular Options:</strong> <kbd>a.</kbd> <kbd>a*</kbd> <kbd>a^</kbd></p>
        <p><strong>Examples:</strong> <kbd>a.profile</kbd> <kbd>a*profile</kbd> <kbd>a^profile</kbd></p>
        <p>The <strong>suffix</strong> is a novelty feature, and allows you to call commands using a suffix such as <kbd>.exe</kbd> or <kbd>.cmd</kbd> - the suffix is disabled by default.</p>
        <p><strong>Examples:</strong> <kbd>profile.exe</kbd> <kbd>profile.cmd</kbd></p>
      </template>
      <template v-slot:opts>
        <v-col cols="6">
          <v-text-field dense outlined required
            :rules="[ $rules.has, $rules.space ]" v-model="prefix" 
            label="Current Prefix" placeholder="anni.">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined 
            :rules="[ $rules.space ]" v-model="suffix" 
            label="Current Suffix" placeholder=".exe, .cmd">
          </v-text-field>
        </v-col>
      </template>
    </config-wrap>

    <!-- Refresh -->
    <config-wrap v-if="haveConfigs">
      <template v-slot:text>
        <div class="text-center">
          Channels or roles out of date? Run <kbd>anni.refresh</kbd> in your server.
        </div>
      </template>
    </config-wrap>

    <!-- Birthday Settings -->
    <config-wrap v-if="haveConfigs"
      title="Announcements"
      :diff="diffReminds"
      @save="saveConfigs"
      @undo="undoReminds">
      <template v-slot:help>
        <p>Users can add their birthdays to their user profiles. If they have a birthday set, you can send out a reminder 1 week before, and an announcement the day of. You just need to set a channel!</p>
        <p>Message must contain either <kbd>{user}</kbd> or <kbd>{users}</kbd>.<br> (for <em><strong>@user</strong></em> and <em><strong>@user's</strong></em> respectively)</p>
        <p>Can optionally include <strong>{date}</strong> for display the date of the birthday. <em>Useful for the reminder message!</em></p>
      </template>
      <template v-slot:opts>
        <v-col>
          <v-select dense outlined label="Announcement Channel"
            :items="channels" item-text="name" item-value="id" v-model="birthday">
          </v-select>
          <v-textarea outlined rows="2" :rules="[ $rules.ping ]"
            label="Reminder Message" v-model="reminder">
          </v-textarea>
          <v-textarea outlined rows="2" :rules="[ $rules.ping ]"
            label="Announcement Message" v-model="announce">
          </v-textarea>
        </v-col>
      </template>
    </config-wrap>

    <!-- Starboard Settings -->
    <config-wrap v-if="haveConfigs"
      title="Starboard"
      :diff="diffStarred"
      @save="saveConfigs"
      @undo="undoStarred">
      <template v-slot:help>
        <p>You'll need to create a channel (usually called <strong>#starboard</strong>) that only the bot has access to.</p>
        <p>If you need an overview of the starboard, check out the <strong>& More</strong> tab on the <router-link to="/">home page</router-link>.</p>
        <p>For setting the emoji, it's recommended to use the <kbd>anni.emoji</kbd> command in the server for custom emoji support.</p>
      </template>
      <template v-slot:opts>
        <v-col cols="12" sm="8">
          <v-select dense outlined label="Starboard Channel"
            :items="channels" item-text="name" item-value="id" v-model="board">
          </v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field dense outlined type="number"
            v-model="count" label="Reaction Count">
          </v-text-field>
        </v-col>
      </template>
    </config-wrap>
  </div>
</template>

<script>
  export default { 
    name: 'ConfigsPanel',
    props: [ 'user', 'guild' ],
    data() { 
      return { 
        prefix: '', suffix: '', board: '', count: '',
        birthday: '', reminder: '', announce: '', 
        configs: {}, channels: []
      } 
    },
    mounted() { this.renderPanel() },
    watch: {
      user()  { this.renderPanel() },
      guild() { this.renderPanel() }
    },
    computed: { 
      haveConfigs() { return this.configs && !this.configs.empty },
      currConfigs() {
        let configs = { ...this.configs }
        configs.prefix   = this.prefix
        configs.suffix   = this.suffix
        configs.birthday = this.birthday
        configs.reminder = this.reminder
        configs.announce = this.announce
        configs.board    = this.board
        configs.count    = this.count
        return configs
      },
      diffTrigger() {
        if (this.prefix != this.configs.prefix) return true
        if (this.suffix != this.configs.suffix) return true
        return false
      },
      diffReminds() {
        if (this.birthday != this.configs.birthday) return true
        if (this.reminder != this.configs.reminder) return true
        if (this.announce != this.configs.announce) return true
        return false
      },
      diffStarred() {
        if (this.board != this.configs.board) return true
        if (this.count != this.configs.count) return true
        return false
      }
    },
    methods: {
      loadConfigs(configs) {
        configs = this.$nulls(configs)
        if (configs.opts)     this.loadDetails(configs.opts)
        if (configs.prefix)   this.prefix = configs.prefix
        if (configs.suffix)   this.suffix = configs.suffix
        if (configs.birthday) this.birthday = configs.birthday
        if (configs.announce) this.announce = configs.announce
        if (configs.reminder) this.reminder = configs.reminder
        if (configs.board)    this.board = configs.board
        if (configs.count)    this.count = configs.count
        if (configs.opts)     delete configs.opts
        if (configs)          this.configs = { ...this.configs, ...configs }
      },
      loadDetails(details) {
        if (details.chans) {
          this.channels = [{ id: '', name: 'No Channel' }]
          for (let channel of JSON.parse(details.chans)) {
            let chan = channel.split(':')
            this.channels.push({ id: chan[0], name: chan[1] })
          }
        }
      },
      undoTrigger() {
        this.prefix = this.configs.prefix
        this.suffix = this.configs.suffix
      },
      undoReminds() {
        this.birthday = this.configs.birthday
        this.reminder = this.configs.reminder
        this.announce = this.configs.announce
      },
      undoStarred() {
        this.board = this.configs.board
        this.count = this.configs.count
      },

      async renderPanel() {
        let data = await this.$getConfigs(this.guild)
        if (data.configs) this.loadConfigs(data.configs)
      },
      async saveConfigs() {
        if (this.$rules.bad('has',   this.prefix)) return
        if (this.$rules.bad('space', this.prefix)) return
        if (this.$rules.bad('space', this.suffix)) return
        if (this.$rules.bad('ping',  this.reminder)) return
        if (this.$rules.bad('ping',  this.announce)) return
        let data = await this.$setConfigs(this.guild, this.currConfigs)
        if (data.configs) this.loadConfigs(data.configs)
      }
    }
  }
</script>
