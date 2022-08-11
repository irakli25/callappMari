import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";

export default class TabLogs extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabLogs = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        if (self.UssdModal.fromtask) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }
    }



    init = () => {

        self.Ussd.TabLogs = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ლოგები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Ussd.TabLogs;

        this.append(this.state.interfaceName, this.state.fieldSet);


        this.append(this.state.fieldSet, this.buildTable());


    }


    buildDiv = () => {
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
                    field: "თარიღი"
                },
                {
                    field: "ქმედება"
                },
                {
                    field: "მომხმარებელი"
                },
                {
                    field: "ველის დასახელება"
                },
                {
                    field: "ახალი მინიშნება"
                },
                {
                    field: "ძველი მინიშნება"
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

        if (!self.Ussd.TabLogs) return false;
        self.Ussd.TabLogs.remove();

    }

}