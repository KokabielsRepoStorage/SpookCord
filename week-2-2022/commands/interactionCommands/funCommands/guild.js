const shiro = require("shirojs");

module.exports = {
    name: "guild",
    description: "Sends info about the current guild",
    options: [],
    main: async function (bot, interaction) {
        const embedBuilder = new shiro.MessageEmbed();
        embedBuilder.setTitle(interaction.channel.guild.name + " Info");
        embedBuilder.setThumbnail(`${interaction.channel.guild.iconURL ? interaction.channel.guild.iconURL : "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"}`);
        embedBuilder.addField("Members", `${interaction.channel.guild.memberCount}`);
        embedBuilder.addField("Created at : ", `${Date(interaction.channel.guild.createdAt)}`);
        embedBuilder.addField("Amount of channels : ", `${interaction.channel.guild.channels.size}`);
        embedBuilder.addField("Guild id", `${interaction.channel.guild.id}`);
        embedBuilder.setDescription(`Guild description : ${interaction.channel.guild.description ? interaction.channel.guild.description : "None"}`)
        const embed = embedBuilder.returnEmbed();
        return interaction.editOriginalMessage({ content: interaction.channel.guild.name + " Info", embeds: [embed] });
    }
}