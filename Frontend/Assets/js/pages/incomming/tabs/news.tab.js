import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import { kendo__destroy } from "../../../helpers/kendo.helper.js";
import Action from "../../action/action.class.js";

export default class TabNews extends Tdg{

    constructor(){
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.TabNews = this;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }
    }



    init = async () => {

        self.Incomming.TabNews = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "აქციები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.tablediv = this.CreateElement({
            element: 'div',
            id: "removeKendo"
        })

        

        this.state.fieldSet = self.Incomming.TabNews;

        this.append(this.state.interfaceName,this.state.fieldSet);
        this.append(this.state.fieldSet,this.buildDiv());
        this.append(this.state.fieldSet,this.buildFilterDiv());

        this.append(this.state.div, await this.buildTabs());

        this.append(this.state.filterdiv, this.buildStartDate());
        this.append(this.state.filterdiv, this.buildTire());
        this.append(this.state.filterdiv, this.buildEndDate());
        this.append(this.state.filterdiv, this.buildfilterButton());

        this.append(this.state.fieldSet, this.state.tablediv);
        this.append(this.state.tablediv,this.buildTable());

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

        
        
        if (id==2 ) {
            document.getElementById("removeFilter").style = "display: flex !important";
        }
        else {
            document.getElementById("removeFilter").style = "display: none !important";
        }
        
        
            

    }

    buildStartDate = () => {
        this.state.element.startdate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startdate
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

    buildEndDate = () => {
        this.state.element.enddate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.enddate
    }

    buildfilterButton = () => {
        this.state.element.button = new Button({
            text: "ძებნა",
            onclick: () => {
                document.getElementById("removeKendo").innerHTML = "";
                kendo__destroy(this.state.table);
                this.append(this.state.fieldSet, this.state.tablediv);
                this.append(this.state.tablediv,this.buildTable());
            }
        })

        return this.state.element.button
    }



    buildDiv = () =>{
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

    buildFilterDiv = () =>{
        this.state.filterdiv = this.CreateElement({
            element: 'tabcontent',
            id :'removeFilter',
            style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }
        })

        return this.state.filterdiv;
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
                status_id: this.state.news_status_id,
                startDate: this.state.element.startdate.value,
                endDate: this.state.element.enddate.value,
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
            // ondblclick: (callback) => {

            //     // this.buildModal(null, {
            //     //     width: '100vw',
            //     //     height: '100vh',
            //     //     content: this.getModalContent(callback),
            //     //     buttons: {
            //     //         save: {
            //     //             name: "შენახვა",
            //     //             onclick: (modal) => {

            //     //             }
            //     //         }
            //     //     },
            //     //     confirmOnCancel: true   
            //     // })

            // }

            ondblclick: (id) => {

                this.buildModal(null, {
                    width: '1600px',
                    height: '1068px',
                    content: new Action().createModalContent(id),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: (modal) => {

                            }
                        }
                    },
                    confirmOnCancel: true   
                })

            }

        })

        return this.state.table;

    }


    getModalContent = (callback) => {

        console.log(callback)

    }


    destroy = () => {

        if(!self.Incomming.TabNews) return false;
        self.Incomming.TabLogs.remove();

    }

}