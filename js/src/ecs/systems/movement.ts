import { ISystem } from './system';

export default class MovementSystem implements ISystem {
    update(entities, delta, info): void {

        for (let entityId in entities) {
            let entity = entities[entityId];

            if (!entity.components.position ||
                !entity.components.velocity
            ) {
                continue;
            }

            let velocityX = entity.components.velocity.x;
            let velocityY = entity.components.velocity.y;

            entity.components.position.x += velocityX * delta;
            entity.components.position.y += velocityY * delta;
        }
    }
}
