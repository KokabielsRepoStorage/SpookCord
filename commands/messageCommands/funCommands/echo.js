module.exports = {
    setup: async function setup(bot) {
        const echo = bot.registerCommand("echo", async (msg, args) => {
            if (args.length == 0) return "Invalid input."
            const text = args.join(" ");

            return text;
        }, {
            description: "Echos a message.",
            fullDescription: "The bot will send your message back to you.",
            usage: "<text>",
        })

        echo.registerSubcommand("reverse", async (msg, args) => {
            if (args.length == 0) return "Invalid input";

            let text = args.join(" ");
            text = text.split("").reverse().join("");
            return text;
        }, {
            description: "Reverse echo",
            fullDescription: "The bot will echo (repeat) The message, but reversed",
            usage: "<text>"
        });

        echo.registerSubcommandAlias("backwards", "reverse");
    }
}