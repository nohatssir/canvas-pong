import { IComponent } from './component';
import Key from '../../input/key';

export default class ControlComponent implements IComponent {
    public name: string = 'control';
    public down: Key;
    public up: Key;
}
