const axios = require("axios");
const shiro = require("shirojs");

module.exports = {
    setup: async function (bot) {
        bot.registerCommand("trivia", async (msg, args) => {
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
            bot.createMessage(msg.channel.id, { embeds: [embed] });

            await shiro.Sleep(10 * 2000);

            bot.createMessage(msg.channel.id, "The correct answer is : " + data.correct_answer);
        })
    }
}