export class Step {
    constructor(
        public x: number,
        public y: number,
        public height: number,  // Height of the wall that is at this map location
        public distance: number, // The distance from the camera of this wall.
        public length2: number, // Length of the step squared
        public shading: number, // How dark to draw this wall
        public offset: number // Which part of the wall texture to draw here
    ) {
    }
}