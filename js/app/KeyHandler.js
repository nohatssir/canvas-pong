define([], function() {
    var KeyHandler = function() {
        this.pressedKeys = [];

        this.keydown = function(e) {
            this.pressedKeys[e.keyCode] = true;
        };

        this.keyup = function(e) {
            this.pressedKeys[e.keyCode] = false;
        };

        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));
    };

    KeyHandler.prototype.isPressed = function(key) {
        return this.pressedKeys[key] ? true : false;
    };

    KeyHandler.prototype.addKeyPressListener = function(keyCode, callback) {
        if (e.keyCode === keyCode)
            callback(e);
    };

    return KeyHandler;
});
