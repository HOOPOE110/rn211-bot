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

    let last = null;
    const samples = [];

    bot.on("time", () => {
        const now = process.hrtime.bigint(); // nanoseconds

        if (last !== null) {
            const dtMs = Number(now - last) / 1e6;

            samples.push(dtMs);
            if (samples.length > 20) samples.shift();

            const avgMs = samples.reduce((a, b) => a + b, 0) / samples.length;

            // 20 server ticks elapsed
            const tps = Math.min(20, 20000 / avgMs);

            if (tps < 20) {
                console.log(`Estimated TPS: ${tps.toFixed(3)}`);
            }
        }

        last = now;
    });


    // let lastTick = Date.now();

    // bot.on("physicsTick", () => {
    //     const now = Date.now();
    //     const dt = now - lastTick;
    //     lastTick = now;

    //     // dt should be about 50ms on a healthy server
    //     console.log(`Tick length: ${dt.toFixed(1)} ms`);
    // });

};