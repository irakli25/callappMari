import Handbook from "../handbook/handbook.class.js";

export default class Task_type extends Handbook{

    constructor(){
        super();
        self.Task_type = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "task_type",
            GEOtitle: "დავალების ტიპები"
        });

    }

}