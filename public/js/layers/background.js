import TileResolver from "../TileResolver.js";

const TILE_SIZE = 16;
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = SCREEN_WIDTH + TILE_SIZE;
    buffer.height = SCREEN_HEIGHT;

    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex) {
        // if (drawFrom === startIndex && endIndex === drawTo) {
        //     return;
        // }
        context.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, context, x - startIndex, y);
                    }
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer, -camera.pos.x % TILE_SIZE, -camera.pos.y);
    };
}