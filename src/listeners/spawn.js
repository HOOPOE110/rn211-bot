const config = require("../config");

module.exports = function (bot, sellManager, positionManager) {

    bot.once("spawn", () => {

        console.log("Spawned!");

        positionManager.setTarget(
            config.target.x,
            config.target.y,
            config.target.z
        );


        sellManager.start();

    });

};