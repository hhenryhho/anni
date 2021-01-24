module.exports = (Model, Types) => {

  Model.$Starred = {
    table: Model.$db.define('starred', {
      guild: { type: Types.STRING },
      count: { type: Types.INTEGER, defaultValue: 0 },
      pin:   { type: Types.STRING },
      key:   { type: Types.STRING }
    }),

    get: async function(pin, guild) {
      let _search = { where: { pin, guild } }
      return Model.$Send(await this.table.findOne(_search))
    },

    new: async function(starred) {
      return Model.$Send(await this.table.create(starred))
    },

    set: async function(starred) {
      let _search = { where: { id: starred.id } }
      let updated = await this.table.update(starred, _search)
      return Model.$Send(updated ? starred : false)
    }
  }

}