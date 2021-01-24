module.exports = (Model, Types) => {

  Model.$Records = {
    table: Model.$db.define('records', {
      bot: { type: Types.STRING },
      ran: { type: Types.INTEGER, defaultValue: 0 }
    }),

    get: async function () {
      let updates = { bot: 'anni.db' }
      let _search = { where: updates }
      let records = await this.table.findOne(_search)

      if (Model.$Good(records)) return Model.$Send(records)
      else return Model.$Send(await this.table.create(updates))
    },

    set: async function (records) {
      let _search = { where: { bot: 'anni.db' } }
      let updated = await this.table.update(records, _search)
      Model.$Send(updated ? records : false)
    }
  }

}