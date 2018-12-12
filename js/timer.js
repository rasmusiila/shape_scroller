export default class Timer {
    constructor(deltaTime = 1 / 60) {
        this.paused = false;
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            // console.log(time);
            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while(accumulatedTime > deltaTime) {
                if (this.paused) {
                    return;
                }
                this.update(deltaTime);

                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
        };
    }

    enqueue() {
        if (!this.paused) {
            requestAnimationFrame(this.updateProxy);
        }
    }

    start() {
        this.paused = false;
        this.enqueue();
    }

    pause() {
        this.paused = true;
    }
}