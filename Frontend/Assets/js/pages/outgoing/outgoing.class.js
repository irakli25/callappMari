import Button from "../../components/button/button.class.js";
import Tdg from "../../tdg.class.js"
import IncommingModal from "./outgoing.modal.js";
import Flashpanel from "../../layouts/flashpanel.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive} from "../../helpers/kendo.helper.js";
import TabMail from "./tabs/mail.tab.js";
import Uploader from "../../components/uploader/uploader.class.js";
import TabSms from "./tabs/sms.tab.js";

export default class Outgoing extends Tdg {

    constructor() {
        super();

        self.Outgoing = this;
        self.Tdg = this;

        this.state = {
            sectionName: document.querySelector("section[outgoing]"),
            element: [],
            flashpanel: new Flashpanel().init(),
            savedInputValues: [],
            openModal: true
        }

        document.title = "Outgoing";

        this.removeLoading()

        this.init();

    }

    // ohv = () => {

    //     this.incommingState.setState({
    //         ...this.incommingState.state
    //     })

    // }


    init = () => {


        this.append(this.state.sectionName, this.Filterblock());


        this.append(this.state.element.filterBlock, this.startDateTime())
        this.append(this.state.element.filterBlock, this.endDateTime())

        this.append(this.state.element.filterBlock, this.operators())
        this.append(this.state.element.filterBlock, this.sources())
        this.append(this.state.element.filterBlock, this.allStatus())

        this.append(this.state.element.filterBlock, this.Filter())

        this.append(this.state.sectionName, this.buildDivForTable())
        this.append(this.state.element.tablediv, this.createTable())
        kendoResponsive()

    }

    buildDivForTable = () => {

        this.state.element.tablediv = this.CreateElement({
            element: "div",
            style: {
                padding: '10px',
                background: 'var(--block-bg-color)',
                'border-radius': '7px'
            }
        })

        return this.state.element.tablediv;
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


    operators = () => {

        this.state.element.operators = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ყველა ოპერატორი",
            data: {
                route: "user",
                act: "getOperators",
                ns: "Helpers"
            },
            onLoad: (event) => {

            },
            onChange: (event) => {

            }
        })

