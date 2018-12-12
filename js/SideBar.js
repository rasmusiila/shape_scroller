import {loadSpriteSheet} from "./loaders.js";

export default class SideBar {
    constructor() {
        this.leftCanvas = document.getElementById('leftSide');
        this.rightCanvas = document.getElementById('rightSide');
        this.leftContext = this.leftCanvas.getContext('2d');
        console.log(this.leftContext);
        this.rightContext = this.rightCanvas.getContext('2d');
        this.ready = false;
        this.activeKeys = [];
        this.color = '';
        this.shape = 'cloud';
    }

    async getSprites() {
        this.sprites = await loadSpriteSheet('side-def');
        console.log(this.sprites);
        this.ready = true;
    }

    activate(key) {
        this.activeKeys.push(key);
    }

    deactivate(key) {
        const index = this.activeKeys.indexOf(key);
        if (index !== -1) this.activeKeys.splice(index, 1);
    }

    setColor(color) {
        this.color = color;
    }

    setShape(shape) {
        this.shape = shape;
    }

    update() {
        if (!this.ready) {
            return;
        }
        const drawableIcons = {
            upArrow: this.activeKeys.includes('KeyW') ? 'up-halo-arrow': 'up-arrow',
            downArrow: this.activeKeys.includes('KeyS') ? 'down-halo-arrow': 'down-arrow',
            leftArrow: this.activeKeys.includes('KeyA') ? 'left-halo-arrow': 'left-arrow',
            rightArrow: this.activeKeys.includes('KeyD') ? 'right-halo-arrow': 'right-arrow',
            red: this.color === 'red' ? 'red-halo': 'red',
            green: this.color === 'green' ? 'green-halo': 'green',
            blue: this.color === 'blue' ? 'blue-halo': 'blue',
            cloud: this.shape === 'cloud' ? 'cloud-halo': 'cloud',
            square: this.shape === 'square' ? 'square-halo': 'square',
            circle: this.shape === 'circle' ? 'circle-halo': 'circle',
        };


        this.leftContext.clearRect(0, 0, this.leftCanvas.width, this.leftCanvas.height);
        this.leftContext.font = "10px Arial";
        this.leftContext.fillStyle = "rgb(255, 200, 200)";
        this.sprites.draw(drawableIcons.upArrow, this.leftContext, this.leftCanvas.width / 5, this.leftCanvas.height / 5);
        this.leftContext.fillText("W", this.leftCanvas.width / 5, this.leftCanvas.height / 5 - 5);
        this.sprites.draw(drawableIcons.downArrow, this.leftContext, this.leftCanvas.width / 5, 2 * this.leftCanvas.height / 5);
        this.leftContext.fillText("S", this.leftCanvas.width / 5, 2 * this.leftCanvas.height / 5 - 5);
        this.sprites.draw(drawableIcons.leftArrow, this.leftContext, this.leftCanvas.width / 5, 3 * this.leftCanvas.height / 5);
        this.leftContext.fillText("A", this.leftCanvas.width / 5, 3 * this.leftCanvas.height / 5 - 5);
        this.sprites.draw(drawableIcons.rightArrow, this.leftContext, this.leftCanvas.width / 5, 4 * this.leftCanvas.height / 5);
        this.leftContext.fillText("D", this.leftCanvas.width / 5, 4 * this.leftCanvas.height / 5 - 5);

        this.rightContext.clearRect(0, 0, this.rightCanvas.width, this.rightCanvas.height);
        this.rightContext.font = "10px Arial";
        this.rightContext.fillStyle = "rgb(255, 200, 200)";
        this.sprites.draw(drawableIcons.red, this.rightContext, this.rightCanvas.width / 5, 2 * this.rightCanvas.height / 10);
        this.rightContext.fillText("U", 3 * this.rightCanvas.width / 5, 2 * this.rightCanvas.height / 10);
        this.sprites.draw(drawableIcons.green, this.rightContext, this.rightCanvas.width / 5, 3 * this.rightCanvas.height / 10);
        this.rightContext.fillText("I", 3 * this.rightCanvas.width / 5, 3 * this.rightCanvas.height / 10);
        this.sprites.draw(drawableIcons.blue, this.rightContext, this.rightCanvas.width / 5, 4 * this.rightCanvas.height / 10);
        this.rightContext.fillText("O", 3 * this.rightCanvas.width / 5, 4 * this.rightCanvas.height / 10);
        this.sprites.draw(drawableIcons.cloud, this.rightContext, this.rightCanvas.width / 5, 6 * this.rightCanvas.height / 10);
        this.rightContext.fillText("J", 3 * this.rightCanvas.width / 5, 6 * this.rightCanvas.height / 10);
        this.sprites.draw(drawableIcons.square, this.rightContext, this.rightCanvas.width / 5, 7 * this.rightCanvas.height / 10);
        this.rightContext.fillText("K", 3 * this.rightCanvas.width / 5, 7 * this.rightCanvas.height / 10);
        this.sprites.draw(drawableIcons.circle, this.rightContext, this.rightCanvas.width / 5, 8 * this.rightCanvas.height / 10);
        this.rightContext.fillText("L", 3 * this.rightCanvas.width / 5, 8 * this.rightCanvas.height / 10);
    }

    reset() {
        this.activeKeys = [];
        this.color = '';
        this.shape = 'cloud';
    }
}