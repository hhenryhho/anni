import Vue from 'vue'
import App from '@/App.vue'
import docs from './anni.json'
import conf from '../../configs.json'

import globals from '@/plugins/globals.js'
import utility from '@/plugins/utility.js'
import coreAPI from '@/plugins/api-core.js'
import callAPI from '@/plugins/api-call.js'

import router from '@/plugins/router.js'
import vuetify from '@/plugins/vuetify.js'

Vue.config.productionTip = false

Vue.prototype.$cmdDocs = docs.commands

Vue.prototype.$apiOrigin = conf.origin_api
Vue.prototype.$urlGoGold = conf.URLs.patreon
Vue.prototype.$urlGithub = conf.URLs.github
Vue.prototype.$urlTrello = conf.URLs.trello
Vue.prototype.$urlInvite = conf.URLs.invite
Vue.prototype.$urlServer = conf.URLs.server
Vue.prototype.$urlLogins = conf.URLs.login
Vue.prototype.$urlVotes1 = conf.URLs.vote1
Vue.prototype.$urlVotes2 = conf.URLs.vote2

Vue.use(globals)
Vue.use(utility)
Vue.use(coreAPI)
Vue.use(callAPI)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
