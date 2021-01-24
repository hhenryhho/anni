export default {
  install(Vue) {
    Vue.prototype.$Auth = async function () {
      let api1 = 'https://discordapp.com/api/users/@me'
      let api2 = 'https://discordapp.com/api/users/@me/guilds'
      
      let frag = new URLSearchParams(window.location.hash.slice(1))
      let auth = frag.has('access_token') ? frag.get('access_token') : 0
      if (auth) localStorage.token = auth

      let data = { token: localStorage.token, list: [] }
      if (!data || !data.token || data.token.length < 5) return false
      let head = { headers: { authorization: `Bearer ${data.token}` }}

      let user = await fetch(api1, head).then(res => res.json())
      if (this.$Bad(user)) return this.$Bad(user)
      let list = await fetch(api2, head).then(res => res.json())

      data.user = user
      data.icon = this.$string.avatar(user)

      for (let guild of list) {
        guild.admin = (guild.permissions & 0x00000008) != 0
        if (guild.id == localStorage.guild) data.guild = guild
        data.list.push(guild)
      }

      return data
    }

    Vue.prototype.$Call = async function (path, data, auth1, auth2) {
      let [ err, auth ] = this.$Err(auth1, auth2)
      if (err || !auth) return err || false

      let token = localStorage.token
      let query = `${this.$apiOrigin}/${path}/${auth}/?token=${token}`
      if (data) for (let prop in data) query += `&${prop}=${data[prop]}`

      let name = path.split('/')[0]
      let call = await this.axios.get(encodeURI(query))
      let pull = call && call.data ? call.data : call || false
      
      return { [name]: data && data.id ? data : pull }
    }

    Vue.prototype.$Err = function (auth1, auth2) {
      let auth = [], err = this.$Bad(auth1)
      if (auth2) err = this.$Bad(auth2) || err
      if (auth1) auth.push(auth1.id)
      if (auth2) auth.push(auth2.id)
      return [ err, auth.join('/') ]
    }

    Vue.prototype.$Bad = function (data) {
      let bad = false, err = data.message
      if (err == '401: Unauthorized') bad = true
      if (bad) localStorage.token = null
      return bad ? { token: null, user: null } : bad
    }
  }
}