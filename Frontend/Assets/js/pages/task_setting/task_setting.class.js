import Handbook from "../handbook/handbook.class.js";

export default class Task_setting extends Handbook{

    constructor(){
        super();
        self.Task_setting = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "task_setting",
            GEOtitle: "დავალების პარამეტრები"
        });

    }
    
}