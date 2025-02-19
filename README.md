# Progress bot (DiscordJS)

A simple bot to track progress towards numeric goals. Just use `!track <item> <value>` to create a tracked item, and then add your progress by using `!add <item> <amount to add to the progress>`.

# Other Commands

`!check <item>` checks an item progress
`!delete <item>` stop tracking and removes that item from db
`!deduct <item> <amount to deduct from progress>` deducts from the current progress.

# How to install and run

Create a new application at https://discordapp.com/developers/applications/ and then turn it into a bot application. From the bot section you will be able to pull your bot token:

Create a `config.json` file (theres an example of it with the extension .example in the project), then add your bot token there.

After that, just run the app with `node index.js` and you should be good to go!

To invite your own bot to your server edit this url with your client id provided at the discord dev site https://discordapp.com/oauth2/authorize?client_id=<your_client_id>&scope=bot

# Github Issues

For feature request, bugs and other issues, feel free to submit them via github issues
