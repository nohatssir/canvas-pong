define([], function() {
    var Canvas = function() {
        this.canvas = null;
        this.context = null;
        this.init();
    };

    Canvas.prototype.init = function() {
        this.canvas = document.getElementById("game");

        if (this.canvas) {
            this.resize();
            this.context = this.canvas.getContext("2d");
            this.context.fillStyle = "rgb(255, 255, 255)";

            window.addEventListener("resize", this.resize.bind(this));
        }
    };


    Canvas.prototype.getCanvas = function() {
        return this.canvas;
    };

    Canvas.prototype.getContext = function() {
        return this.context;
    };

    Canvas.prototype.getHeight = function() {
        return this.canvas.height;
    };

    Canvas.prototype.getWidth = function() {
        return this.canvas.width;
    };

    Canvas.prototype.setBackgroundColor = function(color) {
        if (this.canvas) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = "rgb(255, 255, 255)";
        }
    };

    Canvas.prototype.defaults = function() {
        if (this.canvas) {
            this.setBackgroundColor("rgb(53, 53, 53)");
            this.context.fillStyle = "rgb(255, 255, 255)";
        }
    };

    Canvas.prototype.reset = function() {
        if (this.canvas) {
            // Store the current transformation matrix
            this.context.save();

            // Use the identity matrix while clearing the canvas
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Restore the transform
            this.context.restore();

            // Set defaults
            this.defaults();
        }
    };

    Canvas.prototype.resize = function() {
        if (this.canvas) {
            var width = window.innerWidth;
            var height = window.innerHeight;

            var newWidth = width;
            var newHeight = 2 * width / 4;

            if (newHeight > height) {
                newHeight = height;
                newWidth = 4 * height / 2;
            }

            this.canvas.width = newWidth;
            this.canvas.height = newHeight;
        }
    };

    return Canvas;
});
