import { Player } from './Player';
import { Map } from './Map';
import { Ray } from './Ray';

class Projection {
    constructor(public top: number, public height: number) {}
}

export class Camera {
    private stripWidth: number; // Width of a vertical strip in pixels.
    public focalLength: number; // Distance from human's eyeballs to the rendering surface of the camera.
    private lightRange: number;
    
    constructor(
        public viewportWidth: number,
        public viewportHeight: number,
        public resolution: number,  // Number of vertical strips to render
        public range: number // Maximum distance the camera sees. Things farther than this are not shown.
    ) {
        this.focalLength = 0.8;
        this.stripWidth = this.viewportWidth / this.resolution;
        this.lightRange = 5;
    }

    drawColumns(ctx: CanvasRenderingContext2D, player: Player, map: Map, ambientLight: number) {
        ctx.save();
        for (var column = 0; column < this.resolution; column++) {
            var x = column / this.resolution - 0.5; // Middle of the strip width. *TODO try tweaking the 0.5
            var angle = Math.atan2(x, this.focalLength);
            var ray = map.castRay(player.x, player.y, player.angle + angle, this.range);
            this.drawColumn(ctx, column, ray, angle, map, ambientLight)
        }
        ctx.restore();
    }


    private drawColumn(
        ctx: CanvasRenderingContext2D,
        column: number,
        ray: Ray,
        angle: number,
        map: Map,
        ambientLight: number)
    {
        var wallTexture = map.wallTexture;
        var left = Math.floor(column * this.stripWidth);
        var width = Math.ceil(this.stripWidth);
        var hit = -1;
        // Walk along the ray and find the first wall. Hit will be the subscript of the first wall.
        while (++hit < ray.steps.length && ray.steps[hit].height <= 0);

        // Draw the walls starting at the furthest and work towards the closest.
        for (var s = ray.steps.length - 1; s >= 0; s--) {
            var step = ray.steps[s];
            if (s === hit) {
                var textureX = Math.floor(wallTexture.width * step.offset);
                var wallProjection = this.project(step.height, angle, step.distance);

                ctx.globalAlpha = 1;
                ctx.drawImage(wallTexture.image, textureX, 0, 1, wallTexture.height, left, wallProjection.top, width, wallProjection.height);
                
                ctx.fillStyle = '#000000';
                ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - ambientLight, 0);
                ctx.fillRect(left, wallProjection.top, width, wallProjection.height);
            }
        }
    }

    private project(height: number, angle: number, distance: number): Projection {
        var z = distance * Math.cos(angle);
        var wallHeight = this.viewportHeight * height / z;
        var bottom = this.viewportHeight / 2 * (1 + 1 / z);
        return new Projection(bottom - wallHeight, wallHeight);
    }
}