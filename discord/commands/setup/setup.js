// setup.js - DMs info on setting up the guild

module.exports = {
  name: 'setup',
  gate: 5,
  auth: true,

  help: {
    head: "~/setup",
    desc: [
      "Returns info for setting up the server config.",
      "",
      "{{ ~/setup }}"
    ]
  },

  info: {
    head: "Anni Setup",
    desc: [
      "**Want to set up a starboard?** Try `~/starboard`",
      "Get started with **custom profile options** with `~/help options`",
      "",
      "*General Settings Below*"
    ],
    grid: [
      {
        name: "Set Your Birthday Channel *Required*",
        text: "Use `~/channel` to set your *birthday channel*. Without setting a channel, reminders and announcements will not fire. {{ ~/channel #general-chat }}{_}"
      },
      {
        name: "Change Reminder Message *Optional*",
        text: "Use `~/reminder` to change the birthday reminder message. You can pass 'off' to disable the reminder. This is the message that will fire in your *birthday channel* one week before the user's birthday. {{ ~/reminder Hey, {/users} birthday is in a week! }}{_}"
      },
      {
        name: "Change Announcement Message *Optional*",
        text: "Use `~/announce` to change the birthday announcement message. You can pass 'off' to disable the announcement. This is the message that will fire in your *birthday channel* on the day of the user's birthday. {{ ~/announce Happy Birthday {/user}! }}{_}"
      },
      {
        name: "Change Server Prefix *Optional*",
        text: "Use `~/prefix` to change the server prefix. By default, this is `anni.`, hence `anni.help` or `anni.commands`. Some bots use `!` or `^`, but be sure to pick something unique in your server to separate Anni from other bots. Some popular options are `a.`, `a^`, or `a!` {{ ~/prefix ?? }}"
      },
      { text: "*You can respond to this DM with the above commands.*" }
    ]
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.info).dm()
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, 'prefix', Test.data.prefix)
    await Test.Run(Anni, Msg, 'suffix', 'off')
    await Test.Run(Anni, Msg, 'suffix', '.exe')
    await Test.Run(Anni, Msg, 'channel', 'off')
    await Test.Run(Anni, Msg, 'channel', Test.data.channel)
    await Test.Run(Anni, Msg, 'reminder', 'off')
    await Test.Run(Anni, Msg, 'reminder', Test.data.reminder)
    await Test.Run(Anni, Msg, 'announce', 'off')
    await Test.Run(Anni, Msg, 'announce', Test.data.announce)
    await Test.Run(Anni, Msg, 'refresh')

    return true
  }
}