import { ui } from 'ui/layaMaxUI';
const SkillMap = {
    '1': 'freeze',
    '2': 'bomb',
    '3': 'aim',
    '4': 'auto',
};
export default class SkillItemView extends ui.scenes.game.skillItemUI {
    private cool_mask: Laya.Sprite;
    constructor() {
        super();
        this.init();
    }
    private init() {
        const { overlay } = this;
        const cool_mask = new Laya.Sprite();
        overlay.mask = cool_mask;
        this.cool_mask = cool_mask;
    }
    public setId(skill_id: string) {
        const { skill_icon } = this;
        const name = SkillMap[skill_id];
        skill_icon.skin = `image/game/skill_${name}.png`;
    }
    public setNum(num: number) {
        const { num_label } = this;
        num_label.text = num + '';
    }
    /** 显示技能的冷却时间 */
    public showCoolTime(radio: number) {
        const { cool_mask } = this;
        const graphics = cool_mask.graphics;
        const radius = 60;

        const angle = radio * 360 - 90;
        graphics.clear();
        if (radio === 1) {
            graphics.drawCircle(40, 41, radius, '#fff');
        } else {
            graphics.drawPie(40, 41, radius, -90, angle, '#fff', '#fff', 0);
        }
    }
}
