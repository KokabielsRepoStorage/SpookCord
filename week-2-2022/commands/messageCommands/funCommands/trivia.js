//! If you want to at least try the trivia, dont pay attention to this file since it gives away all answers once you see the order I put the options in
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
            embedBuilder.addField("Question : ", `${data.question
                .trim()
                .replace(/&nbsp;|&#160;+/g, "  ")
                .replace(/&lt;|&#60;+/g, ">")
                .replace(/&gt;|&#62;+/g, "<")
                .replace(/&quot;|&#38;+/g, '"')
                .replace(/&amp|&#38+/g, "&")
                .replace(/&apos;|&#39;+/g, "'")
                .replace(/&cent;|&#162;+/g, "¢")
                .replace(/&pound;|&#163;+/g, "£")
                .replace(/&yen;|&#165;+/g, "¥")
                .replace(/&euro|;&#8364;+/g, "€")
                .replace(/&copy;|&#169;+/g, "©")
                .replace(/&reg;|&#174;+/g, "®")}`)
            for (let i = 0; i < data.incorrect_answers.length; i++) {
                if (i === 0) {
                    options = data.incorrect_answers[i];
                    continue;
                }
                options += ", " + data.incorrect_answers[i];
            }

            if (options !== "None") {
                options += ", " + data.correct_answer;
            }

            embedBuilder.addField("Options", options.trim()
                .replace(/&nbsp;|&#160;+/g, "  ")
                .replace(/&lt;|&#60;+/g, ">")
                .replace(/&gt;|&#62;+/g, "<")
                .replace(/&quot;|&#38;+/g, '"')
                .replace(/&amp|&#38+/g, "&")
                .replace(/&apos;|&#39;+/g, "'")
                .replace(/&cent;|&#162;+/g, "¢")
                .replace(/&pound;|&#163;+/g, "£")
                .replace(/&yen;|&#165;+/g, "¥")
                .replace(/&euro|;&#8364;+/g, "€")
                .replace(/&copy;|&#169;+/g, "©")
                .replace(/&reg;|&#174;+/g, "®"));
            embedBuilder.setFooter("Eris has no message collector; bot will send the answer without a correct or incorrect response");
            const embed = embedBuilder.returnEmbed();
            bot.createMessage(msg.channel.id, { embeds: [embed] });

            await shiro.Sleep(10 * 2000);

            bot.createMessage(msg.channel.id, "The correct answer is : " + data.correct_answer);
        })
    }
}