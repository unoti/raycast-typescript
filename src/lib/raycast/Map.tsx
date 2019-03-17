export const MAP_EMPTY = 0;
export const MAP_WALL = 1;
export const MAP_EDGE = -1;    // Edge of the world.
const FILL_RATE = 0.3;  // How full the map will be when making random walls.

export class Map {
    private grid: Uint8Array;

    constructor(public size: number) {
        this.grid = new Uint8Array(size * size);
    }

    // Returns -1 for edge of map, 0 for empty, 1 for wall.
    get(x: number, y: number) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            return MAP_EDGE;
        }
        return this.grid[y * this.size + x];
    }

    makeRandomWalls() {
        for (var i = 0; i < this.grid.length; i++) {
            this.grid[i] = Math.random() < FILL_RATE ? MAP_WALL : MAP_EMPTY;
        }
    }
}