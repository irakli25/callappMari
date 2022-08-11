import Handbook from "../handbook/handbook.class.js";

export default class Template extends Handbook{

    constructor(){
        super();
        self.Template = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "template",
            GEOtitle: "ინფორმაციის წყარო"
        });

    }
    
}