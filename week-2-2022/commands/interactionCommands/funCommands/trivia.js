const axios = require("axios");
const shiro = require("shirojs");

module.exports = {
    name: "trivia",
    description: "Sends a random trivia question (Not answer checking sadly)",
    options: [],
    main: async function (bot, interaction) {
        const question = await axios.get("https://opentdb.com/api.php?amount=1").catch((err) => {
            bot.emit("error", err);
            return "Failed to get question"
        })

        const data = question.data.results[0];
        const embedBuilder = new shiro.MessageEmbed();
        embedBuilder.setTitle("Trivia " + `${data.difficulty}`);
        embedBuilder.addField("Category : ", `${data["category"]}`);
        embedBuilder.addField("Type : ", `${data.type}`);
        embedBuilder.addField("Difficulty : ", `${data.difficulty}`);
        embedBuilder.addField("Question : ", `${data.question.trim()}`);
        embedBuilder.setFooter("Eris has no message collector; bot will send the answer without a correct or incorrect response");
        const embed = embedBuilder.returnEmbed();
        interaction.editOriginalMessage({ embeds: [embed], content: "Trivia " + `${data.difficulty}` });

        await shiro.Sleep(10 * 2000);

        bot.createMessage(interaction.channel.id, "The correct answer is : " + data.correct_answer);

    }
}