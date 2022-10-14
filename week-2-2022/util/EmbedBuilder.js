module.exports.EmbedBuilder = class embedBuilder {
    //* Constructor for the embed
    constructor() {
        this.embed = {
            //* So I can use the array methods easier
            fields: []
        };
    }

    //* Setting the title
    setTitle(title) {
        //* Making sure the title is a string
        if (typeof (title) != "string") throw new Error("Embed title must be a string");
        //* Setting up the title
        this.embed.title = title;
    }

    //* Setting the description
    setDescription(description) {
        //* Making sure the description is a string
        if (typeof (description) != "string") throw new Error("Embed description must be a string");
        //* Setting the description
        this.embed.description = description;
    }

    //* Setting the image
    setImage(url) {
        //* Making sure the url is a string
        if (typeof (url) != "string") throw new Error("Embed url needs to be a string");
        //* Setting the image
        this.embed.image = {
            url: url
        };
    }

    //* Adding a field
    addField(fieldName, fieldText, inline = false) {
        //* Making sure the field name, text, and if it is inline are all the right type
        if (typeof (fieldName) != "string") throw new Error("Field names need to be a string");
        if (typeof (fieldText) != "string") throw new Error("Field text must be a string");
        if (typeof (inline) != "boolean") throw new Error("Inline field must be a boolean");

        //* Setting the field
        this.embed.fields.push({
            name: fieldName,
            value: fieldText,
            inline: inline
        });
    }

    //* Setting the footer
    setFooter(text, iconurl, proxyiconurl) {
        //* Making sure the text, and icon urls are stirngs.
        if (typeof (text) != "string") throw new Error("footer text must be a string");
        if (typeof (iconurl) != "string" && iconurl != undefined) throw new Error("Footer icon url must be a string");
        if (typeof (proxyiconurl) != "string" && proxyiconurl != undefined) throw new Error("Footer proxy icon must be a string");

        //* Setting the footer
        this.embed.footer = {
            text: text,
            icon_url: iconurl,
            proxy_icon_url: proxyiconurl
        }
    }

    //* Setting up the thumbnail
    setThumbnail(url, proxy_url, height, width) {
        //* Making sure the variables are the right type
        if (typeof (url) != "string") throw new Error("URL Must be a string");
        if (typeof (proxy_url) != "string") throw new Error("proxy url must be a string");
        if (typeof (height) != "number" && width != undefined) throw new Error("Height needs to be a number");
        if (typeof (width) != "number" && width != undefined) throw new Error("Width needs to be a number");

        //* Setting the thumbnail
        this.embed.thumbnail = {
            url: url,
            proxy_url: proxy_url,
            height: height,
            width: width
        }
    }

    //* Setting the author
    setAuthor(name, url, icon_url, proxy_icon_url) {

        if (typeof (name) != "string") throw new Error("Author name must be a string");
        if (typeof (url) != "string" && url != undefined) throw new Error("Url must be a string");
        if (typeof (icon_url) != "string" && icon_url != undefined) throw new Error("icon_url needs to be a string");
        if (typeof (proxy_icon_url) != "string" && proxy_icon_url != undefined) throw new Error("Proxy_Icon_Url needs to be a string");

        if (!url.includes("http") && !url.includes("https")) throw new Error("URL needs to be https / http");

        this.embed.author = {
            name: name,
            url: url,
            icon_url: icon_url,
            proxy_icon_url: proxy_icon_url
        }
    }

    //TODO Add a video option, provider option, type, and timestamp

    setColor(color) {
        //* Currently it only takes rgb valies
        if (Array.isArray(color)) {
            const [red, green, blue] = color;
            this.embed.color = (red << 16) + (green << 8) + blue;
        } else if (typeof (color) == "number") {
            this.embed.color = color;
        }
    }

    setUrl(url) {
        if (typeof (url) != "string") throw new Error("url must be a string");
        this.embed.url = url;
    }

    returnEmbed() {
        return this.embed;
    }
}