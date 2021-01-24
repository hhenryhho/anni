// ready.js - after login

module.exports = async Anni => {
  
  // let's sync our database
  Anni.State(`Syncing Database ...`)
  await Anni.$Sync()

  // wait one more second just in case
  Anni.State(`Waiting for Discord ...`)
  await Anni.Wait(1000)

  // start our heartbeat
  Anni.Heartbeat.start()

  // now that we're all set up
  // we start to accept commands
  Anni.ready = true
  Anni.State(`Booted - v${Anni.pkg.version}`)
  
}