        return this.state.element.operators
    }

    sources = () => {
        this.state.element.sources = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "ყველა კომ. არხი",
            data: {
                route: "source",
                act: "get",
                ns: "Helpers"
            },
            onLoad: (event) => {

            },
            onChange: (event) => {

            }
        })

        return this.state.element.sources
    }

    allStatus = () => {
        this.state.element.allStatus = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "ყველა სტატუსი",
            data: {
                route: "Incomming",
                act: "getAllStatus",
            },
            onLoad: (event) => {

            },
            onChange: (event) => {

            }
        })

        return this.state.element.allStatus
    }


    Filterblock = () => {

        this.state.element.filterBlock = this.CreateElement({
            element: "filterblock"
        })

        return this.state.element.filterBlock;

    }



    audioPlayer = () => {

        let audio = this.CreateElement({
            element: 'audio',
            controls: '',
            type: 'audio/wav',
            style: {
                display: "none"
            },
            children: `<source src="">`
        })

        var isPlaying = false;
        let curTime = {
            value: "00:00",
            max: "00:00"
        }
        let playTime = "00:00"

        audio.onloadedmetadata = function () {
            curTime.max = audio.duration;
        };


        audio.ontimeupdate = function () {

            var sec_num = audio.currentTime;
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            seconds = Math.round(seconds);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) { seconds = "0" + seconds; } playTime = minutes + ':' + seconds;
            if (isPlaying) curTime.value = audio.currentTime;
        };

        curTime.onchange = function () {
            audio.pause(); audio.currentTime = curTime.value; audio.play();
        };

        let play = this.CreateElement({
            element: "span",
            children: "►",
            onclick: () => {
                if (isPlaying) {
                    audio.pause();
                    isPlaying = false;
                    play.innerHTML = "►";
                }
                else {
                    audio.play();
                    isPlaying = true;
                    play.innerHTML = "❚❚";
                }
            }
        })

        let audioElement = this.CreateElement({
            element: 'player',
            onclick: () => {
                console.log('clicked')
            }
        }, play)


        return audioElement

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
                    field: "აბონენტი",
                    size: 100
                },
                {
                    field: "აბონენტის ნომერი",
                    size: 100
                },
                {
                    field: "კატეგორია",
                    size: 100
                },
                {
                    field: "რეაგირება",
                    size: 100
                },
                {
                    field: "time",
                    hidden: true
                },
                {
                    field: "მოსმენა",
                    template: (r) => {
                        let code;

                        if (r.time != null) {
                            code = r.time
                        } else {
                            code = '';
                        };

                        return code;
                    },
                    encoded: false,
                    size: 100
                },
                // template: `
                //     <span># if(time != null) { # #= time  #  # } #</span>
                //         ${this.audioPlayer()}
                //     `
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
                route: "Outgoing",
                act: "getList",
                startDate: this.state.element.startDateTime.value,
                endDate: this.state.element.endDateTime.value,
                operator: kendo_SelectedID(this.state.element.operators),
                sources: `${kendo__multiSelectedID(this.state.element.sources)}`,
                allstatus: `${kendo__multiSelectedID(this.state.element.allStatus)}`
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

    /**
     * 
     * @param {*} start 
     * @param {*} end 
     * @param {*} id 
     */
    setProcesingDate = (start, end, id) => {
        this.getResponse({
            route: "Incomming",
            act: "setProcesingdate",
            inc_id: id,
            start: start,
            end: end
        })
    }

    /**
     * 
     * @param {callback} cb 
     */
    tableDblClickHandler = (cb) => {
        if (!(cb.call_status == 9 || cb.call_status == 12)) {
            if (cb.proc_start > 0) {
                this.setProcesingDate(1, 0, cb.id);
            }

            if (cb.source_id == 16) {
                cb.source = "phone";
            }

            this.buildModal(null, {
                width: '100vw',
                height: '100vh',
                content: new IncommingModal({
                    ...cb
                }).init(),
                buttons: {
                    save: {
                        name: "შენახვა",
                        onclick: this.incommingSaveButton,
                        access: "view"
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
                                            self.Outgoing.tab.TabMail.state.requestData.forEach(o => {
                                                links += o.link + ",";
                                            })

                                            await this.getResponse({
                                                route: "IncommingTabs",
                                                act: "sendMail",
                                                email: self.Outgoing.tab.TabMail.state.emailinput.children[0].children[0].value,
                                                cc: self.Outgoing.tab.TabMail.state.ccinput.children[0].children[0].value,
                                                bcc: self.Outgoing.tab.TabMail.state.bccinput.children[0].children[0].value,
                                                subject: self.Outgoing.tab.TabMail.state.subjectinput.children[0].value,
                                                text: self.Outgoing.tab.TabMail.state.textinput.children[0].children[0].value,
                                                inc_id: self.WorkGround.state.prop.id,
                                                send_record: self.Outgoing.tab.TabMail.state.recordcheck.children[0].checked ? 1 : 0,
                                                attachment: links
                                            }).then((data) => {
                                                if (data[0].status) {
                                                    self.Tdg.buildNotice({ msg: "მეილი გაგზავნილია" })
                                                    self.Outgoing.tab.TabMail.state.emailinput.children[0].children[0].value = "";
                                                    self.Outgoing.tab.TabMail.state.ccinput.children[0].children[0].value = "";
                                                    self.Outgoing.tab.TabMail.state.bccinput.children[0].children[0].value = "";
                                                    self.Outgoing.tab.TabMail.state.subjectinput.children[0].value = "";
                                                    self.Outgoing.tab.TabMail.state.textinput.children[0].children[0].value = "";
                                                    self.Outgoing.tab.TabMail.state.recordcheck.children[0].checked = false;
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

    incommingSaveButton(modal = '', prop = {}) {
        self.Outgoing.state.savedInputValues = [];
        self.WorkGround.state.inputs.forEach(x => self.Outgoing.getInputDatas(x));
        self.WorkGround.state.addInput.forEach(x => x.forEach(y => self.Outgoing.getInputDatas(y)));

        self.Tdg.getResponse({
            route: "Automator",
            act: "saveModalData",
            pageKey: "incommingRequest",
            id: self.WorkGround.state.prop.id,
            ...self.Outgoing.state.savedInputValues
        }).then(async function (data) {

            if (self.WorkGround.state.prop.proc_end > 0) {
                self.Outgoing.setProcesingDate(0, 1, self.WorkGround.state.prop.id);
            }

            if (self.WorkGround.state.prop.sourceKey) self.WorkGround.state.prop.source = self.WorkGround.state.prop.sourceKey

            if (data.message == 'OK' && self.WorkGround.state.prop.source != 'phone') {
                await self.Tdg.getResponse({
                    route: "Incomming",
                    act: "closeSession",
                    chatId: self.chatPanel.state.prop.id,
                    source: self.chatPanel.state.prop.source
                })
            }
            // modal.close().destroy()

            self.Outgoing.buildNotice({ msg: "მომართვა დამუშავებულია" });
            kendo__refresh(self.Outgoing.state.element.table, 'table');
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

        if (input.getAttribute("id") == "input_003--7--1") {
            self.WorkGround.state.globalClientName = input.value;
        }


        switch (input.getAttribute("type")) {
            case "text":
                self.Outgoing.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "textarea":
                self.Outgoing.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "date":
                self.Outgoing.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "datetime":
                self.Outgoing.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "radio":

                break;
            case "checkbox":

                break;
            case "selector":
                self.Outgoing.state.savedInputValues[input.getAttribute("id")] = kendo_SelectedID(input);
                break;
            case "multiselect":

                break;
        }
    }


}