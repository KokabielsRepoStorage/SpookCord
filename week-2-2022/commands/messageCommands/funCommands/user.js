const { MessageEmbed } = require("shirojs");

module.exports = {
    setup: async function (bot) {
        bot.registerCommand("user", async (msg, args) => {
            const user = await bot.guilds.get(msg.channel.guild.id).members.get(msg.mentions[0].id);

            const embedBuilder = new MessageEmbed();
            embedBuilder.setTitle(user.username + " Info");
            embedBuilder.setThumbnail(user.avatarURL);
            embedBuilder.addField("Joined discord at : ", `${Date(user.createdAt)}`);
            embedBuilder.addField("user id", `${user.id}`);
            embedBuilder.addField("Current Status : ", `${user.status ? user.status : "None"}`);
            embedBuilder.addField("Nickname", `${user.nick ? user.nick : "Not nicked"}`);
            embedBuilder.addField("Bot?", `${user.bot ? "Yes" : "no"}`, false);
            embedBuilder.setFooter(user.username + "#" + user.discriminator);
            const embed = embedBuilder.returnEmbed();
            return { content: user.username + " Info", embeds: [embed] };
        }, {
            description: "Sends info about the first pinged user"
        })
    }
}