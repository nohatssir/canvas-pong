import { IComponent } from './component';
import { IEntity } from '../entity';

export default class GoalComponent implements IComponent {
    public name: string = 'goal';

    constructor(public scoreDisplay: IEntity) {
        this.scoreDisplay = scoreDisplay;
    }
}
