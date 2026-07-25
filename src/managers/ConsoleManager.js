const readline = require("readline");

class ConsoleManager {

    constructor(bot) {

        this.bot = bot;

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });


        rl.on("line", (input) => {

            const command = input.trim();


            if (command === "stop") {

                console.log("Stopping bot...");

                this.bot.quit("Stopped by console");

                process.exit(0);

            }

        });

    }

}

module.exports = ConsoleManager;