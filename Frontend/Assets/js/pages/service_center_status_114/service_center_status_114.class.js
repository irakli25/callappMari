import Handbook from "../handbook/handbook.class.js";

export default class service_center_status_114 extends Handbook{

    constructor(){
        super();
        self.Service_center_status_114 = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "service_center_status",
            GEOtitle: "სამსახურის სტატუსები"
        });

    }

}