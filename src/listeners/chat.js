module.exports = function(bot) {

    bot.on("messagestr", (message) => {

        console.log("[CHAT]", message, Date.now());

    });

};