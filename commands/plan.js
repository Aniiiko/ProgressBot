const { db, User, Plan } = require('../models');
const { parse_amount }  = require('../lib/parse_amount.js');
const { plan_embed } = require('../lib/plan_embed.js');

async function execute(message, args) {
  if (args[0] == 'check') {
    const plan = await Plan.findOne({
      where: {
        discord_id: message.author.id
      }
    });

    if (!plan) return message.reply('No tienes ningun plan creado. Usa !plan para crear uno');

    return message.channel.send(
      await plan_embed(plan.name, plan.current_progress, plan.goal, plan.daily_avg)
    );
  } else if (args[0] == 'agregar') {
    const amount = parse_amount(args[1]);

    if (isNaN(amount)) {
      return message.reply('El valor a agregar debe ser un numero o su abreviacion. EJ: !plan agregar 120kk');
    }

    const plan = await Plan.findOne({
      where: {
        discord_id: message.author.id
      }
    });

    if (!plan) return message.reply('No tienes ningun plan creado. Usa !plan para crear uno');

    new_progress = plan.current_progress + amount;
    plan.update({current_progress: new_progress});

    return message.channel.send(
      await plan_embed(plan.name, plan.current_progress, plan.goal, plan.daily_avg)
    );
  }

  first_question(message);
}

async function first_question(message) {
  const filter = m => message.author.id === m.author.id;
  const first_question_msg = 'Elige un nombre para tu plan (Te recomiendo que sea una sola palabra par que te sea facil buscarlo luego)';

  message.author.send(first_question_msg).then((dm) => {
    dm.channel.awaitMessages(filter, { time: 10000, maxMatches: 1, errors: ['time'] })
      .then(messages => {
        let message = messages.first();
        return second_question(message, message.content, filter);
      })
      .catch(() => {
        message.author.send('Time out, no recibi respuestas de tu parte :( necesito que vuelvas a iniciar el comando !plan');
      });
  });
}

async function second_question(message, first_answer, filter) {
  const second_question_msg = 'Cual es el precio del item de este plan? (ej: 16B, 150kk, etc)';

  message.author.send(second_question_msg).then((dm) => {
    dm.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
      .then(messages => {
        let message = messages.first();
        console.log("Second:", message.content);
        return third_question(message, first_answer, message.content, filter);
      })
  })
}

async function third_question(message, first_answer, second_answer, filter) {
  const third_question_msg = 'Cuanto silver haces al dia en promedio? Trata de elegir un monto al cual puedas mantener constante o un promedio aproximado, ej: 500kk';

  message.author.send(third_question_msg).then((dm) => {
    dm.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
      .then(async messages => {
        let message = messages.first();
        let third_answer = messages.first().content
        console.log("Third:", third_answer);
        return fourth_question(message, first_answer, second_answer, third_answer, filter);
      });
  });
}

async function fourth_question(message, first_answer, second_answer, third_answer, filter) {
  const fourth_question_msg = 'Con cuanto silver cuentas de base en este momento para el plan? Ej: 1.2B';

  message.author.send(fourth_question_msg).then((dm) => {
    dm.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
      .then(async messages => {
        let message = messages.first();

        let current_progress = parse_amount(messages.first().content);
        let plan_name  = first_answer;
        let plan_goal  = parse_amount(second_answer);
        let daily_avg  = parse_amount(third_answer);
        let discord_id = message.author.id;

        let plan_tag = `${discord_id}_${plan_name}`

        let query = {
            name: plan_name,
            goal: plan_goal,
            daily_avg: daily_avg,
            discord_id: discord_id,
            current_progress: current_progress,
            plan_tag: `${discord_id}_${plan_name}`
          }

        console.log(query)

        Plan.findOrCreate({
          where: {discord_id: discord_id}
        }).then(([plan, created]) => {
          plan.update(query).then(plan => {
            plan_embed(plan.name, plan.current_progress, plan.goal, plan.daily_avg).then(embed => {
              message.author.send(embed);  
            })
          });
        });
      });
  });
}

module.exports = {
  name: 'plan',
  description: 'Creates a plan based on user answers',
  args: false,
  usage: '',
  cooldown: 5,
  execute
};
