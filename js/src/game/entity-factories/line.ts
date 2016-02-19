import Entity from '../../ecs/entity';

import AppearanceComponent from '../../ecs/components/appearance';
import PhysicsComponent from '../../ecs/components/physics';
import PositionComponent from '../../ecs/components/position';

export default class LineFactory {
    static create(id: number, height: number, width: number, positionX: number, positionY: number) {
        let line = new Entity(id);

        line.addComponent(new AppearanceComponent());
        line.addComponent(new PhysicsComponent(height, width));
        line.addComponent(new PositionComponent(positionX, positionY));

        return line;
    }
}
