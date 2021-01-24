// Access.js - checking user permissions

module.exports = Anni => {
  Anni.Access = {
    Get: function (Anni, Msg) {
      let card = this.badge(1)
      let auth = Msg.guild || Anni.Cache.server(Msg.author.id)
      let user = auth ? auth.members.cache.get(Msg.author.id) : Msg.member

      if (user && auth) {
        if (this.staff(user, auth)) card = this.badge(3)
        if (this.admin(user))       card = this.badge(5)
        if (this.owner(user, auth)) card = this.badge(7)
        if (this.maker(user))       card = this.badge(9)
      }

      return { ...card, auth }
    },

    forge: function (gate, auth) { return { ...this.badge(gate), auth } },
    badge: function (gate) { return this.$badges[gate] },
    maker: function (user) { return Anni.bot.owners.includes(user.id) },
    owner: function (user, guild) { return user.id == guild.ownerID },
    admin: function (user) { return user.hasPermission('ADMINISTRATOR') },
    staff: function (user, guild) {
      let list = ['mod', 'mods', 'moderator', 'moderators', 'staff']
      let _inc = role => list.includes(role.name.toLowerCase())
      let role = guild.roles.cache.find(_inc)
      return role && user.roles.cache.get(role.id) ? true : false
    },

    $badges: {
      0: { level: 0, name: 'Server' },
      1: { level: 1, name: 'User' },
      2: { level: 2, name: 'Mods' },
      3: { level: 3, name: 'Moderator' },
      4: { level: 4, name: 'Config' },
      5: { level: 5, name: 'Admin' },
      7: { level: 7, name: 'Owner' },
      9: { level: 9, name: 'Author' }
    }
  }
}