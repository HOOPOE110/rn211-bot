class PositionManager {

    constructor(bot, PositionManager) {

        this.bot = bot;
        this.target = null;
        this.safe = true;

        // this.positionManager = PositionManager;

        this.nextSellCommand = 0;
        this.nextPosCommand = 0;

    }


    setTarget(x, y, z) {

        this.target = {
            x,
            y,
            z
        };

        console.log(
            "Target set:",
            x,
            y,
            z
        );

    }

    isSafe() {

        return this.safe;

    }


    canSell() {

        return this.safe;

    }


    tick() {

        if (!this.target)
            return;

        if (!this.bot.entity)
            return;


        const pos = this.bot.entity.position;


        const distance =
            pos.distanceTo(this.target);


        if (distance > 3) {

            if (Date.now() >= this.nextPosCommand) {

                this.safe = false;

                console.log(
                    "Wrong position"
                );

                console.log("Sending /home 3");

                this.bot.chat("/home 3");

                console.log("/home 3 sent, waiting for teleport");
                this.nextPosCommand = Date.now() + 5000;
                return;
            }
            else {
                console.log("distance is less that 3")
            }

            // setTimeout(() => {

            //     console.log("/home 2 sent, waiting for teleport");

            // }, 5000);

        }
        else {

            this.safe = true;

        }

    }

}


module.exports = PositionManager;