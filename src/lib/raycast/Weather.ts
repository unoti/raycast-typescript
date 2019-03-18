const LIGHTNING_PER_SECOND = 5;
const LIGHTNING_DURATION_MIN = 0.08; // Range of lightning strike duration in seconds.
const LIGHTNING_DURATION_MAX = 0.7;
const LIGHTNING_BIG_CHANCE = 0.3;   // Chance that a lightning strike will be a big one

export class Weather {
    public light: number;
    private endX: number;
    private endY: number;
    private duration: number;   // Total strike duration for current lightning strike

    constructor(viewportWidth: number, viewportHeight: number)
    {
        this.light = 0;
        this.duration = 0;
        this.endX = viewportWidth;
        this.endY = viewportHeight / 2;
    }

    update(elapsed: number) {
        if (this.light > 0) {
            this.light = Math.max(0, this.light - (elapsed / this.duration));
        } else if (Math.random() * LIGHTNING_PER_SECOND < elapsed) {
            this.startLightning();
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.light) {
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = this.light * 0.1;
            ctx.fillRect(0, 0, this.endX, this.endY);
            //ctx.fillRect(0,0, 50, 50);
            ctx.restore();
        }    
    }

    private startLightning() {
        console.log('Lightning strike');
        this.light = 1;
        var range = (LIGHTNING_DURATION_MAX - LIGHTNING_DURATION_MIN) / 2;
        this.duration = Math.random() * range + LIGHTNING_DURATION_MIN;
        if (Math.random() < LIGHTNING_BIG_CHANCE) {
            this.duration += range;
        }
    }
}