import Handbook from "../handbook/handbook.class.js";

export default class Mail_template extends Handbook{

    constructor(){
        super();
        self.Mail_template = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "mail_template",
            GEOtitle: "Mail შაბლონი",
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