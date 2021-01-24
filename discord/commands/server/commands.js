// commands.js - lists available commands

module.exports = {
  name: 'commands',
  also: ['cmds'],
  gate: 0,

  help: {
    head: "~/commands",
    desc: [ "Lists the commands you have access to." ]
  },

  lang: {
    title: "Anni Commands ({perm})",
    help: "**Prefix:** `~/` - Use `~/help command` for more info."
  },

  fire: async function (Anni, Msg) {
    let cats = {}, list = Anni.Commands.all(Msg)
    let post = { head: this.lang.title, grid: [] }
    let perm = Msg.perm.name

    // sort commands by categories
    let cmds = Anni.Arr.sort(list)
    for (let cmd of cmds) {
      cats[cmd.access] = cats[cmd.access] || ``
      cats[cmd.access] += `${cmd.name}\n`
    }

    for (let name in cats) post.grid.push({ name, text: cats[name], col: 1 })
    post.grid.push({ text: this.lang.help })


    return Anni.Reply(Msg, post, { perm }).dm(true)
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 1
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 3
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 5
    await Test.Run(Anni, Msg, this.name)

    await Test.Was('Variable Command Lists.')

    return true
  }
}