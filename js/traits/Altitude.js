import {Trait} from "../entity.js";

const ALTITUDE_SPEED = 100;
const LANE_DISTANCE = 64;
const LANE_OFFSET = 16;

export default class Altitude extends Trait {
    constructor() {
        super('altitude');

        this.goal = 1;
        this.currentAltitude = 0;
        this.velocity = ALTITUDE_SPEED;
        this.dir = 0;
    }

    goalPos() {
        return LANE_DISTANCE * (this.goal + 1) - LANE_OFFSET;
    }

    ascend() {
        if (this.dir !== -1) {
            this.goal = Math.max(0, this.goal - 1);
        }
    }

    descend() {
        if (this.dir !== 1) {
            this.goal = Math.min(2, this.goal + 1);
        }
    }

    moveTowardsGoal(entity, deltaTime) {
        if (this.goalPos() > this.currentAltitude) { // descend
            this.dir = 1;
            entity.vel.y = this.velocity;
            entity.pos.y = Math.min(entity.pos.y + entity.vel.y * deltaTime, this.goalPos());
        } else if (this.goalPos() < this.currentAltitude) { //ascend
            this.dir = -1;
            entity.vel.y = -this.velocity;
            entity.pos.y = Math.max(entity.pos.y + entity.vel.y * deltaTime, this.goalPos());
        } else {
            entity.vel.y = 0;
            this.dir = 0;
        }
    }

    update(entity, deltaTime) {
        this.currentAltitude = entity.pos.y;
    }

    reset() {
        this.goal = 1;
        this.currentAltitude = 0;
        this.velocity = ALTITUDE_SPEED;
        this.dir = 0;
    }
}