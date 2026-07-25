class SellManager {

    constructor(bot, positionManager) {
        this.bot = bot;

        this.positionManager = positionManager;

        this.running = false;
        this.state = "IDLE";

        this.sellCount = 0;

        this.nextClick = 0;
    }

    start() {
        this.running = true;
        this.state = "OPEN_MENU";
    }

    stop() {
        this.running = false;
        this.state = "IDLE";
    }


    tick() {

        if (!this.positionManager.isSafe()) {
            console.log("isSafe=false")
            return;
        }


        if (!this.bot.player || !this.bot.entity)
            return;

        if (!this.bot.currentWindow && this.state === "OPEN_MENU") {
            this.bot.chat("/sell");
            this.state = "WAIT_WINDOW";
            return;
        }

        if (!this.running)
            return;

        switch (this.state) {

            case "OPEN_MENU":

                console.log("Sending /sell");

                this.bot.chat("/sell");

                this.state = "WAIT_WINDOW";

                break;

            case "WAIT_WINDOW":

                break;

            case "MOVE_ITEMS":

                this.moveItems();

                break;

            case "CLICK_BUTTON":

                this.clickSellButton();

                break;

            // case "WAIT_SELL":

            //     this.waitSell();

        }

    }

    windowOpened(window) {

        console.log("SellManager received window");

        if (!this.running)
            return;


        this.window = window;

        this.state = "MOVE_ITEMS";

        console.log("Moving to MOVE_ITEMS");

    }

    moveItems() {

        const now = Date.now();

        if (now < this.nextClick) {
            return;
        }

        if (!this.window)
            return;


        // Count used sell slots
        // let usedSlots = 0;

        // for (let i = 0; i <= 44; i++) {

        //     if (this.window.slots[i]) {
        //         usedSlots++;
        //     }

        // }


        // console.log(
        //     "Sell area:",
        //     usedSlots,
        //     "/45"
        // );


        // Sell area full
        // if (usedSlots >= 52) {

        //     // console.log("Sell area full");

        //     this.state = "CLICK_BUTTON";

        //     return;

        // }


        // Find first inventory item
        for (let i = 54; i < 90; i++) {

            const window = this.bot.currentWindow;

            if (!window)
                return;


            const item = window.slots[i];

            // if (item) {

            // console.log(
            //     "Moving:",
            //     item.name,
            //     "from",
            //     i
            // );


            this.bot.clickWindow(
                i,
                0,
                1
            );

            




            // }

        }
        this.nextClick = Date.now() + 200;
        this.state = "CLICK_BUTTON";
        return;

    }


    // moveItems() {

    //     if (!this.bot.currentWindow)
    //         return;


    //     console.log("Picking item from slot 55");


    //     // Pick up stack from inventory slot 55
    //     this.bot.clickWindow(
    //         55,
    //         0,
    //         1
    //     );

    //     this.bot.clickWindow(
    //         56,
    //         0,
    //         1
    //     );
    //     this.bot.clickWindow(
    //         56,
    //         0,
    //         1
    //     );

    //     this.state = "CLICK_BUTTON"


    //     console.log("Shift double click slot 56");


    // setTimeout(() => {

    //     console.log("Shift double click slot 56");


    //     // Shift click
    //     this.bot.clickWindow(
    //         56,
    //         0,
    //         1
    //     );


    //     setTimeout(() => {

    //         // second click (double click)
    //         this.bot.clickWindow(
    //             56,
    //             0,
    //             1
    //         );


    //         this.nextClick = Date.now() + 300;


    //         // after filling, sell
    //         this.state = "CLICK_BUTTON";


    //     }, 100);


    // }, 100);

    // }


    clickSellButton() {

        if (!this.window)
            return;


        // console.log("Clicking sell button");


        this.bot.clickWindow(
            53,
            0,
            0
        );

        this.sellCount++;

        // this.nextClick = Date.now() + 100;
        // this.state = "WAIT_SELL";
        this.state = "MOVE_ITEMS";

    }

    waitSell() {

        if (!this.window)
            return;


        // Wait a little for the server to process the sell
        if (Date.now() < this.nextClick)
            return;


        console.log("Checking sell result");


        let hasItems = false;


        for (let i = 0; i <= 44; i++) {

            if (this.window.slots[i]) {

                hasItems = true;
                break;

            }

        }


        if (!hasItems) {

            console.log("Sell area empty");
            console.log(Date.now());

            this.state = "MOVE_ITEMS";

        }

    }

}

module.exports = SellManager;