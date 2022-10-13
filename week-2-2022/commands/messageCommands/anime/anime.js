//* Importing modules
const axios = require("axios");

//* Setting up the command
module.exports = {
    setup: async function (bot) {
        bot.registerCommand("animeemes", async (msg, args) => {
            try {
                const { data } = await axios.get('https://www.reddit.com/r/animeMemes.json?sort=top&t=week');

                if (!data) return "Failed to get data from reddit!";

                const allowed = msg.channel.nsfw ? data.data.children : data.data.children.filter(post => !post.data.over_18);

                if (!allowed.length) return "It seems that we couldn't pull anything from reddit!";

                let randomNumber = Math.floor(Math.random() * allowed.length);

                while (!allowed[randomNumber].data.url && !allowed[randomNumber].data.url.includes(".jpg") && !allowed[randomNumber].data.url.includes(".png") && !allowed[randomNumber].data.url.includes(".gif")) { randomNumber = Math.floor(Math.random() * allowed.length); }

                const embed = {
                    title: allowed[randomNumber].data.title,
                    description: "Posted by : " + allowed[randomNumber].data.author,
                    image: {
                        url: allowed[randomNumber].data.url
                    },
                    fields: [
                        {
                            name: "Other info", value: "Up votes : " + allowed[randomNumber].data.ups + " / Comments : " + allowed[randomNumber].data.num_comments
                        }
                    ],
                    footer: { url: "Post link : www.reddit.com" + allowed[randomNumber].data.permalink }
                }

                return { embeds: [embed], content: "Hello!" };
            } catch (err) {
                console.error(err);

                return "There was an error!";
            }
        }, {
            description: "Pulls a random post off of r/animeMemes",
            usage: ".anime"
        })
    }
}