import Handbook from "../handbook/handbook.class.js";

export default class Priority extends Handbook{

    constructor(){
        super();
        self.Priority = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "priority",
            GEOtitle: "პრიორიტეტები"
        });

    }

}