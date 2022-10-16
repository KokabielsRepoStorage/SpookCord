//* Importing modules
const axios = require("axios");
const shiro = require("shirojs");

//* Setting up the command
module.exports = {
    setup: async function (bot) {
        bot.registerCommand("reddit", async (msg, args) => {
            try {
                const reddit = args[0];
                if (!reddit || !reddit.startsWith("r/")) return "Please give a valid subreddit (I.E : r/dankmemes)";
                const message = await msg.channel.createMessage("Please wait, the bot is loading!");
                const { data } = await axios.get(`https://www.reddit.com/${reddit}.json?sort=top&t=week`);

                if (!data) return "Failed to get data from reddit!";

                const allowed = msg.channel.nsfw ? data.data.children : data.data.children.filter(post => !post.data.over_18);

                if (!allowed.length) return "It seems that we couldn't pull anything from reddit, or it is a NSFW server and you arent in a NSFW channel!";

                let randomNumber = Math.floor(Math.random() * allowed.length);

                //* Testing the embed builder
                const embedBuilder = new shiro.MessageEmbed();
                // embedBuilder.setTitle(allowed[randomNumber].data.title);
                embedBuilder.setAuthor(allowed[randomNumber].data.title, "https://www.reddit.com" + allowed[randomNumber].data.permalink)
                embedBuilder.setDescription("Posted by : " + allowed[randomNumber].data.author);
                if (!allowed[randomNumber].data.url.includes("v.redd.it") && !allowed[randomNumber].data.url.includes(".gifv")) {
                    embedBuilder.setImage(allowed[randomNumber].data.url);
                }
                embedBuilder.addField("Other info", "Up votes : " + allowed[randomNumber].data.ups + " / Comments : " + allowed[randomNumber].data.num_comments);

                const embed = embedBuilder.returnEmbed();
                message.delete();
                msg.channel.createMessage({ embeds: [embed], content: allowed[randomNumber].data.title });
                if (allowed[randomNumber].data.url.includes("v.redd.it") || allowed[randomNumber].data.url.includes(".gifv")) {
                    return allowed[randomNumber].data.url;
                }
            } catch (err) {
                console.error(err);

                return "There was an error!";
            }
        }, {
            description: "Pulls a random post off of a subreddit of your choosing",
            usage: ".reddit"
        })
    }
}