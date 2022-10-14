const chalk = require("chalk");
const terminal = require("terminal-kit");
const { spawn } = require("child_process");

terminal.terminal.gridMenu([
    "run discord bot",
    "exit"
], {}, (err, args) => {
    console.clear();

    if (args.selectedText == "exit") {
        console.log("Bye~")
        process.exit(0);
    }

    if (args.selectedText == "run discord bot") {
        console.clear();
        const bot = spawn(`node ./week-2-2022`, [], {
            shell: true
        });

        bot.on("message", (message) => {
            console.log(message.toString());
        })

        console.log(chalk.red("If you want to see console output, then run npm run discord, instead of node ."))

        if (process.platform === "win32") {
            var rl = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.on("SIGINT", function () {
                process.emit("SIGINT");
            });
        }
        process.on('SIGINT', function () {
            console.log("Ending bot process...");
            bot.kill("SIGINT");
            console.log("Bye~");
            process.exit(0);
        });

    }
})