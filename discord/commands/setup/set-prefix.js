// set-prefix.js - sets the guild prefix

module.exports = {
  name: 'prefix',
  gate: 4,
  args: 1,
  auth: true,

  help: {
    head: "~/prefix [prefix]",
    desc: [
      "Sets the command prefix for your server.",
      "This is `anni.` by default.",
      "",
      "{{ ~/prefix ! }}",
      "{{ ~/prefix ? }}",
      "*Note: prefix cannot contain spaces.*"
    ]
  },

  lang: { done: "Successfully set the prefix for **{guild.name}** to `{prefix}`." },

  fire: async function (Anni, Msg) {
    let prefix  = Msg.args[0]
    let configs = await Anni.$Configs.get(Msg.auth.id)

    configs.prefix = prefix
    Anni.Cache.prefix(Msg.auth.id, prefix)
    await Anni.$Configs.set(configs)

    return Anni.Reply(Msg, this.lang.done, { prefix }).clean()
  }
}