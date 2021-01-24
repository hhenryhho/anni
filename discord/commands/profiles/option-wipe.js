// option-wipe.js - deletes a user's server profile option

module.exports = {
  name: 'wipe',
  gate: 1,
  args: 1,
  auth: true,
  hide: true,

  help: {
    head: "~/set [tag] [your text]",
    desc: [
      "Sets a profile option for your server. Pass the `tag` you find using `~/profile setup` or `~set`, and pass new options. Be sure to check out the [dashboard]({website}/dashboard) for easier profile management.",
      "",
      "{{ ~/set tag I like to make things. }}",
    ]
  },

  lang: {
    none: "Sorry, couldn't find profile option `{tag}`. Use `~/set` to find tags.",
    done: "Successfully cleared **{tag}**."
  },

  fire: async function (Anni, Msg) {
    let tag = Msg.args[0]
    let user = Msg.author.id
    let guild = Msg.auth.id

    // make sure the tag exists
    let option = await Anni.$Options.get(guild, tag, user)
    if (!option.id) return Anni.Reply(Msg, this.lang.none, { tag }).clean()

    await Anni.$Options.wipe(option)
    return Anni.Reply(Msg, this.lang.done, { tag }).clean()
  }
}