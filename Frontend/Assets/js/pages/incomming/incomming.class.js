import Button from "../../components/button/button.class.js";
import Tdg from "../../tdg.class.js"
import IncommingModal from "./incomming.modal.js";
import Flashpanel from "../../layouts/flashpanel.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive } from "../../helpers/kendo.helper.js";
import TabMail from "./tabs/mail.tab.js";
import Uploader from "../../components/uploader/uploader.class.js";
import WorkGround from "./workGround.type.js";
import TaskModal from "../task/task.modal.js";

export default class Incomming extends Tdg {

    constructor(props) {
        super();
        self.Incomming = this;

        this.state = {
            sectionName: document.querySelector("section[incomming]"),
            element: [],
            flashpanel: new Flashpanel(props).init(),
            savedInputValues: [],
            openModal: true,
            ...props
        }

        document.title = "Incomming";

        this.removeLoading()

        this.init();

        document.addEventListener('oncall', async (e) => {
            let id = this.getParam('id');
            
            if(id != 11) return false;
            if (this.state.openModal && e.detail.result != null) {

                if (!e.detail.result.incommingId) return false;

                let checkData = await this.checkCallStatus(e.detail.result.incommingId);
                if (checkData.data.processing_status != 0) return false
                this.tableDblClickHandler({ source: "phone", id: checkData.data.id, queue_number: e.detail.result.queue_number });

                this.state.openModal = false;
            }

        })

    }



    init = () => {


        this.append(this.state.sectionName, this.Filterblock());


        this.append(this.state.element.filterBlock, this.startDateTime())
        this.append(this.state.element.filterBlock, this.buildTire());
        this.append(this.state.element.filterBlock, this.endDateTime())

        this.append(this.state.element.filterBlock, this.operators())
        this.append(this.state.element.filterBlock, this.sources())
        this.append(this.state.element.filterBlock, this.allStatus())

        this.append(this.state.sectionName, this.createDivForMultiselect())
        this.append(this.state.element.filterBlock, this.Filter())
        this.append(this.state.sectionName, this.buildDivForBtn())
        this.append(this.state.element.btndiv, this.addNewData())

        this.append(this.state.sectionName, this.buildDivForTable())
        this.append(this.state.element.tablediv, this.createTable())
        kendoResponsive()

    }

    checkCallStatus = async (_id) => {

        return await this.getResponse({
            route: "call",
            act: 'checkCallStatus',
            ns: "Helpers",
            _id: _id
        })

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


    addNewData = () => {

        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {
                var cb = await this.getResponse({
                    route: "Incomming",
                    act: "insertData",
                })
                this.buildModal(null, {
                    width: '100vw',
                    height: '100vh',
                    content: new IncommingModal({
                        ...cb
                    }).init(),
                    buttons: {
                        save: {
                            name: "დამატება",
                            onclick: async (e) => {
                                var data = await this.getResponse({
                                    route: "Incomming",
                                    act: "updateData",
                                    id: cb.id
                                })

                                if (data.status == "OK") {
                                    this.incommingSaveButton(e,{},0);
                                } else {
                                    self.Tdg.buildNotice({ msg: "ტექნიკური ხარვეზი" });
                                }

                            },
                            access: "add"
                        }
                    },
                    confirmOnCancel: false,
                    onClose: () => {
                        this.state.openModal = true
                    }
                })
            },
            access: "add"
        })

        return this.state.element.addbutton;
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
                var multiselectdata = event.target.parentNode.children[0].children[0].children[0];

                var multiselectdataId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[7].children[0].children[1].children[0].getAttribute('id');

                //console.log(multiselectdataId)

                multiselectdata.style.cssText = "color: #3FB969; width: auto; height: 26px; background: #fff; border-radius: 4px; padding: 5px 10px; font-size: 12px; font-family: 'BPG';border: none; margin-bottom: 10px; margin-left: 10px;margin-top: 18px;";

                this.state.element.multiselectDiv = this.CreateElement({
                    element: "multiselect-div",
                    onClick: (el) => {
                        // $(el.target).parent().parent().parent().remove();
                        multiselectdata.remove();
                        // var element = document.getElementsByClassName("k-item");
                        // element.classList.remove("k-state-selected");
                    }
                }, multiselectdata)

