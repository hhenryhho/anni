// starboard.js - DMs info on setting up the starboard

module.exports = {
  name: 'starboard',
  also: [ 'sb' ],
  gate: 5,
  auth: true,

  help: {
    head: "~/starboard",
    desc: [
      "Returns info for setting up the starboard.",
      "",
      "{{ ~/starboard }}"
    ]
  },

  info: {
    head: "Anni Starboard Setup",
    grid: [
      {
        name: "Set Your Starboard Channel *Required*",
        text: "Use `~/board` to set your *starboard channel*. You'll need to create this on your own, and set it so that only Anni can send messages. Once set, the starboard will begin operating. To disable, set the channel to `off`. {{ ~/channel #starboard }}{_}"
      },
      {
        name: "Change Reaction Emoji *Optional*",
        text: "Use `~/emoji` to change the starboard reaction emoji. By default this is :star: {{ ~/emoji :heart: }}{_}"
      },
      {
        name: "Change Reaction Amount *Optional*",
        text: "Use `~/amount` to change the amount of reactions required to post to the starboard. By default, this is set to `2`. *If you have a larger server, you may want to increase this threshold.* {{ ~/amount 6 }}"
      },
      { text: "*You can respond to this DM with the above commands.*" }
    ]
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.info).dm()
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, 'board', Test.data.channel)
    await Test.Run(Anni, Msg, 'count', '1')
    await Test.Run(Anni, Msg, 'emoji', '⭐')

    await Msg.react('⭐')
    await Anni.Wait(1000)

    return true
  }
}