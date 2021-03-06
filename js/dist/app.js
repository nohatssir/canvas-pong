(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
document.addEventListener("DOMContentLoaded", function (event) {
    var app = new application_1.default();
    app.run();
});

},{"./application":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game/game");
var Application = (function () {
    function Application() {
        var backgroundCanvas = document.getElementById('game-background');
        var canvas = document.getElementById('game');
        this.game = new game_1.default(backgroundCanvas, canvas);
    }
    Application.prototype.run = function () {
        this.game.start();
    };
    return Application;
}());
exports.default = Application;

},{"./game/game":24}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppearanceComponent = (function () {
    function AppearanceComponent() {
        this.name = 'appearance';
        this.color = 'rgba(255, 255, 255, 1.0)';
    }
    return AppearanceComponent;
}());
exports.default = AppearanceComponent;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionComponent = (function () {
    function CollisionComponent() {
        this.name = 'collision';
    }
    CollisionComponent.prototype.onCollision = function (entity1, entity2) { };
    ;
    return CollisionComponent;
}());
exports.default = CollisionComponent;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlComponent = (function () {
    function ControlComponent() {
        this.name = 'control';
    }
    return ControlComponent;
}());
exports.default = ControlComponent;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GoalComponent = (function () {
    function GoalComponent(scoreDisplay) {
        this.scoreDisplay = scoreDisplay;
        this.name = 'goal';
        this.scoreDisplay = scoreDisplay;
    }
    return GoalComponent;
}());
exports.default = GoalComponent;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsComponent = (function () {
    function PhysicsComponent(height, width) {
        this.height = height;
        this.width = width;
        this.name = 'physics';
        this.bounces = false;
        this.height = height;
        this.width = width;
    }
    return PhysicsComponent;
}());
exports.default = PhysicsComponent;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PositionComponent = (function () {
    function PositionComponent(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'position';
        this.x = x;
        this.y = y;
    }
    return PositionComponent;
}());
exports.default = PositionComponent;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextComponent = (function () {
    function TextComponent(text) {
        this.text = text;
        this.name = 'text';
        this.font = 'Digital Numbers';
        this.size = 12;
        this.textAlign = 'center';
        this.text = text;
    }
    return TextComponent;
}());
exports.default = TextComponent;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VelocityComponent = (function () {
    function VelocityComponent() {
        this.name = 'velocity';
        this.x = 0.0;
        this.y = 0.0;
    }
    return VelocityComponent;
}());
exports.default = VelocityComponent;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity(id) {
        this.id = id;
        this.components = {};
    }
    Entity.prototype.addComponent = function (component) {
        this.components[component.name] = component;
    };
    return Entity;
}());
exports.default = Entity;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionSystem = (function () {
    function CollisionSystem() {
    }
    CollisionSystem.prototype.update = function (entities, delta, info) {
        for (var entityId in entities) {
            var entity = entities[entityId];
            if (!entity.components.collision ||
                !entity.components.physics ||
                !entity.components.position) {
                continue;
            }
            var entityX = entity.components.position.x;
            var entityY = entity.components.position.y;
            var entityHeight = entity.components.physics.height;
            var entityWidth = entity.components.physics.width;
            // Gamearea top and bottom collision detection.
            if (entityY + entityHeight > info.height) {
                entity.components.position.y = info.height - entityHeight;
            }
            if (entityY < 0) {
                entity.components.position.y = 0;
            }
            if (entity.components.physics.bounces) {
                if (entityY + entityHeight >= info.height || entityY <= 0) {
                    entity.components.velocity.y = -entity.components.velocity.y;
                }
            }
            for (var tempEntityId in entities) {
                var tempEntity = entities[tempEntityId];
                if (tempEntity === entity) {
                    continue;
                }
                if (!tempEntity.components.collision ||
                    !tempEntity.components.physics ||
                    !tempEntity.components.position) {
                    continue;
                }
                // Run the collision event on the entity component.
                if (this.detectCollision(entity, tempEntity)) {
                    entity.components.collision.onCollision(entity, tempEntity);
                }
            }
        }
    };
    CollisionSystem.prototype.detectCollision = function (object1, object2) {
        return object1.components.position.x < object2.components.position.x + object2.components.physics.width
            && object1.components.position.x + object1.components.physics.width > object2.components.position.x
            && object1.components.position.y < object2.components.position.y + object2.components.physics.height
            && object1.components.position.y + object1.components.physics.height > object2.components.position.y;
    };
    return CollisionSystem;
}());
exports.default = CollisionSystem;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputSystem = (function () {
    function InputSystem(keyHandler) {
        this.keyHandler = keyHandler;
        this.keyHandler = keyHandler;
    }
    InputSystem.prototype.update = function (entities, delta, info) {
        for (var entityId in entities) {
            var entity = entities[entityId];
            if (!entity.components.control ||
                !entity.components.velocity) {
                continue;
            }
            if (this.keyHandler.isPressed(entity.components.control.down)) {
                entity.components.velocity.y = 0.3;
            }
            else if (this.keyHandler.isPressed(entity.components.control.up)) {
                entity.components.velocity.y = -0.3;
            }
            else {
                entity.components.velocity.y = 0;
            }
        }
    };
    return InputSystem;
}());
exports.default = InputSystem;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovementSystem = (function () {
    function MovementSystem() {
    }
    MovementSystem.prototype.update = function (entities, delta, info) {
        for (var entityId in entities) {
            var entity = entities[entityId];
            if (!entity.components.position ||
                !entity.components.velocity) {
                continue;
            }
            var velocityX = entity.components.velocity.x;
            var velocityY = entity.components.velocity.y;
            entity.components.position.x += velocityX * delta;
            entity.components.position.y += velocityY * delta;
        }
    };
    return MovementSystem;
}());
exports.default = MovementSystem;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderSystem = (function () {
    function RenderSystem(backgroundCanvas, canvas) {
        this.backgroundCanvas = backgroundCanvas;
        this.canvas = canvas;
        this.backgroundCanvas = backgroundCanvas;
        this.canvas = canvas;
    }
    RenderSystem.prototype.update = function (entities, delta, info) {
        var scale = this.canvas.getWidth() / info.width;
        this.canvas.reset();
        for (var entityId in entities) {
            var entity = entities[entityId];
            if (entity.components.appearance &&
                entity.components.physics &&
                entity.components.position) {
                this.renderBox(entity, scale);
            }
            else if (entity.components.appearance &&
                entity.components.position &&
                entity.components.text) {
                this.renderText(entity, scale);
            }
        }
    };
    RenderSystem.prototype.renderBox = function (entity, scale) {
        var positionX = Math.round(entity.components.position.x * scale);
        var positionY = Math.round(entity.components.position.y * scale);
        var height = Math.round(entity.components.physics.height * scale);
        var width = Math.round(entity.components.physics.width * scale);
        this.canvas.getContext().fillStyle = entity.components.appearance.color;
        this.canvas.getContext().fillRect(positionX, positionY, width, height);
    };
    RenderSystem.prototype.renderText = function (entity, scale) {
        var positionX = Math.round(entity.components.position.x * scale);
        var positionY = Math.round(entity.components.position.y * scale);
        var font = entity.components.text.font;
        var fontSize = Math.round(entity.components.text.size * scale);
        var text = entity.components.text.text;
        var textAlign = entity.components.text.textAlign;
        var contextFont = fontSize + "px \"" + font + "\"";
        var context = this.canvas.getContext();
        context.fillStyle = entity.components.appearance.color;
        ;
        context.font = contextFont;
        context.textAlign = textAlign;
        context.fillText(text, positionX, positionY);
    };
    return RenderSystem;
}());
exports.default = RenderSystem;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = (function () {
    function default_1() {
        this.entities = {};
        this.systems = new Array();
    }
    default_1.prototype.addEntity = function (entity) {
        this.entities[entity.id] = entity;
    };
    default_1.prototype.addSystem = function (system) {
        this.systems.push(system);
    };
    default_1.prototype.process = function (delta, options) {
        for (var i = 0; i < this.systems.length; i++) {
            var system = this.systems[i];
            system.update(this.entities, delta, options);
        }
    };
    return default_1;
}());
exports.default = default_1;

},{}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var BackgroundCanvas = (function (_super) {
    __extends(BackgroundCanvas, _super);
    function BackgroundCanvas(canvas, backgroundColor) {
        var _this = _super.call(this, canvas) || this;
        // We need to call resize again since we can't set the correct
        // background color until after we've called super.
        _this.backgroundColor = backgroundColor;
        _this.resize();
        return _this;
    }
    BackgroundCanvas.prototype.reset = function () {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
        this.getContext().fillStyle = this.backgroundColor;
        this.getContext().fillRect(0, 0, this.getWidth(), this.getHeight());
    };
    BackgroundCanvas.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.reset();
    };
    return BackgroundCanvas;
}(canvas_1.default));
exports.default = BackgroundCanvas;
;

},{"./canvas":18}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = (function () {
    function Canvas(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }
    Canvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.getHeight = function () {
        return this.canvas.height;
    };
    Canvas.prototype.getWidth = function () {
        return this.canvas.width;
    };
    Canvas.prototype.reset = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.resize = function () {
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
    };
    return Canvas;
}());
exports.default = Canvas;
;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../../ecs/entity");
var appearance_1 = require("../../ecs/components/appearance");
var collision_1 = require("../../ecs/components/collision");
var physics_1 = require("../../ecs/components/physics");
var position_1 = require("../../ecs/components/position");
var velocity_1 = require("../../ecs/components/velocity");
var BallFactory = (function () {
    function BallFactory() {
    }
    BallFactory.create = function (id, size, positionX, positionY) {
        var ball = new entity_1.default(id);
        var physics = new physics_1.default(size, size);
        physics.bounces = true;
        var velocity = new velocity_1.default();
        BallFactory.setRandomVelocity(velocity);
        ball.addComponent(new appearance_1.default());
        ball.addComponent(new collision_1.default());
        ball.addComponent(physics);
        ball.addComponent(new position_1.default(positionX, positionY));
        ball.addComponent(velocity);
        ball.components.collision.onCollision = function (entity1, entity2) {
            if (entity2.components.control) {
                entity1.components.velocity.x = -entity1.components.velocity.x;
            }
            if (entity2.components.goal) {
                entity1.components.position.x = positionX;
                entity1.components.position.y = positionY;
                BallFactory.setRandomVelocity(entity1.components.velocity);
                entity2.components.goal.scoreDisplay.components.text.text = parseInt(entity2.components.goal.scoreDisplay.components.text.text, 10) + 1;
            }
        };
        return ball;
    };
    BallFactory.setRandomVelocity = function (velocity) {
        var velocityY = Math.random() * (0.25 - -0.25) + -0.25;
        var velocityX = 0.4 - Math.abs(velocityY);
        velocity.y = velocityY;
        // Set the velocity depending to the reverse of the last direction.
        if (velocity.x >= 0) {
            velocity.x = -velocityX;
        }
        else {
            velocity.x = velocityX;
        }
    };
    return BallFactory;
}());
exports.default = BallFactory;

},{"../../ecs/components/appearance":3,"../../ecs/components/collision":4,"../../ecs/components/physics":7,"../../ecs/components/position":8,"../../ecs/components/velocity":10,"../../ecs/entity":11}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../../ecs/entity");
var collision_1 = require("../../ecs/components/collision");
var goal_1 = require("../../ecs/components/goal");
var physics_1 = require("../../ecs/components/physics");
var position_1 = require("../../ecs/components/position");
var GoalFactory = (function () {
    function GoalFactory() {
    }
    GoalFactory.create = function (id, height, width, positionX, positionY, scoreDisplay) {
        var line = new entity_1.default(id);
        line.addComponent(new collision_1.default());
        line.addComponent(new goal_1.default(scoreDisplay));
        line.addComponent(new physics_1.default(height, width));
        line.addComponent(new position_1.default(positionX, positionY));
        return line;
    };
    return GoalFactory;
}());
exports.default = GoalFactory;

},{"../../ecs/components/collision":4,"../../ecs/components/goal":6,"../../ecs/components/physics":7,"../../ecs/components/position":8,"../../ecs/entity":11}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../../ecs/entity");
var appearance_1 = require("../../ecs/components/appearance");
var physics_1 = require("../../ecs/components/physics");
var position_1 = require("../../ecs/components/position");
var LineFactory = (function () {
    function LineFactory() {
    }
    LineFactory.create = function (id, height, width, positionX, positionY) {
        var line = new entity_1.default(id);
        line.addComponent(new appearance_1.default());
        line.addComponent(new physics_1.default(height, width));
        line.addComponent(new position_1.default(positionX, positionY));
        return line;
    };
    return LineFactory;
}());
exports.default = LineFactory;

},{"../../ecs/components/appearance":3,"../../ecs/components/physics":7,"../../ecs/components/position":8,"../../ecs/entity":11}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../../ecs/entity");
var appearance_1 = require("../../ecs/components/appearance");
var collision_1 = require("../../ecs/components/collision");
var control_1 = require("../../ecs/components/control");
var physics_1 = require("../../ecs/components/physics");
var position_1 = require("../../ecs/components/position");
var velocity_1 = require("../../ecs/components/velocity");
var PaddleFactory = (function () {
    function PaddleFactory() {
    }
    PaddleFactory.create = function (id, height, width, positionX, positionY, down, up) {
        var paddle = new entity_1.default(id);
        paddle.addComponent(new appearance_1.default());
        paddle.addComponent(new collision_1.default());
        var control = new control_1.default();
        control.down = down;
        control.up = up;
        paddle.addComponent(control);
        paddle.addComponent(new physics_1.default(height, width));
        paddle.addComponent(new position_1.default(positionX, positionY));
        paddle.addComponent(new velocity_1.default());
        return paddle;
    };
    return PaddleFactory;
}());
exports.default = PaddleFactory;

},{"../../ecs/components/appearance":3,"../../ecs/components/collision":4,"../../ecs/components/control":5,"../../ecs/components/physics":7,"../../ecs/components/position":8,"../../ecs/components/velocity":10,"../../ecs/entity":11}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("../../ecs/entity");
var appearance_1 = require("../../ecs/components/appearance");
var position_1 = require("../../ecs/components/position");
var text_1 = require("../../ecs/components/text");
var ScoreFactory = (function () {
    function ScoreFactory() {
    }
    ScoreFactory.create = function (id, positionX, positionY, text) {
        var score = new entity_1.default(id);
        score.addComponent(new appearance_1.default());
        score.addComponent(new position_1.default(positionX, positionY));
        score.addComponent(new text_1.default(text));
        return score;
    };
    return ScoreFactory;
}());
exports.default = ScoreFactory;

},{"../../ecs/components/appearance":3,"../../ecs/components/position":8,"../../ecs/components/text":9,"../../ecs/entity":11}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var background_canvas_1 = require("./background-canvas");
var canvas_1 = require("./canvas");
var world_1 = require("../ecs/world");
var key_handler_1 = require("../input/key-handler");
var ball_1 = require("./entity-factories/ball");
var goal_1 = require("./entity-factories/goal");
var line_1 = require("./entity-factories/line");
var paddle_1 = require("./entity-factories/paddle");
var score_1 = require("./entity-factories/score");
var collision_1 = require("../ecs/systems/collision");
var input_1 = require("../ecs/systems/input");
var movement_1 = require("../ecs/systems/movement");
var render_1 = require("../ecs/systems/render");
var Game = (function () {
    function Game(backgroundCanvas, canvas) {
        this.startTime = null;
        this.height = 300;
        this.width = 600;
        this.backgroundCanvas = new background_canvas_1.default(backgroundCanvas, "rgb(53, 53, 53)");
        this.canvas = new canvas_1.default(canvas);
        this.world = new world_1.default();
    }
    Game.prototype.start = function () {
        this.initEntities();
        this.world.addSystem(new input_1.default(new key_handler_1.default()));
        this.world.addSystem(new movement_1.default());
        this.world.addSystem(new collision_1.default());
        this.world.addSystem(new render_1.default(this.backgroundCanvas, this.canvas));
        window.requestAnimationFrame(this.tick.bind(this));
    };
    Game.prototype.tick = function (time) {
        if (!this.startTime) {
            this.startTime = time;
        }
        // Calculate the delta time and process the world.
        this.world.process(time - this.startTime, {
            height: this.height,
            width: this.width
        });
        // Update the start time.
        this.startTime = time;
        window.requestAnimationFrame(this.tick.bind(this));
    };
    Game.prototype.initEntities = function () {
        var count = 0;
        // Add the line in the middle.
        var lineWidth = 4;
        var line = line_1.default.create(count++, this.height, lineWidth, this.width / 2 - lineWidth / 2, 0);
        // Add the ball.
        var ballSize = 6;
        var ball = ball_1.default.create(count++, ballSize, this.width / 2 - ballSize / 2, this.height / 2 - ballSize / 2);
        var playerHeight = 40;
        var playerWidth = 6;
        var playerOne = paddle_1.default.create(count++, playerHeight, playerWidth, playerWidth / 2, this.height / 2 - playerHeight / 2, 83 /* KEY_S */, 87 /* KEY_W */);
        var playerTwo = paddle_1.default.create(count++, playerHeight, playerWidth, this.width - playerWidth - playerWidth / 2, this.height / 2 - playerHeight / 2, 40 /* DOWN_ARROW */, 38 /* UP_ARROW */);
        var playerOneScore = score_1.default.create(count++, this.width / 4, 20, '0');
        var playerTwoScore = score_1.default.create(count++, this.width / 4 * 3, 20, '0');
        var goalWidth = 50;
        var goalOne = goal_1.default.create(count++, this.height, goalWidth, -goalWidth, 0, playerOneScore);
        var goalTwo = goal_1.default.create(count++, this.height, goalWidth, this.width, 0, playerTwoScore);
        this.world.addEntity(line);
        this.world.addEntity(ball);
        this.world.addEntity(playerOne);
        this.world.addEntity(playerTwo);
        this.world.addEntity(playerOneScore);
        this.world.addEntity(playerTwoScore);
        this.world.addEntity(goalOne);
        this.world.addEntity(goalTwo);
    };
    return Game;
}());
exports.default = Game;

},{"../ecs/systems/collision":12,"../ecs/systems/input":13,"../ecs/systems/movement":14,"../ecs/systems/render":15,"../ecs/world":16,"../input/key-handler":25,"./background-canvas":17,"./canvas":18,"./entity-factories/ball":19,"./entity-factories/goal":20,"./entity-factories/line":21,"./entity-factories/paddle":22,"./entity-factories/score":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyHandler = (function () {
    function KeyHandler() {
        this.pressedKeys = new Array();
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }
    KeyHandler.prototype.isPressed = function (key) {
        return this.pressedKeys[key] ? true : false;
    };
    KeyHandler.prototype.keyDown = function (e) {
        this.pressedKeys[e.keyCode] = true;
    };
    KeyHandler.prototype.keyUp = function (e) {
        this.pressedKeys[e.keyCode] = false;
    };
    return KeyHandler;
}());
exports.default = KeyHandler;

},{}]},{},[1]);
