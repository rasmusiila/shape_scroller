import TileResolver from "./TileResolver.js";

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);
        matches.forEach(match => {
            if (match.tiles.type !== 'ground' && match.tiles.type !== 'portal' && match.tiles.type !== 'sun') {
                return;
            }
            entity.obstruct(match);
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y);

        matches.forEach(match => {

            if (match.tiles.type !== 'ground' && match.tiles.type !== 'portal') {
                return;
            }
            entity.obstruct(match);
        });
    }
}