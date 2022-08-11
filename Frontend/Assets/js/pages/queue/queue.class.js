import Tdg from "../../tdg.class.js"
import Button from "../../components/button/button.class.js";
import { kendo_SelectedID, kendo__refresh } from "../../helpers/kendo.helper.js";


export default class Queue extends Tdg {
    constructor() {
        super();

        this.state = {
            sectionName: document.querySelector("section[Queue]"),
            element: []
        }

        this.removeLoading();
        this.init();


    }

    init = () => {
        this.append(this.state.sectionName, this.QueueBlock());
        this.append(this.state.element.queueblock, this.createDiv());
    }

    QueueBlock = () => {
        this.state.element.queueblock = this.CreateElement({
            element: "queueblock",
        })
        return this.state.element.queueblock;
    }

    createDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            class: "creatediv"
        }, this.createTable())
        return this.state.element.div
    }


    buildQueueModal = async (id) => {

       let data = await this.getResponse({
            route: "Queue",
            act: "getQueueModal",
            id: id
        })

        this.buildModal(null, {
            width: '500px',
            height: '140px',
            content: this.createModal(data),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: (modal) => {
                       
                        this.getResponse({
                            route: "Queue",
                            act: "changeQueue",
                            id: id,
                            icon:  kendo_SelectedID(this.state.element.iconSelector).id,
                            lang: kendo_SelectedID(this.state.element.langSelector)
                        }).then(() => {
                            modal.close().destroy()
                            this.buildNotice({ msg: "ცვლილება წარმატებით განხორციელდა" });
                            kendo__refresh(this.state.element.table, "table")
                        })
                    },
                    access: "view"
                }
            },
            confirmOnCancel: false
        })

    }
    createModal = (data) => {

        this.state.element.dialogContent = this.CreateElement({
            element: "dialogcontent",
            children: "დამატება",
        }, this.createDivForModal(data))

        return this.state.element.dialogContent
    }

    createDivForModal = (data) => {

        this.state.element.modalDiv = this.CreateElement({
            element: "modal-div"
        }, this.createIconSelector(data), this.createLanguageSelector(data))

        return this.state.element.modalDiv
        
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "რიგი"
                },
            
                {
                    field: "აიკონი",
                    template: (data) => {
                       
                        let icon = '';
                        if(data.aikoni){
                            icon = `<img src="Frontend/Uploads/icons/${data.aikoni}" width="20" height="20">`;
                        }
                    
                        return icon

                    }
                },
                {
                    field: "ენა"
                }
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            data: {
                route: "Queue",
                act: "getList"
            },
            ondblclick: (data) => {
                this.buildQueueModal(data.id)
                
            }
            })
            return this.state.element.table;
    }
  
    createIconSelector = (data) => {
        this.state.element.iconSelector = this.CreateElement({
            element: "kendo",
            type: "selectorWithIcons",
            title: "აიკონი",
            value: data.icon,
            selectorImg: '<span class="k-state-default" style="background-image: url(\'Frontend/Uploads/icons/#: data.url #\'); width: 18px; height: 18px;background-repeat: no-repeat; position: absolute; border-radius: 50%; background-size: cover;" ></span><span style="margin-left: 26px;">#: data.name #</span>',
            selectedImg: '<span class="selected-value" style="background-image: url(\'Frontend/Uploads/icons/#: data.url #\'); width: 20px; height: 20px;background-repeat: no-repeat; position: absolute; border-radius: 50%; background-size: cover;"></span><span style="margin-left: 26px;">#: data.name #</span>',
            data: {
                route: "Queue",
                act: "getIconsList"
            }
        });

        return this.state.element.iconSelector;
    }


    createLanguageSelector = (data) => {
        this.state.element.langSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ენა",
            value: data.lang,
            data: {
                route: "Queue",
                act: "getQueueLang"
            }
        });
        return this.state.element.langSelector;
    }

}
