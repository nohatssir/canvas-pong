import { ISystem } from './system';
import Canvas from '../../game/canvas';

export default class RenderSystem implements ISystem {
    constructor(public backgroundCanvas: Canvas, public canvas: Canvas) {
        this.backgroundCanvas = backgroundCanvas;
        this.canvas = canvas;
    }

    update(entities, delta, info): void {
        let scale: number = this.canvas.getWidth() / info.width;

        this.canvas.reset();

        for (let entityId in entities) {
            let entity = entities[entityId];

            if (entity.components.appearance &&
                entity.components.physics &&
                entity.components.position
            ) {
                this.renderBox(entity, scale);
            } else if (entity.components.appearance &&
                       entity.components.position &&
                       entity.components.text
            ) {
                this.renderText(entity, scale);
            }
        }
    }

    private renderBox(entity, scale: number): void {
        let positionX = Math.round(entity.components.position.x * scale);
        let positionY = Math.round(entity.components.position.y * scale);
        let height = Math.round(entity.components.physics.height * scale);
        let width = Math.round(entity.components.physics.width * scale);

        this.canvas.getContext().fillStyle = entity.components.appearance.color;
        this.canvas.getContext().fillRect(positionX, positionY, width, height);
    }

    private renderText(entity, scale: number): void {
        let positionX = Math.round(entity.components.position.x * scale);
        let positionY = Math.round(entity.components.position.y * scale);

        let font = entity.components.text.font;
        let fontSize = Math.round(entity.components.text.size * scale);
        let text = entity.components.text.text;
        let textAlign = entity.components.text.textAlign;
        let contextFont = fontSize + "px \"" + font + "\"";

        let context = this.canvas.getContext();

        context.fillStyle = entity.components.appearance.color;;
        context.font = contextFont;
        context.textAlign = textAlign;

        context.fillText(text, positionX, positionY);
    }
}
