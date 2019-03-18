import { Controls } from './Controls';
import { Bitmap } from './Bitmap';
import { Map } from './Map';

const DIR_RIGHT = 1;   // Based on the winding direction of radians on a unit circle.
const DIR_LEFT = -1;
const TWO_PI = Math.PI * 2;
const WEAPON_SCALE = 0.4; // Portion of the viewport the weapon should occupy.
const WEAPON_MARGIN = 0.35; // How much space to give on the right side of weapon, as a fraction of the viewport width.
const WEAPON_CLIP_BOTTOM = 0.05; // How much of the weapon to trim off the bottom, as a fraction of viewport height.
const BACKWARDS_RATE = 0.75; // Fraction of forward speed to use when going backwards

export class Player {
    public angle: number;
    private weaponX: number;    // Where int he viewport the weapon should be drawn.
    private weaponY: number;
    private weaponWidth: number;
    private weaponHeight: number;

    constructor(
        private controls: Controls,
        private turnSpeed: number,
        private moveSpeed: number,
        public x: number,
        public y: number,
        private weapon: Bitmap,
        viewportWidth: number,
        viewportHeight: number)
    {
        this.angle = 0;

        this.weaponWidth = this.weapon.width * WEAPON_SCALE;
        this.weaponHeight = this.weapon.height * WEAPON_SCALE;
        this.weaponX = viewportWidth - this.weaponWidth - viewportWidth * WEAPON_MARGIN;
        this.weaponY = viewportHeight - this.weaponHeight + viewportHeight * WEAPON_CLIP_BOTTOM;
    }

    update(elapsed: number, map: Map) {
        if (this.controls.forward) this.move(elapsed, map);
        if (this.controls.back) this.move(-BACKWARDS_RATE * elapsed, map);
        if (this.controls.left)  this.turn(DIR_LEFT, elapsed);
        if (this.controls.right)  this.turn(DIR_RIGHT, elapsed)
    }

    private turn(direction: number, elapsed: number) {
        this.angle += direction * elapsed * this.turnSpeed;
        this.angle = (TWO_PI + this.angle) % TWO_PI;    // The addition keeps the angle positive.
    }

    private move(elapsed: number, map: Map) {
        var dist = elapsed * this.moveSpeed;
        var dx = dist * Math.cos(this.angle);
        var dy = dist * Math.sin(this.angle);
        var inWall = map.get(this.x, this.y) > 0;
        // Only update the position if the target cell is empty.
        if (inWall || map.get(this.x + dx, this.y) <= 0) this.x += dx;
        if (inWall || map.get(this.x, this.y + dx) <= 0) this.y += dy;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.weapon.image, this.weaponX, this.weaponY, this.weaponWidth, this.weaponHeight);
    }
}