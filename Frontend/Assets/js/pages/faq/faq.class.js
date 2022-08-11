import Handbook from "../handbook/handbook.class.js";

export default class Faq extends Handbook{

    constructor(){
        super();
        self.Faq = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "faq",
            GEOtitle: "კითხვა-პასუხი",
            table: {
                columns: [                
                    {
                        field: "ID",
                        hidden: true,
                        dbName: 'id',
                        showInDialog: false
                    },
                    {
                        field: "კითხვა",
                        dbName: "question"
                    },
                    {
                        field: "პასუხი",
                        dbName: "answer"
                    },
                ],
                checkbox: true
            }

        });

    }
    
}