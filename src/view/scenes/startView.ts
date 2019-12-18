import { ui } from '../../ui/layaMaxUI';
import honor from 'honor';

export default class Start extends ui.scenes.startUI {
    public static preEnter() {
        return honor.director.runScene('scenes/start.scene', '参数1', '参数2');
    }
}
