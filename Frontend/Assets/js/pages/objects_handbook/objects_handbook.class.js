import Handbook from "../handbook/handbook.class.js";

export default class Objects_handbook extends Handbook{

    constructor(){
        super();
        self.Objects_handbook = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "objects_handbook",
            GEOtitle: "ობიექტები"
        });

    }

}