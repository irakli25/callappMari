import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Flashpanel from "../../layouts/flashpanel.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo_setValue, kendo_setValueByID, kendo__multiSelectedID, kendo__refresh, kendoResponsive } from "../../helpers/kendo.helper.js";
import Uploader from "../../components/uploader/uploader.class.js"

export default class Action extends Tdg {
    constructor() {
        super();
        self.Action = this;
        this.state = {
            sectionName: document.querySelector("section[action]"),
            element: [],
            flashpanel: new Flashpanel().init(),
            clickprocess: 0,
            pagesize: 100,
        }
        this.removeLoading();
        this.init();


    }

    init = async () => {
        this.append(this.state.sectionName, await this.buildTaskTabs());
        this.append(this.state.sectionName, this.buildActionButtons())
        this.append(this.state.actionButtons, this.buildFilterDatesArea());
        this.append(this.state.actionButtons, this.buildAddButton());
        this.append(this.state.actionButtons, this.buildArchiveButton());
        this.append(this.state.actionButtons, this.buildRemoveButton());
        this.append(this.state.sectionName, this.buildActionTable());
        this.append(this.state.actionTable, this.createActionTable());
        
        this.append(this.state.sectionName, this.createTooltipSpan());
        kendoResponsive();

        this.state.element.taskTabs.childNodes.forEach(tab => {
            if (tab.getAttribute("tab-id") == 1) {
                tab.click();
            }
        })

    }

    buildFilterStartDate = () => {
        this.state.ArchStartDate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.ArchStartDate;
    }

    buildFilterEndDate = () => {
        this.state.ArchEndDate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.ArchEndDate;
    }

    buildFilterDatesArea = () => {
        this.state.element.buildFilterDatesArea = this.CreateElement({
            element: "div",
            style: {
                display: "flex",
                alignItems: "center",
                gap: '12px'
            }
        }, this.buildFilterStartDate(), this.CreateElement({
            element: "tire",
            children: "-"
        }), this.buildFilterEndDate(), this.buildFilterButton())


        return this.state.element.buildFilterDatesArea
    }

    buildFilterButton = () => {
        this.state.element.buildFilterButton = new Button({
            children: `<div class="btn">ფილტრი </div>`,
            onclick: async () => {

                this.state.actionTable.innerHTML = '';
                this.append(this.state.actionTable, this.createActionTable());

            }
        })

        return this.state.element.buildFilterButton
    }

    getTabs = async () => {
        let tabData = await self.Tdg.getResponse({
            route: "Action",
            act: "getTabs"
        });

        return tabData;
    }

