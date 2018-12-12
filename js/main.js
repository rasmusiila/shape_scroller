"use strict";

import Timer from "./timer.js";
import Camera from "./camera.js";
import {loadEntities} from "./entities.js";
import {createLevelLoader, loadJsonFileToObject} from "./loaders/level.js";
import Entity from "./entity.js";
import {setupKeyboard} from "./input.js";
import PlayerController from "./traits/PlayerController.js";
import SideBar from "./SideBar.js";
import {resetPlayer} from "./entities/Player.js";
import generateLevel from "./LevelGenerator.js";

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(0, 112);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

const timer = new Timer();
const winSound = new Audio('sounds/success.mp3');
winSound.volume = 0.5;

async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);

    const music = new Audio('../../sounds/music.mp3');
    music.volume = 0.5;
    music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    const sideBarDrawer = new SideBar();
    await sideBarDrawer.getSprites();

    const camera = new Camera();

    let level, player, playerEnv, input;

    mainMenu();

    async function levelLoad(levelObject) {

        level = await loadLevel(levelObject);

        player = entityFactory.player();
        playerEnv = createPlayerEnv(player);

        level.entities.add(playerEnv);

        input = setupKeyboard(player, sideBarDrawer);
        input.listenTo(window);

        timer.update = function update(deltaTime) {
            // console.log('update');
            level.update(deltaTime);
            sideBarDrawer.update();
            document.getElementById('score-span').innerHTML = playerEnv.playerController.score.toFixed();

            camera.pos.x = Math.max(0, player.pos.x - 40);
            level.comp.draw(context, camera);
        };
        startGame();

        function startGame() {
            timer.start();
            music.play();
        }

        function clear() {
            timer.pause();
            level.totalTime = 0;
            playerEnv.reset();
            resetPlayer(player);
            sideBarDrawer.reset();
        }

        function restart() {
            show(document.getElementById('space-start'));
            timer.start();
        }

        function reset() {
            timer.pause();
            context.clearRect(0, 0, canvas.width, canvas.height);
            const leftCanvas = document.getElementById('leftSide');
            const rightCanvas = document.getElementById('rightSide');
            const leftContext = leftCanvas.getContext('2d');
            const rightContext = rightCanvas.getContext('2d');
            leftContext.clearRect(0, 0, leftCanvas.width, leftCanvas.height);
            rightContext.clearRect(0, 0, rightCanvas.width, rightCanvas.height);
            input.removeMappings();
        }

        document.getElementById('restart').addEventListener('click', function () {
            hide(document.getElementById('game-over'));
            clear();
            restart();
        });

        document.getElementById('menuButton').addEventListener('click', function () {
            hide(document.getElementById('game-over'));
            hide(document.getElementById('score-div'));
            reset();
            mainMenu();
        });

        document.getElementById('winMenuButton').addEventListener('click', function () {
            hide(document.getElementById('game-win'));
            hide(document.getElementById('score-div'));
            reset();
            mainMenu();
        });
    }

    document.getElementById('play').addEventListener('click', function () {
        hide(document.getElementById('main'));
        show(document.getElementById('level-select'));
        inlineShow(document.getElementById('back-div'));
    });

    document.getElementById('credits').addEventListener('click', function () {
        hide(document.getElementById('main'));
        show(document.getElementById('credits-screen'));
        inlineShow(document.getElementById('back-div'));
    });

    ['1-1', '1-2', '1-3', '1-4'].forEach(levelName => {
        document.getElementById(levelName).addEventListener('click', function () {
            hide(document.getElementById('menu'));
            hide(document.getElementById('level-select'));
            hide(document.getElementById('back-div'));
            loadJsonFileToObject(levelName)
                .then(levelSpec => {
                    show(document.getElementById('space-start'));
                    inlineShow(document.getElementById('score-div'));
                    levelLoad(levelSpec);
                });
        });
    });

    document.getElementById('generate').addEventListener('click', function () {
            hide(document.getElementById('menu'));
            hide(document.getElementById('level-select'));
            hide(document.getElementById('back-div'));
            generateLevel()
                .then(levelSpec => {
                    show(document.getElementById('space-start'));
                    inlineShow(document.getElementById('score-div'));
                    levelLoad(levelSpec);
                });
        });

    document.getElementById('back').addEventListener('click', function () {
        hide(document.getElementById('credits-screen'));
        hide(document.getElementById('level-select'));
        hide(document.getElementById('back-div'));
        show(document.getElementById('menu'));
        show(document.getElementById('main'));
    });
}

export function gameOver(score) {
    timer.pause();
    document.getElementById('score').innerHTML = score.toFixed();
    show(document.getElementById('game-over'));
}

export function win(score) {
    timer.pause();
    winSound.play();
    document.getElementById('win-score').innerHTML = score.toFixed();
    show(document.getElementById('game-win'));
}

export function hide(el) {
    el.style.display = 'none';
}

function show(el) {
    el.style.display = 'block';
}

function inlineShow(el) {
    el.style.display = 'inline-block';
}

function mainMenu() {
    show(document.getElementById('menu'));
    show(document.getElementById('main'));
}

const canvas = document.getElementById('screen');
main(canvas);
