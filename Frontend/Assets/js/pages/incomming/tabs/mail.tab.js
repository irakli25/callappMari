import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import Input from "../../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendo_SelectedText, kendoResponsive } from "../../../helpers/kendo.helper.js";
import Selector from "../../../components/selector/selector.class.js";
import Uploader from "../../../components/uploader/uploader.class.js";

export default class TabMail extends Tdg {

    constructor() {
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.TabMail = this;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: [],
            insertmail: '',
            appendto: '',
            requestData: []
        }

        this.checkfordata()
    }

    checkfordata() {
        if (self.IncommingModal.crm) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.Crm.state.globalPhoneNumber;
        }
    }


    init = () => {

        self.Incomming.TabMail = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "Email",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Incomming.TabMail;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildAddButton());

        this.append(this.state.fieldSet, this.buildTable());
        kendoResponsive()


    }

    buildAddButton = () => {
        this.state.element.button = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '584px',
                    height: 'auto',
                    content: this.modalContent(),
                    buttons: {
                        save: {
                            name: "გაგზავნა",
                            onclick: async () => {

                                let links = "";
                                self.Incomming.tab.TabMail.state.requestData.forEach(o => {
                                    links += o.link + ",";
                                })

                                await this.getResponse({
                                    route: "IncommingTabs",
                                    act: "sendMail",
                                    email: this.state.emailinput.children[0].children[0].value,
                                    cc: this.state.ccinput.children[0].children[0].value,
                                    bcc: this.state.bccinput.children[0].children[0].value,
                                    subject: this.state.subjectinput.children[0].value,
                                    text: this.state.textinput.children[0].children[0].value,
                                    inc_id: self.WorkGround.state.prop.id,
                                    attachment: links
                                }).then((data) => {
                                    if (data[0].status) {
                                        kendo__refresh(this.state.table, 'table');
                                        self.Tdg.buildNotice({ msg: "მეილი გაგზავნილია" })
                                        this.state.emailinput.children[0].children[0].value = "";
                                        this.state.ccinput.children[0].children[0].value = "";
                                        this.state.bccinput.children[0].children[0].value = "";
                                        this.state.subjectinput.children[0].value = "";
                                        this.state.textinput.children[0].children[0].value = "";
                                        new Uploader({}).clean();
                                        self.Incomming.tab.TabMail.state.requestData = [];
                                    } else {
                                        self.Tdg.buildNotice({ msg: "მეილი არ გაიგზავნა" })
                                    }

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


    modalContent = (show = false) => {

        this.state.mailmodalcontent = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "Email შეტყობინება",
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
        }, this.buildShablonButton(), this.buildEmailInput(), this.buildCcInput(), this.buildBccInput(), this.buildSubjectInput(), this.buildTextInput()))

        if (show) {
            this.state.mailmodalcontent = this.CreateElement({
                element: "div",
                attributes: ["fieldset"],
                title: "Email შეტყობინება",
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
            }, this.buildShablonButton(), this.buildEmailInput(), this.buildCcInput(), this.buildBccInput(), this.buildSubjectInput(), this.buildRecordChecker(), this.buildTextInput()))

            this.appedValuesTotextarea();
        }

        return this.state.mailmodalcontent;
    }

    appedValuesTotextarea = async () => {
        var infoinputs = [];

        var tmp = await this.getResponse({
            route: "Automator",
            act: "getGeneratedInputs",
            pageKey: "incommingRequest",
            id: this.state.prop.id
        })

        tmp.forEach(o => {
            if (o.fieldsetName != "მომართვის ინფო") {
                infoinputs.push(o);
            }
        })


        infoinputs.forEach(el => {
            if (el.tabs) {
                el.tabs.forEach(tab => {
                    tab.inputs.forEach(input => {
                        if (this.state.textinput.children[0].children[0].value != "") {
                            this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + input.input_name + ": " + input.input_value;
                        } else {
                            this.state.textinput.children[0].children[0].value = input.input_name + ": " + input.input_value;
                        }
                    });
                })
            }

            if (el.inputs) {
                el.inputs.forEach(input => {
                    if (input.input_type == "multilevelselect") {
                        if (input.level_1_name) {
                            this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + input.level_1_name + ": " + input.level_1_value;
                            this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + input.level_2_name + ": " + input.level_2_value;
                            this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + input.level_3_name + ": " + input.level_3_value;
                        }
                    } else {
                        if (input.input_name) {
                            this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + input.input_name + ": " + input.input_value;
                        }
                    }

                });
            }
        });
    }

    buildRecordChecker = () => {
        this.state.recordcheck = this.CreateElement({
            element: "div",
            style: {
                'display': 'flex',
                'gap': '6px',
                'flex-wrap': 'wrap',
                'align-items': 'center',
                'font-size': '12px',
                'font-family': 'BPG2',
                'font-weight': '700'
            }
        }, this.CreateElement({
            element: "input",
            type: "checkbox"
        }), this.CreateElement({
            element: "span",
            text: "ჩანაწერი"
        }))

        return this.state.recordcheck;
    }


    buildEmailInput = () => {
        this.state.emailinput = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: "10px",
                flexWrap: 'wrap'
            }
        }, new Input({
            type: "text",
            placeholderTitle: "ადრესატი",
            style: {
                minWidth: '175px',
                maxWidth: '407px',
                width: '23vw'
            }
        }).build(), this.buildCnobarButton(1));

        return this.state.emailinput;
    }

    buildCcInput = () => {
        this.state.ccinput = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: "10px",
                flexWrap: 'wrap'
            }
        }, new Input({
            type: "text",
            placeholderTitle: "CC",
            style: {
                minWidth: '175px',
                maxWidth: '407px',
                width: '23vw'
            }
        }).build(), this.buildCnobarButton(2));

        return this.state.ccinput;
    }

    buildBccInput = () => {
        this.state.bccinput = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: "10px",
                flexWrap: 'wrap'
            }
        }, new Input({
            type: "text",
            placeholderTitle: "BCC",
            style: {
                minWidth: '175px',
                maxWidth: '407px',
                width: '23vw'
            }
        }).build(), this.buildCnobarButton(3));

        return this.state.bccinput;
    }

    buildSubjectInput = () => {
        this.state.subjectinput = new Input({
            type: "text",
            placeholderTitle: "სათაური",
            style: {
                minWidth: '175px',
                maxWidth: '407px',
                width: '23vw'
            }
        }).build();

        return this.state.subjectinput;
    }

    buildTextInput = () => {
        this.state.textinput = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: "10px",
                alignItems: 'baseline'
            }
        }, new Input({
            type: "textarea",
            placeholderTitle: "შეტყობინება",
            style: {
                maxWidth: "517px",
                minHeight: "180px",
                width: '28vw',
                margin: '0px',
                height: '180px',
                minWidth: '175px'
            }
        }).build(), this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/plus.svg",
            onclick: this.addfile,
            style: {
                marginBottom: '4px',
                cursor: "pointer"
            }
        }))

        return this.state.textinput;
    }

    addfile = () => {
        let param = {
            table: this.state.table,
            inc_id: this.state.prop.id,
            append_to: this.state.mailmodalcontent.children[0],
            req: "mail"
        }

        new Uploader(param).init();
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
                act: "getShablonMail",
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
                if (this.state.textinput.children[0].children[0].value != "") {
                    this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + callback.shinaarsi;
                } else {
                    this.state.textinput.children[0].children[0].value = callback.shinaarsi;
                }

            }
        })))

        return content;
    }

    cnobarContent = () => {
        let content = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ცნობარი",
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
                    field: "დასახელება"
                },
                {
                    field: "Email"
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getCnobar",
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
                this.state.cnobarmodal.close()
                if (this.state.insertmail == 1) {
                    this.state.emailinput.children[0].children[0].value = callback.Email;
                } else if (this.state.insertmail == 2) {
                    this.state.ccinput.children[0].children[0].value = callback.Email;
                } else if (this.state.insertmail == 3) {
                    this.state.bccinput.children[0].children[0].value = callback.Email;
                }
            }
        })))

        return content;
    }

    buildShablonButton = () => {

        this.state.selectorkendo = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ხელმოწერა",
            onchange: (e) => {
                var id = kendo_SelectedID(this.state.selectorkendo);
                if (id > 0) {
                    var value = kendo_SelectedText(this.state.selectorkendo);
                    if (this.state.textinput.children[0].children[0].value != "") {
                        this.state.textinput.children[0].children[0].value = this.state.textinput.children[0].children[0].value + "\n" + value;
                    } else {
                        this.state.textinput.children[0].children[0].value = value;
                    }
                }

            },
            data: {
                route: "IncommingTabs",
                act: "getSignature"
            }
        })


        this.state.element.shablonbutton = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: "10px",
                flexWrap: 'wrap'
            }
        }, new Button({
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
                            name: "შენახვა",
                            onclick: async () => {


                            },
                            access: "save"
                        }
                    }
                })

            }
        }), this.state.selectorkendo)


        return this.state.element.shablonbutton
    }

    buildCnobarButton = (num) => {

        this.state.element.cnobarbutton = new Button({
            text: "ცნობარი",
            fielndnum: num,
            onclick: (e) => {
                this.state.insertmail = e.target.getAttribute("fielndnum");
                this.state.cnobarmodal = this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.cnobarContent(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: async () => {


                            },
                            access: "save"
                        }
                    }
                })
            }
        })

        return this.state.element.cnobarbutton
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
                    field: "ადრესატი",
                    size: 120
                },
                {
                    field: "გამგზავნი",
                    size: 120
                },
                {
                    field: "სტატუსი",
                    size: 120
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getMail",
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

        if (!self.Incomming.TabMail) return false;
        self.Incomming.TabMail.remove();

    }

}