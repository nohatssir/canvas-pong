import { ISystem } from './system';
import KeyHandler from '../../input/key-handler';

export default class InputSystem implements ISystem {
    constructor(private keyHandler: KeyHandler) {
        this.keyHandler = keyHandler;
    }

    update(entities, delta, info): void {
        for (let entityId in entities) {
            let entity = entities[entityId];

            if (!entity.components.control ||
                !entity.components.velocity
            ) {
                continue;
            }

            if (this.keyHandler.isPressed(entity.components.control.down)) {
                    entity.components.velocity.y = 0.3;
            } else if (this.keyHandler.isPressed(entity.components.control.up)) {
                    entity.components.velocity.y = -0.3;
            } else {
                entity.components.velocity.y = 0;
            }
        }
    }
}
