export default class KeyHandler {
    private pressedKeys: Array<boolean>;

    constructor() {
        this.pressedKeys = new Array<boolean>();

        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }

    isPressed(key): boolean {
        return this.pressedKeys[key] ? true : false;
    }

    private keyDown(e: KeyboardEvent): void {
        this.pressedKeys[e.keyCode] = true;
    }

    private keyUp(e: KeyboardEvent): void {
        this.pressedKeys[e.keyCode] = false;
    }
}
