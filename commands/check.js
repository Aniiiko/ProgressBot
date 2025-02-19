module.exports = {
  name: 'check',
  description: 'Check progress of an item',
  execute(message, args) {
      const { Track } = require('../models'); // Assuming models are in the parent directory
      const item = args[0];
      if (!item) return message.reply("Please specify an item!");
      const itemTag = `${item}_${message.author.id}`;
      Track.findOne({ where: { item_tag: itemTag } }).then(track => {
          if (!track) return message.reply("Item not found!");
          const current = track.current_progress;
          const goal = track.value;
          const percentage = Math.round((current / goal) * 100);
          const barLength = 10;
          const filled = Math.round(barLength * (current / goal));
          const empty = barLength - filled;
          const progressBar = '🟩'.repeat(filled) + '🟥'.repeat(empty);
          message.reply(`${item}: ${current}/${goal} (${percentage}%)\n${progressBar}`);
      }).catch(err => {
          console.error(err);
          message.reply("Error checking item!");
      });
  },
};