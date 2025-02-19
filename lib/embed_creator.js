const Discord = require('discord.js');
const canvas  = require('./draw_progress.js');
const numbro  = require("numbro");

async function embed_creator(item, current_progress, value, percentage) {
  const format_progress = numbro(current_progress).format('0,0');
  const format_value = numbro(value).format('0,0');
  const attachment = new Discord.Attachment(await canvas.draw_progress(percentage), 'progress-banner.png');

  const embed_message = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`Item: ${item} ${percentage}%`)
    .setDescription(`Vas **${format_progress}** de **${format_value}**`)
    .attachFiles([attachment])
    .setImage('attachment://progress-banner.png');

  return embed_message;
}

module.exports = {
  embed_creator
}