import Tdg from "../../tdg.class.js";
import Input from "../../components/input/input.class.js";
import Selector from "../../components/selector/selector.class.js";
import paramModal from "./parameter.modal.js";
import { kendo_SelectedID, kendo_setIndex, kendo_setValueByID, kendo__refresh, kendo_SelectedRows } from "../../helpers/kendo.helper.js";
export default class inputModal extends Tdg {

    constructor(prop){
        super()

        self.inputModal = this;
        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["exInput"],
                style: {
                    'margin-top': '10px',
                    display: 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': 'wrap',
                    gap: '13px',
                    'justify-content': 'center',
                }
            }),
            interface: [],
            element: [],
            inputName: '',
            inputPosition: 1,
            selectorkendo: [],
            id: (typeof prop.id == 'undefined') ? '' : prop.id,
            
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

        if (this.state.id > 0) {
            
            var InputData = await this.getResponse({
                route: "Automator",
                act: "getInputEdit",
                id: this.state.id,
            })

            var input_type = InputData.field_type;
            var input_tab = InputData.tab_id;
            var nec = InputData.nec;

            this.state.inputName = InputData.name;
            this.state.inputPosition = InputData.position;
            this.state.inputKey = InputData.key;

            
        }

        this.append(this.state.dom, this.inputName());
        this.append(this.state.dom, await this.buildKendoSelector("ველის ტიპი", "input_type", input_type, input_type, this.nothing(), "Automator", "GetInputTypes"));
        this.append(this.state.dom, await this.buildKendoSelector("აირჩიეთ ტაბი", "input_tab", input_tab, input_tab, this.nothing(), "Automator", "GetFieldTabs"));
        this.append(this.state.dom, await this.buildKendoSelector("აუცილებელი ველი", "necessary", nec, nec, this.nothing(), "Automator", "GetNecInput"));
        this.append(this.state.dom, this.inputPosition());

        if(InputData.field_type == 6 || InputData.field_type == 7 || InputData.field_type == 8 || InputData.field_type == 9){
            this.append(this.state.dom, await this.selectorDirArea());
        }
    }

    selectorDirArea = async () => {
        this.state.element.selectorDir = this.CreateElement({
            element: "fieldset",
            style: {
                'width': '85%'
            },
            children: this.CreateElement({
                element: "legend",
                text: "სელექტორი/CHECKBOX/RADIO"
            })
        });
        this.state.element.bar = this.CreateElement({
            element: "div",
            class: "title"
        });

        this.state.element.add =  this.CreateElement({
            element: "button",
            children: 'დამატება',
            onclick: this.addNewParam,
            access: "add"
        });

        this.state.element.delete = this.CreateElement({
            element: "button",
            children: 'წაშლა',
            onclick: this.deleteParam,
            access: "delete"
        });
        
        this.append(this.state.element.bar, this.state.element.delete);
        this.append(this.state.element.bar, this.state.element.add);
        this.append(this.state.element.selectorDir, this.state.element.bar);

        this.append(this.state.element.selectorDir, await this.createTableSelectors());

        return this.state.element.selectorDir;
    }
    deleteParam = () => {
        var selectedIDS = self.Automator.selectedKendoRows(self.inputModal.state.element.tableSelectors);
        self.Automator.getResponse({
            route: "Automator",
            act: "removeData",
            type: "param",
            input_id: self.inputModal.state.id,
            ids: selectedIDS
        }).then(function (data){
            kendo__refresh(self.inputModal.state.element.tableSelectors, 'table');
            self.inputModal.buildNotice({msg: "პარამეტრი წაშლილია"});
            //kendo__refresh(self.Incomming.state.element.table, 'table');
        })

    }
    addNewParam = (cb) => {
        this.buildModal(null,  {
            width: '22vw',
            height: '20vh',
            content: new paramModal(cb).init(),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: function(modal){ 
                        self.Automator.getResponse({
                            route: "Automator",
                            act: "saveParam",
                            input_id: self.inputModal.state.id,
                            selector_id: cb.id,
                            param_name: $(self.paramModal.state.element.inputParam).find('input').val(),
                            

                        }).then(function (data){
                            modal.close().destroy();
                            kendo__refresh(self.inputModal.state.element.tableSelectors, 'table');
                            self.inputModal.buildNotice({msg: "პარამეტრი შენახულია"});
                            //kendo__refresh(self.Incomming.state.element.table, 'table');
                        })
                    },
                    access: "save"
                }
            },
            confirmOnCancel: true,
            draggable: 'title',
            title: 'სელექტორი/CHECKBOX/RADIO პარამეტრი'
        })
    }

    inputKeyGen = () => {
        this.state.inputKey = this.geo_to_latin($(self.inputModal.state.element.inputName).find('input').val());
    }

    inputName = () => {
        this.state.element.inputName = new Input({
            type: "text",
            placeholder: "ველის დასახელება",
            column: "5",
            value: this.state.inputName,
            id: "input_name",
            style: {
                width: "210px"
            },
            onkeyup: this.inputKeyGen

        }).build()

        return this.state.element.inputName;
    } 

    inputPosition = () => {
        this.state.element.inputPosition = new Input({
            type: "text",
            placeholder: "ველის პოზიცია",
            column: "5",
            value: this.state.inputPosition,
            id: "input_position",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputPosition;
    } 

    buildKendoSelector = async (title, name, id = 0, statuschangeid, onChangeEvent, route = "Task", act = "GETSTATUS") => {

        var data = await this.getResponse({
            route: route,
            act: act,
            id: this.state.id,
        })

        this.state.selectorkendo[name] = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: title,
            custom: data,
            value: Number(id),
            id: name,
            style: {
                width: '232px'
            }
            
        })
        return this.state.selectorkendo[name]
    }

    createTableSelectors = async () => {
        this.state.element.tableSelectors = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    size: 60,
                    hidden: false
                    
                },
                {
                    field: "პარამეტრი"
                }
            ],
            data: {
                route: "Automator",
                act: "GetDirData",
                input_id: this.state.id
            },
            option: {
                header: false,
                numeric: false,
                footer: true
            },
            ondblclick: (cb) => {
               
                this.buildModal(null,  {
                    width: '22vw',
                    height: '20vh',
                    content: new paramModal({
                        ...cb
                    }).init(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: function(modal){ 
                                self.Automator.getResponse({
                                    route: "Automator",
                                    act: "saveParam",
                                    input_id: self.inputModal.state.id,
                                    selector_id: cb.id,
                                    param_name: $(self.paramModal.state.element.inputParam).find('input').val(),
                                    

                                }).then(function (data){
                                    modal.close().destroy();
                                    kendo__refresh(self.inputModal.state.element.tableSelectors, 'table');
                                    self.inputModal.buildNotice({msg: "პარამეტრი შენახულია"});
                                    //kendo__refresh(self.Incomming.state.element.table, 'table');
                                })
                            },
                            access: "save"
                        }
                    },
                    confirmOnCancel: true,
                    draggable: 'title',
                    title: 'სელექტორი/CHECKBOX/RADIO პარამეტრი'
                })

            },
            callback: (cb) => {
                // console.log(cb)
            }
        });

        return this.state.element.tableSelectors;
    }

    nothing = () => {
        console.log('0');
    }


}