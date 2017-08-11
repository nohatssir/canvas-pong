import Canvas from './canvas';

export default class BackgroundCanvas extends Canvas {
    private backgroundColor: string;

    constructor(canvas: HTMLCanvasElement, backgroundColor: string) {
        super(canvas);

        // We need to call resize again since we can't set the correct
        // background color until after we've called super.
        this.backgroundColor = backgroundColor;
        this.resize();
    }

    reset(): void {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
        this.getContext().fillStyle = this.backgroundColor;
        this.getContext().fillRect(0, 0, this.getWidth(), this.getHeight());
    }

    resize(): void {
        super.resize();
        this.reset();
    }
};
