import { ISystem } from './system';
import Canvas from '../../game/canvas';

export default class RenderSystem implements ISystem {
    constructor(public canvas: Canvas) {
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
        let positionX = entity.components.position.x * scale;
        let positionY = entity.components.position.y * scale;
        let height = entity.components.physics.height * scale;
        let width = entity.components.physics.width * scale;

        this.canvas.getContext().fillStyle = entity.components.appearance.color;
        this.canvas.getContext().fillRect(positionX, positionY, width, height);
    }

    private renderText(entity, scale: number): void {
        let positionX = entity.components.position.x * scale;
        let positionY = entity.components.position.y * scale;
        let font = entity.components.text.font;
        let size = entity.components.text.size;
        let text = entity.components.text.text;
        let textAlign = entity.components.text.textAlign;

        this.canvas.getContext().fillStyle = entity.components.appearance.color;
        this.canvas.getContext().font = (size * scale) + "pt " + font;
        this.canvas.getContext().textAlign = textAlign;
        this.canvas.getContext().fillText(text, positionX, positionY);
    }
}
