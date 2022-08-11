import { kendo__appendToHeader } from "../../helpers/kendo.helper.js";
import Tdg from "../../tdg.class.js";
import PageModal from "./page.modal.js";

export default class Automator extends Tdg{
    constructor(){
        super();
        self.Automator = this;
        this.state = {
            sectionName: document.querySelector("section[automator]"),
            element: []
        }
        this.removeLoading();
        this.init();

       
    }

    init = () => {

        this.build()

    }


    build = () => {
        
        this.state.element.bar = this.CreateElement({
            element: "div",
            class: "title"
        });

        this.state.element.add =  this.CreateElement({
            element: "button",
            children: `<div class="btn">დამატება <img src='Frontend/Assets/images/icons/plus_1.svg'/></div>`,
            access: "add"
        });

        this.state.element.delete = this.CreateElement({
            type: "delete",
            text: "წაშლა",
            access: "delete"
        });
        
        this.append(this.state.element.bar, this.state.element.delete);
        this.append(this.state.element.bar, this.state.element.add);
        this.append(this.state.sectionName, this.state.element.bar);

        this.append(this.state.sectionName, this.createTablePages(), false, (cb) => {
            console.log(546)
            kendo__appendToHeader(cb, this.CreateElement({
                element: "HI",
                children: "herhe"
            }));
        });

    }

    selectedKendoRows = (element) => {
        var selected = [];
        var grid = $(element).data("kendoGrid");
        var rows = grid.select();
        rows.each(function (index, row) {
            const item = grid.dataItem(row);
            selected.push(item.id);
        });
        var selectedLength = selected.length;
        

        return selected;
    }

    createTablePages = () => {

        this.state.element.pageTable = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: false
                },
                {
                    field: "შექმნის თარიღი",
                    size: 160
                },
                {
                    field: "იდენტიფიკატორი",
                    size: 160
                },
                {
                    field: "Fieldset სია"
                }
            ],
            data: {
                route: "Automator",
                act: "getPageList"
            },
            option: {
                header: true,
                numeric: false,
                footer: true
            },
            ondblclick: (cb) => {
               
                this.buildModal(null,  {
                    width: '60vw',
                    height: '50vh',
                    content: new PageModal({
                        ...cb
                    }).init(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: function(modal){
                                console.log(self.Automator.getResponse({
                                    route: "Automator",
                                    act: "getGeneratedInputs",
                                    pageKey: "incommingRequest"
                                }))
                                alert(213)
                            },
                            access: "save"
                        }
                    },
                    confirmOnCancel: true,
                    draggable: 'title',
                    title: 'გვერდის Fieldset ცნობარი'
                })

            },
            callback: (cb) => {
                // console.log(cb)
            }
        });
        return this.state.element.pageTable;

    }

    


}