    buildTaskTabs = async () => {
        var tmp = [];
        tmp = await this.getTabs();

        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs"
        })

        tmp.forEach(el => {
            this.append(this.state.element.taskTabs, this.CreateElement({
                element: "tab",
                children: el.name,
                'tab-id': el.id,
                onclick: this.tabClick,
            }))
        })

        return this.state.element.taskTabs;

    }

    tabClick = (e) => {

        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");
        this.state.status_id = e.target.getAttribute("tab-id");
        this.state.actionTable.innerHTML = '';
        this.append(this.state.actionTable, this.createActionTable());



        if (this.state.status_id == 1 || this.state.status_id == 3) {
            this.state.element.addbuttonnew.style.display = "flex";
            this.state.element.addbuttonarch.style.display = "flex";
            this.state.element.buildFilterDatesArea.style.display = "none";
            this.state.pagesize = 100;
        } else {
            this.state.element.addbuttonnew.style.display = "none";
            this.state.element.addbuttonarch.style.display = "none";
            this.state.element.buildFilterDatesArea.style.display = "flex";
            this.state.pagesize = 10;
        }
    }
    

    getTabContent = (key) => {
        switch (key) {
            case "mimdinare":

                break;
        }
    }

    buildActionButtons = () => {
        this.state.actionButtons = this.CreateElement({
            element: "div",
            class: "actionbuttons",
            style: {
                position: "relative"
            }
        });

        return this.state.actionButtons;
    }

    buildActionTable = () => {
        this.state.actionTable = this.CreateElement({
            element: "div",
            class: "actiontable"
        })
        return this.state.actionTable
    }

    buildAddButton = () => {
        this.state.element.addbuttonnew = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {

                await self.Tdg.getResponse({
                    route: "Action",
                    act: "GETID"
                }).then(function (data) {
                    self.Action.state.news_id = data.id;
                })

                this.buildModal(null, {
                    width: '1600px',
                    height: '1068px',
                    content: this.createModalContent(),
                    buttons: {
                        save: {
                            name: "დამატება",
                            onclick: async function (modal) {

                                await self.Tdg.getResponse({
                                    route: "Action",
                                    act: "ADD",
                                    name: self.Action.state.element.infoinput.children[0].value,
                                    description: self.Action.state.element.descriptioninput.children[0].value,
                                    start_date: self.Action.state.element.datetime_start.value,
                                    end_date: self.Action.state.element.datetime_end.value,
                                    abonentrb: self.Action.state.element.inputab.children[0].value,
                                    raion_id: kendo_SelectedID(self.Action.state.element.selectorraion),
                                    disconnect_id: kendo_SelectedID(self.Action.state.element.selectordiscat),
                                    worker_id: kendo_SelectedID(self.Action.state.element.selectorworker),
                                    reason_id: kendo_SelectedID(self.Action.state.element.selectordisreas),
                                    restore_id: kendo_SelectedID(self.Action.state.element.selectorresstatus),
                                    newstype_id: kendo_SelectedID(self.Action.state.element.selectornewtype),
                                    tab_id: self.Action.state.status_id,
                                    id: self.Action.state.news_id
                                }).then(function (data) {
                                    modal.close().destroy();
                                    self.Tdg.buildNotice({ msg: "სიახლე დამატებულია" });
                                    kendo__refresh(self.Action.state.element.table, 'table');
                                })
                            },
                            access: "add"
                        }
                    },
                    confirmOnCancel: false
                })
            },
            access: "add"
        })

        return this.state.element.addbuttonnew
    }


    buildRemoveButton = () => {
        this.state.element.addbutton = new Button({
            type: "delete",
            text: "წაშლა",
            class: "delbtn",
            style: {
                "position": "absolute",
                "right": "10px"
            },
            onclick: function () {
                self.Action.kendoselected = self.Action.state.element.table.children[1].children[0].children[1].childNodes;

                let confirmModal = new jBox('Confirm', {
                    content: 'ნამდვილად გსურთ წაშლა?',
                    cancelButton: 'გაუქმება',
                    confirmButton: 'წაშლა',
                    zIndex: 'auto',
                    confirm: () => {
                        self.Action.kendoselected.forEach(data => {
                            if (data.classList.contains("k-state-selected")) {
                                self.Tdg.getResponse({
                                    route: "Action",
                                    act: "DELETE",
                                    id: data.children[0].innerHTML
                                }).then(function (data) {
                                    self.Tdg.buildNotice({ msg: "სიახლე წაშლილია" });
                                    kendo__refresh(self.Action.state.element.table, 'table');
                                })
                            }
                        });
                    },
                    cancel: function() {
                      confirmModal.close()
                    },
                    onCloseComplete: function(){
                      confirmModal.destroy()
                    }
                })
                confirmModal.open()

            },
            access: "delete"
        })

        return this.state.element.addbutton
    }

    buildFileVRemoveButton = () => {
        this.state.element.removebutton = new Button({
            type: "delete",
            text: "წაშლა",
            class: "delbtn",
            onclick: function () {
                self.Action.kendoselected = self.Action.state.element.table2.children[1].children[0].children[1].childNodes;

                self.Action.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Action",
                            act: "removeFile",
                            id: data.children[0].innerHTML
                        }).then(function (data) {
                            self.Tdg.buildNotice({ msg: "ჩანაწერი წაშლილია" });
                            kendo__refresh(self.Action.state.element.table2, 'table');
                        })
                    }

                });
            },
            access: "delete"
        })

        return this.state.element.removebutton;
    }

    buildFileRemoveButton = () => {
        this.state.element.removebutton = new Button({
            type: "delete",
            text: "წაშლა",
            onclick: function () {
                self.Action.kendoselected = self.Action.state.element.table1.children[1].children[0].children[1].childNodes;

                self.Action.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Action",
                            act: "removeFile",
                            id: data.children[0].innerHTML
                        }).then(function (data) {
                            self.Tdg.buildNotice({ msg: "ფაილი წაშლილია" });
                            kendo__refresh(self.Action.state.element.table1, 'table');
                        })
                    }

                });
            },
            access: "delete"
        })

        return this.state.element.removebutton;
    }

    buildArchiveButton = () => {
        this.state.element.addbuttonarch = new Button({
            type: "archive",
            text: "დაარქივება",
            onclick: function () {
                self.Action.kendoselected = self.Action.state.element.table.children[1].children[0].children[1].childNodes;

                self.Action.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "Action",
                            act: "ARCHIVE",
                            id: data.children[0].innerHTML
                        }).then(function (data) {
                            self.Tdg.buildNotice({ msg: "სიახლე დაარქივებულია" });
                            kendo__refresh(self.Action.state.element.table, 'table');
                        })
                    }
                });
            }
        })

        return this.state.element.addbuttonarch
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

    createActionTable = () => {
        let pagesize = this.state.pagesize;
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "actiontable",
            column: [
                {
                    field: "id",
                    size: 50,
                },
                {
                    field: "დასაწყისი",
                    size: 85,
                },
                {
                    field: "დასასრული",
                    size: 85,
                },
                {
                    field: "შინაარსი",
                    size: 80,
                },
                {
                    field: "რაიონი",
                    size: 70,
                },
                {
                    field: "წყვეტის კატეგორია",
                    size: 60,
                },
                {
                    field: "სამუშაოს შემსრულებელი",
                    size: 120,
                },
                {
                    field: "შეწყვეტის მიზეზი",
                    size: 60,
                },
                {
                    field: "აღ.სტატუსი",
                    size: 60
                },
                {
                    field: "აბ. რ_ბა",
                    size: 80,
                    aggregates: ["sum"],
                    aggregateTemplate: `ჯამი: #= sum #`
                },
                {
                    field: "ავტორი",
                    size: 90,
                },
                {
                    field: "url",
                    hidden: true
                },
                {
                    field: "მოსმენა",
                    name: "wav",
                    template: `<div id="downloadbtn" url="#: url #" style="height: 22px;cursor:pointer;">
                                    <div style="display: flex; gap: 7px; align-items: center; justify-content: center;">
                                    <img style="width: 23px;" src="Frontend/Assets/images/icons/download.svg"><span class="download-txt">ჩამოტვირთვა</>
                                    </div>
                                </div>`,
                    size: 80,
                }
            ],
            onmouseover:(e) => {
                if (e.target.innerText != "" ){
                    var title=(e.target.innerText);
                    this.state.element.table.title =  title;
                }
            },
            
            onload: (e) => {
                $(document).on("click", "#downloadbtn", (e) => {
                    var url = $(e.currentTarget).attr("url");
                    window.open(url, '_blank');
                })
                /************************** ნაგავი კოდი **************************/
                var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                                + (currentdate.getMonth()+1)  + "-" 
                                + currentdate.getDate() + " "  
                                + currentdate.getHours() + ":"  
                                + currentdate.getMinutes();
                datetime = Date.parse(datetime);
                var length = document.getElementById("actiontable").children[1].children[0].children[1].children.length;
                for (var i = 0; i<length; i++){
                    var enddatetime = document.getElementById("actiontable").children[1].children[0].children[1].children[i].children[2].innerText;
                    enddatetime = Date.parse(enddatetime);
                    if (datetime > enddatetime && !this.state.element.taskTabs.childNodes[1].classList.contains('active')) {
                        document.getElementById("actiontable").children[1].children[0].children[1].children[i].style.backgroundColor = "#FD0A50";
                    }
                }
                /************************** ნაგავი კოდი **************************/
                /**********  თუ გაქვთ უკეთესი იდეა, უკეთესად დაწერეთ **********/
            },
            data: {
                route: "Action",
                act: "getList",
                status_id: this.state.status_id,
                start_date: this.state.ArchStartDate.value,
                end_date: this.state.ArchEndDate.value
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true,
                search: true,
                count: pagesize
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }

    createModalContent = (id = 0) => {
        this.state.element.modalcontent = this.CreateElement({
            element: "div",
            class: "modalcontent"
        }, this.CreateElement({
            element: "div",
            class: "modalcontent-info"
        }, this.CreateElement({
            element: "div",
            class: "info-modal"
        }, this.createInfoModal(), this.createDescriptionModal()), this.CreateElement({
            element:"div",
            class: "details-modal"
        },this.createDetailsInfoModal(), this.CreateElement({
            element: "div",
            class: "tables"
        }, this.createVoiceFileModal(), this.createAttachedFilesModal()), this.historyTableModal())))

        this.GetDataForEdit(id);

        return this.state.element.modalcontent;
    }

    GetDataForEdit = async (id) => {
        if (id > 0) {

            // this.setLoading(this.state.element.modalcontent)

            await self.Tdg.getResponse({
                route: "Action",
                act: "EDIT",
                id: id
            }).then((data) => {
                if (data) {
                    self.Action.state.element.infoinput.children[0].value = data.name;
                    self.Action.state.element.descriptioninput.children[0].value = data.description;
                    self.Action.state.createdateinp.value = data.datetime;
                    self.Action.state.element.datetime_start.value = data.start_date;
                    self.Action.state.element.datetime_end.value = data.end_date;
                    self.Action.state.element.inputab.children[0].value = data.abonentrb;
                    kendo_setValue(self.Action.state.element.selectorraion, data.raion_id);
                    kendo_setValue(self.Action.state.element.selectordiscat, data.disconnect_category_id);
                    kendo_setValue(self.Action.state.element.selectorworker, data.worker_id);
                    kendo_setValue(self.Action.state.element.selectordisreas, data.disconnect_reason_id);
                    kendo_setValue(self.Action.state.element.selectorresstatus, data.restore_id);
                    kendo_setValue(self.Action.state.element.selectornewtype, data.news_type_id);
                    // this.removeLoading()
                }
            })
        }

    }

    createInfoModal = () => {
        this.state.element.infomodal = this.CreateElement({
            element: "div",
            class: "info"
        }, this.infoModalTitle(), this.CreateElement({
            element: "div",
            class: "infomodal-inputs"
        }, this.dateTimePicker(), this.infoModalInput(), this.dateTimePicker_start(), this.createDiv(), this.dateTimePicker_end()))

        return this.state.element.infomodal
    }

    infoModalTitle = () => {
        this.state.element.infomodaltitle = this.CreateElement({
            element: "h1",
            children: "ინფო",
            class: "actiontitle"
        })
        return this.state.element.infomodaltitle
    }

    dateTimePicker = () => {
        this.state.createdateinp = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "auto"
            },
            type: "datetime",
            disabled: "true"
        });

        this.state.element.datetime = this.CreateElement({
            element: "div",
            class: "datetime-div"
        }, this.state.createdateinp, this.CreateElement({
            element: "label",
            class: "datetimelabel",
            children: "ფორმირების თარიღი"
        }));
        return this.state.element.datetime;
    }

    infoModalInput = () => {
        this.state.element.infoinput = new Input({
            type: "text",
            placeholderTitle: "დასახელება",
            class: "actioninput"
        }).build()

        return this.state.element.infoinput
    }

    dateTimePicker_start = () => {
        this.state.element.datetime_start = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "auto"
            },
            type: "datetime"
        });

        this.state.element.datetime_startsector = this.CreateElement({
            element: "div",
            class: "datetime-div"
        }, this.state.element.datetime_start, this.CreateElement({
            element: "label",
            children: "პერიოდი",
            class: "datetimestart-label"
        }));
        return this.state.element.datetime_startsector;
    }

    createDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "div",
            children: "-",
            class: "tire"
        })

        return this.state.element.div

    }

    dateTimePicker_end = () => {
        this.state.element.datetime_end = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "auto",
                "align-self": "self-end"
            },
            type: "datetime"
        });
        return this.state.element.datetime_end;
    }


    createDescriptionModal = () => {
        this.state.element.descriptionmodal = this.CreateElement({
            element: "div",
            class: "description"
        }, this.descriptionModalTitle(), this.descriptionInput())

        return this.state.element.descriptionmodal
    }

    descriptionModalTitle = () => {
        this.state.element.descriptionmodaltitle = this.CreateElement({
            element: "h1",
            children: "აღწერა",
            class: "actiontitle"
        })

        return this.state.element.descriptionmodaltitle
    }

    descriptionInput = () => {
        this.state.element.descriptioninput = new Input({
            type: "textarea",
            placeholderTitle: "აღწერა",
            className: ["actioninput", "descriptioninput"]
        }).build()

        return this.state.element.descriptioninput
    }

    createDetailsInfoModal = () => {
        this.state.element.detailsmodal = this.CreateElement({
            element: "div",
            class: "details"
        }, this.createDetailsInfoTitle(), this.CreateElement({
            element: "div",
            class: "detail-inputs"
        }, this.districtSelector(), this.categorySelector(), this.workSelector(), this.discontinuingSelector(), this.restorationSelector(), this.createDetailsInput(), this.innovationSelector()))

        return this.state.element.detailsmodal

    }

    createDetailsInfoTitle = () => {
        this.state.element.detailstitle = this.CreateElement({
            element: "h1",
            children: "დეტალური ინფო",
            class: "actiontitle"
        })
        return this.state.element.detailstitle
    }

    districtSelector = () => {
        this.state.element.selectorraion = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "რაიონი",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getRegions"
            },
            style: {
                width: '200px'
            }
        });
        return this.state.element.selectorraion;
    }

    categorySelector = () => {
        this.state.element.selectordiscat = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "წყვეტის კატეგორია",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getDisconnectCategory"
            },
            style: {
                width: '200px'
            }
        });
        return this.state.element.selectordiscat;
    }

    workSelector = () => {
        this.state.element.selectorworker = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "სამუშაოს შემსრულებელი",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getWorker"
            },
            style: {
                width: '200px'
            }
        });
        return this.state.element.selectorworker;
    }

    discontinuingSelector = () => {
        this.state.element.selectordisreas = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "შეწყვეტის მიზეზი",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getDisconnectReason"
            },
            style: {
                width: '200px'
            }

        });
        return this.state.element.selectordisreas;
    }


    restorationSelector = () => {
        this.state.element.selectorresstatus = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "აღდგენის სტატუსი",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getRestore_Status"
            },
            style: {
                width: '200px'
            }

        });
        return this.state.element.selectorresstatus;
    }

    createDetailsInput = () => {
        this.state.element.inputab = new Input({
            type: "text",
            placeholderTitle: "აბონენტის რ-ობა",
            class: "detailsinput"
        }).build()
        return this.state.element.inputab
    }

    innovationSelector = () => {
        this.state.element.selectornewtype = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "სიახლის ტიპი",
            class: "details-multiselector",
            data: {
                route: "Action",
                act: "getNewsType"
            },
            style: {
                width: '200px'
            }
        });
        return this.state.element.selectornewtype;
    }

    createVoiceFileModal = () => {
        this.state.element.voicemodal = this.CreateElement({
            element: "div",
            class: "modal-3"
        }, this.createVoiceModalTitle(), this.CreateElement({
            element: "div",
            class: "voicemodal-div"
        }), this.CreateElement({
            element: "div",
            class: "button-div"
        }, this.createVoiceModalBtn(), this.createVoiceModalRemoveBtn()), this.createModalTable());
        return this.state.element.voicemodal
    }

    createVoiceModalTitle = () => {
        this.state.element.voicetitle = this.CreateElement({
            element: "h1",
            children: "ხმოვანი ჩანაწერები",
            class: "actiontitle"
        })
        return this.state.element.voicetitle
    }

    createVoiceModalBtn = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            class: "addbtn",
            onClick: () => this.importFiles("voice", this.state.element.table2),
            access: "add"
        })
        return this.state.element.addbutton
    }

    createVoiceModalRemoveBtn = () => {
        this.state.element.removebutton = new Button({
            type: "delete",
            text: "წაშლა",
            access: "delete"
        })
        return this.state.element.removebutton
    }


    createModalTable = () => {
        this.state.element.table2 = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    size: 90,
                },
                {
                    field: "ფაილის სახელი",
                    size: 110,
                },
                {
                    field: "რიგითობა",
                    size: 100,
                },
                {
                    field: "url",
                    hidden: true
                },
                {
                    field: "ჩამოტვირთვა",
                    template: `<div id="downloadbtn" url="#: url #" style="height: 22px;cursor:pointer;">
                                    <div style="display: flex; gap: 7px; align-items: center; justify-content: center; margin-right: 15px">
                                    <img style="width: 23px;" src="Frontend/Assets/images/icons/download.svg"><span>ჩამოტვირთვა</>
                                    </div>
                                </div>`,
                    size: 100,
                }
            ],
            onload: (e) => {
                $(document).on("click", "#downloadbtn", (e) => {
                    var url = $(e.currentTarget).attr("url");
                    window.open(url, '_blank');
                })
            },
            data: {
                route: "Action",
                act: "getFiles",
                uploaded_from: `voice`,
                row_id: self.Action.state.news_id
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
            ondblclick: this.voiceDblClick
        })
        return this.state.element.table2;
    }

    createAttachedFilesModal = () => {
        this.state.element.attachedfilesmodal = this.CreateElement({
            element: "div",
            class: "attached-files"
        }, this.attachedFilesTitle(), this.CreateElement({
            element: "div",
            class: "button-div"
        }, this.createAttachedFilesBtn(), this.createAttachedFilesRemoveBtn()), this.attachedFilesTable())

        return this.state.element.attachedfilesmodal;
    }

    attachedFilesTitle = () => {
        this.state.element.attachedFilesTitle = this.CreateElement({
            element: "h1",
            children: "მიმაგრებული ფაილები",
            class: "actiontitle"
        })
        return this.state.element.attachedFilesTitle;
    }

    createAttachedFilesBtn = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            onClick: () => this.importFiles("news", this.state.element.table1),
            access: "add"
        })
        return this.state.element.addbutton;
    }

    createAttachedFilesRemoveBtn = () => {
        this.state.element.removebutton = new Button({
            type: "delete",
            text: "წაშლა",
            access: "delete"
        })
        return this.state.element.removebutton
    }

    attachedFilesTable = () => {
        this.state.element.table1 = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    size: 90,
                },
                {
                    field: "თარიღი",
                    size: 100,
                },
                {
                    field: "დასახელება",
                    size: 100,
                },
                {
                    field: "url",
                    hidden: true
                },
                {
                    field: "ჩამოტვირთვა",
                    template: `<div id="downloadbtn" url="#: url #" style="height: 22px;cursor:pointer;">
                                    <div style="display: flex; gap: 7px; align-items: center; justify-content: center; margin-right: 15px">
                                    <img style="width: 23px;" src="Frontend/Assets/images/icons/download.svg"><span>ჩამოტვირთვა</>
                                    </div>
                                </div>`,
                    size: 100
                }
            ],
            onload: (e) => {
                $(document).on("click", "#downloadbtn", (e) => {
                    var url = $(e.currentTarget).attr("url");
                    window.open(url, '_blank');
                })
            },
            data: {
                route: "Action",
                act: "getFiles",
                uploaded_from: `news`,
                row_id: self.Action.state.news_id
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
            }
        })

        return this.state.element.table1;
    }

    tableDblClickHandler = async (cb) => {

        self.Action.state.news_id = cb.id;

        this.buildModal(null, {
            width: '1600px',
            height: '1068px',
            content: await this.createModalContent(cb.id),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: async function (modal) {
                        await self.Tdg.getResponse({
                            route: "Action",
                            act: "UPDATE",
                            name: self.Action.state.element.infoinput.children[0].value,
                            description: self.Action.state.element.descriptioninput.children[0].value,
                            start_date: self.Action.state.element.datetime_start.value,
                            end_date: self.Action.state.element.datetime_end.value,
                            abonentrb: self.Action.state.element.inputab.children[0].value,
                            raion_id: kendo_SelectedID(self.Action.state.element.selectorraion),
                            disconnect_id: kendo_SelectedID(self.Action.state.element.selectordiscat),
                            worker_id: kendo_SelectedID(self.Action.state.element.selectorworker),
                            reason_id: kendo_SelectedID(self.Action.state.element.selectordisreas),
                            restore_id: kendo_SelectedID(self.Action.state.element.selectorresstatus),
                            newstype_id: kendo_SelectedID(self.Action.state.element.selectornewtype),
                            id: cb.id
                        }).then(function (data) {
                            modal.close().destroy();
                            self.Tdg.buildNotice({ msg: "სიახლე დამატებულია" });
                            kendo__refresh(self.Action.state.element.table, 'table');
                        })
                    },
                    access: "save"
                }
            },
            confirmOnCancel: false
        })
    }

    voiceDialogContent = (value) => {

        this.state.voiceDialogContentInput = new Input({
            type: "number",
            placeholderTitle: "რიგითობა",
            class: "actioninput",
            value: value,
            style: {
                width: '238px'
            }
        }).build()

        var element = this.CreateElement({
            element: "tabcontent",
            children: this.state.voiceDialogContentInput,
            style: {
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'margin': 'auto',
                'margin-top': '12px'
            }
        })

        return element;
    }

    voiceDblClick = async (cb) => {

        //console.log(this.voiceDialogContent(cb.rigitoba));

        this.buildModal(null, {
            width: '255px',
            height: '70px',
            content: this.voiceDialogContent(cb.rigitoba),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: async (modal) => {

                        await self.Tdg.getResponse({
                            route: "Action",
                            act: "updateVoices",
                            position: self.Action.state.voiceDialogContentInput.children[0].value,
                            id: cb.id
                        }).then((data) => {
                            modal.close().destroy();
                            self.Tdg.buildNotice({ msg: "პოზიცია შეცვლილია" });
                            kendo__refresh(self.Action.state.element.table2, 'table');
                        })

                    },
                    access: "save"
                }
            },
            confirmOnCancel: false
        })
    }

    importFiles = (uploadedfrom, table) => {
        let param = {
            inc_id: self.Action.state.news_id,
            append_to: '',
            req: uploadedfrom,
            table: table
        }
        new Uploader(param).init();
    }

    historyTableModal = () => {
        this.state.element.historyTableModal = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ისტორია",
            class: "history-fieldset"
        }, this.historyTable())
        return this.state.element.historyTableModal
    }

    historyTable = () => {
        this.state.element.historyTable = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "თარიღი",
                    size: 100,
                },
                {
                    field: "იუზერი",
                    size: 100,
                },
                {
                    field: "ქმედება",
                    size: 100,
                },
                {
                    field: "ველი",
                    size: 100,
                },
                {
                    field: "ძველი მნიშვნელობა",
                    size: 100
                },                
                {
                    field: "ახალი მნიშვნელობა",
                    size: 100
                }
            ],
            onload: (e) => {

            },
            data: {
                route: "Action",
                act: "getHistory",
                id: this.state.news_id
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
            }
        })

        return this.state.element.historyTable;
    }

}
