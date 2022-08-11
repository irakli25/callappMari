import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";
import TransferModal from "./transfer.modal.js";

export default class Transfer extends Tdg {

    constructor() {
        super();
        self.Transfer = this;

        this.state = {
            sectionName: document.querySelector("section[Transfer]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "transfer-div"
        })

        this.append(this.state.sectionName, this.transferReport());
        this.append(this.state.transferReport, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.enteredCall());
        this.append(createDiv, this.redirecting());
        this.append(createDiv, this.Filter());
        this.append(this.state.transferReport, this.createTable());
        kendoResponsive();
    }

    transferReport = () => {
        this.state.transferReport = this.CreateElement({
            element: "transferReport"
        })

        return this.state.transferReport
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

    enteredCall = () => {
        this.state.element.enteredCall = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ზარი შევიდა",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.enteredCall
    } 

    redirecting = () => {
        this.state.element.redirecting = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "გადამისამართდა",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.redirecting
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
                    field: "ტელეფონი",
                    size: 100,
                },
                {
                    field: "ზარი შევიდა",
                    size: 100,
                },
                {
                    field: "გადამისამართდა",
                    size: 100,
                },
                {
                    field: "ხანგრძლივობა",
                    size: 100,
                }
            ],
            data: {
                route: "",
                act: "",
                startDate: this.state.element.startDateTime.value,
                endDate: this.state.element.endDateTime.value,
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
            ondblclick: this.buildTransferModal
        })
       return this.state.element.table
    }


    buildTransferModal = () => {
        this.buildModal(null,  {
            width: '1080px',
            height: '500px',
            content: new TransferModal().createModalDiv(),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: function(modal){ 
                        
                    },
                    access: "save"
                }
            },
            confirmOnCancel: true,
        })
    }

}