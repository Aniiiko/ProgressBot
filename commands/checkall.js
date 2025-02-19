module.exports = {
    name: 'checkall',
    description: 'Check progress of all items for the user',
    execute(message, args) {
        const { Track } = require('../models'); // Assuming models are in the parent directory
        
        Track.findAll({ where: { discord_id: message.author.id } }).then(tracks => {
            if (tracks.length === 0) {
                return message.reply("You haven't tracked any items yet.");
            }
            
            let response = "**Your Tracked Items:**\n";
            
            tracks.forEach(track => {
                const current = track.current_progress;
                const goal = track.value;
                const percentage = Math.round((current / goal) * 100);
                const barLength = 10;
                const filled = Math.round(barLength * (current / goal));
                const empty = barLength - filled;
                const progressBar = '🟩'.repeat(filled) + '🟥'.repeat(empty);
                response += `\n${track.item}: ${current}/${goal} (${percentage}%)\n${progressBar}`;
            });
            
            message.channel.send(response, { split: true });
        }).catch(err => {
            console.error(err);
            message.reply("Error checking all items!");
        });
    },
};