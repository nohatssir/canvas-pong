import Entity from '../../ecs/entity';
import Key from '../../input/key';

import AppearanceComponent from '../../ecs/components/appearance';
import CollisionComponent from '../../ecs/components/collision';
import ControlComponent from '../../ecs/components/control';
import PhysicsComponent from '../../ecs/components/physics';
import PositionComponent from '../../ecs/components/position';
import VelocityComponent from '../../ecs/components/velocity';

export default class PaddleFactory {
    static create(id: number, height:number, width: number, positionX: number, positionY: number, down: Key, up: Key) {
        let paddle = new Entity(id);

        paddle.addComponent(new AppearanceComponent());
        paddle.addComponent(new CollisionComponent());

        let control = new ControlComponent();

        control.down = down;
        control.up = up;

        paddle.addComponent(control);
        paddle.addComponent(new PhysicsComponent(height, width));
        paddle.addComponent(new PositionComponent(positionX, positionY));
        paddle.addComponent(new VelocityComponent());

        return paddle;
    }
}
