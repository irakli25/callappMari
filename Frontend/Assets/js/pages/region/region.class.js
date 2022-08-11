import Handbook from "../handbook/handbook.class.js";

export default class Region extends Handbook{

    constructor(){
        super();
        self.Region = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "region",
            GEOtitle: "რაიონი"
        });

    }
    
}