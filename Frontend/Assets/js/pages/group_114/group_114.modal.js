import Button from '../../components/button/button.class.js';
import Input from '../../components/input/input.class.js';
import { kendo_SelectedID, kendo__refresh } from '../../helpers/kendo.helper.js';
import Tdg from '../../tdg.class.js';

export default class Group114Modal extends Tdg {
    constructor() {
        super();
        self.Group114Modal = this;

        this.state = {
            element: [],
            table: []
        }
    }

    createModal = (id) => {

        this.state.group_id = id;
        this.state.element.modal = this.CreateElement({
            element: "div",
            class: "group114-modal",
        }, this.createInputDiv(), this.createZeinkalTableDiv(), this.createMasterTableDiv(), this.createHelperTableDiv())
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
        }, this.createTitleSelector(), this.createCarNumberSelector(), this.createPasswordSelector()))
        return this.state.element.modal
    }

    createTitleSelector = () => {
        this.state.element.title = new Input({
            type: "text",
            placeholderTitle: "დასახელება",
            value: self.Group114.state.editdata.id > 0 ? self.Group114.state.editdata.name : ""
        }).build()

        return this.state.element.title
    }

    createCarNumberSelector = () => {
        this.state.element.carNumber = new Input({
            type: "text",
            placeholderTitle: "მანქანის ნომერი",
            value: self.Group114.state.editdata.id > 0 ? self.Group114.state.editdata.number : ""
        }).build()

        return this.state.element.carNumber
    }

    createPasswordSelector = () => {
        this.state.element.password = new Input({
            type: "password",
            placeholderTitle: "პაროლი",
            value: self.Group114.state.editdata.id > 0 ? self.Group114.state.editdata.password : ""
        }).build()

        return this.state.element.password
    }


    createZeinkalTableDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "zeinkal-div"
        }, this.createAddZeinkalBtn(), this.createZeinkalTable())
        return this.state.element.div
    }


    createAddZeinkalBtn = () => {
        this.state.element.createZeinkal = new Button({
            type: "add",
            text: "დაამატე ზეინკალი",
            onclick: () => {
                this.addFromSelector(1);
            }
        })
        return this.state.element.createZeinkal
    }

    addFromSelector = (type) => {
        this.state.selectortype = type;
        this.buildModal(null, {
            width: '500',
            height: '100',
            content: this.createAdd(),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: (modal) => {

                        this.getResponse({
                            route: "Group_114",
                            act: "ADDSELECTED",
                            select_id: kendo_SelectedID(this.state.element.addName),
                            type: this.state.selectortype,
                            group_id: this.state.group_id
                        }).then((data) => {
                            modal.close().destroy()
                            this.buildNotice({ msg: "ცვლილება წარმატებით განხორციელდა" });
                            kendo__refresh(this.state.table[data.type], "table")
                        })
                    },
                    access: "save"
                }
            },
            confirmOnCancel: false
        })
    }

    createZeinkalTable = () => {
        this.state.table['Zeinkal'] = this.CreateElement({
            element: "kendo",
            type: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "სახელი"
                },
                {
                    field: "სტატუსი"
                },
            ],
            data: {
                route: "Group_114",
                act: "getSubTableData",
                id_114: this.state.group_id,
                type: 1
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: false
            },
        })
        return this.state.table['Zeinkal'];

    }

    createMasterTableDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "master-div"
        }, this.createAddMasterBtn(), this.createMasterTable())
        return this.state.element.div
    }


    createAddMasterBtn = () => {
        this.state.element.master = new Button({
            type: "add",
            text: "დაამატე ოსტატი",
            onclick: () => {
                this.addFromSelector(2);
            }
        })
        return this.state.element.master
    }

    createMasterTable = () => {
        this.state.table['Master'] = this.CreateElement({
            element: "kendo",
            type: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "სახელი"
                },
                {
                    field: "სტატუსი"
                },
            ],
            data: {
                route: "Group_114",
                act: "getSubTableData",
                id_114: this.state.group_id,
                type: 2
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: false
            },
        })
        return this.state.table['Master'];

    }


    createHelperTableDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "helper-div"
        }, this.createAddHelperBtn(), this.createHelperTable())
        return this.state.element.div
    }


    createAddHelperBtn = () => {
        this.state.element.addHelper = new Button({
            type: "add",
            text: "დაამატე დამხმარე",
            onclick: () => {
                this.addFromSelector(4);
            }
        })
        return this.state.element.addHelper
    }

    createHelperTable = () => {
        this.state.table['Helper'] = this.CreateElement({
            element: "kendo",
            type: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "სახელი"
                },
                {
                    field: "სტატუსი"
                },
            ],
            data: {
                route: "Group_114",
                act: "getSubTableData",
                id_114: this.state.group_id,
                type: 3
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: false
            },
        })
        return this.state.table['Helper'];

    }

    createAdd = () => {
        this.state.element.createAdd = this.CreateElement({
            element: "div",
            class: "create-add",
        }, this.createNameInput())

        return this.state.element.createAdd
    }

    createNameInput = () => {
        this.state.element.addName = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "სახელი",
            data: {
                route: "Group_114",
                act: "getSelectors",
                type: this.state.selectortype
            }
        })

        return this.state.element.addName
    }

}