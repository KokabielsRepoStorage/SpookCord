//* Setting up commands

//* Import files
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
}