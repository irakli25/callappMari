import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive, kendo__destroy } from "../../helpers/kendo.helper.js";

export default class Operator_call_chat_out extends Tdg {

    constructor() {
        super();
        self.Operator_call_chat_out = this;

        this.state = {
            sectionName: document.querySelector("section[Operator_call_chat_out]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "operatorCall-div"
        })

        this.append(this.state.sectionName, this.operatorCallReport());
        this.append(this.state.operatorCallReport, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        // this.append(createDiv, this.fromSelector());
        // this.append(createDiv, this.toSelector());
        // this.append(createDiv, this.createSelector());
        // დროის ფილტრის გვერდითა სამი სელექტორია დაკომენტარებული
        this.append(createDiv, this.Filter());
        this.append(this.state.sectionName, this.createDivForTable());
        this.append(this.state.createDivForTable, this.createTable());
        kendoResponsive();
    }

    operatorCallReport = () => {
        this.state.operatorCallReport = this.CreateElement({
            element: "operatorCallReport",
            style: {
                marginBottom: '10px'
            }
        })

        return this.state.operatorCallReport
    }

    createDivForTable = () => {
        this.state.createDivForTable = this.CreateElement({
            element: "createDivForTable"
        })

        return this.state.createDivForTable
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

    fromSelector = () => {
        this.state.element.fromSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "წმ. დან",
            data: {
                route: "operator_call_chat_out",
                act: "getList",
            }
        })
        return this.state.element.fromSelector
    }

    toSelector = () => {
        this.state.element.toSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "წმ. მდე",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.toSelector
    }

    createSelector = () => {
        this.state.element.toSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "განყოფილება",
            data: {
                route: "",
                act: "",
            }
        })
        return this.state.element.toSelector
    }

    Filter = () => {

        this.state.element.Filter = new Button({
            text: "ფილტრი",
            onclick: () => {
                kendo__destroy(this.state.element.table);
                this.state.createDivForTable.remove();
                this.append(this.state.sectionName, this.createDivForTable());
                this.append(this.state.createDivForTable, this.createTable());
                kendoResponsive();

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
                    field: "id",
                    hidden: true
                },
                {
                    field: "ოპერატორი",
                    size: 100,
                },
                {
                    field: "ყველა მომართვა",
                    size: 100,
                },
                {
                    field: "ნაპასუხები ზარი",
                    size: 100,
                },
                {
                    field: "ვიზიტი ადგილზე",
                    size: 100,
                },
                {
                    field: "ნაპასუხები ჩატი",
                    size: 100,
                },
                {
                    field: "ფეისბუქ ჩატი",
                    size: 100,
                },
                {
                    field: "მეილი",
                    size: 100,
                }
            ],
            data: {
                route: "operator_call_chat_out",
                act: "getList",
                start_date: this.state.element.startDateTime.value,
                end_date: this.state.element.endDateTime.value
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