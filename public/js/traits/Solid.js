import {Trait} from "../entity.js";

export default class Solid extends Trait {
    constructor() {
        super('solid');
        this.obstructs = true;
    }

    obstruct(entity, match) {
        if (!this.obstructs) {
            return;
        }

        function colorMatches(entity, match) {
            return match.tiles.color === 'red' && entity.transform.isRed() ||
                match.tiles.color === 'green' && entity.transform.isGreen() ||
                match.tiles.color === 'blue' && entity.transform.isBlue();
        }

        function shapeMatches(entity, match) {
            if (!match.tiles.shape) {
                return true;
            }
            return match.tiles.shape === 'square' && entity.transform.isSquare() ||
                match.tiles.shape === 'circle' && entity.transform.isCircle() ||
                match.tiles.shape === 'cloud' && entity.transform.isCloud();
        }

        if (match.tiles.type === 'portal') {
            if (colorMatches(entity, match) && shapeMatches(entity, match)) {
                // do nothing - pass through portal
            } else {
                entity.killable.kill();
            }
        } else if (match.tiles.type === 'sun') {
            entity.killable.victory();
        } else {
            if (entity.killable) {
                entity.killable.kill();
            }
        }
    }

    reset() {
        this.obstructs = true;
    }
}