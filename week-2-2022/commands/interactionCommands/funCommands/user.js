const Shiro = require("shirojs");

const Constants = Shiro.Constants;

module.exports = {
    name: "user",
    description: "gives info on a user",
    options: [{
        "name": "user",
        "description": "the user to get info from",
        "type": Constants.ApplicationCommandOptionTypes.USER,
        "required": true
    }],
    main: async function (bot, interaction) {
        const userid = interaction.data.options[0].value;
        const user = await bot.guilds.get(interaction.channel.guild.id).members.get(userid);
        const embedBuilder = new Shiro.MessageEmbed();
        embedBuilder.setTitle(user.username + " Info");
        embedBuilder.setThumbnail(user.avatarURL);
        embedBuilder.addField("Joined discord at : ", `${Date(user.createdAt)}`);
        embedBuilder.addField("user id", `${userid}`);
        embedBuilder.addField("Current Status : ", `${user.status ? user.status : "None?"}`);
        embedBuilder.addField("Nickname", `${user.nick ? user.nick : "Not nicked."}`);
        embedBuilder.addField("Bot?", `${user.bot ? "Yes" : "no"}`, false);
        embedBuilder.setFooter(user.username + "#" + user.discriminator);
        const embed = embedBuilder.returnEmbed();
        return interaction.editOriginalMessage({ content: user.username + " Info", embeds: [embed] });
    }
}