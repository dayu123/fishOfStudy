import { ComponentManager } from 'comMan/component';
import { EventCom } from 'comMan/eventCom';
import { Lang } from 'data/internationalConfig';

export const InternationalEvent = {
    ChangeLang: 'change_lang',
};
/** 全局国际化 */
export class International extends ComponentManager {
    public lang: Lang;
    constructor() {
        super();

        this.addCom(new EventCom());
    }
    public get event() {
        return this.getCom(EventCom);
    }
    public setLang(lang: Lang) {
        if (lang === this.lang) {
            return;
        }
        this.lang = lang;
        this.event.emit(InternationalEvent.ChangeLang, lang);
    }
}
