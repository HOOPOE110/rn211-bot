class ReconnectManager {

    constructor(bot) {

        this.bot = bot;

        this.enabled = true;

        this.connectedAt = 0;

        this.connectionCount = -1;

        this.reconnectAttempts = -1;

        this.maxReconnectAttempts = 5;

        this.fastDisconnectTime = 30000; // 30 seconds

        this.normalReconnectDelay = 3000; // 3 seconds

        this.cooldownReconnectDelay = 30000; // 30 seconds

    }

    connected() {

        this.connectedAt = Date.now();
        
        this.connectionCount++;

        console.log("ReconnectManager: Connected");

    }

    disconnected() {

        if (!this.enabled)
            return;

        const uptime = Date.now() - this.connectedAt;

        let delay = this.normalReconnectDelay;

        if (uptime < this.fastDisconnectTime) {

            this.reconnectAttempts++;

            console.log(
                `Fast disconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
            );

            delay = this.cooldownReconnectDelay;

        } else {

            this.reconnectAttempts = 0;

            console.log("Normal disconnect");

        }

        if (this.reconnectAttempts >= this.maxReconnectAttempts || this.connectionCount >= this.maxReconnectAttempts) {

            console.log("Reconnect limit reached.");
            console.log("fastreconection:" + this.reconnectAttempts + "time(s)");
            console.log("disconnected:" + this.connectionCount + "time(s)");

            this.enabled = false;

            return;

        }

        console.log(`Reconnecting in ${delay / 1000} seconds...`);

        setTimeout(() => {

            this.bot.start();

        }, delay);

    }

}

module.exports = ReconnectManager;