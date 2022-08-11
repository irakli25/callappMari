import Tdg from "../../../tdg.class.js";
import Input from "../../../components/input/input.class.js";
import Button from "../../../components/button/button.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__destroy, kendoResponsive } from "../../../helpers/kendo.helper.js";
import IncommingModal from "../incomming.modal.js";
import WorkGround from "../workGround.type.js";
import TabMail from "./mail.tab.js";
import Uploader from "../../../components/uploader/uploader.class.js";

export default class TabHistory extends Tdg {

    constructor() {
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.history = this;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: []
        }

        this.checkfordata();
    }

    checkfordata() {
        
        if (self.IncommingModal.fromtask) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }

        if (self.IncommingModal.crm) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.Crm.state.globalPhoneNumber;
        }
        
    }



    init = () => {

        self.Incomming.History = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            class: "historyTab",
            title: "ისტორია",
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Incomming.History;

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildDiv());
        this.append(this.state.div, this.buildStartDate());
        this.append(this.state.div, this.buildTire());
        this.append(this.state.div, this.buildEndDate());
        this.append(this.state.div, this.buildInputMobile());
        this.append(this.state.div, this.buildInputClient());
        this.append(this.state.div, this.buildfilterButton());

        this.append(this.state.fieldSet, this.buildDivTable());
        this.append(this.state.divtable, this.buildTable());
        kendoResponsive()

    }

    buildInputMobile = () => {
        this.state.element.inputmobile = new Input({
            type: "text",
            placeholderTitle: "ტელეფონის ნომერი",
            column: "2",
            id: "phone",
            value: self.WorkGround.state.globalPhoneNumber,
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputmobile
    }

    buildInputClient = () => {
        this.state.element.inputclient = new Input({
            type: "text",
            placeholderTitle: "აბონენტის ნომერი",
            column: "2",
            value: self.WorkGround.state.globalClientNumber,
            id: "client_number",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputclient
    }

    buildfilterButton = () => {
        this.state.element.button = new Button({
            text: "ძებნა",
            onclick: () => {
                kendo__destroy(this.state.table)
                this.state.divtable.remove();
                this.append(this.state.fieldSet, this.buildDivTable());
                this.append(this.state.divtable, this.buildTable());
            }
        })

        return this.state.element.button
    }

    buildStartDate = () => {
        this.state.element.startdate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startdate
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

    buildEndDate = () => {
        this.state.element.enddate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.enddate
    }

    buildDiv = () => {
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }
        })

        return this.state.div;
    }

    buildDivTable = () => {
        this.state.divtable = this.CreateElement({
            element: 'div',
            id: "removeKendo"
        })

        return this.state.divtable;
    }

    buildTable = () => {
        this.state.data = {
            route: "IncommingTabs",
            act: "getHistory",
            stardDate: this.state.element.startdate.value,
            endDate: this.state.element.enddate.value,
            phone: this.state.element.inputmobile.children[0].value,
            clientNum: this.state.element.inputclient.children[0].value
        }

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
                    field: "წყარო",
                    size: 120
                },
                {
                    field: "აბონენტი",
                    size: 120
                },
                {
                    field: "აბონენტის ნომერი",
                    size: 140
                },
                {
                    field: "ტელეფონის ნომერი",
                    size: 180
                },
                {
                    field: "კომენტარი",
                    size: 120
                },
                {
                    field: "შედეგი",
                    size: 120
                },
                {
                    field: "სტატუსი",
                    size: 120
                }
            ],
            data: this.state.data,
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.table;

    }

    tableDblClickHandler = async (cb) => {
        if (cb.proc_start > 0) {
            this.setProcesingDate(1, 0, cb.id);
        }

        var full_data = self.WorkGround;

        this.buildModal(null, {
            width: '70vw',
            height: '70vh',
            content: await this.getInfoTab("info",cb.id),
            buttons: {
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
                                        self.Incomming.tab.TabMail.state.requestData.forEach(o => {
                                            links += o.link + ",";
                                        })

                                        await this.getResponse({
                                            route: "IncommingTabs",
                                            act: "sendMail",
                                            email: self.Incomming.tab.TabMail.state.emailinput.children[0].children[0].value,
                                            cc: self.Incomming.tab.TabMail.state.ccinput.children[0].children[0].value,
                                            bcc: self.Incomming.tab.TabMail.state.bccinput.children[0].children[0].value,
                                            subject: self.Incomming.tab.TabMail.state.subjectinput.children[0].value,
                                            text: self.Incomming.tab.TabMail.state.textinput.children[0].children[0].value,
                                            inc_id: self.WorkGround.state.prop.id,
                                            send_record: self.Incomming.tab.TabMail.state.recordcheck.children[0].checked ? 1 : 0,
                                            attachment: links
                                        }).then((data) => {
                                            if (data[0].status) {
                                                self.Tdg.buildNotice({ msg: "მეილი გაგზავნილია" })
                                                self.Incomming.tab.TabMail.state.emailinput.children[0].children[0].value = "";
                                                self.Incomming.tab.TabMail.state.ccinput.children[0].children[0].value = "";
                                                self.Incomming.tab.TabMail.state.bccinput.children[0].children[0].value = "";
                                                self.Incomming.tab.TabMail.state.subjectinput.children[0].value = "";
                                                self.Incomming.tab.TabMail.state.textinput.children[0].children[0].value = "";
                                                self.Incomming.tab.TabMail.state.recordcheck.children[0].checked = false;
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
            confirmOnCancel: false,
            onClose: async () => {
               this.state.openModal = true
               self.WorkGround = full_data;
            }
        })

    }

    getInfoTab = async (key,incomming_id) => {
        this.state.sector = this.CreateElement({
            element:"div"
        })

        var prop = {
            id: incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            children: await new WorkGround(prop, true).init()
        })

        this.append(this.state.sector, this.state.infotab);

        return this.state.sector;
    }


    destroy = () => {

        if (!self.Incomming.History) return false;
        self.Incomming.History.remove();

    }

}