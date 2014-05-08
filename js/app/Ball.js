define([], function() {

    var Ball = function(x, y) {
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.vx = 0;
        this.width = 6;
        this.height = 6;
        this.currentStartDirectionLeft = true;

        this.types = {
            Ball: true,
            Box: true,
            Collision: true,
            GameAreaCollision: true,
            Velocity: true,
        };
    };

    Ball.prototype.resetVelocity = function() {
        this.currentStartDirectionLeft = !this.currentStartDirectionLeft;
        this.vy = Math.random() * (0.25 - -0.25) + -0.25;
        this.vx = 0.4 - Math.abs(this.vy);

        if (this.currentStartDirectionLeft)
            this.vx = -this.vx;
    };

    return Ball;

});
