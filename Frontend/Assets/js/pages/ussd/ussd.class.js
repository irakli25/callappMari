import Button from "../../components/button/button.class.js";
import Uploader from "../../components/uploader/uploader.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive } from "../../helpers/kendo.helper.js";
import Tdg from "../../tdg.class.js";
import UssdModal from "./ussd.modal.js";

export default class Ussd extends Tdg {

    constructor() {
        super();
        self.Ussd = this;

        this.state = {
            sectionName: document.querySelector("section[ussd]"),
            element: [],
            savedInputValues: [],
            openModal: true
        }

        document.title = "USSD";

        this.removeLoading()

        this.init();
    }


    init = () => {
        this.append(this.state.sectionName, this.Filterblock());


        this.append(this.state.element.filterBlock, this.startDateTime())
        this.append(this.state.element.filterBlock, this.buildTire());
        this.append(this.state.element.filterBlock, this.endDateTime())

        this.append(this.state.sectionName, this.createDivForMultiselect())
        this.append(this.state.element.filterBlock, this.Filter())
        this.append(this.state.sectionName, this.buildDivForBtn())

        this.append(this.state.sectionName, this.buildDivForTable())
        this.append(this.state.element.tablediv, this.createTable())
        kendoResponsive()

    }

    createDivForMultiselect = () => {
        this.state.element.divselect = this.CreateElement({
            element: "divselect",
            style: {
                'margin': '-10px'
            }
        })
        return this.state.element.divselect
    }


    buildDivForBtn = () => {

        this.state.element.btndiv = this.CreateElement({
            element: "div",
            class: "divforbtn"
        })

        return this.state.element.btndiv;
    }

    buildDivForTable = () => {

        this.state.element.tablediv = this.CreateElement({
            element: "div",
            class: "divfortable"
        })

        return this.state.element.tablediv;
    }

    buildTire = () => {
        this.state.element.tire = this.CreateElement({
            element: "span",
            children: "-",
            style: {
                fontSize: '24px'
            }
        })

        return this.state.element.tire
    }


    startDateTime = () => {

        this.state.element.startDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startDateTime
    }

    endDateTime = () => {

        this.state.element.endDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.endDateTime
    }

    Filter = () => {

        this.state.element.Filter = new Button({
            text: "ფილტრი",
            onclick: async () => {

                kendo__destroy(this.state.element.table);
                this.state.element.tablediv.remove();
                this.append(this.state.sectionName, this.buildDivForTable())
                this.append(this.state.element.tablediv, this.createTable())

            }
        })

        return this.state.element.Filter
    }


    Filterblock = () => {

        this.state.element.filterBlock = this.CreateElement({
            element: "filterblock"
        })

        return this.state.element.filterBlock;

    }



