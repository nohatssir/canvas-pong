import { IEntity } from './entity';
import { ISystem } from './systems/system';

import Canvas from '../game/canvas';
import RenderSystem from './systems/render';

export default class {
    public entities: any;
    private systems: Array<ISystem>;

    constructor() {
        this.entities = {};
        this.systems = new Array<ISystem>();
    }

    addEntity(entity: IEntity): void {
        this.entities[entity.id] = entity;
    }

    addSystem(system: ISystem): void {
        this.systems.push(system);
    }

    process(delta: number, options): void {
        for (let i = 0; i < this.systems.length; i++) {
            let system = this.systems[i];

            system.update(this.entities, delta, options);
        }
    }
}
