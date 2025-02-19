const { db, Track }     = require('../models');
const { embed_creator } = require('../lib/embed_creator.js');
const { parse_amount }  = require('../lib/parse_amount.js');

async function execute(message, args) {
  const amount = parse_amount(args[1]);

  if (isNaN(amount)) {
    return message.reply('El valor a restar debe ser un numero o su abreviacion. EJ: !restar kzarka 20kk');
  }

  const track = await Track.findOne({ where: { item_tag: `${args[0]}_${message.author.id}` } });

  if (!track) return message.reply('El track ingresado no existe.');

  new_value = parseInt(track.current_progress) - amount;

  if (new_value < 0) {
    track.current_progress = 0;
  } else {
    track.current_progress = new_value;
  }

  await track.save()

  let percentage = (track.current_progress * 100 / track.value).toFixed(2);

  return message.reply(await embed_creator(track.item, track.current_progress, track.value, percentage));
}

module.exports = {
  name: 'deduct',
  aliases: ['restar', 'quitar', 'descontar', 'subtract'],
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <silver a restar>',
  cooldown: 5,
  execute
};
