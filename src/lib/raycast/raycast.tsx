import { Controls } from "./Controls";

const MOVE_SPEED = 80;

export class Raycast {
    private ctx: CanvasRenderingContext2D | null;
    private frameCount: number;
    private animationCallback: any;
    private running: boolean;
    private controls: Controls;
    private blipX: number;
    private blipY: number;
    private lastFrameTime: number;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = this.canvas.getContext('2d');
        console.log('constructed raycast');
        this.frameCount = 0;
        this.animationCallback = this.frameCallback.bind(this);
        this.running = false;
        this.controls = new Controls();
        this.blipX = 0;
        this.blipY = 0;
        this.lastFrameTime = 0;
        this.start();
    }

    public start() {
        this.running = true;
        requestAnimationFrame(this.animationCallback);
        console.log('start called');
    }

    public stop() {
        this.running = false;
    }

    public update(elapsed: number) {
        if (this.controls.forward)  this.blipY -= MOVE_SPEED * elapsed;
        if (this.controls.back)  this.blipY += MOVE_SPEED * elapsed;
        if (this.controls.left)  this.blipX -= MOVE_SPEED * elapsed;
        if (this.controls.right)  this.blipX += MOVE_SPEED * elapsed;
        console.log(`pos=(${this.blipX}, ${this.blipY}) elapsed=${elapsed}`);
    }

    public renderFrame() {
        if (this.ctx == null)   // because my context type is | null, because it has delayed loading because React.
            return;
    
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.blipX, this.blipY, 150, 100);
    }

    public frameCallback(time: number) {
        this.frameCount++;
        const elapsed = (time - this.lastFrameTime) / 1000;
        this.update(elapsed);
        this.lastFrameTime = time;
        this.renderFrame();
        if (this.running) {
            requestAnimationFrame(this.animationCallback);
        }
        
    }
}