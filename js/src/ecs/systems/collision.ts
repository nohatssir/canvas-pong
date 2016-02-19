import { ISystem } from './system';

export default class CollisionSystem implements ISystem {
    update(entities, delta, info) {
        for (let entityId in entities) {
            let entity = entities[entityId];

            if (!entity.components.collision ||
                !entity.components.physics ||
                !entity.components.position
            ) {
                continue;
            }

            let entityX = entity.components.position.x;
            let entityY = entity.components.position.y;
            let entityHeight = entity.components.physics.height;
            let entityWidth = entity.components.physics.width;

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

            for (let tempEntityId in entities) {
                let tempEntity = entities[tempEntityId];

                if (tempEntity === entity) {
                    continue;
                }

                if (!tempEntity.components.collision ||
                    !tempEntity.components.physics ||
                    !tempEntity.components.position
                ) {
                    continue;
                }

                // Run the collision event on the entity component.
                if (this.detectCollision(entity, tempEntity)) {
                    entity.components.collision.onCollision(entity, tempEntity);
                }
            }
        }
    }

    private detectCollision(object1, object2): boolean {
        return object1.components.position.x < object2.components.position.x + object2.components.physics.width
            && object1.components.position.x + object1.components.physics.width  > object2.components.position.x
            && object1.components.position.y < object2.components.position.y + object2.components.physics.height
            && object1.components.position.y + object1.components.physics.height > object2.components.position.y;
    }
}
