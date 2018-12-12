import {Trait} from "../entity.js";

export default class Physics extends Trait {
    constructor() {
        super('physics');
    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.altitude.moveTowardsGoal(entity, deltaTime);
        level.tileCollider.checkY(entity);
    }

    reset() {

    }
}