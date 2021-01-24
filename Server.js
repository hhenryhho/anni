/************************************/
/**   Anni | API Server            **/
/**--------------------------------**/
/**   Connects to database.sqlite  **/
/**   For use by the dashboard     **/
/**--------------------------------**/
/************************************/


const HTTPS = require('https') 
const fs    = require('fs')

const Load  = require('./Loader.js')

const cfg   = require('./configs.json')
const bot   = require('./discord.json')

const Api = {}
const App = require('express')()

const origin = cfg.origin_web
const access = 'Access-Control-Allow-Origin'
App.use((req, res, next) => { res.setHeader(access, origin); next() })

const initServer = async () => {

  await Load.Utility(Api)

  let server = await Load.Scripts('./endpoint/server')
  let routes = await Load.Scripts('./endpoint/routes')

  for (let file of server) file.load(Api, App)
  for (let file of routes) file.load(Api, App)

  Api.$db.sync().then(() => {
    if (cfg.api_port == 443) {
      const opts = {
        key: fs.readFileSync('./website/key.pem'),
        cert: fs.readFileSync('./website/cert.pem'),
        passphrase: bot.ssh_pass
      }
      HTTPS.createServer(opts, App).listen(cfg.api_port, () => {
        return console.log('SSL Server Running.')
      })
    } else {
      App.listen(cfg.api_port, () => console.log('Server Running.'))
    }
  })

}

initServer()
