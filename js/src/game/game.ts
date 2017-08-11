import BackgroundCanvas from './background-canvas';
import Canvas from './canvas';
import Entity from '../ecs/entity';
import World from '../ecs/world';

import Key from '../input/key';
import KeyHandler from '../input/key-handler';

import BallFactory from './entity-factories/ball';
import GoalFactory from './entity-factories/goal';
import LineFactory from './entity-factories/line';
import PaddleFactory from './entity-factories/paddle';
import ScoreFactory from './entity-factories/score';

import CollisionSystem from '../ecs/systems/collision';
import InputSystem from '../ecs/systems/input';
import MovementSystem from '../ecs/systems/movement';
import RenderSystem from '../ecs/systems/render';

export default class Game {
    private backgroundCanvas: Canvas;
    private canvas: Canvas;
    private world: World;

    private startTime: number = null;
    private height: number = 300;
    private width: number = 600;

    constructor(backgroundCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) {
        this.backgroundCanvas = new BackgroundCanvas(backgroundCanvas, "rgb(53, 53, 53)");
        this.canvas = new Canvas(canvas);
        this.world = new World();
    }

    start(): void {
        this.initEntities();

        this.world.addSystem(new InputSystem(new KeyHandler()));
        this.world.addSystem(new MovementSystem());
        this.world.addSystem(new CollisionSystem());
        this.world.addSystem(new RenderSystem(this.backgroundCanvas, this.canvas));

        window.requestAnimationFrame(this.tick.bind(this));
    }

    private tick(time: any): void {
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
    }

    private initEntities() {
        let count: number = 0;

        // Add the line in the middle.
        let lineWidth = 4;
        let line = LineFactory.create(
            count++,
            this.height,
            lineWidth,
            this.width / 2 - lineWidth / 2,
            0
        );

        // Add the ball.
        let ballSize = 6;
        let ball = BallFactory.create(
            count++,
            ballSize,
            this.width / 2 - ballSize / 2,
            this.height / 2 - ballSize / 2
        );

        let playerHeight = 40;
        let playerWidth = 6;

        let playerOne = PaddleFactory.create(
            count++,
            playerHeight,
            playerWidth,
            playerWidth / 2,
            this.height / 2 - playerHeight / 2,
            Key.KEY_S,
            Key.KEY_W
        );

        let playerTwo = PaddleFactory.create(
            count++,
            playerHeight,
            playerWidth,
            this.width - playerWidth - playerWidth / 2,
            this.height / 2 - playerHeight / 2,
            Key.DOWN_ARROW,
            Key.UP_ARROW
        );

        let playerOneScore = ScoreFactory.create(count++, this.width / 4, 20, '0');
        let playerTwoScore = ScoreFactory.create(count++, this.width / 4 * 3, 20, '0');

        let goalWidth = 50;
        let goalOne = GoalFactory.create(
            count++,
            this.height,
            goalWidth,
            -goalWidth,
            0,
            playerOneScore
        );

        let goalTwo = GoalFactory.create(
            count++,
            this.height,
            goalWidth,
            this.width,
            0,
            playerTwoScore
        );

        this.world.addEntity(line);
        this.world.addEntity(ball);
        this.world.addEntity(playerOne);
        this.world.addEntity(playerTwo);
        this.world.addEntity(playerOneScore);
        this.world.addEntity(playerTwoScore);
        this.world.addEntity(goalOne);
        this.world.addEntity(goalTwo);
    }
}
