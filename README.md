# Simple-Phrase-Bot
Discord bot using discord.js that only allows members to say specific phrases.

# How to use
Before you start you are going to need the following
- Node.js installed
- A discord bot with permissions to delete messages

## Setup
1: Clone or download the repo
- Use git to clone the repo
- Click "Code" then download zip.

2: Install discord.js 
- This can be done by running `npm install discord.js` in a terminal

3: Put your discord bot token in .env
- It should be put in place of `your_bot_token_here`

4: Setup your phrases
- Add your allowed phrases to phrases.json *make sure to use the correct syntax*

5: Start the bot
- This can be done by running `node index.js` in a terminal

6: Allow message deletion
- You will need to run !togglephrase in the channel(s) you want the bot to be active in
- You will NEED admin permissions to prevent anyone from doing this
- You can manually add channels to channels.json if needed

## I dont have a bot token!
Follow this guide here:
- [link here](https://discordpy.readthedocs.io/en/stable/discord.html)
