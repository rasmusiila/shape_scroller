import {loadJson} from "./loaders.js";

const PILLAR_NR = 19;
const OBJECT_DENSITY = 10;
const WOOD_OFFSET = 5;

function generatePillars(levelSpec) {
    let pillarTypes = [];
    const pillarTypeNr = Object.keys(levelSpec.patterns).length;
    for (let i = 0; i < PILLAR_NR; i++) {
        pillarTypes.push(getRandomInt(0, pillarTypeNr - 1));
    }
    return pillarTypes;
}

function addPillarsToLevel(levelSpec, pillars) {
    let tiles = [];
    for (let i = 0; i < pillars.length; i++) {
        const pillarName = Object.keys(levelSpec.patterns)[pillars[i]];
        const x = OBJECT_DENSITY * (i + 1);
        tiles.push(
            {
                "pattern": pillarName,
                "ranges": [[x, 0]]
            }
        );
    }
    levelSpec.layers.push({
        "tiles": tiles
    });

}

function generateWoodTiles() {
    let woodTypes = [];
    const woodTypeNr = 3;
    for (let i = 0; i < PILLAR_NR; i++) {
        woodTypes.push(getRandomInt(0, 2 * woodTypeNr));
    }
    return woodTypes;
}

function addWoodToLevel(levelSpec, woodTiles) {
    let tiles = [
        {
            "name": "wood",
            "type": "ground",
            "ranges": []
        }
    ];
    for (let i = 0; i < woodTiles.length; i++) {
        const x = WOOD_OFFSET + OBJECT_DENSITY * i;
        if (woodTiles[i] === 1) {
            tiles[0].ranges.push(
                [x, 1, 0, 4]
            );
        } else if (woodTiles[i] === 2) {
            tiles[0].ranges.push(
                [x, 1, 12, 3]
            );
        } else if (woodTiles[i] === 3) {
            tiles[0].ranges.push(
                [x, 1, 0, 4],
                [x, 1, 12, 3]
            );
        }
    }
    levelSpec.layers.push({
        "tiles": tiles
    });
}

export default function generateLevel() {
    return loadJson(`levels/base.json`)
        .then(levelSpec => {
            const woodTiles = generateWoodTiles();
            addWoodToLevel(levelSpec, woodTiles);
            const pillars = generatePillars(levelSpec);
            addPillarsToLevel(levelSpec, pillars);

            return levelSpec;
        });

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}