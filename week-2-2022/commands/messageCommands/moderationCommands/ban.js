//! In development, I am not going to use this for now.
const Shiro = require("shirojs");

module.exports = {
    setup: async function setup(bot) {
        const ping = bot.registerCommand("ban", async (msg, args) => {
            const user = msg.mentions[0];

            if (!user) {
                const menuBuilder = new Shiro.SelectMenuBuilder();
                menuBuilder.setId("memberSelector");
                menuBuilder.setType("user");
                menuBuilder.setPlaceholder("User");
                const menu = menuBuilder.returnMenu();
                const message = bot.createMessage(msg.channel.id, {
                    content: "Who would you like to ban? (This doesn't work right now)", components: [{
                        type: 1,
                        components: [menu]
                    }]
                });
            }

            try {
                await bot.guilds.get(msg.channel.guild.id).members.get(user.id).ban();
                const embedBuilder = new Shiro.MessageEmbed();
                embedBuilder.setTitle("Banned user");
                embedBuilder.addField("User : ", user.username + "#" + user.discriminator);
                embedBuilder.setFooter("Banned by " + msg.author.username);
                embedBuilder.setThumbnail(user.avatarURL);
                const embed = embedBuilder.returnEmbed();
                return { embeds: [embed], content: "Banned member!" };

            } catch (err) {
                bot.emit("error", err);
                const embedBuilder = new Shiro.MessageEmbed();
                embedBuilder.setTitle("Failed to ban user!");
                embedBuilder.addField("User : ", user.username + "#" + user.discriminator);
                embedBuilder.addField("Reason : ", err.message);
                embedBuilder.setFooter("Failed to ban user");
                embedBuilder.setThumbnail(user.avatarURL);
                const embed = embedBuilder.returnEmbed();
                return { embeds: [embed], content: "Banned member!" };
            }
        }, {
            description: "Bans a user!",
            usage: ".Ban @user",
        })
    }
}