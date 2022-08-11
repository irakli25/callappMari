import Tdg from "../../../tdg.class.js";

export default class TabQuestion extends Tdg {

    constructor() {
        super();

        self.Outgoing.tab = [];
        self.Outgoing.tab.TabQuestion = this;

        this.state = {
            prop: self.OutgoingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }
    }



    init = () => {

        self.Outgoing.TabQuestion = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "კითხვა",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Outgoing.TabQuestion;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildTable());


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
                    field: "კითხვა"
                },
                {
                    field: "პასუხი"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getQuestion",
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

        if (!self.Outgoing.TabQuestion) return false;
        self.Outgoing.TabQuestion.remove();

    }

}