import Handbook from "../handbook/handbook.class.js";

export default class Task_zeinkals extends Handbook {

    constructor(){
        super();
        self.Task_zeinkals = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "task_zeinkals",
            GEOtitle: "ზეინკალი",
            table: {
                checkbox: true,
                columns: [                
                    {
                        field: "ID",
                        hidden: true,
                        dbName: 'task_zeinkals.id',
                        showInDialog: false
                    },
                    {
                        field: "სახელი გვარი",
                        dbName: "task_zeinkals.name"
                    },
                    {
                        field: "პირადი ნომერი",
                        dbName: "task_zeinkals.tin"
                    },
                    {
                        field: "სერვის ცენტრი",
                        dbName: "service_center.name",
                        dbCol: "service_center_id",
                        inDialog: {
                            element: "kendo",
                            type: "selector"
                        }
                    },
                    {
                        field: "ტელეფონი",
                        dbName: "task_zeinkals.phone",
                    }
                ],

                joiner: [  {join: "LEFT@service_center.id", to: "task_zeinkals.service_center_id"} ]
            },
            dialogContent: this.dialogContent() 
            
        });

    }
    
    dialogContent = ()=> {}
}
