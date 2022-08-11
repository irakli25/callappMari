import Handbook from "../handbook/handbook.class.js";

export default class Call_status extends Handbook{

    constructor(){
        super();
        self.Call_status = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "call_status",
            GEOtitle: "ზარის სტატუსი"
        });

    }

}