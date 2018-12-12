import {Vec2} from './math.js';

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export default class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(SCREEN_WIDTH, SCREEN_HEIGHT);
    }
}