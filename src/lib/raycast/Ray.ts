import { Map } from './Map';
import { Step } from './Step';

const NoWall = new Step(0, 0, 0, 0, Infinity, 0, 0);

export class Ray {
    public steps: Step[];

    constructor(
        private map: Map,
        origin: Step,
        private sin: number,
        private cos: number,
        range: number
    ) {
        this.steps = [];
        this.cast(origin, range);
    }

    //*TODO: rewrite this to be simpler. Consider moving it so the work isn't done in the constructor.
    private cast(origin: Step, range: number) {
        var stepX = this.step(this.sin, this.cos, origin.x, origin.y, false);
        var stepY = this.step(this.cos, this.sin, origin.y, origin.x, true);
        var nextStep = stepX.length2 < stepY.length2
            ? this.inspect(stepX, 1, 0, origin.distance, stepX.y)
            : this.inspect(stepY, 0, 1, origin.distance, stepY.x);
        this.steps.push(origin);
        if (nextStep.distance < range) {
            this.cast(nextStep, range);
        }
    }

    private step(rise: number, run: number, x: number, y: number, inverted: boolean): Step {
        if (run === 0)
            return NoWall;
        var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
        var dy = dx * (rise / run);
        var x2 = inverted ? y + dy : x + dx;
        var y2 = inverted ? x + dx : y + dy;
        var length2 = dx * dx + dy * dy;
        return new Step(x2, y2, 0, 0, length2, 0, 0);
    }

    // Modifies the step and sets the height, distance, offset, and shading.
    private inspect(step: Step, shiftX: number, shiftY: number, distance: number, offset: number): Step {
        var dx = this.cos < 0 ? shiftX : 0;
        var dy = this.sin < 0 ? shiftY : 0;
        step.height = this.map.get(step.x - dx, step.y - dy);
        step.distance = distance + Math.sqrt(step.length2);
        if (shiftX == 1) {
            step.shading = this.cos < 0 ? 2 : 0;
        } else {
            step.shading = this.sin < 0 ? 2 : 1;
        }
        step.offset = offset - Math.floor(offset);
        return step;
    }


}