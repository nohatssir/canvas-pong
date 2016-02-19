import { IComponent } from './component';
import { IEntity } from '../entity';

export default class CollisionComponent implements IComponent {
    public name: string = 'collision';
    onCollision(entity1: IEntity, entity2: IEntity): void {};
}
