import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Thirty_sec extends Tdg {

    constructor() {
        super();
        self.Thirty_sec = this;

        this.state = {
            sectionName: document.querySelector("section[Thirty_sec]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "thirtySec-div"
        })

        this.append(this.state.sectionName, this.thirtySecReport());
        this.append(this.state.thirtySec, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.createSelector());
        this.append(createDiv, this.Filter());
        this.append(this.state.thirtySec, this.createTable());
        kendoResponsive();
    }

    thirtySecReport = () => {
        this.state.thirtySec = this.CreateElement({
            element: "thirtySec"
        })

        return this.state.thirtySec
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

    createSelector = () => {
        this.state.element.selector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "განყოფილება",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.selector
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
                    field: "წყარო",
                    size: 100,
                },
                {
                    field: "რიგი",
                    size: 100,
                },
                {
                    field: "უპასუხო",
                    size: 100,
                },
                {
                    field: "ლოდინის დრო",
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