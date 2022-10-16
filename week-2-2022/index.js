/**
 * * This ends on october 16. I am starting this on october 12, so this was made in 4 days
 * * Created by : Suzzudev / Shiro
 * * I might actually like Eris more than discord.js
 * ! I forked eris a littlebit to add some new features, import replaced with shiro.js (Check my github to see the code.)
 * ! Even if, the fork was made during the event, so technically it counts if its not counted as using eris.
 * ! The fork currently just has an added in button, menu, and modal builder, but I don't know how to use modals.
 * ? Most of the time I spent on this bot was making eris just work for what I needed, to the point I needed to make a fork of it..
 * ! I like eris more, but sadly it is not maintained
 * ? I normally use discord.js, but it said with a new library
*/
const Shiro = require("shirojs")
const dotenv = require("dotenv");
const { CommandSetup } = require("./commands/commandSetup");
const terminal = require("terminal-kit");
const glob = require("glob");
const fs = require("fs");

//? Getting the environment variables
dotenv.config();

//? Taking the variable from process
const BOT_TOKEN = process.env.TOKEN;

//? Checking if the token exists.
if (!BOT_TOKEN) throw new Error("Missing token. Make sure the .env file is setup!");

//? Creating a bot
const bot = new Shiro.CommandClient(BOT_TOKEN, {
    intents: [
        "all"
    ]
}, {
    //? Adding the prefix, owner, and description.
    prefix: ".",
    owner: "SuzzuDev",
    description: "A bot for the spookcoord contest!",
    ignoreBots: true,
    ignoreSelf: true,
});

let lines = 0;

//? When the bot is ready, the the user it logged in
bot.on("ready", async () => {
    glob(`${__dirname.replace(/[\\]+/g, "/")}/**/*.*`, (err, files) => {
        files.forEach((file) => {
            const fileText = fs.readFileSync(file);
            let enterAmount = fileText.toString().match(/[\n]+/g);
            try {
                lines += enterAmount.length;
            } catch (err) { }
        })
        LogTable();
        process.stdout.on("resize", async () => {
            LogTable();
        })
    })
});

let latestError = "None";

//? If there is an error, log it instead of crashing.
bot.on("error", async (error) => {
    LogTable();

    latestError = error.message;
});

//* Setting the commands up.
CommandSetup(bot);

//* Connecting to discord.
bot.connect();

async function LogTable() {
    console.clear();
    terminal.terminal.table([
        ["Bot info", require("../package.json").name],
        ["Tag", bot.user.username + "#" + bot.user.discriminator],
        ["Server count", bot.guilds.size],
        ["members", getMembers()],
        ["Status", "Online"],
        ["Website status", "Not created"],
        ["Developed by : ", require("../package.json").author],
        ["github", require("../package.json").github],
        ["Latest Error ", latestError],
        ["lines ", lines],
        ["Shiro.js Library link", "https://github.com/Suzzudev/Shiro.js"]
    ], {
        hasBorder: true,
        contentHasMarkup: true,
        borderChars: 'lightRounded',
        width: 120,
        borderAttr: { color: 'blue' },
        textAttr: { bgColor: 'default' },
        fit: true
    });
}

process.on("exit", (code) => {
    console.clear();
    console.log("Process ended with code : " + code);

    console.log("bye~");
})


function getMembers() {
    let memberCount = 0;
    bot.guilds.forEach((guild) => {
        memberCount += guild.memberCount;
    })

    return `${memberCount}`;
}