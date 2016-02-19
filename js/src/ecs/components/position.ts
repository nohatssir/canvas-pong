import { IComponent } from './component';

export default class PositionComponent implements IComponent {
    public name: string = 'position';

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }
}
