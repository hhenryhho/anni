// Cache.js - tracking common things for fewer database calls

module.exports = Anni => {
  Anni.Cache = {
    delete: function (id, val) {
      let store = '$' + val
      delete this[store][id]
    },

    server: function (id, val) {
      if (val) this.$server[id] = val
      let server = val || this.$server[id]
      return Anni.guilds.cache.get(server)
    },
    paused: function (id, val) {
      if (val) this.$paused[id] = val
      return val || this.$paused[id]
    },

    prefix: async function (id, val) {
      if (!id) return ''
      if (val) this.$prefix[id] = val
      if (this.$prefix[id]) return this.$prefix[id]

      let configs = await Anni.$Configs.get(id)
      this.$prefix[id] = configs.prefix
      this.$suffix[id] = configs.suffix
      return configs.prefix
    },
    suffix: async function (id, val) {
      if (!id) return ''
      if (val) this.$suffix[id] = val
      if (this.$suffix[id]) return this.$suffix[id]

      let configs = await Anni.$Configs.get(id)
      this.$prefix[id] = configs.prefix
      this.$suffix[id] = configs.suffix
      return configs.suffix
    },

    $server: {},
    $paused: {},
    $prefix: {},
    $suffix: {}
  }
}