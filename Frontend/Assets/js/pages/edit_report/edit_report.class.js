import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Edit_report extends Tdg {

    constructor() {
        super();
        self.Edit_report = this;

        this.state = {
            sectionName: document.querySelector("section[Edit_report]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }
    
    init = () => {
        this.state.fieldSet = this.CreateElement({
            element: "div",
        });

        this.append(this.state.sectionName, this.state.fieldSet);

        this.append(this.state.fieldSet, this.buildTaskTabs());


        this.state.tabManager = this.CreateElement ({
            element: "div",
            class: "tabManagerDiv"
        })

        this.append(this.state.fieldSet, this.buildDiv());
        
        this.state.element.taskTabs.childNodes.forEach(tab => {
            if (tab.getAttribute("tab-id") == 1) {
                tab.click();
            }
        })
        

        kendoResponsive();
    }


    getTabs = () => {
        let tabData =   [
            {
                name:"ბიზნეს ცენტრი",
                content_id: "businessCenter",
                id: 1 
            },
            {
                name: "თანამშრომლები",
                content_id: "colleagues",
                id: 2
            }
        ];

        return tabData;
    }

    buildTaskTabs = () => {
        var tmp = [];
        tmp = this.getTabs();
    
        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs",
        })

        tmp.forEach(el => {
            this.append(this.state.element.taskTabs, this.CreateElement({
                element: "tab",
                children: el.name,
                'tab-id': el.id,
                onclick: this.tabClick,
                url: el.content_id
            }))
        })

        this.getActiveTab(this.state.element.taskTabs);

        return this.state.element.taskTabs;

    }

    getActiveTab = (tabs) => {
        let activeTab =  window.location.href.split("#")[1];
        if (activeTab == '' || activeTab == undefined) {
            tabs.children[0].click();
       } else {
            tabs.childNodes.forEach(tab => {
                if (tab.getAttribute("url") == activeTab) {
                    tab.click();
                }
            })
       }
    }

    getTabContent = (key) => {
        switch (key) {
            case "businessCenter": 
                var createDiv = this.CreateElement({
                    element: "div",
                    class: "editReport-div"
                })
                this.append(this.state.reportTabContent, this.editReport());
                this.append(this.state.editReport, createDiv);
                this.append(createDiv, this.startDateTime());
                this.append(createDiv, this.buildTire());
                this.append(createDiv, this.endDateTime());
                this.append(createDiv, this.Filter());
                this.append(this.state.editReport, this.createTable());
            break;
            case "colleagues": 
                var createDiv = this.CreateElement({
                    element: "div",
                    class: "editReport-div"
                })
                this.append(this.state.reportTabContent, this.editReport());
                this.append(this.state.editReport, createDiv);
                this.append(createDiv, this.startDateTime());
                this.append(createDiv, this.buildTire());
                this.append(createDiv, this.endDateTime());
                this.append(createDiv, this.Filter());
                this.append(this.state.editReport, this.colleaguesTable());
            break;
            default: 
                var createDiv = this.CreateElement({
                    element: "div",
                    class: "editReport-div"
                })
                this.append(this.state.reportTabContent, this.editReport());
                this.append(this.state.editReport, createDiv);
                this.append(createDiv, this.startDateTime());
                this.append(createDiv, this.buildTire());
                this.append(createDiv, this.endDateTime());
                this.append(createDiv, this.Filter());
                this.append(this.state.editReport, this.createTable());
            break;
        }
    }

    tabClick = (e) => {
        this.state.reportTabContent.innerHTML = '';
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");

        var content_id = e.target.getAttribute("url");

        this.getTabContent(content_id);

    }


    buildDiv = () => {
        this.state.reportTabContent = this.CreateElement({
            element: 'reportTabContent',
        })

        return this.state.reportTabContent;
    }

    editReport = () => {
        this.state.editReport = this.CreateElement({
            element: "editReport"
        })

        return this.state.editReport
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
                    field: "ბიზნეს ცენტრი",
                    size: 100,
                },
                {
                    field: "რაოდენობა",
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

    colleaguesTable = () => {
        this.state.element.colleaguesTable = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თანამშრომელი",
                    size: 100,
                },
                {
                    field: "რაოდენობა",
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
       return this.state.element.colleaguesTable
    }
}