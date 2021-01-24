// profile-setup.js - DMs info on setting up a server

module.exports = {
  name: 'profile-setup',
  gate: 1,
  auth: true,
  hide: true,

  help: {
    head: "~/profile setup",
    desc: [
      "Returns info for setting up your profile.",
      "",
      "{{ ~/profile setup }}"
    ]
  },

  info: {
    head: "Profile Setup",
    grid: [
      { 
        name: "Set Your Birthday",
        text: "Use `~/birthday` to set your birthday in the MM/DD/YYYY format. You do not need to provide a birthday unless you want your age to appear on your profile. {{ ~/birthday 03/21 || ~/birthday 03/21/1998 }}{_}"
      },
      {
        name: "Set Your Timezone",
        text: "Use `~/timezone` to set your timezone to the nearest time city to you. For the US, it's usually Los Angeles, Denver, Chicago, and New York. If you're unsure what to input, you can [visit this link]({timezones}) and click on yourself on the map. {{ ~/timezone chicago || ~/timezone sydney }}{_}"
      },
      {
        name: "Profile Visibility",
        text: "Birthdays and Timezones are linked to you. If you are in multiple servers with Anni, your profile will be hidden by default. You can add your profile to that server by using `~/profile show`. Once added, your birthday and timezone will be visible on your profile in that server. Server specific options will never be visible on another server."
      },
      { text: "*You can respond to this DM with the above commands.\nThese options are also available on the [dashboard]({website}/dashboard).*" }
    ]
  },

  lang: {
    head: "Extended Profile Setup: {guild.name}",
    desc: "Use the commands below to set up your extended *{guild.name}* profile. Your birthday and timezone are synced across servers (but private by default) - however the options below are only visible in **{guild.name}**."
  },

  fire: async function (Anni, Msg) {
    // make sure they *have* a profile
    await Anni.$Profile.get(Msg.author.id)
    // send out the generic profile response
    Anni.Reply(Msg, this.info).dm()
    // check for any server profile options
    let post = { head: this.lang.head, desc: this.lang.desc, grid: [] }
    let list = await Anni.$Options.all(Msg.auth.id)
    if (!list) return false
    for (let opt of list) {
      let info = `**${opt.name}** - *${opt.desc}*`
      let more = `{{ ~/set ${opt.tag} (your text) }}`
      let wipe = `{{ ~/wipe ${opt.tag} }} to clear option.`
      post.grid.push({ text: `${info} ${more} ${wipe}`})
    }
    return Anni.Reply(Msg, post).dm()
  }
}