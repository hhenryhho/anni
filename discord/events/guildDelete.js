// guildDelete.js - removed from a server

module.exports = async (Anni, Guild) => {
  
  // post the removed guild in the log
  let name = `Removed From ${Guild.name}`
  let text = `Now In ${Anni.Bot.Servers()} servers.`

  return Anni.State(text, name)

}