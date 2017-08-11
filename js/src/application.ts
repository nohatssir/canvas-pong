import Game from './game/game';

interface IApplication {
    run(): void;
}

export default class Application implements IApplication {
    private game: Game;

    constructor() {
        let backgroundCanvas = <HTMLCanvasElement>document.getElementById('game-background');
        let canvas = <HTMLCanvasElement>document.getElementById('game');

        this.game = new Game(backgroundCanvas, canvas);
    }

    run(): void {
        this.game.start();
    }
}
