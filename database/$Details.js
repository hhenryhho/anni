module.exports = (Model, Types) => {

  Model.$Details = {
    table: Model.$db.define('details', {
      guild: { type: Types.STRING, unique: true },
      // discord data cache
      chans: { type: Types.TEXT,   defaultValue: '[]' },
      roles: { type: Types.TEXT,   defaultValue: '[]' }
    }),

    get: async function (guild) {
      let _search = { where: { guild: guild } }
      let details = await this.table.findOne(_search)
      return Model.$Send(details)
    },

    set: async function (updates) {
      let _search = { where: { guild: updates.guild } }
      let current = await this.table.findOne(_search)
      if (!current) return Model.$Send(await this.table.create(updates))
      else return Model.$Send(await this.table.update(updates, _search))
    }
  }

}