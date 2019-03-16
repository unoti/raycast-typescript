import { Bitmap } from "./Bitmap";

const TWO_PI = Math.PI * 2;

export class Skybox {
    private bitmap: Bitmap;
    constructor(imgSrc: string,
        private skyWidth: number,
        private skyHeight: number,
        private viewportWidth: number,
        private viewportHeight: number) {
        this.bitmap = new Bitmap(imgSrc, skyWidth, skyHeight);
    }

    draw(ctx: CanvasRenderingContext2D, angle: number) {
        var width = this.bitmap.width * (this.viewportHeight / this.skyHeight ) * 2; // Skybox width on the viewport. *TODO: is this right?
        var x = (-angle / TWO_PI) * width;   // Where in the viewport we'll start drawing the skybox
        ctx.drawImage(this.bitmap.image, x, 0, width, this.viewportHeight);
        if (x + width < this.viewportWidth) {
            ctx.drawImage(this.bitmap.image, x + width, 0, width, this.viewportHeight);
        }
    }
}