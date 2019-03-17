const LIGHTNING_PER_SECOND = 6/60;  // 6 strikes per minute.

export class Weather {
    public light: number;

    constructor() {
        this.light = 0;
    }

    update(elapsed: number) {
        //if (Math.random() * elapsed > LIGHTNING_PER_SECOND)
    }
}