import SkillItemView from 'view/scenes/game/skillItemView';
import { SkillModel } from 'model/skill/skillModel';
import { SkillEvent } from 'model/skill/skillCoreCom';

export class SkillCtrl {
    /**
     * @param view 对应的动画
     * @param model 对应的model
     */
    constructor(private view: SkillItemView, private model: SkillModel) {
        this.initEvent();
        this.setInfo();
    }
    private initEvent() {
        const { view, model } = this;
        const { event } = model.skill_core;
        event.on(SkillEvent.UpdateInfo, () => {
            this.setInfo();
        });
        event.on(SkillEvent.UpdateRadio, (radio: number) => {
            view.showCoolTime(radio);
        });
        view.on(Laya.Event.CLICK, view, (e: Laya.Event) => {
            e.stopPropagation();
            console.log('active skill', model.skill_core.item_id);
        });
    }
    private setInfo() {
        const { view, model } = this;
        const { num, item_id } = model.skill_core;
        view.setId(item_id);
        view.setNum(num);
    }
}
