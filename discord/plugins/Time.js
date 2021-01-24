// timedate.js - helpers for date/time management
const Moment   = require('moment')
const TimeZone = require('moment-timezone').tz

module.exports = Anni => {
  Anni.Time = {
    now:  function (...args) { return Moment(...args) },
    when: function (obj) { return Moment(obj).fromNow() },
    date: function (str) { return Moment(str, 'MM/DD/YYYY') },
    diff: function (a,b) { return Math.ceil(a.diff(b, 'days', true)) },
    real: function (str) { return this.date(str).isValid() },

    time: function (zone, tz) {
      let data = tz ? tz.tz(zone) : TimeZone(zone)
      let name = zone.split('/')[1].split('_').join(' ')
      let time = data.format('h:mm A')
      return { ...data, name, time }
    },
    curr:function  () {
      let curr = new Date(), next = new Date()
          next.setDate(next.getDate() + 7)
      let hour = curr.getHours()

      curr = curr.toJSON().split('T')[0].split('-')
      next = next.toJSON().split('T')[0].split('-')
      curr = `${curr[1]}/${curr[2]}`
      next = `${next[1]}/${next[2]}`
      return { curr, next, hour, day: parseInt(curr.split('/')[1]) }
    },
    
    zone: function (str) {
      let name = str.split(' ').join('_').toLowerCase()
      if (name.indexOf('/') > 0) return TimeZone.zone(name)
      for (let place of this.$place) {
        let zone = TimeZone.zone(`${place}/${name}`)
        if (zone)  return zone
      }
    },
    check: function (str, zone) {
      let time = this.$clock.exec(str)
      if (!time) return false

      let date = TimeZone(zone).format('YYYY-MM-DD')
      let hour = time[1], mins = time[2] || ':00'
      let ampm = time[3].toUpperCase()
      let data = `${date} ${hour}${mins} ${ampm}`
      return TimeZone(data, 'YYYY-MM-DD h:mm A', zone)
    },

    $clock: /\b([1-9]|1[0-2])(:\d{2})?\s*(a|p|am|pm)\b/i,
    $place: [ 
      'africa', 'america', 'asia', 'atlantic', 'australia', 
      'europe', 'indian', 'pacific' 
    ]
  }
}