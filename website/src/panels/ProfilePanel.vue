<template>
  <div class="panel">
    <config-wrap
      title="Your Profile"
      :diff="diffProfile"
      @save="saveProfile"
      @undo="undoProfile">
      <template v-slot:help>
        <p>Age will only show on your profile if you set the year. To hide your age, leave it set to the current year.</p>
        <p>Setting your timezone will display your local time on your profile, and in the <strong>.time</strong> command.</p>
      </template>
      <template v-slot:opts>
        <v-col cols="12" sm="6">
          <config-date label="Birthday" :year="age" v-model="getBirthday">
          </config-date>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select dense outlined v-model="zone" :items="$zones"
           label="Timezone" append-icon="mdi-clock">
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="age" label="Show Age On Profile?"/>
        </v-col>
        <v-col cols="12" sm="6" v-if="guild && anni">
          <v-checkbox v-model="list" :label="`Visible On ${guild.name}`" />
        </v-col>
      </template>
    </config-wrap>

    <config-wrap v-if="hasExtended"
      :title="guild.name + ' Profile'"
      :diff="diffOptions"
      @save="saveOptions"
      @undo="undoOptions">
      <template v-slot:help>
        These are the profile options set by 
        <strong>{{ guild.name }}</strong>, 
        and only visible there.
      </template>
      <template v-slot:opts>
        <v-col cols="12" v-for="(option, tag) in options" :key="tag">
          <v-textarea outlined rows="1" auto-grow counter
            v-model="option.data" :label="option.name" 
            :rules="[ $rules.len ]" :placeholder="option.desc">
          </v-textarea>
        </v-col>
      </template>
    </config-wrap>
  </div>
</template>

<script>
  export default { 
    name: 'ProfilePanel',
    props: [ 'user', 'guild', 'anni' ],
    data() { 
      return { 
        bday: '', year: '', zone: '', list: false, age: false,
        profile: {}, options: {}, archive: {}
      } 
    },
    mounted() { this.renderPanel() },
    watch: { 
      user()  { this.renderPanel() },
      guild() { this.renderPanel() }
    },
    computed: {
      currProfile() {
        let curr = { id: this.profile.id }
        let list = this.$clone(this.profile.list || [])
        let item = list ? list.indexOf(this.guild.id) : -1
        let show = item > -1

        if (this.zone != this.profile.zone) curr.zone = this.zone
        if (this.bday != this.profile.bday) curr.bday = this.bday
        if (this.year != this.profile.year) curr.year = this.currentYear

        if (this.list && !show) list = [ ...list, this.guild.id ]
        if (!this.list && show) list.splice(item, 1)

        return { ...curr, list }
      },
      diffProfile() {
        if (this.bday != this.profile.bday) return true
        if (this.year != this.profile.year) return true
        if (this.zone != this.profile.zone) return true

        let key = this.guild.id
        let old = this.profile.list || []
        let now = this.currProfile.list || []
        if (old.indexOf(key) !== now.indexOf(key)) return true

        return false
      },
      currOptions() { 
        let opts = this.options, core = this.archive
        let curr = {}; for (let opt in opts) {
          if (opts[opt].data != core[opt].data) curr[opt] = opts[opt]
        } return curr
      },
      diffOptions() {
        for (let opt in this.archive) {
          let base = this.archive[opt].data
          if (base != this.options[opt].data) return true
        } return false
      },
      hasExtended() { return Object.keys(this.options).length > 0 },
      currentYear() { return this.age ? this.year : '2020' },
      getBirthday:  {
        get() {
          let year  = this.currentYear
          let month = this.bday.split('/')[0]
          let day   = this.bday.split('/')[1]
          return `${year}-${month}-${day}` 
        },
        set(str) {
          let ymd = str.split('-')
          this.year = ymd[0]
          this.bday = `${ymd[1]}/${ymd[2]}`
        }
      }
    },
    methods: {
      loadProfile(profile, opts) {
        profile = this.$nulls(profile)
        profile.list = profile.list ? JSON.parse(profile.list) : []

        if (profile.bday) this.bday = profile.bday
        if (profile.zone) this.zone = profile.zone

        if (profile.year) this.year = profile.year
        if (profile.year) this.age = this.$string.age(profile.year)

        if (profile.list) this.list = profile.list.indexOf(this.guild.id) > -1
        
        if (profile.opts || opts) this.loadOptions(profile.opts)
        if (profile.opts) delete profile.opts
        
        if (profile) this.profile = { ...this.profile, ...profile }
      },
      loadOptions(options = []) {
        if (this.$tring(options)) options = JSON.parse(options)
        this.archive = this.$clone(options)
        this.options = this.$clone(options)
      },
      undoProfile() {
        this.bday = this.profile.bday
        this.year = this.profile.year
        this.zone = this.profile.zone
      },
      undoOptions() {
        for (let opt in this.archive) {
          this.options[opt].data = this.archive[opt].data
        }
      },

      async renderPanel() {
        let args = [ this.user, this.guild ]
        let data = await this.$getProfile(...args)
        if (data.profile) this.loadProfile(data.profile, true)
      },
      async saveProfile() {
        let args = [ this.user, this.guild, this.currProfile ]
        args[2].list = JSON.stringify(args[2].list)
        let data = await this.$setProfile(...args)
        if (data.profile) this.loadProfile(this.currProfile)
      },
      async saveOptions() {
        let rule = (str) => this.$rules.bad('len', str)
        for (let o in this.options) if (rule(this.options[o].data)) return

        let opts = JSON.stringify(this.currOptions)
        let args = [ this.user, this.guild, { options: opts } ]
        let data = await this.$setProfile(...args)
        if (data.profile) this.loadProfile(data.profile)
      }
    }
  }
</script>
