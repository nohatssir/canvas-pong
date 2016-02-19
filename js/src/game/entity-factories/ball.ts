import { default as Entity, IEntity } from '../../ecs/entity';

import AppearanceComponent from '../../ecs/components/appearance';
import CollisionComponent from '../../ecs/components/collision';
import GoalComponent from '../../ecs/components/goal';
import PhysicsComponent from '../../ecs/components/physics';
import PositionComponent from '../../ecs/components/position';
import VelocityComponent from '../../ecs/components/velocity';

export default class BallFactory {
    static create(id: number, size: number, positionX: number, positionY: number) {
        let ball = new Entity(id);

        let physics = new PhysicsComponent(size, size);
        physics.bounces = true;

        let velocity = new VelocityComponent();
        BallFactory.setRandomVelocity(velocity);

        ball.addComponent(new AppearanceComponent());
        ball.addComponent(new CollisionComponent());
        ball.addComponent(physics);
        ball.addComponent(new PositionComponent(positionX, positionY));
        ball.addComponent(velocity);

        ball.components.collision.onCollision = function(entity1: IEntity, entity2: IEntity) {
            if (entity2.components.control) {
                entity1.components.velocity.x = -entity1.components.velocity.x;
            }

            if (entity2.components.goal) {
                entity1.components.position.x = positionX;
                entity1.components.position.y = positionY;
                BallFactory.setRandomVelocity(entity1.components.velocity);

                entity2.components.goal.scoreDisplay.components.text.text = parseInt(entity2.components.goal.scoreDisplay.components.text.text, 10) + 1;
            }
        };

        return ball;
    }

    static setRandomVelocity(velocity: VelocityComponent): void {
        let velocityY = Math.random() * (0.25 - -0.25) + -0.25;
        let velocityX = 0.4 - Math.abs(velocityY);

        velocity.y = velocityY;

        // Set the velocity depending to the reverse of the last direction.
        if (velocity.x >= 0) {
            velocity.x = -velocityX;
        } else {
            velocity.x = velocityX;
        }
    }
}
