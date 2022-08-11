import Handbook from "../handbook/handbook.class.js";

export default class Department extends Handbook{

    constructor(){
        super();
        self.Department = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "department",
            GEOtitle: "განყოფილებები"
        });

    }
    
}