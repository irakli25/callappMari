
/**
 * 
 */


import Button from "../../components/button/button.class.js";
import Tdg from "../../tdg.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive, kendo__multiSelectedName } from "../../helpers/kendo.helper.js";
import PermissionModal from "./permission.modal.js";

export default class Permission extends Tdg {

    constructor() {
        super();

        self.Permission = this;

        this.state = {
            sectionName: this.render("permission"),
            element: []
        }

        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.permissionReport());
        this.append(this.state.element.block, this.buildAddButton());
        this.append(this.state.element.block, this.createTable());
    }

    permissionReport = () => {
        this.state.element.block = this.CreateElement({
            element: "permission-report",
        })
        return this.state.element.block;
    }

    buildAddButton = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            style: {
                marginBottom: '10px'
            },
            onClick: this.handleClick 
        })

        return this.state.element.addbutton
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
                    field: "ჯგუფები",
                    name: "name"
                }
            ],
            data: {
                route: "Permission",
                act: "getGroups"
            },
            ondblclick: this.handleClick
        })
        return this.state.element.table;

    }

    handleClick = async (data) => {
      
        this.buildModal(null, {
            width: '1620px',
            height: '578px',
            content: await new PermissionModal(data).initialize(),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: (modal) => {
                            this.getResponse({
                                route: "Permission",
                                act: "updatePermission",
                                data: self.PermissionModal.state.permissionData,
                                group_id: self.PermissionModal.state.props.id
                        }).then((callback) => {
                            modal.close().destroy()
                            this.buildNotice({ msg: callback.message });
                            kendo__refresh(this.state.element.table, 'table');
                        })
                    }
                }
            },
            confirmOnCancel: false
        })

    }

}
