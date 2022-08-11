import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Queue_report extends Tdg {

    constructor() {
        super();
        self.Transfer = this;

        this.state = {
            sectionName: document.querySelector("section[Queue_report]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "queueReport-div"
        })

        this.append(this.state.sectionName, this.queueReport());
        this.append(this.state.queueReport, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.Filter());
        this.append(this.state.queueReport, this.createTable());
        kendoResponsive();
    }

    queueReport = () => {
        this.state.queueReport = this.CreateElement({
            element: "queueReport"
        })

        return this.state.queueReport
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
                    field: "რიგი",
                    size: 100,
                },
                {
                    field: "სულ",
                    size: 100,
                },
                {
                    field: "ნაპასუხები",
                    size: 100,
                },
                {
                    field: "უპასუხო",
                    size: 100,
                },
                {
                    field: "ნაპასუხები `%`",
                    size: 100,
                },
                {
                    field: "უპასუხო `%`",
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