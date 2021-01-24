// guildDelete.js - removed from a server

module.exports = async (Anni, guild) => {
  
  // post the removed guild in the log
  let name = `Removed From ${guild.name}`
  let text = `Now In ${Anni.Bot.Servers()} servers.`

  return Anni.State(text, name)

}