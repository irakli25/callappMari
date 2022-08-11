import Handbook from "../handbook/handbook.class.js";

export default class Statement_status extends Handbook{

    constructor(){
        super();
        self.Statement_status = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "statement_status",
            GEOtitle: "განცხადების სტატუსები",
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
                        field: "შესრულების დრო",
                        dbName: "time"
                    },
                ],
                checkbox: true
            }
        });

    }
    
}