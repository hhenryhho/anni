// actions.js - server action utilities 

module.exports = Anni => {
  Anni.Actions = {
    Get: async function (Anni, Msg) {
      if (!Msg.auth) return
        
      let actions = await Anni.$Actions.get(Msg.auth.id, Msg.exec)
      if (!actions) return false

      let desc = actions.text
      let rand = Anni.$rand(actions.list)

      desc = Msg.args.length ? desc : desc.split(' {msg}').join('')
      return { desc, image: rand }
    }
  }
}