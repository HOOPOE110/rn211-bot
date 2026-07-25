class DangerManager {

    constructor(bot, sellManager) {

        this.bot = bot;
        this.sellManager = sellManager;

        this.radius = 57;

        this.disconnected = false;

    }


    tick() {

        if (this.disconnected)
            return;


        for (const username in this.bot.players) {


            if (username === this.bot.username)
                continue;


            const player = this.bot.players[username];


            if (!player.entity)
                continue;


            const distance =
                this.bot.entity.position.distanceTo(
                    player.entity.position
                );


            if (distance <= this.radius) {

                console.log(
                    "Danger detected:",
                    username,
                    distance
                );


                this.triggerDanger();

                return;

            }

        }

    }


    triggerDanger() {


        this.disconnected = true;


        console.log(
            "Stopping bot because of danger"
        );


        // stop selling
        this.sellManager.stop();


        this.bot._client.end();

    }


}


module.exports = DangerManager;