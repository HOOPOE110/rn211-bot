module.exports = function(bot) {

    bot.on("entitySpawn", (entity) => {

        if (entity.type === "player") {

            console.log("Player appeared:", entity.username);

        }

    });

};