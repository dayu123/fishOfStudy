import honor, { HonorDialog } from 'honor';

export default class EmptyPop extends Laya.Dialog implements HonorDialog {
    public isModal = true;
    public static preEnter() {
        honor.director.openDialog(EmptyPop);
    }
    public onMounted() {
        console.log('EmptyScene enable');
    }
}
