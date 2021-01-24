// guildCreate.js - added to a server

module.exports = async (Anni, guild) => {

  // log the new guild and data
  let name = `Added to ${guild.name}`
  let text = [
    `Total Users: ${guild.memberCount}`,
    `Server Owner: ${guild.owner.user.username}`,
    `Now In ${Anni.Bot.Servers()} servers.`
  ]

  // cache the owner as an admin, send the start message
  Anni.Cache.server(guild.owner.user.id, guild.id)
  guild.owner.send({ embed: {
    author: { name: `Thanks for adding me to ${guild.name}` },
    description: "Use `anni.help` or `anni.setup` to get started!"
  }})

  
  let details = Anni.Bot.Details(guild)
  await Anni.$Details.set(details)
  return Anni.State(text.join('\n'), name)

}