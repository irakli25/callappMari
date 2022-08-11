import Tdg from "../../tdg.class.js"
import Button from "../../components/button/button.class.js";
import Uploader from "../../components/uploader/uploader.class.js"

export default class IconManager extends Tdg {
    constructor() {
        super();

        this.state = {
            sectionName: document.querySelector("section[IconManager]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.iconManagerBlock());
        this.append(this.state.element.iconManager, this.createDiv());
    }

    iconManagerBlock = () => {
        this.state.element.iconManager = this.CreateElement({
            element: "iconManager",
        })
        return this.state.element.iconManager;
    }

    createDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "creatediv"
        }, this.buildAddButton(), this.createTable())
        return this.state.element.div
    }

    buildAddButton = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            style: {
                marginBottom: '10px'
            },
            onclick: () => {
                let param = {
                    table: this.state.element.table,
                    inc_id: 0,
                    req: "queueIcons"
                }
        
                new Uploader(param).init();        
            },
            access: "add"
        })

        return this.state.element.addbutton
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "url",
                    hidden: true
                },
                {
                    field: "აიკონი",
                    template: `<img src="Frontend/Uploads/icons/#: url#" width="20" height="20">`,
                },
                {
                    field: "დასახელება"
                }
            ],
            data: {
                route: "Queue",
                act: "getIcons"
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
              
            })
            return this.state.element.table;
    }
}
