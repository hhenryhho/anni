// refresh.js - Updates cached guild information

module.exports = {
  name: 'refresh',
  gate: 5,
  auth: true,

  help: {
    head: "~/refresh",
    desc: [
      "Updates guild information in database.",
      "",
      "{{ ~/refresh }}"
    ]
  },

  fire: async function (Anni, Msg) {
    let details = Anni.Bot.Details(Msg.auth)
    await Anni.$Details.set(details)
    return Anni.Reply(Msg, "Refreshed.").clean()
  }
}