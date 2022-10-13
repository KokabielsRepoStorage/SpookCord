//* This ends on october 16. I am starting this on october 12, so this was made in 4 days
//* Created by : Suzzudev / Shiro
//* I might actually like Eris more than discord.js

//? I normally use discord.js, but it said with a new library
const Eris = require("eris");
const dotenv = require("dotenv");
const { CommandSetup } = require("./commands/commandSetup");
const terminal = require("terminal-kit");

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
    introLog(bot);
});

//? If there is an error, log it instead of crashing.
bot.on("error", async (error) => {
    console.error(error);
})

//* Setting the commands up.
CommandSetup(bot);

//* Connecting to discord.
bot.connect();

process.stdout.on("resize", () => {
    introLog(bot);
})

async function introLog(bot) {
    console.clear();
    terminal.terminal.table([
        ["Bot info"],
        ["Tag", bot.user.username + "#" + bot.user.discriminator],
        ["Status : ", "Online"],
        ["Server count", bot.guilds.size],
        ["Website status", "Not created"],
        ["Developed by : ", "SuzzuDev/Shiro"],
        ["github", "https://github.com/Suzzudev/SpookCord"]
    ]), {
        hasBorder: true,
        contentsHasMarkup: true,
        borderChars: "lightRounded",
        borderAttr: { color: "blue" }
    };
}