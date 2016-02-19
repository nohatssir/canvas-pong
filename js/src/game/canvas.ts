export default class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private height: number;
    private width: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.resize();
        this.context.fillStyle = "rgb(255, 255, 255)";

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

    setBackgroundColor(color): void {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "rgb(255, 255, 255)";
    }

    defaults(): void {
        this.setBackgroundColor("rgb(53, 53, 53)");
        this.context.fillStyle = "rgb(255, 255, 255)";
    }

    reset(): void {
        // Store the current transformation matrix.
        this.context.save();

        // Use the identity matrix while clearing the canvas.
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Restore the transform.
        this.context.restore();

        // Set defaults.
        this.defaults();
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
