import Entity from "../entity.js";
import {loadSpriteSheet} from "../loaders.js";
import Solid from "../traits/Solid.js";
import Speed from "../traits/Speed.js";
import Killable from "../traits/Killable.js";
import Physics from "../traits/Physics.js";
import Altitude from "../traits/Altitude.js";
import Transform from "../traits/Transform.js";

const PLAYER_HEIGHT = 32;
const PLAYER_WIDTH = 32;

export function loadPlayer() {
    return loadSpriteSheet('player')
    .then(createPlayerFactory);
}

export function resetPlayer(player) {
    return player.reset();
}

function createPlayerFactory(sprite) {
    function getPlayerAnims() {
        return {
            flyAnim: sprite.animations.get('fly'),
            ascendAnim: sprite.animations.get('ascend'),
            descendAnim: sprite.animations.get('descend'),
            redFlyAnim: sprite.animations.get('red-fly'),
            redAscendAnim: sprite.animations.get('red-ascend'),
            redDescendAnim: sprite.animations.get('red-descend'),
            greenFlyAnim: sprite.animations.get('green-fly'),
            greenAscendAnim: sprite.animations.get('green-ascend'),
            greenDescendAnim: sprite.animations.get('green-descend'),
            blueFlyAnim: sprite.animations.get('blue-fly'),
            blueAscendAnim: sprite.animations.get('blue-ascend'),
            blueDescendAnim: sprite.animations.get('blue-descend'),

            squareAnim: sprite.animations.get('square'),
            squareAscendAnim: sprite.animations.get('square-up'),
            squareDescendAnim: sprite.animations.get('square-down'),
            redSquareAnim: sprite.animations.get('red-square'),
            redSquareAscendAnim: sprite.animations.get('red-square-up'),
            redSquareDescendAnim: sprite.animations.get('red-square-down'),
            greenSquareAnim: sprite.animations.get('green-square'),
            greenSquareAscendAnim: sprite.animations.get('green-square-up'),
            greenSquareDescendAnim: sprite.animations.get('green-square-down'),
            blueSquareAnim: sprite.animations.get('blue-square'),
            blueSquareAscendAnim: sprite.animations.get('blue-square-up'),
            blueSquareDescendAnim: sprite.animations.get('blue-square-down'),

            circleAnim: sprite.animations.get('circle'),
            circleAscendAnim: sprite.animations.get('circle-up'),
            circleDescendAnim: sprite.animations.get('circle-down'),
            redCircleAnim: sprite.animations.get('red-circle'),
            redCircleAscendAnim: sprite.animations.get('red-circle-up'),
            redCircleDescendAnim: sprite.animations.get('red-circle-down'),
            greenCircleAnim: sprite.animations.get('green-circle'),
            greenCircleAscendAnim: sprite.animations.get('green-circle-up'),
            greenCircleDescendAnim: sprite.animations.get('green-circle-down'),
            blueCircleAnim: sprite.animations.get('blue-circle'),
            blueCircleAscendAnim: sprite.animations.get('blue-circle-up'),
            blueCircleDescendAnim: sprite.animations.get('blue-circle-down')
        };
    }

    const anims = getPlayerAnims();

    function routeFrame(player) {
        if (player.transform.isRed()) {
            if (player.transform.isSquare()) {
                if (player.altitude.dir === 1) {
                    return anims.redSquareDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.redSquareAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.redSquareAnim(player.speed.distance);
                    }
                }
            } else if (player.transform.isCircle()) {
                if (player.altitude.dir === 1) {
                    return anims.redCircleDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.redCircleAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.redCircleAnim(player.speed.distance);
                    }
                }
            } else {
                if (player.altitude.dir === 1) {
                    return anims.redDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.redAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.redFlyAnim(player.speed.distance);
                    }
                }
            }
        } else if (player.transform.isGreen()) {
            if (player.transform.isSquare()) {
                if (player.altitude.dir === 1) {
                    return anims.greenSquareDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.greenSquareAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.greenSquareAnim(player.speed.distance);
                    }
                }
            } else if (player.transform.isCircle()) {
                if (player.altitude.dir === 1) {
                    return anims.greenCircleDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.greenCircleAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.greenCircleAnim(player.speed.distance);
                    }
                }
            } else {
                if (player.altitude.dir === 1) {
                    return anims.greenDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.greenAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.greenFlyAnim(player.speed.distance);
                    }
                }
            }
        } else if (player.transform.isBlue()) {
            if (player.transform.isSquare()) {
                if (player.altitude.dir === 1) {
                    return anims.blueSquareDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.blueSquareAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.blueSquareAnim(player.speed.distance);
                    }
                }
            } else if (player.transform.isCircle()) {
                if (player.altitude.dir === 1) {
                    return anims.blueCircleDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.blueCircleAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.blueCircleAnim(player.speed.distance);
                    }
                }
            } else {
                if (player.altitude.dir === 1) {
                    return anims.blueDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.blueAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.blueFlyAnim(player.speed.distance);
                    }
                }
            }
        } else {
            if (player.transform.isSquare()) {
                if (player.altitude.dir === 1) {
                    return anims.squareDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.squareAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.squareAnim(player.speed.distance);
                    }
                }
            } else if (player.transform.isCircle()) {
                if (player.altitude.dir === 1) {
                    return anims.circleDescendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.circleAscendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.circleAnim(player.speed.distance);
                    }
                }
            } else {
                if (player.altitude.dir === 1) {
                    return anims.descendAnim(player.speed.distance);
                } else if (player.altitude.dir === -1) {
                    return anims.ascendAnim(player.speed.distance);
                } else {
                    if (player.speed.distance >= 0) {
                        return anims.flyAnim(player.speed.distance);
                    }
                }
            }
        }
    }

    function drawPlayer(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createPlayer() {
        const player = new Entity();
        player.size.set(PLAYER_WIDTH, PLAYER_HEIGHT);

        player.addTrait(new Physics());
        player.addTrait(new Solid());
        player.addTrait(new Speed());
        player.addTrait(new Altitude());
        player.addTrait(new Transform());
        player.addTrait(new Killable());

        player.draw = drawPlayer;

        return player;
    }
}