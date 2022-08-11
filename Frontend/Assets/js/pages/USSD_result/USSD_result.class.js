import Handbook from "../handbook/handbook.class.js";

export default class USSD_result extends Handbook{

    constructor(){
        super();
        self.USSD_result = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "ussd_result",
            GEOtitle: "პრიორიტეტები"
        });

    }

}