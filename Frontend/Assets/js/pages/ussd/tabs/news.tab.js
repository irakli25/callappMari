import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";

export default class TabNews extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabNews = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }
    }



    init = async () => {

        self.Ussd.TabNews = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "აქციები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.tablediv = this.CreateElement({
            element: "div"
        })

        this.state.fieldSet = self.Ussd.TabNews;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, await this.buildTabs());
        this.append(this.state.fieldSet, this.state.tablediv);
        this.append(this.state.tablediv, this.buildTable());

        this.state.element.taskTabs.childNodes.forEach(tab => {
            if (tab.getAttribute("tab-id") == 1) {
                tab.click();
            }
        })

    }

    getTabs = async () => {
        let tabData = await self.Tdg.getResponse({
            route: "Action",
            act: "getTabs"
        });

        return tabData;
    }

    buildTabs = async () => {
        var tmp = [];
        tmp = await this.getTabs();

        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs"
        })

        tmp.forEach(el => {
            this.append(this.state.element.taskTabs, this.CreateElement({
                element: "tab",
                children: el.name,
                'tab-id': el.id,
                onclick: this.tabClick,
            }))
        })

        return this.state.element.taskTabs;

    }

    tabClick = (e) => {
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");

        var id = e.target.getAttribute("tab-id");

        this.state.news_status_id = id;
        this.state.tablediv.innerHTML = "";
        this.append(this.state.tablediv, this.buildTable());

    }

    buildDiv = () => {
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }
        })

        return this.state.div;
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
                    field: "დასაწყისი"
                },
                {
                    field: "დასასრული"
                },
                {
                    field: "დასახელება"
                },
                {
                    field: "შინაარსი"
                },
                {
                    field: "ავტორი"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getNews",
                status_id: this.state.news_status_id
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

        if (!self.Ussd.TabNews) return false;
        self.Ussd.TabLogs.remove();

    }

}