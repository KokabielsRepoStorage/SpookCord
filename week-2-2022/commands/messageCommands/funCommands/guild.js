const { MessageEmbed } = require("shirojs")

module.exports = {
    setup: async function (bot) {
        bot.registerCommand("guild", (msg, args) => {
            const embedBuilder = new MessageEmbed();
            embedBuilder.setTitle(msg.channel.guild.name + " Info");
            embedBuilder.setThumbnail(`${msg.channel.guild.iconURL ? msg.channel.guild.iconURL : "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"}`);
            embedBuilder.addField("Members", `${msg.channel.guild.memberCount}`);
            embedBuilder.addField("Created at : ", `${Date(msg.channel.guild.createdAt)}`);
            embedBuilder.addField("Amount of channels : ", `${msg.channel.guild.channels.size}`);
            embedBuilder.addField("Guild id", `${msg.channel.guild.id}`);
            embedBuilder.setDescription(`Guild description : ${msg.channel.guild.description ? msg.channel.guild.description : "none"}`)
            const embed = embedBuilder.returnEmbed();
            return { content: msg.channel.guild.name + " Info", embeds: [embed] };
        }, {
            description: "Sends info about the current guild"
        })
    }
}