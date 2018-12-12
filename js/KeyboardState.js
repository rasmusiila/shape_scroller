const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a keycode
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    removeMapping(code) {
        this.keyMap.delete(code);
    }

    removeMappings() {
        this.keyMap = new Map();
    }

    handleEvent(event) {
        event.preventDefault();
        const {code} = event;
        if (!this.keyMap.has(code)) {
            // Did not have key mapped
            return;
        }

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);

    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }

}