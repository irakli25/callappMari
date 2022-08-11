import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive,kendo__destroy } from "../../helpers/kendo.helper.js";

export default class New_ivr extends Tdg {

    constructor() {
        super();
        self.New_ivr = this;

        this.state = {
            sectionName: document.querySelector("section[New_ivr]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }

    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "ivr-div"
        })

        this.append(this.state.sectionName, this.newIvr());
        this.append(this.state.newIvr, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.Filter());
        this.append(this.state.newIvr, this.createTable());
        kendoResponsive();
    }

    newIvr = () => {
        this.state.newIvr = this.CreateElement({
            element: "newIvr"
        })

        return this.state.newIvr
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
            	
                kendo__destroy(this.state.element.table);
                
                
                this.state.element.table.closest(".k-grid").remove()
                this.state.element.table.remove();
                
                this.append(this.state.newIvr, this.createTable());
//                this.append(this.state.newIvr, this.createTable());

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
                    field: "ნომერი",
                    size: 100,
                },
                {
                    field: "ღილაკი",
                    size: 100,
                },
                {
                    field: "ღილაკი 1",
                    size: 100,
                }
            ],
            data: {
                route: "New_ivr",
                act: "getList",
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