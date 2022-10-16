const axios = require("axios");
const Shiro = require("shirojs");

const Constants = Shiro.Constants;

module.exports = {
    name: "reddit",
    description: "Sends a post from a specific subreddit",
    options: [{
        "name": "subreddit",
        "description": "the subreddit to get a post from",
        "type": Constants.ApplicationCommandOptionTypes.STRING,
        "required": true
    }],
    main: async function main(bot, interaction) {
        try {
            const reddit = interaction.data.options[0].value;
            console.log(reddit);
            console.log(interaction.data.options);
            if (!reddit || !reddit.startsWith("r/")) return interaction.editOriginalMessage("Please give a valid subreddit (I.E : r/dankmemes)");

            // interaction.options.
            const { data } = await axios.get(`https://www.reddit.com/${reddit}.json?sort=top&t=week`);

            if (!data) return interaction.editOriginalMessage("Failed to get data from reddit!");

            const allowed = interaction.channel.nsfw ? data.data.children : data.data.children.filter(post => !post.data.over_18);

            if (!allowed.length) return interaction.editOriginalMessage("It seems that we couldn't pull anything from reddit, or it is a NSFW server and you arent in a NSFW channel!");

            let randomNumber = Math.floor(Math.random() * allowed.length);

            //* Testing the embed builder
            const embedBuilder = new shiro.MessageEmbed();
            embedBuilder.setAuthor(allowed[randomNumber].data.title, "https://www.reddit.com" + allowed[randomNumber].data.permalink)
            embedBuilder.setDescription("Posted by : " + allowed[randomNumber].data.author);
            if (!allowed[randomNumber].data.url.includes("v.redd.it") && !allowed[randomNumber].data.url.includes(".gifv")) {
                embedBuilder.setImage(allowed[randomNumber].data.url);
            }
            embedBuilder.addField("Other info", "Up votes : " + allowed[randomNumber].data.ups + " / Comments : " + allowed[randomNumber].data.num_comments);

            const embed = embedBuilder.returnEmbed();
            interaction.editOriginalMessage({ embeds: [embed], content: allowed[randomNumber].data.title });
            if (allowed[randomNumber].data.url.includes("v.redd.it") || allowed[randomNumber].data.url.includes(".gifv")) {
                interaction.channel.createMessage(allowed[randomNumber].data.url);
            }
        } catch (err) {
            console.error(err);

            return interaction.editOriginalMessage("There was an error!");
        }
    }
}