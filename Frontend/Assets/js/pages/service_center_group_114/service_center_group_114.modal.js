import Button from '../../components/button/button.class.js';
import Input from '../../components/input/input.class.js';
import { kendo_SelectedID, kendo__refresh } from '../../helpers/kendo.helper.js';
import Tdg from '../../tdg.class.js';

export default class ServiceCenterGroup114Modal extends Tdg {
    constructor() {
        super();
        self.ServiceCenterGroup114Modal = this;

        this.state = {
            element: [],
        }
    }

    createModal = (id = 0) => {
        this.state.subtbId = id;

        this.state.element.modal = this.CreateElement({
            element: "div",
            class: "service-center-group114-modal",
        }, this.createInputDiv(), this.createMasterTableDiv())
        return this.state.element.modal
    }

    createInputDiv = () => {
        this.state.element.modal = this.CreateElement({
            element: "div",
            class: "input-div",
        }, this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ძირითადი ინფორმაცია"
        }, this.createTitleInput(), this.createSelector(), this.createIdInput(), this.createCarNumberInput()))
        return this.state.element.modal
    }

    createTitleInput = () => {
        this.state.element.input = new Input({
            type: "text",
            placeholderTitle: "დასახელება",
            value: this.state.subtbId > 0 ? self.ServiceCenterGroup114.state.editdata.name : ""
        }).build()
        return this.state.element.input
    }

    createSelector = () => {
        this.state.element.selector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ბიზნეს ცენტრი",
            value: this.state.subtbId > 0 ? self.ServiceCenterGroup114.state.editdata.service_center_id : "",
            data: {
                route: "Service_center_group_114",
                act: "getSelectors"
            }
        })
        return this.state.element.selector
    }

    createIdInput = () => {
        this.state.element.planshet = new Input({
            type: "text",
            placeholderTitle: "პლანშეტის ID",
            value: this.state.subtbId > 0 ? self.ServiceCenterGroup114.state.editdata.planshet_id : "",
        }).build()
        return this.state.element.planshet
    }

    createCarNumberInput = () => {
        this.state.element.carnum = new Input({
            type: "text",
            placeholderTitle: "მანქანის ნომერი",
            value: this.state.subtbId > 0 ? self.ServiceCenterGroup114.state.editdata.number : "",
        }).build()
        return this.state.element.carnum
    }

    createMasterTableDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "master-div"
        }, this.createAddMasterBtn(), this.createDisableMasterBtn(), this.createMasterTable())
        return this.state.element.div
    }


    createAddMasterBtn = () => {
        this.state.element.addMaster = new Button({
            type: "add",
            text: "დაამატე ოსტატი",
            onclick: () => {
                this.buildModal(null, {
                    width: '500',
                    height: '130',
                    content: this.createAdd(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: (modal) => {

                                this.getResponse({
                                    route: "Service_center_group_114",
                                    act: "ADDSELECTED",
                                    name_id: kendo_SelectedID(this.state.element.addName),
                                    group_id: this.state.subtbId,
                                    password: this.state.element.input.children[0].value
                                }).then((data) => {
                                    modal.close().destroy()
                                    this.buildNotice({ msg: "ცვლილება წარმატებით განხორციელდა" });
                                    kendo__refresh(this.state.element.table, "table")
                                })
                            },
                            access: "save"
                        }
                    },
                    confirmOnCancel: false
                })
            },
            access: "add"
        })
        return this.state.element.addMaster
    }

    createDisableMasterBtn = () => {
        this.state.element.disableBtn = new Button({
            text: "გაუქმება",
            onclick: () => {

                this.kendoselected = this.state.element.table.children[1].children[0].children[1].childNodes;
                this.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Service_center_group_114",
                            act: "DeleteOStat",
                            id: data.children[0].innerHTML
                        }).then((data) => {
                            self.Tdg.buildNotice({ msg: "გაუქმებულია" });
                            kendo__refresh(this.state.element.table, 'table');
                        })
                    }
                });
            }
        })
        return this.state.element.disableBtn
    }

    createMasterTable = () => {
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
                    field: "სტატუსი"
                }
            ],
            data: {
                route: "Service_center_group_114",
                act: "getSubTableData",
                id_114: this.state.subtbId,
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
        })
        return this.state.element.table;

    }

    createAdd = () => {
        this.state.element.createAdd = this.CreateElement({
            element: "div",
            class: "create-add",
            attributes: ["fieldset"],
            title: "ოსტატი"
        }, this.createNameSelector(), this.createPasswordInput())

        return this.state.element.createAdd
    }

    createNameSelector = () => {
        this.state.element.addName = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "სახელი",
            data: {
                route: "Service_center_group_114",
                act: "getSelectorsName"
            }

        })
        return this.state.element.addName
    }

    createPasswordInput = () => {
        this.state.element.input = new Input({
            type: "password",
            placeholderTitle: "პაროლი"
        }).build()
        return this.state.element.input
    }

}