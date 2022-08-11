import Handbook from "../handbook/handbook.class.js";

export default class Service_center extends Handbook{

    constructor(){
        super();
        self.Service_center = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "service_center",
            GEOtitle: "სამსახურები",
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
                        field: "ტიპი",
                        dbName: "type_id"
                    },
                ],
                checkbox: true
            }
        });

    }
    
}