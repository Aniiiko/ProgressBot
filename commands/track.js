const { db, Track } = require('../models');
const { parse_amount }  = require('../lib/parse_amount.js');
const { embed_creator } = require('../lib/embed_creator.js');

async function execute(message, args) {
  const amount = parse_amount(args[1]);

  if (isNaN(amount)) {
    return message.reply('El valor a trackear debe ser un numero o su abreviacion. EJ: !track kzarka 15B');
  }

  const track = await Track.create({
    item_tag: `${args[0]}_${message.author.id}`,
    item: args[0],
    value: amount,
    username: message.author.username,
    discord_id: message.author.id,
    current_progress: 0
  });

  return message.reply(await embed_creator(track.item, track.current_progress, track.value, 0));
}

module.exports = {
  name: 'track',
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <valor en silver>',
  cooldown: 5,
  execute
};
