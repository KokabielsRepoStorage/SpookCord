const Shiro = require("shirojs");

module.exports = {
    setup: async function setup(bot) {
        const ping = bot.registerCommand("kick", async (msg, args) => {
            const user = msg.mentions[0];

            try {
                await bot.guilds.get(msg.channel.guild.id).members.get(user.id).kick();
                const embedBuilder = new Shiro.MessageEmbed();
                embedBuilder.setTitle("Kicked user");
                embedBuilder.addField("User : ", user.username + "#" + user.discriminator);
                embedBuilder.setFooter("Kicked by " + msg.author.username);
                embedBuilder.setThumbnail(user.avatarURL);
                const embed = embedBuilder.returnEmbed();
                return { embeds: [embed], content: "Kicked member!" };

            } catch (err) {
                bot.emit("error", err);
                const embedBuilder = new Shiro.MessageEmbed();
                embedBuilder.setTitle("Failed to kick user!");
                embedBuilder.addField("User : ", user.username + "#" + user.discriminator);
                embedBuilder.addField("Reason : ", err.message);
                embedBuilder.setFooter("Failed to kick user");
                embedBuilder.setThumbnail(user.avatarURL);
                const embed = embedBuilder.returnEmbed();
                return { embeds: [embed], content: "Kicked member!" };
            }
        }, {
            description: "Kicks a user!",
            usage: ".kick @user",
        })
    }
}