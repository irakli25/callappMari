import Handbook from "../handbook/handbook.class.js";

export default class Chat_template extends Handbook{

    constructor(){
        super();
        self.Chat_template = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "chat_template",
            GEOtitle: "ჩატის შაბლონი",
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
                        dbName: "comment"
                    },
                ],
                checkbox: true
            }
        });

    }
    
}