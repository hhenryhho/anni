// Utitlies.js - for simple modifications

module.exports = Anni => {
  Anni.Arr = {
    sort: (arr, key) => {
      let byVal = (a, b) => a > b ? 1 : -1
      let byKey = (a, b) => a[key] > b[key] ? 1 : -1
      return arr.sort(key ? byKey : byVal)
    },
    pair: (arr) => [ arr.shift().toLowerCase(), arr.join(' ') ]
  }

  Anni.Str = {
    yes: (val) => val ? 'yes' : 'no',
    isY: (str) => pos.includes(str.toLowerCase()),
    isN: (str) => neg.includes(str.toLowerCase()),

    match: (a, b) => a && b && a.toLowerCase() == b.toLowerCase(),
    strip: (str) => {
      if (!str) return ''
      let clip = str.length - 1
      let isID = str.indexOf('<') === 0
      let icon = str.indexOf('<:') === 0
      let long = str.indexOf('@&') === 1
      let name = str.indexOf('@!') === 1

      let trim = (long || name) ? 3 : icon ? 1 : 2
      if (isID) return str.substring(trim, clip)

      str = str.split('#').join('')
      return str
    },

    avatar: (user) => {
      let base = 'https://cdn.discordapp.com/avatars'
      return user ? `${base}/${user.id}/${user.avatar}.png` : ''
    }
  }

  // handle boolean values and yes/no
  const pos = ['y', 'yes', 'on', 'true', 'enable']
  const neg = ['n', 'no', 'off', 'false', 'disable']
}