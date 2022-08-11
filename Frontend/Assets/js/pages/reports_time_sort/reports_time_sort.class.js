import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Reports_time_sort extends Tdg {

    constructor() {
        super();
        self.Reports_time_sort = this;

        this.state = {
            sectionName: document.querySelector("section[Reports_time_sort]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        let createDiv = this.CreateElement({
            element: "div",
            class: "timeSort-div"
        })

        this.append(this.state.sectionName, this.timeSortReport());
        this.append(this.state.timeSort, createDiv);
        this.append(createDiv, this.startDateTime());
        this.append(createDiv, this.buildTire());
        this.append(createDiv, this.endDateTime());
        this.append(createDiv, this.fromSelector());
        this.append(createDiv, this.toSelector());
        this.append(createDiv, this.createSelector());
        this.append(createDiv, this.Filter());
        this.append(this.state.timeSort, this.createTable());
        kendoResponsive();
    }

    timeSortReport = () => {
        this.state.timeSort = this.CreateElement({
            element: "timeSort"
        })

        return this.state.timeSort
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
                route: "",
                act: "",
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
                    field: "საუბრის დასაწყისი",
                    size: 100,
                },
                {
                    field: "საუბრის დასასრული",
                    size: 100,
                },
                {
                    field: "ტელეფონი",
                    size: 100,
                },
                {
                    field: "ოპერატორი",
                    size: 100,
                },
                {
                    field: "კატეგორია",
                    size: 100,
                },
                {
                    field: "ქვე-კატეგორია",
                    size: 100,
                },
                {
                    field: "ჩანაწერი",
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