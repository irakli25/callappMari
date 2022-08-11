import Handbook from "../handbook/handbook.class.js";

export default class Disconnect_reason extends Handbook{

    constructor(){
        super();
        self.Disconnect_reason = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "disconnect_reason",
            GEOtitle: "წყვეტის მიზეზი"
        });

    }
    
}