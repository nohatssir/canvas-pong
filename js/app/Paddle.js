define([], function() {
    var Paddle = function(x, y, up, down) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.width = 6;
        this.height = 40;
        this.score = 0;

        this.up = up;
        this.down = down;

        this.types = {
            Box: true,
            GameAreaCollision: true,
            Movement: true,
            Player: true,
            Velocity: true,
        };
    };

    return Paddle;
});
