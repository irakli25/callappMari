import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendoResponsive } from "../../helpers/kendo.helper.js";

export default class Smspage extends Tdg{
    constructor(){
        super();
        self.Smspage = this;

        this.state = {
            sectionName: document.querySelector("section[smspage]"),
            element: []
        }

        document.title = "SMS";

        this.removeLoading();
        this.init();
    }

    init = () => {

        this.state.fieldSet = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            style: {
                "grid-template-columns": "unset",
                "padding": "10px",
                display:"grid",
                gap:"10px"
            }   
        });

        this.append(this.state.sectionName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildAddButton());

        this.append(this.state.fieldSet, this.buildTable());
        kendoResponsive();
    }

    buildPhonesInput = () => {
        this.state.phonesinput = new Input({
            type: "text",
            placeholderTitle: "ადრესატი",
            style: {
                width: '216px'
            }
        }).build();

        return this.state.phonesinput;
    }

    buildTextInput = () => {
        this.state.textinput = new Input({
            type: "textarea",
            placeholderTitle: "შეტყობინება",
            maxlength: "150",
            onkeyup: (e) => {
                this.state.counter.innerHTML = e.target.value.length;
            },
            onkeydown: (e) => {
                this.state.counter.innerHTML = e.target.value.length;
            },
            style: {
                maxWidth: "530px",
                minHeight: "180px",
                minWidth: '200px'
            }
        }).build();

        return this.state.textinput;
    }

    buildLengthCount = () => {
        this.state.lengthcounter = this.CreateElement({
            element: "div",
            style: {
                background: '#1E88E5',
                padding: '2px 0px',
                display: "flex",
                width: '46px',
                justifyContent: 'center',
                borderRadius: '5px',
                marginTop: '-10px',
                fontSize: '13px'
            }
        }, this.buildCounter(), this.CreateElement({
            element: "span",
            children: "/",
            style: {
                color: '#fff'
            }
        }), this.CreateElement({
            element: "span",
            children: "150",
            style: {
                color: '#fff'
            }
        }));

        return this.state.lengthcounter;
    }

    buildCounter = () => {
        this.state.counter = this.CreateElement({
            element: "span",
            children: "0",
            style: {
                color: '#fff'
            }
        });

        return this.state.counter;
    }

    modalContent = () => {
        let content = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ახალი SMS",
            style: {
                "grid-template-columns": "unset",
                display: 'flex'
            }
        }, this.CreateElement({
            element: "tabcontent",
            style: {
                display: 'flex',
                flexDirection: 'column',
                margin: '0px auto',
                width: '96%'
            }
        }, this.buildShablonButton(), this.buildPhonesInput(), this.buildTextInput(), this.buildLengthCount()))

        return content;
    }


    shablonContent = () => {
        let content = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "შაბლონი",
            style: {
                "grid-template-columns": "unset",
                display: 'flex'
            }
        }, this.CreateElement({
            element: "tabcontent",
            style: {
                display: 'flex',
                flexDirection: 'column',
                margin: '0px auto',
                width: '96%'
            }
        }, this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "სათაური"
                },
                {
                    field: "შინაარსი"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getShablonSMS"
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            onclick: (callback) => {
                this.state.shablonmodal.close()
                if (this.state.textinput.children[0].value != "") {
                    this.state.textinput.children[0].value = this.state.textinput.children[0].value + "\n" + callback.shinaarsi;
                } else {
                    this.state.textinput.children[0].value = callback.shinaarsi;
                }

            }
        })))

        return content;
    }

    buildAddButton = () => {
        this.state.element.button = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.modalContent(),
                    buttons: {
                        save: {
                            name: "გაგზავნა",
                            onclick: async () => {

                                await this.getResponse({
                                    route: "IncommingTabs",
                                    act: "insertSms",
                                    phones: this.state.phonesinput.children[0].value,
                                    text: this.state.textinput.children[0].value
                                }).then((data) => {
                                    if (data.status.includes("true")) {
                                        self.Tdg.buildNotice({ msg: "შეტყობინება გაგზავნილია" });
                                        this.state.textinput.children[0].value = "";
                                    } else {
                                        self.Tdg.buildNotice({ msg: "შეტყობინება არ გაიგზავნა" });
                                    }

                                    kendo__refresh(this.state.table, 'table');

                                })
                            }
                        }
                    }
                })
            }
        })

        return this.state.element.button
    }

    buildShablonButton = () => {
        this.state.element.shablonbutton = new Button({
            text: "შაბლონი",
            style: {
                width: '129px'
            },
            onclick: () => {
                this.state.shablonmodal = this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.shablonContent(),
                    buttons: {
                        save: {
                            name: "გაგზავნა",
                            onclick: async () => {


                            }
                        }
                    }
                })
            }
        })

        return this.state.element.shablonbutton
    }

    buildDiv = () => {
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '73%',
                flexWrap: 'wrap',
                gap: '30px'
            }
        })

        return this.state.div;
    }

    buildTable = () => {

        this.state.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "თარიღი",
                    size: 100
                },
                {
                    field: "იუზერი",
                    size: 100
                },
                {
                    field: "ნომერი",
                    size: 100
                },
                {
                    field: "ტექსტი",
                    size: 100
                },
                {
                    field: "სტატუსი",
                    size: 100
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getSms"
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            ondblclick: (callback) => {

                // this.buildModal(null, {
                //     width: '100vw',
                //     height: '100vh',
                //     content: this.getModalContent(callback),
                //     buttons: {
                //         save: {
                //             name: "შენახვა",
                //             onclick: (modal) => {

                //             }
                //         }
                //     },
                //     confirmOnCancel: true   
                // })

            }
        })

        return this.state.table;

    }


    getModalContent = (callback) => {

        console.log(callback)

    }


    destroy = () => {

        if (!self.Incomming.Smspage) return false;
        self.Incomming.Smspage.remove();

    }

}