/*************************************/
/**   Loader.js                    **/
/**---------------------------------**/
/**   Load files and folders into   **/
/**   a predefined object.          **/
/**---------------------------------**/
/*************************************/

const { promisify } = require('util')
const readDirectory = promisify(require('fs').readdir)

module.exports = {
  Utility: async function (Model) {
    require('./Logger.js')(Model)
    this.Log = Model.State
    this.Log(`Loading Database...`)
    require('./database/Storage.js')(Model)
  },

  Scripts: async function (folder, loaded = []) {
    this.Log(`Loading ${folder}...`)
    const files = await readDirectory(folder)
    for (let file of files) {
      let location = `${folder}/${file}`
      let fileName = file.split('.')[0]
      let isFolder = file.indexOf('.') < 0
      let isScript = file.indexOf('.js') > 0
      if (isFolder) await this.Scripts(location, loaded)
      if (isScript) loaded.push({ name: fileName, load: require(location) })
    } 
    return loaded
  }
}