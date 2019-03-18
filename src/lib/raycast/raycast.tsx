import { Controls } from './Controls';
import { Skybox } from './Skybox';
import { Player } from './Player';
import { Bitmap } from './Bitmap';
import { Map } from './Map';
import { Weather } from './Weather';

const MOVE_SPEED = 80;
const TURN_SPEED = Math.PI;   // Turn speed in radians per second.
const MAP_SIZE = 64;        // Size of one side of the map square in cells.

export class Raycast {
    private ctx: CanvasRenderingContext2D | null;
    private frameCount: number;
    private animationCallback: any;
    private running: boolean;
    private lastFrameTime: number;
    private controls: Controls;
    private skybox: Skybox;
    private player: Player;
    private map: Map;
    private weather: Weather;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = this.canvas.getContext('2d');
        console.log('constructed raycast');
        this.frameCount = 0;
        this.animationCallback = this.frameCallback.bind(this);
        this.running = false;
        this.lastFrameTime = 0;

        this.controls = new Controls();
        var weapon = new Bitmap('assets/knife.png', 319, 320);
        this.player = new Player(this.controls, TURN_SPEED, 10, 10, weapon, canvas.width, canvas.height);
        this.skybox = new Skybox('assets/skybox.jpg', 2000, 750, canvas.width, canvas.height);
        this.map = new Map(MAP_SIZE);
        this.map.makeRandomWalls();
        this.weather = new Weather(canvas.width, canvas.height);
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
        this.player.update(elapsed);
        this.weather.update(elapsed);

        var fps = elapsed ? 1 / elapsed : 0;
        console.log(`pos=(${this.player.x}, ${this.player.y}) angle=${this.player.angle} light=${this.weather.light} fps=${fps.toPrecision(5)}`);
    }

    public renderFrame() {
        if (this.ctx == null)   // because my context type is | null, because it has delayed loading because React.
            return;
        this.skybox.draw(this.ctx, this.player.angle);
        this.player.draw(this.ctx);
        this.weather.draw(this.ctx);

        //this.ctx.fillStyle = 'black';
        //this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        
        //this.ctx.fillStyle = 'green';
        //this.ctx.fillRect(this.blipX, this.blipY, 150, 100);
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