// messageReactionAdd.js - checks for message reactions

module.exports = (Anni, React) => {
  let emoji = React._emoji
  let where = React.message
  let words = where.content
  let embed = where.embeds[0]
  let files = where.attachments

  // extract an image
  let isgif = embed && embed.url && embed.url.indexOf('.gif') > 0
  let added = files.size ? files.entries().next().value[1].url : false
  if (isgif)  isgif = `${embed.url.split('.gif')[0].gif}`

  if (embed)  React.image = isgif || embed.thumbnail.url
  if (added)  React.image = added

  // remove count for self-reactions
  let dummy = React.users.cache.get(where.author.id)
  if (dummy)  React.count -= 1

  // check if there's anything to check?
  React.empty = !words && !embed && !files.size

  // parse the emoji
  let type = React._emoji.animated ? 'a' : ''
  let icon = emoji.id || emoji.name
  let long = icon.length > 1

  React.ion = icon
  React._icon = long ? `<${type}:${emoji.name}:${emoji.id}>` : icon

  // fire any reaction based checks
  if (where.guild) Anni.Starboard.Check(Anni, React)
}