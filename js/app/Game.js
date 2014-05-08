define(["KeyHandler", "Keys", "Paddle", "Ball", "Canvas", "ScoreDisplay"],
    function(KeyHandler, Keys, Paddle, Ball, Canvas, ScoreDisplay) {

    var Game = function() {
        this.canvas = new Canvas();
        this.entities = {};
        this.entitiesCount = 0;
        this.keys = new KeyHandler();

        // Options
        this.width = 600;
        this.height = 300;

        // Entities
        var p1 = new Paddle(5, 0, Keys.KEY_W, Keys.KEY_S);
        p1.y = this.height / 2 - p1.height / 2;
        p2 = new Paddle(this.width - 5 - 2, 0, Keys.UP_ARROW, Keys.DOWN_ARROW);
        p2.y = this.height / 2 - p2.height / 2;

        var s1 = new ScoreDisplay(150, 25, p1);
        var s2 = new ScoreDisplay(450, 25, p2);

        // Ball
        var ball = new Ball(this.width / 2, this.height / 2);
        ball.resetVelocity();

        this.addEntity(p1);
        this.addEntity(p2);
        this.addEntity(s1);
        this.addEntity(s2);
        this.addEntity(ball);
    };

    Game.prototype.addEntity = function(entity) {
        entity.id = this.entitiesCount++;
        this.entities[entity.id] = entity;
    };

    Game.prototype.removeEntity = function(entity) {
        delete this.entities[entity.id];
    };

    Game.prototype.draw = function() {
        this.canvas.reset();

        var scale = this.canvas.getWidth() / this.width;

        this.canvas.context.fillRect(this.width * scale / 2, 0, 6 * scale, this.height * scale);

        for (var id in this.entities) {
            var entity = this.entities[id];

            if (entity.types.Text) {
                // Set font settings
                this.canvas.context.font = (entity.size * scale) + "pt Arial";
                this.canvas.context.textAlign = "center";

                // Draw
                this.canvas.context.fillText(entity.player.score,
                                             entity.x * scale,
                                             entity.y * scale);
            }

            if (entity.types.Box) {
                this.canvas.context.fillRect(entity.x * scale,
                                             entity.y * scale,
                                             entity.width * scale,
                                             entity.height * scale);
            }
        }
    };

    Game.prototype.update = function(delta) {
        if (this.keys.isPressed(Keys.SPACE))
            return;

        for (var id in this.entities) {
            var entity = this.entities[id];

            if (entity.types.Player) {
                // Movement
                if (this.keys.isPressed(entity.down)) {
                        entity.vy = 0.3;
                } else if (this.keys.isPressed(entity.up)) {
                        entity.vy = -0.3;
                } else {
                    entity.vy = 0;
                }
            }

            if (entity.types.Velocity) {
                // Update position
                entity.x += entity.vx * delta;
                entity.y += entity.vy * delta;
            }

            if (entity.types.GameAreaCollision) {
                // Collision
                // Top bottom collision
                if (entity.y + entity.height > this.height) {
                    entity.y = this.height - entity.height;
                }
                if (entity.y < 0) {
                    entity.y = 0;
                }
            }


            if (entity.types.Collision) {
                if (entity instanceof Ball) {
                    if (entity.y + entity.height >= this.height || entity.y <= 0) {
                        entity.vy = -entity.vy;
                    }

                    for (var tempId in this.entities) {
                        var tempEntity = this.entities[tempId];

                        if (tempEntity === entity)
                            continue;

                        if (tempEntity.types.Player) {
                            if (this.detectCollision(entity, tempEntity)) {
                                entity.vx = -entity.vx;
                            }
                        }
                    }
                }
            }

            if (entity.types.Ball) {
                if (entity.x < 0 || entity.x > this.width) {
                    for (var tempId in this.entities) {
                        var player = this.entities[tempId];

                        if (!player.types.Player)
                            continue;

                        if (entity.x > player.x && player.x < this.width / 2 ) {
                            player.score++;
                        } else if (entity.x < player.x && player.x > this.width / 2) {
                            player.score++;
                        }
                    }

                    entity.x = this.width / 2;
                    entity.y = this.height / 2;
                    entity.resetVelocity();
                }

            }
        }
    };

    Game.prototype.detectCollision = function(object1, object2) {
        return object1.x < object2.x + object2.width
            && object1.x + object1.width  > object2.x
            && object1.y < object2.y + object2.height
            && object1.y + object1.height > object2.y;
    };

    return Game;

});