    createTable = () => {


        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "source",
                    hidden: true
                },
                {
                    field: "chat_id",
                    hidden: true
                },
                {
                    field: "თარიღი",
                    size: 100
                },
                {
                    field: "ოპერატორი",
                    size: 100
                },
                {
                    field: "ტელეფონი",
                    size: 100
                },
                {
                    field: "შეტყობინების ტიპი",
                    size: 100
                },
                {
                    field: "რეგისტრ ნომ შიდა",
                    size: 100
                },
                {
                    field: "რაიონი",
                    size: 100
                },
                {
                    field: "მისამართი",
                    size: 100
                },
                {
                    field: "time",
                    hidden: true
                },
                {
                    field: "პას პირი",
                    size: 100
                },
                {
                    field: "damushavebuli",
                    hidden: true
                },
                {
                    field: "call_type",
                    hidden: true
                },
                {
                    field: "call_status",
                    hidden: true
                },
                {
                    field: "სტატუსი",
                    template: `<div style="height: 22px;">
                                    <div style="display: flex; gap: 7px; align-items: center; justify-content: center; margin-right: 15px">
                                        # if (source == "phone") { #
                                            # if(call_type == 1 || call_type == 2){ #                             
                                                <img src="Frontend/Assets/images/icons/incomming/#if(call_type == 1){#inc.svg#}else if(call_type == 2){#out.svg#}#">
                                            # } else { #  
                                                # if(call_type == 5) { # 
                                                    <img src="Frontend/Assets/images/icons/incomming/out.svg">
                                                    <img src="Frontend/Assets/images/icons/incomming/autodialer.svg"> 
                                                # } #
                                            #} #
                                        # } else { # 
                                            <svg viewBox="0 0 20 20" key="#: source#" width="20" height="20">
                                                <use xlink:href="Frontend/Assets/images/icons/icons.svg\\\\\##: source#" />
                                            </svg>
                                            # } #
                                    </div>
                                    <span style="position: absolute;right: 10px;top: 10px;"><img src="Frontend/Assets/images/icons/incomming/more.svg"></span> 
                                    # if (call_status == 9 || call_status == 12) { #
                                        <span style="position: absolute; right: 0; background-color: var(--red);top: 0; height: 99%; padding: 0px 2.5px;"></span>
                                    # } else { # 
                                        <span style="position: absolute; right: 0; background-color: var(#if(damushavebuli > 0){# --green #}else{# --orange #}#);top: 0; height: 99%; padding: 0px 2.5px;"></span>
                                    # } #
                                </div>`,
                    size: "120px",
                    size: 100
                },
                {
                    field: "proc_start",
                    hidden: true
                },
                {
                    field: "proc_end",
                    hidden: true
                },
                {
                    field: "source_id",
                    hidden: true
                },
                {
                    field: "call_log_id",
                    hidden: true
                },
            ],
            data: {
                route: "Ussd",
                act: "getList",
                startDate: this.state.element.startDateTime.value,
                endDate: this.state.element.endDateTime.value
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;

    }

    ussdSaveButton(modal = '', prop = {}) {
        self.Ussd.state.savedInputValues = [];
        self.WorkGround.state.inputs.forEach(x => self.Ussd.getInputDatas(x));
        self.WorkGround.state.addInput.forEach(x => x.forEach(y => self.Ussd.getInputDatas(y)));

        self.Tdg.getResponse({
            route: "Automator",
            act: "saveModalData",
            pageKey: "incommingRequest",
            id: self.WorkGround.state.prop.id,
            ...self.Ussd.state.savedInputValues
        }).then(async function (data) {

            if (self.WorkGround.state.prop.sourceKey) self.WorkGround.state.prop.source = self.WorkGround.state.prop.sourceKey

            if (data.message == 'OK' && self.WorkGround.state.prop.source != 'phone') {
                await self.Tdg.getResponse({
                    route: "ussd",
                    act: "closeSession",
                    chatId: self.chatPanel.state.prop.id,
                    source: self.chatPanel.state.prop.source
                })
            }
            // modal.close().destroy()

            self.Ussd.buildNotice({ msg: "მომართვა დამუშავებულია" });
            kendo__refresh(self.Ussd.state.element.table, 'table');
        })
    }

    getInputDatas = (input) => {

        if (input.getAttribute("id") == "telefoni___987--1--1" || input.getAttribute("id") == "telefoni___396--21--1") {
            if (this.state.prop) {
                self.WorkGround.state.globalPhoneNumber = input.value == "" ? this.state.prop.telefoni : input.value
            } else {
                self.WorkGround.state.globalPhoneNumber = input.value;
            }
        }

        if (input.getAttribute("id") == "abonenti___079--7--1") {
            self.WorkGround.state.globalClientName = input.value;
        }

        switch (input.getAttribute("type")) {
            case "text":
                self.Ussd.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "textarea":
                self.Ussd.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "date":
                self.Ussd.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "datetime":
                self.Ussd.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "radio":

                break;
            case "checkbox":

                break;
            case "selector":
                self.Ussd.state.savedInputValues[input.getAttribute("id")] = kendo_SelectedID(input);
                break;
            case "multiselect":

                break;
        }
    }

    /**
     * 
     * @param {callback} cb 
     */
    tableDblClickHandler = (cb) => {

        if (cb.source_id == 16) {
            cb.source = "phone";
        }

        cb.fromussd = true;

        this.buildModal(null, {
            width: '100vw',
            height: '100vh',
            content: new UssdModal({
                ...cb
            }).init(),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: this.ussdSaveButton,
                    access: "save"
                },
                sendMail: {
                    name: "მეილზე გაგზავნა",
                    style: {
                        backgroundColor: "#d10000",
                    },
                    onclick: () => {
                        this.buildModal(null, {
                            width: '40vw',
                            maxWidth: '584px',
                            height: 'auto',
                            content: new TabMail().modalContent(true),
                            buttons: {
                                save: {
                                    name: "გაგზავნა",
                                    onclick: async () => {
                                        this.state.openModal = true
                                        let links = "";
                                        self.Ussd.tab.TabMail.state.requestData.forEach(o => {
                                            links += o.link + ",";
                                        })

                                        await this.getResponse({
                                            route: "ussdTabs",
                                            act: "sendMail",
                                            email: self.Ussd.tab.TabMail.state.emailinput.children[0].children[0].value,
                                            cc: self.Ussd.tab.TabMail.state.ccinput.children[0].children[0].value,
                                            bcc: self.Ussd.tab.TabMail.state.bccinput.children[0].children[0].value,
                                            subject: self.Ussd.tab.TabMail.state.subjectinput.children[0].value,
                                            text: self.Ussd.tab.TabMail.state.textinput.children[0].children[0].value,
                                            inc_id: self.WorkGround.state.prop.id,
                                            send_record: self.Ussd.tab.TabMail.state.recordcheck.children[0].checked ? 1 : 0,
                                            attachment: links
                                        }).then((data) => {
                                            if (data[0].status) {
                                                self.Tdg.buildNotice({ msg: "მეილი გაგზავნილია" })
                                                self.Ussd.tab.TabMail.state.emailinput.children[0].children[0].value = "";
                                                self.Ussd.tab.TabMail.state.ccinput.children[0].children[0].value = "";
                                                self.Ussd.tab.TabMail.state.bccinput.children[0].children[0].value = "";
                                                self.Ussd.tab.TabMail.state.subjectinput.children[0].value = "";
                                                self.Ussd.tab.TabMail.state.textinput.children[0].children[0].value = "";
                                                self.Ussd.tab.TabMail.state.recordcheck.children[0].checked = false;
                                                new Uploader({}).clean();
                                            } else {
                                                self.Tdg.buildNotice({ msg: "მეილი არ გაიგზავნა" })
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }
                }
            },
            confirmOnCancel: true,
            onClose: () => {
                this.state.openModal = true
            }
        })

    }

}