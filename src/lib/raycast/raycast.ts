import { Controls } from './Controls';
import { Skybox } from './Skybox';
import { Player } from './Player';
import { Bitmap } from './Bitmap';
import { Map } from './Map';
import { Weather } from './Weather';
import { Camera } from './Camera';

const RESOLUTION = 320; // Number of vertical strips.
const RANGE = 14;   // Maximum distance at which a wall will be drawn. Walls further than this won't be rendered.
const MOVE_SPEED = 3;
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
    private camera: Camera;

    constructor(private canvas: HTMLCanvasElement, isMobile: boolean) {
        this.ctx = this.canvas.getContext('2d');
        this.frameCount = 0;
        this.animationCallback = this.frameCallback.bind(this);
        this.running = false;
        this.lastFrameTime = 0;

        this.controls = new Controls();
        var weapon = new Bitmap('assets/knife.png', 319, 320);
        this.player = new Player(this.controls, TURN_SPEED, MOVE_SPEED, 10, -1, weapon, canvas.width, canvas.height);
        this.skybox = new Skybox('assets/skybox.jpg', 2000, 750, canvas.width, canvas.height);
        var wallTexture = new Bitmap('assets/wall.jpg', 1024, 1024);
        this.map = new Map(MAP_SIZE, wallTexture);
        this.map.makeRandomWalls();
        this.weather = new Weather(canvas.width, canvas.height);
        var resolution = RESOLUTION; //isMobile ? 160 : 320;
        var range = RANGE; // isMobile ? 8 : 14;
        this.camera = new Camera(canvas.width, canvas.height, resolution, range);
        this.start();
    }

    public start() {
        this.running = true;
        requestAnimationFrame(this.animationCallback);
    }

    public stop() {
        this.running = false;
    }

    public update(elapsed: number) {
        this.player.update(elapsed, this.map);
        this.weather.update(elapsed);

        var fps = elapsed ? 1 / elapsed : 0;
        console.log(`pos=(${this.player.x}, ${this.player.y}) angle=${this.player.angle} light=${this.weather.light} fps=${fps.toPrecision(5)}`);
    }

    public renderFrame() {
        if (this.ctx == null)   // because my context type is | null, because it has delayed loading because React.
            return;
        this.skybox.draw(this.ctx, this.player.angle);
        this.weather.draw(this.ctx);
        this.camera.drawColumns(this.ctx, this.player, this.map, this.weather.light);
        this.player.draw(this.ctx);
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