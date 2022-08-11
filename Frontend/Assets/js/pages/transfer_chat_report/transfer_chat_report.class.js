import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Transfer_chat_report extends Tdg {

    constructor() {
        super();
        self.Miss_call = this;

        this.state = {
            sectionName: document.querySelector("section[Transfer_chat_report]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "transferChat-div"
        })

        this.append(this.state.sectionName, this.transferChatReport());
        this.append(this.state.transferChat, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.Filter());
        this.append(this.state.transferChat, this.createTable());
        kendoResponsive();
    }

    transferChatReport = () => {
        this.state.transferChat = this.CreateElement({
            element: "transferChat"
        })

        return this.state.transferChat
    }

    startDateTime = () => {

        this.state.element.startDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startDateTime
    }

    
    buildTire = () => {
        this.state.element.tire = this.CreateElement({
            element: "span",
            children: "-",
            style: {
                fontSize: '24px'
            }
        })

        return this.state.element.tire
    }

    endDateTime = () => {

        this.state.element.endDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.endDateTime
    }

    Filter = () => {

        this.state.element.Filter = new Button({
            text: "ფილტრი",
            onclick: async () => {

            }
        })

        return this.state.element.Filter
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი",
                    size: 100,
                },
                {
                    field: "მომხმარებელი",
                    size: 100,
                },
                {
                    field: "ოპერატორი",
                    size: 100,
                },
                {
                    field: "გადამისამართდა",
                    size: 100,
                },
                {
                    field: "კატეგორია",
                    size: 100,
                },
                {
                    field: "შეფასება",
                    size: 100,
                }
            ],
            data: {
                route: "",
                act: "",
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            onload: () => {

            },
        })
       return this.state.element.table
    }


}