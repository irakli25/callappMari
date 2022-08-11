import Handbook from "../handbook/handbook.class.js";

export default class Action_worker extends Handbook{

    constructor(){
        super();
        self.Action_worker = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "action_worker",
            GEOtitle: "სამუშაოს შემსრულებელი"
        });

    }
    
}