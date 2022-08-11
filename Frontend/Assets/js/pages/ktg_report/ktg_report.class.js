import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Ktg_report extends Tdg {

    constructor() {
        super();
        self.Ktg_report = this;

        this.state = {
            sectionName: document.querySelector("section[Ktg_report]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "ktg-div"
        })

        this.append(this.state.sectionName, this.ktgReport());
        this.append(this.state.ktgReport, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.typeSelector());
        this.append(createDiv, this.comparisonSelector());
        this.append(createDiv, this.secondInput());
        this.append(createDiv, this.Filter());
        this.append(this.state.ktgReport, this.createTable());
        kendoResponsive();
    }

    ktgReport = () => {
        this.state.ktgReport = this.CreateElement({
            element: "ktgReport"
        })

        return this.state.ktgReport
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

    typeSelector = () => {
        this.state.element.typeSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ტიპი",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.typeSelector
    } 

    comparisonSelector = () => {
        this.state.element.comparisonSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "შედარება",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.comparisonSelector
    }

    secondInput = () => {
        this.state.element.secondInput = new Input ({
            type: "number",
            placeholderTitle: "წამი"
        }).build()
        return this.state.element.secondInput
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
                    field: "წყარო",
                    size: 100,
                },
                {
                    field: "ადრესატი",
                    size: 100,
                },
                {
                    field: "ლოდინის დრო",
                    size: 100,
                },
                {
                    field: "სტატუსი",
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

            }
        })
       return this.state.element.table
    }

}