const axios = require("axios")
const shiro = require("shirojs");

module.exports = {
    name: "animememes",
    description: "Sends a anime meme",
    options: [],
    main: async function main(bot, interaction) {
        try {
            const { data } = await axios.get('https://www.reddit.com/r/animeMemes.json?sort=top&t=week');

            if (!data) {
                interaction.editOriginalMessage("Failed to get data from reddit!");
                return;
            }

            const allowed = interaction.channel.nsfw ? data.data.children : data.data.children.filter(post => !post.data.over_18);

            if (!allowed.length) {
                interaction.editOriginalMessage("It seems that we couldn't pull anything from reddit!");
                return;
            }

            let randomNumber = Math.floor(Math.random() * allowed.length);

            const embedBuilder = new shiro.MessageEmbed();
            // embedBuilder.setTitle(allowed[randomNumber].data.title);
            embedBuilder.setAuthor(allowed[randomNumber].data.title, "https://www.reddit.com" + allowed[randomNumber].data.permalink)
            embedBuilder.setDescription("Posted by : " + allowed[randomNumber].data.author);
            if (!allowed[randomNumber].data.url.includes("v.redd.it") && !allowed[randomNumber].data.url.includes(".gifv")) {
                embedBuilder.setImage(allowed[randomNumber].data.url);
            }
            embedBuilder.addField("Other info", "Up votes : " + allowed[randomNumber].data.ups + " / Comments : " + allowed[randomNumber].data.num_comments);
            embedBuilder.setFooter("If the image doesn't load, its probably a video.")

            const embed = embedBuilder.returnEmbed();

            interaction.editOriginalMessage({ embeds: [embed], content: allowed[randomNumber].data.title });
            if (allowed[randomNumber].data.url.includes("v.redd.it") || allowed[randomNumber].data.url.includes(".gifv")) {
                interaction.channel.createMessage(allowed[randomNumber].data.url);
            }

        } catch (err) {
            interaction.editOriginalMessage("There was an error!");

            console.log(err);
            return;
        };
    }
}