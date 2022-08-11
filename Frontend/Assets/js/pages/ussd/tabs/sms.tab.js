import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import Input from "../../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh } from "../../../helpers/kendo.helper.js";
export default class TabSms extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabSms = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        this.checkfordata();
    }

    checkfordata() {
        if (self.UssdModal.crm) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.Crm.state.globalPhoneNumber;
        }
    }

    init = () => {

        self.Ussd.TabSms = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "SMS",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Ussd.TabSms;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildAddButton());

        this.append(this.state.fieldSet, this.buildTable());
    }

    buildPhonesInput = () => {
        this.state.phonesinput = new Input({
            type: "text",
            placeholderTitle: "ადრესატი",
            value: self.WorkGround.state.globalPhoneNumber,
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
                act: "getShablonSMS",
                id: this.state.prop.id
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
                                    text: this.state.textinput.children[0].value,
                                    inc_id: self.WorkGround.state.prop.id
                                }).then((data) => {
                                    if (data.status) {
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
            },
            access: "add"
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
                    field: "თარიღი"
                },
                {
                    field: "ადრესატი"
                },
                {
                    field: "ტექსტი"
                },
                {
                    field: "სტატუსი"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getSms",
                inc_id: this.state.prop.id
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

        if (!self.Ussd.TabSms) return false;
        self.Ussd.TabSms.remove();

    }

}