// test.js - run command tests

module.exports = {
  name: 'test',
  gate: 9,
  args: 1,
  hide: true,
  nodm: true,

  help: {
    head: "~/test",
    desc: [ "Does a test." ]
  },

  lang: {
    run: { desc: "Starting {total} test(s)." },
    ran: { desc: "Done Running Test {tested}/{total}." },
    end: { desc: "Finished {total} test(s)." },
    err: { desc: "No test available for: {cmd}." }
  },

  fire: async function (Anni, Msg) {
    Msg.tests = true
    Msg.color = '0xFF0000'

    let Test = {
      Run: (...args) => Anni.Commands.Test(...args),
      Was: (text) => Anni.State(`**Expected:** ${text}`),
      data: {
        ...Anni.cfg.defaults,
        channel: Anni.bot.logs,
        image: 'https://i.imgur.com/r9aU2xv.gif'
      }
    }

    let total = Msg.args.length, tested = 0
    Anni.Reply(Msg, this.lang.run, { total }).send()

    for (let cmd of Msg.args) {
      tested += 1
      let updates = { total, tested, cmd }

      let test = Anni.Commands.find(`test-${cmd}`)
      if (test) await test.fire(Anni, Msg, Test)

      else {
        let Command = Anni.Commands.find(cmd)
        let hasTest = Command && Command.test
        if (hasTest) Msg.testing = Command.name
        if (hasTest) await Command.test(Anni, Msg, Test)
        else Anni.Reply(Msg, this.lang.err, updates).send()
      }

      Anni.Reply(Msg, this.lang.ran, updates).send()
    }

    return Anni.Reply(Msg, this.lang.end, { total }).send()
  }
}