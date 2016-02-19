import { IComponent } from './component';

export default class PhysicsComponent implements IComponent {
    public name: string = 'physics';
    public bounces: boolean = false;

    constructor(public height: number, public width: number) {
        this.height = height;
        this.width = width;
    }
}
