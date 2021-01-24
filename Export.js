/************************************/
/**   Anni | Extractor             **/
/**--------------------------------**/
/**   Extracts command help info   **/
/**   to JSON for the web docs.    **/
/**--------------------------------**/
/************************************/

const { Remarkable } = require('remarkable')
const md = new Remarkable(), fs = require('fs')

const cfg = require('./configs.json')
const pkg = require('./package.json')

const Load = require('./Loader.js')
const Data = { cfg, pkg, Command: {} }

const Parse = help => {
  for (let prop in help) {
    let str = help[prop]
    str = Array.isArray(str) ? str.join('\n') : str
    str = Data.Lang.Parse({}, str)
    // parse out the ` for strong vs code
    str = str.split('```js\n').join('---')
    str = str.split('\n```').join('---')
    str = str.split('\n').join('nLine')
    str = str.split('`').join('**')
    str = str.split('---').join('```')
    str = md.render(str)
    // replace unneeded rendering
    str = str.split('\n').join('')
    str = str.split('<p>').join('')
    str = str.split('</p>').join('')
    str = str.split('nLine').join('<br>')
    str = str.split('<code>').join('<kbd>')
    str = str.split('</code>').join('</kbd><br>')
    // replace the generic prefix
    str = str.split('~/').join('anni.')
    help[prop] = str
  }
  return help
}

const Extractor = async () => {
  await Load.Utility(this)
  let plugins = await Load.Scripts('./discord/plugins')
  let command = await Load.Scripts('./discord/commands')

  for (let file of plugins) file.load(Data)
  for (let file of command) Data.Command[file.name] = file.load

  let temp = Object.entries(Data.Command)
  let list = temp.filter(c => c[1].gate < 9)
  let cmds = { user: {}, mods: {}, admin: {}, names: [] }

  for (let cmd of list) {
    let comm = cmd[1]
    let gate = comm.gate > 3 ? 'admin' : comm.gate > 1 ? 'mods' : 'user'
    
    cmds.names.push(comm.name)
    if (comm.also) cmds.names.push(...comm.also)
    if (comm.help.desc) cmds[ gate ][comm.name] = Parse(comm.help)
    if (comm.help.user) cmds['user'][comm.name] = Parse(comm.help.user)
    if (comm.help.mods) cmds['mods'][comm.name] = Parse(comm.help.mods)
  }

  for (let perm in cmds) {
    if (perm != 'names') {
      for (let name in cmds[perm]) {
        if (name.indexOf('-') > 0) {
          let parent = name.split('-')[0]
          let subcmd = cmds[perm][name]
          let exists = cmds[perm][parent]
          if (exists) {
            if (!exists.subs) exists.subs = [ subcmd ]
            else exists.subs.push(subcmd)
            delete cmds[perm][name]
          }
        }
      }
      let keys = Object.entries(cmds[perm]), temp = []
      for (let [name, value] of keys) temp.push({ name, ...value })
      cmds[perm] = temp
    }
  }

  let path = './website/src/anni.json'
  let file = JSON.stringify({ commands: cmds })
  try { fs.writeFileSync(path, file) }
  catch (e) { console.info(e) }
}

Extractor()