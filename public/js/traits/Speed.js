import {Trait} from "../entity.js";

const ACCEL = 100;
const DECEL = 100;
const DEFAULT_SPEED = 100;

export default class Speed extends Trait {
    constructor() {
        super('speed');

        this.acceleration = ACCEL;
        this.deceleration = DECEL;

        this.goal = DEFAULT_SPEED;

        this.distance = 0;
        this.ready = false;
    }

    update(entity, deltaTime) {
        if (!this.ready) {
            return;
        }
        const absX = Math.abs(entity.vel.x);

        if (this.goal > entity.vel.x) {
            entity.vel.x = Math.min(entity.vel.x + this.acceleration * deltaTime, this.goal);
        } else {
            entity.vel.x = Math.max(entity.vel.x - this.deceleration * deltaTime, this.goal);
        }
        this.distance += absX * deltaTime;
    }

    unlock() {
        this.ready = true;
    }

    accelerate() {
        this.goal += 50;
    }

    decelerate() {
        this.goal -= 50;
    }

    reset() {
        this.acceleration = ACCEL;
        this.deceleration = DECEL;

        this.goal = DEFAULT_SPEED;

        this.distance = 0;
        this.ready = false;
    }
}