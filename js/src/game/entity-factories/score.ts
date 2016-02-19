import Entity from '../../ecs/entity';

import AppearanceComponent from '../../ecs/components/appearance';
import PositionComponent from '../../ecs/components/position';
import TextComponent from '../../ecs/components/text';

export default class ScoreFactory {
    static create(id: number, positionX: number, positionY: number, text: string) {
        let score = new Entity(id);

        score.addComponent(new AppearanceComponent());
        score.addComponent(new PositionComponent(positionX, positionY));
        score.addComponent(new TextComponent(text));

        return score;
    }
}
