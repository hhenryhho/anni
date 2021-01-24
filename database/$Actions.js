module.exports = (Model, Types) => {

  Model.$Actions = {
    table: Model.$db.define('actions', {
      name:  { type: Types.STRING },
      text:  { type: Types.TEXT },
      list:  { type: Types.TEXT, defaultValue: '[]' },
      guild: { type: Types.STRING }
    }),

    get: async function (guild, name) {
      let _search = { where: { guild, name  } }
      return Model.$Send(await this.table.findOne(_search))
    },

    all: async function (guild) {
      let _search = { where: { guild } }
      return Model.$Send(await this.table.findAll(_search))
    },

    new: async function (actions) {
      return Model.$Send(await this.table.create(actions))
    },

    del: async function (actions) {
      let _search = { where: { id: actions.id } }
      let deleted = await this.table.destroy(_search)
      return Model.$Send(deleted ? actions : false)
    },

    set: async function (actions) {
      let _search = { where: { id: actions.id } }
      let updated = await this.table.update(actions, _search)
      return Model.$Send(updated ? actions : false)
    },

    push: async function (actions, url) {
      actions.list = Model.$push(actions.list, url)
      if (!actions.list) return Model.$Send(false)
      let _search = { where: { id: actions.id, guild: actions.guild } }
      let updated = await this.table.update(actions, _search)
      return Model.$Send(updated ? actions : false)
    },

    pull: async function (actions, url) {
      actions.list = Model.$pull(actions.list, url)
      if (!actions.list) return Model.$Send(false)
      let _search = { where: { id: actions.id, guild: actions.guild } }
      let updated = await this.table.update(actions, _search)
      return Model.$Send(updated ? actions : false)
    }
  }

}