                this.append(this.state.element.divselect, this.state.element.multiselectDiv)
            },
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
                var multiselectdata = event.target.parentNode.children[0].children[0].children[0];

                multiselectdata.style.cssText = "color: #FD0A50; width: auto; height: 26px; background: #fff; border-radius: 4px; padding: 5px 10px; font-size: 12px; font-family: 'BPG2';border: none; margin-bottom: 10px; margin-left: 10px;margin-top: 18px;";

                this.state.element.multiselectDivAllStatus = this.CreateElement({
                    element: "multiselect-div",
                    onClick: (el) => {
                        // $(el.target).parent().parent().parent().remove();
                        multiselectdata.remove();
                    }
                }, multiselectdata)

                this.append(this.state.element.divselect, this.state.element.multiselectDivAllStatus)
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



    audioPlayer = (src) => {

        let audio = this.CreateElement({
            element: 'audio',
            controls: '',
            type: 'audio/wav',
            style: {
                display: "none"
            },
            children: `<source src="${src}">`
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
                //console.log(curTime)
                if (isPlaying) {
                    audio.pause();
                    isPlaying = false;
                    play.innerHTML = `►`;
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
                //console.log('clicked')
            }
        }, play)


        return audioElement

    }

    createTooltipSpan = () => {
        this.state.element.tooltip = this.CreateElement({
            element:"span",
            class: "tooltiptext",
            id:"tooltiptext",
            text: ""
        })

        return this.state.element.tooltip
    }

    createTable = () => {


        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "incommingTable",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "operator_id",
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
                    field: "ussd_id",
                    hidden: true
                },
                {
                    field: "თარიღი",
                    size: 100,
                },
                {
                    field: "ოპერატორი",
                    size: 100,
                },
                {
                    field: "ტელეფონი",
                    size: 100,
                },
                {
                    field: "რიგი",
                    size: 100,
                },
                {
                    field: "აბონენტი",
                    size: 100,
                },
                {
                    field: "abonentis_nom",
                    hidden: true
                },
                {
                    field: "abonentis_nom_ussd",
                    hidden: true
                },
                {
                    field: "აბონენტის ნომერი",
                    size: 100,
                    template: `<span># if(abonentis_nom != null) { 
                                    # <span>#= abonentis_nom #</span># 
                                     #                     
                                # }else { #  
                                    <span>#= (abonentis_nom_ussd == null) ? '' : abonentis_nom_ussd  #</span># 
                                    #                     
                               # } #</span>`
                },
                {
                    field: "კატეგორია",
                    size: 100,
                },
                {
                    field: "ქვე კატეგორია",
                    size: 100,
                },
                {
                    field: "რეაგირება",
                    size: 100,
                },
                {
                    field: "time",
                    hidden: true
                },
                {
                    field: "მოსმენა",
                    template: `<span id='mosmena_gadmowera'># if(time != null) { #  #= time # 
                                # if(mosmena != null) { # <player><span class='audio' data-bound='#= mosmena #'>►</span></player> <a class="download-ico-txt" href='http://10.0.18.19/records/#= mosmena #' target='_blank'><img class="download-ico" src="Frontend/Assets/images/icons/download.svg"></a>  #} #                     
                                # } #</span>`,
                    size: 100,
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
                    size: 100,
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
                {
                    field: "mail_id",
                    hidden: true
                },
                {
                    field: "queue_number",
                    hidden: true
                }
            ],
            onmouseover:(e) => {
                if (e.target.innerText != "" ){
                    var title=(e.target.innerText);
                    this.state.element.table.title =  title;
                }
            },
            data: {
                route: "Incomming",
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
            ondblclick: this.tableDblClickHandler,
            onload: (cb) => {

                $('.audio').each((i, x) => {
                    let link = $(x).attr("data-bound")

                    // $(x).css('display', "none");

                    if (link != 'null') {

                        // $(x).css('display', "none");
                        // $(x).after(this.audioPlayer(`http://10.0.18.19/records/${link}`))

                        $(x).click(() => {
                            this.openPlayer(link)
                        })
                        
                    }


                })

            }
        })

        return this.state.element.table;

    }


    openPlayer = (link) => {

        this.buildModal(null, {
            title: "მოსმენა",
            width: "400px",
            height: "70px",
            content: `<div style="display: flex; height: 100%; justify-content: center; align-items: center"><audio autoplay controls="controls"><source type="audio/wav" src="http://10.0.18.19/records/${link}"></audio></div>`
            
        })

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
                        onclick: (e) => {
                          if(document.getElementById("reagireba_statusi_--14--8").value != 3 ){ 
                            if(cb.source == "ussd")
                                self.Tdg.getResponse({route: "Ussd", act: "changeUserId", id: cb.id});
                            this.incommingSaveButton(e, { operator_id: cb.operator_id }, 1)
                          }else {
                            if(cb.source == "ussd")
                                self.Tdg.getResponse({route: "Ussd", act: "changeUserId", id: cb.id});
                                this.incommingSaveButton(e, { operator_id: cb.operator_id }, 1)
                          }
                        },
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
                onClose: () => {
                    this.state.openModal = true
                }
            })
        }

    }

    incommingSaveButton = (modal = '', prop = {},fromothetab = 0) => {
        self.Incomming.state.savedInputValues = [];
        self.WorkGround.state.inputs.forEach(x => self.Incomming.getInputDatas(x));
        self.WorkGround.state.addInput.forEach(x => x.forEach(y => self.Incomming.getInputDatas(y)));

        
        if(!(self.WorkGround.state.reagireba_status > 0) || fromothetab == 0){
            self.Incomming.saveModal(prop);
        }
        else if((self.WorkGround.state.reagireba_status == 3) || fromothetab == 0){
            self.Incomming.saveModal(prop);
        }
        else{
            this.buildModal(null, {
                width: '54vw',
                height: '28vh',
                content: new TaskModal({ id: 0, inc_id: self.WorkGround.state.prop.id , onSave: true}).init(),
                buttons: {
                    save: {
                        name: "დავალების დამატება",
                        onclick: function (modal) {
                            var depids=`${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_department'])}`;
                            if(depids==''){
                                alert("გთხოვთ აირჩიოთ განყოფილება");
                            }else{
                                self.Tdg.getResponse({
                                    route: "Task",
                                    act: "ADD",
                                    start_date: self.TaskCase.state.dateinput['start_date'].value,
                                    end_date: self.TaskCase.state.dateinput['end_date'].value,
                                    phone: self.TaskCase.state.inputtext['phone'].children[0].value,
                                    abonent: self.TaskCase.state.inputtext['abonent'].children[0].value,
                                    request_number: self.TaskCase.state.inputtext['mom_nuber'].children[0].value,
                                    //task_status_child_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status2']),
                                    task_status_parent_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status']),
                                    dep_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_department'])}`,
                                    group_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_group'])}`,
                                    user_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['responsible_user'])}`,
                                    zeinkal_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['zeinkals'])}`,
                                    inc_id: self.WorkGround.state.prop.id,
                                    comment: self.TaskCase.state.inputtext['comment'].children[0].value,
                                    task_source_id: 1
                                }).then(function (data) {
                                    modal.close().destroy()
                                    self.Tdg.buildNotice({ msg: "დავალება დამატებულია" });
                                    self.Incomming.saveModal(prop);
                                })
                            }
                        },
                        access: "add"
                    },
                    cancel:{
                        name: "გაუქმება",
                        onclick: function (modal) {
                            modal.close().destroy()
                            self.Incomming.saveModal(prop);
                        },
                        access: "view"
                    }
                },
                confirmOnCancel: false
            })
        }
    }


    saveModal = (prop) => {

        this.setLoading("body");

        self.Tdg.getResponse({
            route: "Automator",
            act: "saveModalData",
            pageKey: "incommingRequest",
            id: self.WorkGround.state.prop.id,
            operator_id: prop.operator_id,
            ...self.Incomming.state.savedInputValues
        }).then(async (data) => {

            if (self.WorkGround.state.prop.proc_end > 0) {
                self.Incomming.setProcesingDate(0, 1, self.WorkGround.state.prop.id);
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
            this.removeLoading();
            self.Incomming.buildNotice({ msg: "მომართვა დამუშავებულია" });
            kendo__refresh(self.Incomming.state.element.table, 'table');
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

        if(input.getAttribute("id") == "reagireba_statusi_--14--8"){
            self.WorkGround.state.reagireba_status = input.value;
        }

        if (input.getAttribute("id") == "abonenti___079--7--1") {
            self.WorkGround.state.globalClientName = input.value;
        }

        switch (input.getAttribute("type")) {
            case "text":
                self.Incomming.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "textarea":
                self.Incomming.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "date":
                self.Incomming.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "datetime":
                self.Incomming.state.savedInputValues[input.getAttribute("id")] = input.value;
                break;
            case "radio":

                break;
            case "checkbox":

                break;
            case "selector":
                self.Incomming.state.savedInputValues[input.getAttribute("id")] = kendo_SelectedID(input);
                break;
            case "multiselect":

                break;
        }
    }




}