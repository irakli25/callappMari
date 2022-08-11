import Button from '../../components/button/button.class.js';
import Input from '../../components/input/input.class.js';
import Tdg from '../../tdg.class.js';

export default class GroupMembersModal extends Tdg {
    constructor(){
        super();
        self.GroupMembersModal = this;

        this.state = {
            element: [],
            data: []
        }
    }

   createModal = async (id) => {
    this.state.data = await this.getDataEdit(id);
       
    this.state.element.modal = this.CreateElement({
        element: "div",
        class: "group-members-modal",
        title: "ძირითადი ინფორმაცია",
        attributes: ["fieldset"],
    }, this.createNameInput(), this.createSelector(), this.createPhoneInput())

    return this.state.element.modal
       
    }

    getDataEdit = async (id) => {
  
        var data = await this.getResponse({
            route: "Group_members",
            act: "getById",
            id: id
        })

        return data;
    }

   createNameInput = () => {

        this.state.element.name = new Input({
            type: "text",
            placeholderTitle: "სახელი, გვარი",
            value: this.state.data.id > 0 ? this.state.data.name_surname : "",
        }).build()

        return this.state.element.name
    }

    createSelector = () => {
        this.state.element.selector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ტიპი",
            value: this.state.data.id > 0 ? this.state.data.type : "",
            data: {
                route: "Group_members",
                act: "getTypes"
            },
           
        })

        return this.state.element.selector
    }

    createPhoneInput = () => {


        this.state.element.phone = new Input({
            type: "text",
            placeholderTitle: "ტელეფონი",
            value: this.state.data.id > 0 ? this.state.data.phone : "",
        }).build()

        return this.state.element.phone
    }

}