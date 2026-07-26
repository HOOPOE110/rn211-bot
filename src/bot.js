const spawnListener = require("./listeners/spawn");
const chatListener = require("./listeners/chat");
const windowListener = require("./listeners/window");
const playersListener = require("./listeners/players");
const SellManager = require("./managers/SellManager");
const ConsoleManager = require("./managers/ConsoleManager");
const DangerManager = require("./managers/DangerManager");
const PositionManager = require("./managers/PositionManager");
const ReconnectManager = require("./managers/ReconnectManager");

const mineflayer = require("mineflayer");
const config = require("./config");

class Bot {

    start() {

        console.log("Starting bot...");

        this.bot = mineflayer.createBot({

            host: config.host,
            port: config.port,

            username: config.username,

            auth: "microsoft",

            version: config.version,

            profilesFolder: "./profiles"

        });



        this.positionManager = new PositionManager(
            this.bot
        );

        this.sellManager = new SellManager(
            this.bot,
            this.positionManager
        );

        this.dangerManager = new DangerManager(
            this.bot,
            this.sellManager
        );

        this.consoleManager = new ConsoleManager(this.bot);

        this.reconnectManager = new ReconnectManager(this.bot);

        this.registerEvents();

        setInterval(() => {


            this.positionManager.tick();

            this.dangerManager.tick();

            this.sellManager.tick();

            // this.reconnectManager.tick();


        }, 50);

    }

    registerEvents() {


        spawnListener(
            this.bot,
            this.sellManager,
            this.positionManager
        );
        chatListener(this.bot);
        windowListener(this.bot, this.sellManager);
        playersListener(this.bot);
        // new SellManager(this.bot, this.positionManager);


        this.bot.on("error", console.log);

        this.bot.once("login", () => {
            this.reconnectManager.connected();
        });

        this.bot.on("end", () => {
            this.reconnectManager.disconnected();
            console.log("Disconnected.");
        });




        // this.bot.once("login", () => {

        //     console.log("Logged in.");

        // });

        // this.bot.once("spawn", () => {

        //     console.log("Spawned.");

        // });

        // this.bot.on("end", () => {

        //     console.log("Disconnected.");

        // });

        // this.bot.on("kicked", (reason) => {

        //     console.log("Kicked:");
        //     console.log(reason);

        // });

        // this.bot.on("error", (err) => {

        //     console.log(err);

        // });

    }

}

module.exports = Bot;