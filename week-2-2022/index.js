//* This ends on october 16. I am starting this on october 12, so this was made in 4 days
//* Created by : Suzzudev / Shiro
//* I might actually like Eris more than discord.js

//! THIS BOT IS NOT FLESHED OUT AT ALL. THE BOT IS EARLY IN DEVELOPMENT, AND THE BOT MIGHT NOT GET UPDATES EVEN AFTER THE END OF SPOOKCORD

//* I like eris more for message commands, not sure about the interaction commands, since I havent tried them

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
    description: "A bot for the spookcoord contest!",
    ignoreBots: true,
    ignoreSelf: true,
});

let loggedIn = false;

//? When the bot is ready, the the user it logged in
bot.on("ready", async () => {
    loggedIn = true;
    LogTable();

    process.stdout.on("resize", async () => {
        LogTable();
    })
});

//? If there is an error, log it instead of crashing.
bot.on("error", async (error) => {
    loggedIn = false;

    LogTable();
})

//* Setting the commands up.
CommandSetup(bot);

//* Connecting to discord.
bot.connect();

async function LogTable() {
    if (loggedIn) {
        console.clear();
        terminal.terminal.table([
            ["Bot info"],
            ["Tag", bot.user.username + "#" + bot.user.discriminator],
            ["Verified? : ", bot.user.verified],
            ["Server count", bot.guilds.size],
            ["Status", "online"],
            ["Website status", "Not created"],
            ["Developed by : ", "SuzzuDev/Shiro"],
            ["github", "https://github.com/Suzzudev/SpookCord"]
        ], {
            hasBorder: true,
            contentHasMarkup: true,
            borderChars: 'lightRounded',
            width: 120,
            borderAttr: { color: 'blue' },
            textAttr: { bgColor: 'default' },
            fit: true
        });
    } else {
        console.clear();
        terminal.terminal.table([
            ["Bot info"],
            ["Tag", bot.user.username + "#" + bot.user.discriminator],
            ["Verified? : ", bot.user.verified],
            ["Server count", bot.guilds.size],
            ["status", "Errored!"],
            ["Website status", "Not created"],
            ["Developed by : ", "SuzzuDev/Shiro"],
            ["github", "https://github.com/Suzzudev/SpookCord"],
            ["Error ", error.message]
        ], {
            hasBorder: true,
            contentHasMarkup: true,
            borderChars: 'lightRounded',
            borderAttr: { color: 'blue' },
            textAttr: { bgColor: 'default' },
            width: 60,
            fit: true
        });
    }
}

process.on("exit", (code) => {
    console.clear();
    console.log("Process ended with code : " + code);

    console.log("bye~");
})