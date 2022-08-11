import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Group114Modal from "./group_114.modal.js";
import { kendo__refresh } from "../../helpers/kendo.helper.js";

export default class Group114 extends Tdg {

    constructor() {
        super();
        self.Group114 = this;

        this.state = {
            sectionName: document.querySelector("section[Group114]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.createGroups());
        this.append(this.state.element.groups, this.buildAddButton());
        this.append(this.state.element.groups, this.buildDeleteButton());
        this.append(this.state.element.groups, this.createTable());

    }

    createGroups = () => {
        this.state.element.groups = this.CreateElement({
            element: "groups"
        })
        return this.state.element.groups
    }

    buildAddButton = () => {
        this.state.element.addBtn = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {
                let id = await this.getNewId();
                this.saveAddData(id);
            },
            access: "add"
        })
        return this.state.element.addBtn
    }

    buildDeleteButton = () => {
        this.state.element.deleteBtn = new Button({
            type: "delete",
            text: "წაშლა",
            onclick: () => {
                self.Group114.kendoselected = this.state.element.table.children[1].children[0].children[1].childNodes;
                self.Group114.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Group_114",
                            act: "DELETE",
                            id: data.children[0].innerHTML
                        }).then((data) => {
                            self.Tdg.buildNotice({ msg: "წაშლილია" });
                            kendo__refresh(this.state.element.table, 'table');
                        })
                    }
                });
            },
            access: "delete"
        })
        return this.state.element.deleteBtn
    }

    getNewId = async () => {
        let id = await this.getResponse({
            route: "Group_114",
            act: "getNewId"
        })

        return id;
    }

    getEditData = async (id) => {
        this.state.editdata = await this.getResponse({
            route: "Group_114",
            act: "getById",
            id: id
        })
    }

    saveAddData = async (id = 0, save = false) => {
        var button = save ? "შენახვა" : "დამატება";
        var text = save ? "ცვლილება წარმატებით განხორციელდა" : "მონაცემი დმატებულია";
        var act = save ? "UPDATE" : "INSERT";

        await this.getEditData(id);

        this.buildModal(null, {
            width: '1200px',
            height: '840px',
            content: new Group114Modal().createModal(id),
            buttons: {
                save: {
                    name: button,
                    onclick: (modal) => {
                        this.getResponse({
                            route: "Group_114",
                            act: act,
                            id: id,
                            name: self.Group114Modal.state.element.title.children[0].value,
                            number: self.Group114Modal.state.element.carNumber.children[0].value,
                            password: self.Group114Modal.state.element.password.children[0].value
                        }).then(() => {
                            modal.close().destroy()
                            this.buildNotice({ msg: text });
                            kendo__refresh(this.state.element.table, "table")
                        })
                    },
                    access: "view"
                }
            },
            confirmOnCancel: false
        })
    }


    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "დასახელება"
                },
                {
                    field: "ზეინკალი"
                },
                {
                    field: "ოსტატი"
                },
                {
                    field: "მანქანის ნომერი"
                }
            ],
            data: {
                route: "Group_114",
                act: "getList",
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: true
            },
            ondblclick: (cb) => {
                this.saveAddData(cb.id, true);
            }
        })
        return this.state.element.table;

    }
}