import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import Input from "../../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendoResponsive } from "../../../helpers/kendo.helper.js";
export default class TabSms extends Tdg {

    constructor() {
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.TabSms = this;
        this.ussd_id = null;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        this.checkfordata();
    }

    checkfordata() {

        if (self.IncommingModal.crm) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.Crm.state.globalPhoneNumber;
        }

        if (self.IncommingModal.fromtask) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }

        if (self.fromstatement) {
            this.state.interfaceName = document.querySelector("div[statementtabcontent]");
            self.WorkGround.state.globalPhoneNumber = '';
        }

    }

    init = (phoney = '') => {

        self.Incomming.TabSms = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "SMS",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Incomming.TabSms;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildAddButton(phoney));

        this.append(this.state.fieldSet, this.buildTable());
        kendoResponsive()
    }

    buildPhonesInput = (val = '') => {

        this.state.phonesinput = new Input({
            type: "text",
            placeholderTitle: "ადრესატი",
            value: val,
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
            // maxlength: "150",
            // onkeyup: (e) => {
            //     this.state.counter.innerHTML = e.target.value.length;
            // },
            // onkeydown: (e) => {
            //     this.state.counter.innerHTML = e.target.value.length;
            // },
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

    modalContent = (phoney) => {

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
        },this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '96%'
            }
        },this.buildSmsTypeSelector(), this.buildShablonButton()), this.buildPhonesInput(phoney), this.buildTextInput())) //, this.buildLengthCount()))

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
                console.log(this.state.shablonmodal)
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

    buildAddButton = (phoney) => {

        this.state.element.button = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.modalContent(phoney),
                    buttons: {
                        save: {
                            name: "გაგზავნა",
                            onclick: async (modal) => {
                                await this.getResponse({
                                    route: "IncommingTabs",
                                    act: "insertSms",
                                    phones: this.state.phonesinput.children[0].value,
                                    text: this.state.textinput.children[0].value,
                                    ussdResult: (kendo_SelectedID(this.state.element.smsType) == "75" ) ? 1 : (
                                                (kendo_SelectedID(this.state.element.smsType) == "76" ) ? 2 : 0 ),
                                    inc_id: self.WorkGround.state.prop.id
                                }).then((data) => {
                                    if (data.status) {
                                        self.Tdg.buildNotice({ msg: "შეტყობინება გაგზავნილია" });

                                        if(this.ussd_id != null) {
                                            self.Tdg.getResponse({
                                                route: "Ussd",
                                                act: "SetSmsFullText",
                                                text: this.state.textinput.children[0].value,
                                                ussd_id: this.ussd_id
                                            }).then((data)=>{
                                                console.log(data);
                                            });
                                        }

                                        this.state.textinput.children[0].value = "";

                                        modal.close().destroy()
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
            onclick: async () => {

                this.state.shablonmodal = await this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.shablonContent()
                })

            }
        })

        return this.state.element.shablonbutton
    }

    buildSmsTypeSelector = (val = '') => {
        this.state.element.smsType = this.CreateElement({
            element: "kendo",
            type: 'selector',
            data: {
                route: "Ussd",
                act: "GetSmsTypes"
            },
            onchange: async (e)=> {
                await self.Tdg.getResponse({
                    route: "Ussd",
                    act: "GetSmsTemplate",
                    id: $(e.target).val(),
                    inc_id: this.state.prop.id
                }).then((data)=>{
                    if(data.error != "") 
                        console.error(data.error);
                    else {
                        this.ussd_id = data.fill.id;
                        var text = data.text;
                        text = text.replace("N _______",data.fill.CaseRegId);
                        text = text.replace("N:_________",data.fill.GnercId);
                        text = text.replace("_______",data.fill.phoneNumber);
                        text = text.replace("YYYY-MM-DD, HH:MM:SS",data.fill.Rd);
                        this.state.textinput.children[0].value = text;
                    }
                });
            },
            value: Number(val),
            title: "შედეგი"
        })

        return this.state.element.smsType
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
                    size: 120
                },
                {
                    field: "ოპერატორი",
                    size: 120
                },
                {
                    field: "ადრესატი",
                    size: 120
                },
                {
                    field: "ტექსტი",
                    size: 120
                },
                {
                    field: "სტატუსი",
                    size: 120
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

        if (!self.Incomming.TabSms) return false;
        self.Incomming.TabSms.remove();

    }

}