import Tdg from "../../tdg.class.js";
import inputListModal from "./inputList.modal.js";

export default class PageModal extends Tdg {

    constructor(prop){
        super()
        
        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["fieldsets"],
                style: {
                    display: 'block',
                    padding: '10px'
                }
            }),
            interface: [],
            element: [],
            id: prop.id
        }

    }

    // INITIALIZE BUILD
    init = () => {

        this.build()
        return this.state.dom

    }

    /**
     * BUILD INCOMMING COMPONENTS
     */
    // 
    build = async () => {

        this.append(this.state.dom, this.createTableFieldsetsByPage());

    }


    createTableFieldsetsByPage = () => {

        this.state.element.FieldsetsByPageTable = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: false
                },
                {
                    field: "Fieldset სახელი"
                },
                {
                    field: "Fieldset ველები"
                }
            ],
            data: {
                route: "Automator",
                act: "getFieldsetList",
                pageId: this.state.id
            },
            option: {
                header: false,
                numeric: false,
                footer: true
            },
            ondblclick: (cb) => {
               
                this.buildModal(null,  {
                    width: '70vw',
                    height: '65vh',
                    content: new inputListModal({
                        ...cb
                    }).init(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: function(modal){
                                self.Automator.getResponse({
                                    route: "Automator",
                                    act: "saveFieldset",
                                    field_name: $("#fieldsetName").val(),
                                    filed_id: cb.id,
                                }).then(function (data){
                                    alert(123)
                                    //self.Incomming.buildNotice({msg: "მომართვა დამუშავებულია"});
                                    //kendo__refresh(self.Incomming.state.element.table, 'table');
                                })
                            },
                            access: "save"
                        }
                    },
                    confirmOnCancel: true,
                    draggable: 'title',
                    title: 'Fieldset რედაქტირება'
                })

            },
            callback: (cb) => {
                // console.log(cb)
            }
        });
        return this.state.element.FieldsetsByPageTable;

    }



}