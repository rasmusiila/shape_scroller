import {Trait} from "../entity.js";

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.win = false;
    }

    kill() {
        this.queue(() => this.dead = true);
    }

    revive() {
        this.dead = false;
    }

    update(entity, deltaTime, level) {

    }

    victory() {
        this.win = true;
    }

    reset() {
        this.dead = false;
        this.win = false;
    }
}