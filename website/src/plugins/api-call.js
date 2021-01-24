export default {
  install(Vue) {
    Vue.prototype.$getProfile = async function (user, guild) {
      return await this.$Call('profile/get', false, user, guild)
    }

    Vue.prototype.$setProfile = async function (user, guild, data) {
      return await this.$Call('profile/set', data, user, guild)
    }

    Vue.prototype.$getConfigs = async function (guild) {
      return await this.$Call('configs/get', false, guild)
    }

    Vue.prototype.$setConfigs = async function (guild, data) {
      return await this.$Call('configs/set', data, guild)
    }

    Vue.prototype.$getActions = async function (guild) {
      return await this.$Call('actions/get', false, guild)
    }

    Vue.prototype.$setActions = async function (guild, data) {
      return await this.$Call('actions/set', data, guild)
    }

    Vue.prototype.$newActions = async function (guild, data) {
      return await this.$Call('actions/new', data, guild)
    }

    Vue.prototype.$remActions = async function (guild, data) {
      return await this.$Call('actions/rem', data, guild)
    }

    Vue.prototype.$getOptions = async function (guild) {
      return await this.$Call('options/get', false, guild)
    }

    Vue.prototype.$setOptions = async function (guild, data) {
      return await this.$Call('options/set', data, guild)
    }

    Vue.prototype.$newOptions = async function (guild, data) {
      return await this.$Call('options/new', data, guild)
    }

    Vue.prototype.$remOptions = async function (guild, data) {
      return await this.$Call('options/rem', data, guild)
    }
  }
}