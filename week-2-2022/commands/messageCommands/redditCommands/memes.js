//* Importing modules
const axios = require("axios");
const { EmbedBuilder } = require("../../../util/EmbedBuilder");

//* Setting up the command
module.exports = {
    setup: async function (bot) {
        bot.registerCommand("memes", async (msg, args) => {
            try {
                const message = await msg.channel.createMessage("Please wait, the bot is loading!");
                const { data } = await axios.get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week');

                if (!data) return "Failed to get data from reddit!";

                const allowed = msg.channel.nsfw ? data.data.children : data.data.children.filter(post => !post.data.over_18);

                if (!allowed.length) return "It seems that we couldn't pull anything from reddit!";

                let randomNumber = Math.floor(Math.random() * allowed.length);

                while (!allowed[randomNumber].data.url && !allowed[randomNumber].data.url.includes(".jpg") && !allowed[randomNumber].data.url.includes(".png") && !allowed[randomNumber].data.url.includes(".gif") || allowed[randomNumber].data.url.includes(".gifv"
                )) { randomNumber = Math.floor(Math.random() * allowed.length); }

                //* Testing the embed builder
                const embedBuilder = new EmbedBuilder();
                // embedBuilder.setTitle(allowed[randomNumber].data.title);
                embedBuilder.setAuthor(allowed[randomNumber].data.title, "https://www.reddit.com" + allowed[randomNumber].data.permalink)
                embedBuilder.setDescription("Posted by : " + allowed[randomNumber].data.author);
                embedBuilder.setImage(allowed[randomNumber].data.url);
                embedBuilder.addField("Other info", "Up votes : " + allowed[randomNumber].data.ups + " / Comments : " + allowed[randomNumber].data.num_comments);

                const embed = embedBuilder.returnEmbed();
                message.delete();
                return { embeds: [embed], content: allowed[randomNumber].data.title };
            } catch (err) {
                console.error(err);

                return "There was an error!";
            }
        }, {
            description: "Pulls a random post off of r/dankmemes",
            usage: ".memes",
            aliases: ["meme"]
        })
    }
}