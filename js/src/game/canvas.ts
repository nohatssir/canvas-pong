export default class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private height: number;
    private width: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    getHeight(): number {
        return this.canvas.height;
    }

    getWidth(): number {
        return this.canvas.width;
    }

    reset(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(): void {
        let width = window.innerWidth;
        let height = window.innerHeight;

        let newWidth = width;
        let newHeight = 2 * width / 4;

        if (newHeight > height) {
            newHeight = height;
            newWidth = 4 * height / 2;
        }

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    }
};
