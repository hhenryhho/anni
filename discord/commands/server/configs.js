// configs.js - returns the guild configs

module.exports = {
  name: 'configs',
  gate: 5,
  auth: true,

  help: {
    head: "~/configs",
    desc: [
      "Returns the configs for the server.",
      "",
      "{{ ~/configs }}"
    ]
  },

  info: {
    head: '~/configs',
    desc: [
      'Current general configuration for {guild.name}.',
      'Use `~/setup` to change options. Check out the [dashboard]({website}/dash) for an easier setup.'
    ]
  },

  fire: async function (Anni, Msg) {
    let configs = await Anni.$Configs.get(Msg.auth.id)

    let reminder = Anni.Escape(configs.reminder || 'None')
    let announce = Anni.Escape(configs.announce || 'None')
    let channel  = configs.channel ? `<#${configs.channel}>` : 'None'

    let emoji = configs.emoji || 'None'
    let count = configs.count || 'None'
    let board = configs.board ? `<#${configs.board}>` : 'None'

    let post = Anni.$Copy(this.info)

    post.grid = [
      { text: '***[ Birthday Settings ]***' },
      { name: '~/channel',  text: channel },
      { name: '~/reminder', text: reminder },
      { name: '~/announce', text: announce },
      { text: '***[ Starboard Settings ]***' },
      { name: '~/count', text: count, col: true },
      { name: '~/emoji', text: emoji, col: true },
      { name: '~/board', text: board, col: true }
    ]

    return Anni.Reply(Msg, post).dm()
  }
}