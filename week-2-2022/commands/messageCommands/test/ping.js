module.exports = {
    setup: async function setup(bot) {
        const ping = bot.registerCommand("ping", async (msg, args) => {
            return "Pong!";
        }, {
            description: "Replies pong!",
            usage: ".ping",
            aliases: ["pong"]
        })
    }
}