module.exports = {
    name: "ping",
    description: "replies ping",
    options: [],
    main: async function main(bot, interaction) {
        interaction.editOriginalMessage("Pong!");
    }
}