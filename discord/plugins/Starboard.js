// Starboard.js - for managing the starboard

module.exports = Anni => {
  Anni.Starboard = {
    Check: async function (Anni, React) {
      if (React.empty) return
      let guild = React.message.guild
      let confs = await Anni.$Configs.get(guild.id)
      let count = React.count >= confs.count
      let emoji = this.icon(confs.emoji) == React.ion

      React.board = guild.channels.cache.get(confs.board)
      if (!count || !emoji || !React.board) return

      let message = `${React.message.channel.id}/${React.message.id}`
      React._star = { guild: guild.id, count: React.count, key: message }
      React._post = await Anni.$Starred.get(message, guild.id)

      return React._post ? this.edit(React) : this.post(React)
    },
    
    post: async function (React) {
      let star = React._star
      let user = React.message.author
      let desc = React.message.content
      let icon = React.message.author.avatarURL()
      let name = `${user.username}#${user.discriminator}`

      let ding = `<@${user.id}>`
      let chan = `<#${React.message.channel.id}>`
      let stat = `**${React.count}** ${React._icon}`
      let link = this.link(`${React._star.guild}/${React._star.key}`)

      let grid = [{ text: `${stat} - ${ding} - ${chan} - ${link}` }]
      let post = { name, desc, icon, grid, image: React.image }

      let sent = await Anni.Reply({ channel: React.board }, post).send()
      star.key = sent.id

      await Anni.$Starred.new(star)
      await Anni.$Profile.star(user.id, star.count)

      let server = Anni.Server(React._star.guild)
      return Anni.Log(`Starboard Post: ${server.name}`)
    },
    edit: async function (React) {
      let pinned = await React.board.messages.fetch(React._post.pin)
      if (!pinned) return

      // update the stat line
      let embed = { ...pinned.embed[0] }
      let stats = embed.fields[0].value.split(' - ')
       stats[0] = `**${React.count}** ${React._icon}`
      embed.fields[0].value = stats.join(' - ')
      pinned.edit({ embed })

      // update the database
      let star = React._star
      let post = React._post
      let user = React.message.author.id
      await Anni.$Starred.set(star.guild, star)
      await Anni.$Profile.star(user, star.count, post.count)

      let server = Anni.Server(star.guild)
      return Anni.Log(`Starboard Update: ${server.name}`)
    },

    icon: (str) => str.length > 1 ? str.split(':')[2] : str,
    link: (str) => `[View](https://discordapp.com/channels/${str})`
  }
}