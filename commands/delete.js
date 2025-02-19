const { db, Track } = require('../models');

async function execute(message, args) {
  const track = await Track.destroy({
    where: {
      item_tag: `${args[0]}_${message.author.id}`
    }
  });

  if (!track) return message.reply('El track ingresado no existe.');

  return message.reply(`El item \`${args[0]}\` se ha borrado de la lista de tracks.`);
}

module.exports = {
  name: 'delete',
  aliases: ['borrar', 'remove'],
  description: 'Removes a tracked item',
  args: true,
  usage: '<item>',
  cooldown: 5,
  execute
};
