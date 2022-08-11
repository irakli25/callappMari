import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import GroupMembersModal from "./group_members.modal.js";
import { kendo_SelectedID, kendo__refresh } from "../../helpers/kendo.helper.js";
export default class GroupMembers extends Tdg {

    constructor() {
        super();
        self.GroupMembers = this;

        this.state = {
            sectionName: document.querySelector("section[GroupMembers]"),
            element: []
        }
                
        this.removeLoading()
        this.init();
    }

    init = () => {

        this.append(this.state.sectionName, this.createGroupMembers());
        this.append(this.state.element.groupMembers, this.buildAddButton());
        this.append(this.state.element.groupMembers, this.buildDeleteButton());
        this.append(this.state.element.groupMembers, this.createTable());

    }

    createGroupMembers = () => {
        this.state.element.groupMembers = this.CreateElement({
            element: "group_members"
        })

        return this.state.element.groupMembers
    }

    buildAddButton = () => {
        this.state.element.addBtn = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {
                await this.addOREdit();    
            },
            access: "add"
        })

        return this.state.element.addBtn
    }

    addOREdit = async (id = 0) => {
        var button = id > 0 ? "შენახვა" : "დამატება";
        var text = id > 0 ? "ცვლილება წარმატებით განხორციელდა" : "ჯგუფის წევრი დაემატა";
     
        this.buildModal(null, {
            width: '600px',
            height: '160px',
            content: await  new GroupMembersModal().createModal(id),
            buttons: {
                save: {
                    name: button,
                    onclick: (modal) => {
                        id > 0 ? this.saveData(id) : this.addNewData();
                        modal.close().destroy()
                        this.buildNotice({ msg: text });
                        kendo__refresh(this.state.element.table, "table")
                    },
                    access: "view"
                }
            },
            confirmOnCancel: false
        })
    }

    addNewData = async () => {
        var result = await this.getResponse({
            route: "Group_members",
            act: "INSERT",
            name_surname: self.GroupMembersModal.state.element.name.children[0].value,
            type_id: kendo_SelectedID(self.GroupMembersModal.state.element.selector),
            phone: self.GroupMembersModal.state.element.phone.children[0].value
       })

       return result;
    }

    
    saveData = async (id) => {
        var result = await this.getResponse({
            route: "Group_members",
            act: "UPDATE",
            id: id,
            name_surname: self.GroupMembersModal.state.element.name.children[0].value,
            type_id: kendo_SelectedID(self.GroupMembersModal.state.element.selector),
            phone: self.GroupMembersModal.state.element.phone.children[0].value
       })
       return result;
    }

    buildDeleteButton = () => {
        this.state.element.deleteBtn = new Button({
            type: "delete",
            text: "წაშლა",
            onclick: () => {
                this.kendoselected = this.state.element.table.children[1].children[0].children[1].childNodes;
                this.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        this.getResponse({
                            route: "Group_members",
                            act: "DELETE",
                            id: data.children[0].innerHTML
                        }).then((data) => {
                           this.buildNotice({ msg: "წაშლილია" });
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
                    hidden: true
                },
                {
                    field: "სახელი გვარი"
                },
                {
                    field: "ტიპი"
                },
                {
                    field: "ტელეფონი"
                }
            ],
            data: {
                route: "Group_members",
                act: "getList"
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
            ondblclick: async (cb) => {

                await this.addOREdit(cb.id)
            }
        })

        return this.state.element.table;

    }
}