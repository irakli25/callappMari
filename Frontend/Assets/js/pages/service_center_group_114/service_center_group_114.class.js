import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import ServiceCenterGroup114Modal from "./service_center_group_114.modal.js";
import { kendo_SelectedID, kendo__refresh } from "../../helpers/kendo.helper.js";

export default class ServiceCenterGroup114 extends Tdg {

    constructor() {
        super();
        self.ServiceCenterGroup114 = this;

        this.state = {
            sectionName: document.querySelector("section[ServiceCenterGroup114]"),
            element: []
        }

        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.createserviceCenterGroup());
        this.append(this.state.element.serviceCenterGroup, this.buildAddButton());
        this.append(this.state.element.serviceCenterGroup, this.buildDeleteButton());
        this.append(this.state.element.serviceCenterGroup, this.createTable());

    }

    createserviceCenterGroup = () => {
        this.state.element.serviceCenterGroup = this.CreateElement({
            element: "service_center_group"
        })
        return this.state.element.serviceCenterGroup
    }

    buildAddButton = () => {
        this.state.element.addBtn = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {
                let id = await this.getNewId();
                this.addOrSave(id);
            },
            access: "add"
        })
        return this.state.element.addBtn
    }


    getNewId = async () => {
        let id = await this.getResponse({
            route: "Service_center_group_114",
            act: "getNewId"
        })

        return id;
    }

    getEditData = async (id) => {
        this.state.editdata = await this.getResponse({
            route: "Service_center_group_114",
            act: "getById",
            id: id
        })
    }

    addOrSave = async (id = 0, save = false) => {

        var button = save ? "შენახვა" : "დამატება";
        var text = save ? "ცვლილება წარმატებით განხორციელდა" : "მონაცემი დმატებულია";
        var act = save ? "UPDATE" : "INSERT";

        await this.getEditData(id);

        this.buildModal(null, {
            width: '1000px',
            height: '840px',
            content: new ServiceCenterGroup114Modal().createModal(id),
            buttons: {
                save: {
                    name: button,
                    onclick: (modal) => {

                        this.getResponse({
                            route: "Service_center_group_114",
                            act: act,
                            id: id,
                            name: self.ServiceCenterGroup114Modal.state.element.input.children[0].value,
                            service_center_id: kendo_SelectedID(self.ServiceCenterGroup114Modal.state.element.selector),
                            planshet_id: self.ServiceCenterGroup114Modal.state.element.planshet.children[0].value,
                            automobile_number: self.ServiceCenterGroup114Modal.state.element.carnum.children[0].value
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

    buildDeleteButton = () => {
        this.state.element.deleteBtn = new Button({
            type: "delete",
            text: "წაშლა",
            onclick: () => {
                this.kendoselected = this.state.element.table.children[1].children[0].children[1].childNodes;
                this.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Service_center_group_114",
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
                    field: "კლანშეტის N"
                },
                {
                    field: "ოსტატი"
                },
                {
                    field: "მანქანის ნომერი"
                },
                {
                    field: "სერვის ცენტრი"
                }
            ],
            data: {
                route: "Service_center_group_114",
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
                this.addOrSave(cb.id, true);
            }
        })
        return this.state.element.table;

    }
}