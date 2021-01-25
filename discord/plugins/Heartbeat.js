// Heartbeat.js - the internal ticking

module.exports = Anni => {
  Anni.Heartbeat = {
    beat: function (update) {
      update = update || this
      const beat = () => {
        update.status()
        Anni.Reminders.check()
      }
      return update ? beat : beat()
    },
    status: function () {
      let pool = [
        `v${Anni.pkg.version}`,
        `${Anni.Bot.Members()} users`,
        `${Anni.Bot.Servers()} servers` 
      ], status = Anni.$rand(pool)
      
      Anni.user.setActivity(status, { type: 'WATCHING' })
    },
    start: function () {
      this.beat()
      this.clock = setInterval(this.beat(this), 1000 * 60 * 2)
    }
  }
}