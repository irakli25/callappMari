import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import Uploader from "../../../components/uploader/uploader.class.js";

export default class TabFile extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabFile = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        this.checkfordata();
    }
    checkfordata() {
        if (self.UssdModal.fromtask) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }

        if (self.UssdModal.crm) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.Crm.state.globalPhoneNumber;
        }
    }



    init = () => {

        self.Ussd.TabFile = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ფაილები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Ussd.TabFile;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildAddButton());

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
                gap: '20px'
            }
        })

        return this.state.div;
    }

    buildAddButton = () => {
        this.state.element.button = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                let param = {
                    table: this.state.table,
                    inc_id: this.state.prop.id,
                    req: "incoming"
                }

                new Uploader(param).init();
            },
            access: "view"
        })

        return this.state.element.button
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
                    field: "დასახელება"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getFile",
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

        if (!self.Ussd.TabFile) return false;
        self.Ussd.TabFile.remove();

    }

}