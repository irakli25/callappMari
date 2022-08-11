import Handbook from "../handbook/handbook.class.js";

export default class USSD_status extends Handbook{

    constructor(){
        super();
        self.USSD_status = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "ussd_status",
            GEOtitle: "პრიორიტეტები"
        });

    }

}