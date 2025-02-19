const Discord = require('discord.js');
const canvas  = require('./draw_progress.js');
const numbro  = require("numbro");

async function plan_embed(plan_name, current_progress, plan_goal, plan_daily) {
  const percentage = (current_progress * 100 / plan_goal).toFixed(2);
  const format_progress = numbro(current_progress).format('0,0');
  const format_value = numbro(plan_goal).format('0,0');
  const daily_income = numbro(plan_daily).format('0,0');
  const required_days = ((plan_goal - current_progress) / plan_daily).toFixed(1);
  const attachment = new Discord.Attachment(await canvas.draw_progress(percentage), 'progress-banner.png');

  const comands_field = `Para reportar progreso en el plan utiliza \`!plan agregar 500kk\`
    Para revisar el progreso del plan usa \`!plan check\`
    Para volver a ingresar los datos y recalcular utiliza \`!plan\`
  `

  const embed_message = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`Plan: ${plan_name} ${percentage}%`)
    .setDescription(`Vas **${format_progress}** de **${format_value}**`)
    .attachFiles([attachment])
    .addField(':moneybag:', `Promedio de ingreso diario: ${daily_income}`, true)
    .addField(':calendar_spiral:', `Aproximadamente en ${required_days} dias se lograra el objetivo`, true)
    .addBlankField()
    .addField(':robot: Comandos', comands_field, false)
    .setThumbnail('attachment://progress-banner.png');

  return embed_message;
}

module.exports = {
  plan_embed
}