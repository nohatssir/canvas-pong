import { default as Entity, IEntity } from '../../ecs/entity';

import CollisionComponent from '../../ecs/components/collision';
import GoalComponent from '../../ecs/components/goal';
import PhysicsComponent from '../../ecs/components/physics';
import PositionComponent from '../../ecs/components/position';

export default class GoalFactory {
    static create(id: number, height: number, width: number, positionX: number, positionY: number, scoreDisplay: Entity) {
        let line = new Entity(id);

        line.addComponent(new CollisionComponent());
        line.addComponent(new GoalComponent(scoreDisplay));
        line.addComponent(new PhysicsComponent(height, width));
        line.addComponent(new PositionComponent(positionX, positionY));

        return line;
    }
}
