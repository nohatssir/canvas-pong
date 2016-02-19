import { IComponent } from './component';

export default class TextComponent implements IComponent {
    public name: string = 'text';
    public font: string = 'Digital Numbers';
    public size: number = 12;
    public textAlign: string = 'center';

    constructor(public text: string) {
        this.text = text;
    }
}
