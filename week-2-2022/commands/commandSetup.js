//* Setting up commands

//* Import files
const Shiro = require("shirojs");
const glob = require("glob");

//* Exporting the function
module.exports.CommandSetup = async function (bot) {
    //* Message commands
    glob(`${process.cwd().replaceAll("\\", "/")}/week-2-2022/commands/messageCommands/**/*.js`, (err, files) => {
        //? Looping through the files
        files.forEach((file) => {
            //? Get the files exports
            const command = require(file);
            //? Check if it has a setup function
            if (command.setup) command.setup(bot);
            //? Warn that it does not have a setup function.
            else console.log(`${file} does not include a setup function!`);
        })
    });

    //* Interaction commands are about the same to set up, actually kind of easier.
    const commands = [];

    bot.on("ready", () => {
        glob(`${process.cwd().replaceAll("\\", "/")}/week-2-2022/commands/interactionCommands/**/*.js`, (err, files) => {
            files.forEach((file) => {
                const command = require(file);

                if (command.name && command.description) {
                    bot.createCommand({
                        name: command.name,
                        description: command.description,
                        options: command.options
                    })

                    bot.createGuildCommand("967117817663074304", {
                        name: command.name,
                        description: command.description,
                        options: command.options
                    })

                    commands.push({
                        name: command.name,
                        main: command.main
                    });
                }
            });
        });
    })

    bot.on("interactionCreate", async (interaction) => {
        if (interaction instanceof Shiro.CommandInteraction) {
            const commandName = interaction.data.name;

            await interaction.createMessage("Bot is loading~");

            for (let i = 0; i < commands.length; i++) {
                if (commands[i].name === commandName.trimEnd()) {
                    try {
                        return await commands[i].main(bot, interaction);
                    } catch (err) {
                        return bot.emit("error", err);
                    }
                }
            }

            return interaction.editOriginalMessage("Command not in current version!");
        }

        if (interaction instanceof Shiro.ComponentInteraction) {
            if (interaction.data.component_type === 5) {
                if (interaction.data.custom_id === "memberSelector") {
                    let user = await bot.guilds.get(interaction.guildID).members.get(interaction.data.values[0]);
                    try {
                        user.ban();
                        const embedBuilder = new Shiro.MessageEmbed();
                        embedBuilder.setTitle("Banned user");
                        embedBuilder.addField("User : ", user.username + "#" + user.discriminator);
                        embedBuilder.setThumbnail(user.avatarURL);
                        const embed = embedBuilder.returnEmbed();
                        interaction.createMessage({ embeds: [embed], content: "Banned member!" });

                    } catch (err) {
                        bot.emit("error", err);
                        const embedBuilder = new Shiro.MessageEmbed();
                        embedBuilder.setTitle("Failed to ban user!");
                        embedBuilder.addField("Reason : ", err.message);
                        embedBuilder.setFooter("Failed to ban user");
                        const embed = embedBuilder.returnEmbed();
                        interaction.createMessage({ embeds: [embed], content: "Failed to ban member" });
                    }
                }
            }
        }
    })

}