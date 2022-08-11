import Handbook from "../handbook/handbook.class.js";

export default class Call_type extends Handbook{

    constructor(){
        super();
        self.Call_type = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "call_type",
            GEOtitle: "ზარის ტიპები"
        });

    }

}