const { db, Track } = require('../models');
const { embed_creator } = require('../lib/embed_creator.js');
const { parse_amount }  = require('../lib/parse_amount.js');

async function execute(message, args) {
  const amount = parse_amount(args[1]);
  
  if (isNaN(amount)) {
    return message.reply('El valor a agregar debe ser un numero o su abreviacion. EJ: !sumar kzarka 90kk');
  }

  const track = await Track.findOne({ where: { item_tag: `${args[0]}_${message.author.id}` } });

  if (!track) return message.reply('El track ingresado no existe.');

  track.current_progress = parseInt(track.current_progress) + amount;

  let percentage = (track.current_progress * 100 / track.value).toFixed(2);

  response_message = await embed_creator(track.item, track.current_progress, track.value, percentage);

  if (track.current_progress >= track.value) {
    track.current_progress = track.value;
    percentage = 100
    response_message = `:tada: Felicidades! concretaste la meta para \`${track.item}\`! Tienes ${track.current_progress}`
  }

  await track.save()
  
  return message.reply(response_message);
}

module.exports = {
  name: 'add',
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <silver a agregar>',
  cooldown: 5,
  aliases: ['sumar', 'guardar', 'agregar', 'save'],
  execute
};
