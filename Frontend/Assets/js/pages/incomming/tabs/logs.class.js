import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__destroy, kendoResponsive } from "../../../helpers/kendo.helper.js";

export default class TabLogs extends Tdg{

    constructor(){
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.TabLogs = this;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        if(self.IncommingModal.fromtask){
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }
    }



    init = () => {

        self.Incomming.TabLogs = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ლოგები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Incomming.TabLogs;

        this.append(this.state.interfaceName,this.state.fieldSet);


        this.append(this.state.fieldSet, this.buildTable());
        kendoResponsive();
 
    }


    buildDiv = () =>{
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '73%',
                flexWrap: 'wrap',
                gap: '30px'
            }
        })

        return this.state.div;
    }

    buildTable = () => {

        this.state.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "თარიღი",
                    size: 120
                },
                {
                    field: "ქმედება",
                    size: 120
                },
                {
                    field: "მომხმარებელი",
                    size: 140
                },
                {
                    field: "ველის დასახელება",
                    size: 170
                },
                {
                    field: "ახალი მინიშნება",
                    size: 170
                },
                {
                    field: "ძველი მინიშნება",
                    size: 170
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getLogs",
                id: this.state.prop.id
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            ondblclick: (callback) => {

                // this.buildModal(null, {
                //     width: '100vw',
                //     height: '100vh',
                //     content: this.getModalContent(callback),
                //     buttons: {
                //         save: {
                //             name: "შენახვა",
                //             onclick: (modal) => {

                //             }
                //         }
                //     },
                //     confirmOnCancel: true   
                // })

            }
        })

        return this.state.table;

    }


    getModalContent = (callback) => {

        console.log(callback)

    }


    destroy = () => {

        if(!self.Incomming.TabLogs) return false;
        self.Incomming.TabLogs.remove();

    }

}