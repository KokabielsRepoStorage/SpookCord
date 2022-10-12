//* This ends on october 16. I am starting this on october 12, so this was made in 4 days
//* Created by : Suzzudev / Shiro
//* I might actually like Eris more than discord.js

//? I normally use discord.js, but it said with a new library
const Eris = require("eris");
const dotenv = require("dotenv");
const { CommandSetup } = require("./commands/commandSetup");

//? Getting the environment variables
dotenv.config();

//? Taking the variable from process
const BOT_TOKEN = process.env.TOKEN;

//? Checking if the token exists.
if (!BOT_TOKEN) throw new Error("Missing token. Make sure the .env file is setup!");

//? Creating a bot
const bot = new Eris.CommandClient(BOT_TOKEN, {
    intents: [
        "guilds",
        "guildMessages",
    ]
}, {
    //? Adding the prefix, owner, and description.
    prefix: ".",
    owner: "SuzzuDev",
    description: "A bot for the spookcoord contest!"
});

//? When the bot is ready, the the user it logged in
bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.username}~`)
});

//? If there is an error, log it instead of crashing.
bot.on("error", async (error) => {
    console.error(error);
})

//* Setting the commands up.
CommandSetup(bot);

//* Connecting to discord.
bot.connect();