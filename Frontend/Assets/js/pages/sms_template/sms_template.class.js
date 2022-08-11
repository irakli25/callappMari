import Handbook from "../handbook/handbook.class.js";

export default class Sms_template extends Handbook{

    constructor(){
        super();
        self.Sms_template = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "sms_template",
            GEOtitle: "სმს შაბლონი",
            table: {
                columns: [                
                    {
                        field: "ID",
                        hidden: true,
                        dbName: 'id',
                        showInDialog: false
                    },
                    {
                        field: "დასახელება",
                        dbName: "name"
                    },
                    {
                        field: "ტექსტი",
                        dbName: "text"
                    },
                ],
                checkbox: true
            }
        });

    }
    
}