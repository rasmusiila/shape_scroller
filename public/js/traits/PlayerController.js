import {Trait} from "../entity.js";
import {Vec2} from "../math.js";
import {gameOver, win} from "../main.js";

const SCORE_DIVIDER = 10000; // necessary for when the score gets too big

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
    }

    setPlayer(entity) {
        this.player = entity;
    }

    update(entity, deltaTime, level) {
        if (this.player.killable.dead) {
            gameOver(this.score);
            level.entities.delete(this.player);
        } else if (this.player.killable.win) {
            win(this.score);
            level.entities.delete(this.player);
        }
        else if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        } else {
            this.score += Math.pow(this.player.vel.x, 2) / SCORE_DIVIDER;
        }
    }

    reset() {
        this.score = 0;
    }
}