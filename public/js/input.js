import Keyboard from "./KeyboardState.js";
import {hide} from "./main.js";

function playSound(s) {
    const sound = new Audio(s);
    sound.volume = 0.5;
    sound.play();
}

function swoosh() {
    playSound('../../sounds/swoosh.mp3');
}

function click() {
    playSound('../../sounds/click.mp3');
}

export function setupKeyboard(player, sideBarDrawer) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {

        if (keyState) {
            hide(document.getElementById('space-start'));
            player.speed.unlock();
        }
    });

    input.addMapping('KeyD', keyState => {
        keyState ? player.speed.accelerate() : player.speed.decelerate();

        if (keyState && !player.killable.dead) {
            sideBarDrawer.activate('KeyD');
        } else {
            sideBarDrawer.deactivate('KeyD');
        }
    });

    input.addMapping('KeyA', keyState => {
        keyState ? player.speed.decelerate() : player.speed.accelerate();

        if (keyState && !player.killable.dead) {
            sideBarDrawer.activate('KeyA');
        } else {
            sideBarDrawer.deactivate('KeyA');
        }
    });

    input.addMapping('KeyW', keyState => {
        if (keyState && !player.killable.dead) {
            swoosh();
            player.altitude.ascend();
            sideBarDrawer.activate('KeyW');
        } else {
            sideBarDrawer.deactivate('KeyW');
        }
    });

    input.addMapping('KeyS', keyState => {

        if (keyState && !player.killable.dead) {
            swoosh();
            player.altitude.descend();
            sideBarDrawer.activate('KeyS');
        } else {
            sideBarDrawer.deactivate('KeyS');
        }
    });

    input.addMapping('KeyU', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setRed();
            sideBarDrawer.setColor('red');
        }
    });
    input.addMapping('KeyI', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setGreen();
            sideBarDrawer.setColor('green');
        }
    });
    input.addMapping('KeyO', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setBlue();
            sideBarDrawer.setColor('blue');
        }
    });

    input.addMapping('KeyJ', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setCloud();
            sideBarDrawer.setShape('cloud');
        }
    });
    input.addMapping('KeyK', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setSquare();
            sideBarDrawer.setShape('square');
        }
    });
    input.addMapping('KeyL', keyState => {
        if (keyState && !player.killable.dead) {
            click();
            player.transform.setCircle();
            sideBarDrawer.setShape('circle');
        }
    });

    return input;
}