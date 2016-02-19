import { IComponent } from './components/component';

export interface IEntity {
    id: number
    components: any;
    addComponent(component: IComponent): void;
}

export default class Entity implements IEntity {
    public id: number;
    public components: any;

    constructor(id: number) {
        this.id = id;
        this.components = {};
    }

    addComponent(component: IComponent): void {
        this.components[component.name] = component;
    }
}
