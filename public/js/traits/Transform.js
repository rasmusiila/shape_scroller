import {Trait} from "../entity.js";

const RED = 1;
const GREEN = 2;
const BLUE = 3;
const SQUARE = 1;
const CIRCLE = 2;

export default class Transform extends Trait {
    constructor() {
        super('transform');

        this.color = 0;
        this.shape = 0;
    }

    isVanilla() {
        return this.color === 0;
    }

    setRed() {
        this.color = RED;
    }

    isRed() {
        return this.color === RED;
    }

    setGreen() {
        this.color = GREEN;
    }

    isGreen() {
        return this.color === GREEN;
    }

    setBlue() {
        this.color = BLUE;
    }

    isBlue() {
        return this.color === BLUE;
    }

    setCloud() {
        this.shape = 0;
    }

    isCloud() {
        return this.shape === 0;
    }

    setSquare() {
        this.shape = SQUARE;
    }

    isSquare() {
        return this.shape === SQUARE;
    }

    setCircle() {
        this.shape = CIRCLE;
    }

    isCircle() {
        return this.shape === CIRCLE;
    }

    update(entity, deltaTime) {

    }

    reset() {
        this.color = 0;
        this.shape = 0;
    }
}