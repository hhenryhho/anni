// channelUpdate.js - update text channel names for dashboard

module.exports = async (Anni, chan) => {
  let details = chan.guild ? Anni.Bot.Details(chan.guild) : false
  return details ? await Anni.$Details.set(details) : false
}