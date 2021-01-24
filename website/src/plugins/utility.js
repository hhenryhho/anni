export default {
  install(Vue) {
    Vue.prototype.$clone = arr => JSON.parse(JSON.stringify(arr))
    Vue.prototype.$tring = str => typeof str === 'string'
    Vue.prototype.$nulls = obj => {
      for (let prop in obj) {
        if (obj[prop] === null) obj[prop] = ''
      }
      return obj
    }
    
    // string converters
    Vue.prototype.$string = {
      age(str) { return str && str != '2020' },
      avatar(user) {
        let base = 'https://cdn.discordapp.com/avatars'
        return user ? `${base}/${user.id}/${user.avatar}.png` : ''
      }
    }

    // name checker
    Vue.prototype.$checkName = function (name, arr, key, full) {
      let cmds = full ? this.$cmdDocs.names : []
      for (let cmd of cmds) if (name == cmd) return 'Command Exists'
      if (!arr || !key) return true
      for (let a in arr) if (name == arr[a][key]) return 'Trigger Exists'
      return true
    }

    // input rules
    Vue.prototype.$rules = { 
      has(str) { return !!str },
      bad(rule, str) { return typeof this[rule](str) === 'string' },
      len(str) {
        if (!str) return true
        else return str.length <= 1000 || 'Max 1000 Characters' 
      },
      url(str) {
        if (!str) return true
        if (str.indexOf('http') !== 0) return 'Invalid URL'
        let ext = str.indexOf('.gif') > 0
        if (!ext) ext = str.indexOf('.jpg') > 0
        if (!ext) ext = str.indexOf('.png') > 0
        return ext ? true : 'Not A Compatible Image'
      },
      ping(str) {
        if (str.indexOf('{user}') > -1) return true
        if (str.indexOf('{users}') > -1) return true
        return 'Requires {user} or {users}'
      },
      space(str) {
        if (!str) return true
        return str.indexOf(' ') > -1 ? 'No Spaces' : true
      }
    }
  }
}