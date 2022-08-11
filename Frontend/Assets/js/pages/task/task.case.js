import Tdg from "../../tdg.class.js";
import Input from "../../components/input/input.class.js";
import Datetime from "../../components/datetime/datetime.class.js";
import { kendo_SelectedID, kendo_SelectedText, kendo_setValue, kendo__refresh } from "../../helpers/kendo.helper.js";
import MultiSelector from "../../components/multiselector/multiselector.class.js"
import Selector from "../../components/selector/selector.class.js";
import workGround from "../incomming/workGround.type.js"

export default class TaskCase extends Tdg {

    constructor(prop) {
        super();

        self.TaskCase = this;
        self.selector = Selector;
        self.MultiSelector = MultiSelector;

        this.state = {
            interface: this.CreateElement({
                element: "interface",
                attributes: ["TaskCase"],
                "grid-column": 2
            }),
            element: [],
            fieldset: [],
            tab: [],
            prop: prop,
            id: prop.id,
            addInput: [],
            divfieldset: [],
            tabcontent: [],
            dateinput: [],
            inputtext: [],
            selectorkendo: [],
            divdate: [],
            labeldate: [],
            multiselectorkendo: [],
            divselector: [],
            zeinkal_ids: []
        }

        if (this.state.prop.incomming_id > 0) {
            self.Incomming = { state: { prop: { id: this.state.prop.incomming_id } } };
            self.IncommingModal = { state: { prop: { id: this.state.prop.incomming_id } } };
            self.IncommingModal.fromtask = true;
        }

    }


    /**
     * INITIALIZE RIG
     */
    init = async () => {

        this.getInfoInputs();
        if (this.state.prop.id > 0) {
            await this.build()
        } else {
            this.createCasesTab();
        }



        return this.state.interface


    }

    getInfoInputs = async () => {
        this.state.inputData = await this.getResponse({
            route: "Automator",
            act: "getGeneratedInputs",
            pageKey: "incommingRequest",
            id: self.TaskCase.state.prop.incomming_id
        })

        this.state.inputData.forEach(x => {
            if (x.tabs.length > 0) {
                x.tabs.forEach(el => {
                    el.inputs.forEach(input => {
                        if (input.input_key == "telefoni___987--1--1") {
                            this.state.globalPhoneNumber = input.input_value;

                        }
                    })
                })

            }

        });
    }

    /**
     * TaskCase INTERFACE
     * @returns {element} TaskCase Interface
     */
    build = async () => {

        this.buildTab()

    }


    createTab = async () => {

        this.state.element.tab = this.CreateElement({
            element: "tab",
            attributes: ["task"]
        })

        let data = [{
            key: "cases",
            title: "ქეისები"
        },
        {
            key: "info",
            title: "ინფო"
        },
        {
            key: "history",
            title: "ისტორია"
        },
        {
            key: "sms",
            title: "სმს"
        },
        {
            key: "comment",
            title: "კომენტარი"
        },
        {
            key: "record",
            title: "ჩანაწერი"
        },
        {
            key: "file",
            title: "ფაილები"
        },
        {
            key: "log",
            title: "ლოგები"
        },
        {
            key: "zeinkal_log",
            title: "ზეინკალის ლოგები"
        }


        ]

        typeof data == 'object' && data.length > 0 && data.forEach(x => this.append(this.state.element.tab, this.createTabItem(x)))

        return this.state.element.tab;

    }

    createTabOnlyTask = async () => {

        this.state.element.tab = this.CreateElement({
            element: "tab",
            attributes: ["task"]
        })

        let data = [{
            key: "cases",
            title: "ქეისები"
        },
        {
            key: "log",
            title: "ლოგები"
        },
        {
            key: "zeinkal_log",
            title: "ზეინკალის ლოგები"
        }

        ]

        typeof data == 'object' && data.length > 0 && data.forEach(x => this.append(this.state.element.tab, this.createTabItem(x)))

        return this.state.element.tab;

    }

    createTabItem = (tab) => {

        this.state.element.tabItem = this.CreateElement({
            element: "item",
            attributes: ["svg"],
            key: tab.key,
            title: tab.title,
            children: `<svg viewBox="0 0 16 16" width="16" height="16">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#tab-${tab.key}" />
                        </svg>`,
            onclick: this.handleTabClick
        }, this.CreateElement({
            element: "span",
            text: tab.title,
            style: {
                display: "none",
                visibility: "hidden"
            }
        }))

        if (tab.key == "cases") {
            this.state.casestabel = this.state.element.tabItem;
        }

        return this.state.element.tabItem

    }

    buildTab = async () => {
        if (self.TaskCase.state.prop.incomming_id > 0) {
            this.append(this.state.interface, await this.createTab());
        } else {
            this.append(this.state.interface, await this.createTabOnlyTask());
        }

        this.state.casestabel.click()
    }


    // loading before get response

    handleTabClick = async function () {

        Object.values(self.TaskCase.state.fieldset).forEach(x => x.remove())

        // self.Helper.setLoadingForm(self.TaskCase.state.interface)

        self.TaskCase.state.element.tab.childNodes.forEach(x => {
            x.removeAttribute("actived")
            x.children[1].style.display = "none"
            x.children[1].style.visibility = "hidden"

        })

        let key = this.getAttribute("key");

        $('interface[TaskCase] > div').remove();

        switch (key) {
            case "cases":
                self.TaskCase.createCasesTab();
                self.TaskCase.getInfoTabForPrint("info");
                document.querySelector("button[print]").style.display = "block";
                break;
            case "info":
                self.TaskCase.getInfoTab("info");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "history":
                self.TaskCase.getOtherTab("history");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "sms":
                self.TaskCase.getOtherTab("sms");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "comment":
                self.TaskCase.getOtherTab("comment");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "record":
                self.TaskCase.getOtherTab("record");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "file":
                self.TaskCase.getOtherTab("file");
                document.querySelector("button[print]").style.display = "none";
                break;
            case "log":
                self.TaskCase.createLogsTab();
                document.querySelector("button[print]").style.display = "none";
                break;
            case "zeinkal_log":
                self.TaskCase.createZeinkalLogsTab();
                document.querySelector("button[print]").style.display = "none";
                break;
        }

        this.children[1].style = { display: "inline-block", visibility: "visible" }

        this.setAttribute("actived", true)

    }

    getInfoTab = async (key) => {
        var prop = {
            id: this.state.prop.incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            children: await new workGround(prop, true).init()
        })

        this.append(this.state.interface, this.state.infotab);
    }

    getInfoTabForPrint = async (key) => {
        var prop = {
            id: this.state.prop.incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            style: {
                display: "none"
            },
            children: await new workGround(prop, true).init()
        })

        return this.state.infotab;
    }

    getOtherTab = async (key) => {
        var prop = {
            id: this.state.prop.incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            attributes: ["tasktabcontent"],
        })

        this.append(this.state.interface, this.state.infotab);

        await new workGround(prop, true).init();
    }

    buildTabContent = (name) => {

        this.state.tabcontent[name] = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                'flex-direction': 'row',
                'flex-wrap': 'wrap',
                gap: '20px',
                'margin-top': '10px'
            }
        })

        return this.state.tabcontent[name];
    }

    createCasesTab = async () => {

        this.state.cases = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }
        })
        // if(self.WorkGround.state.reagireba_status == 1){
        //      var status_id = self.WorkGround.state.reagireba_status;
        //      var status2_id = 0;
        //      var data = [];

        //         if (this.state.prop.id > 0) {

        //             data = await this.getResponse({
        //                 route: "Task",
        //                 act: "GET",
        //                 id: this.state.prop.id,
        //             })

        //             status_id = data.parent_id;
        //             status2_id = data.child_id;
        //         }
        // }else{
                var status_id = 0;
                var status2_id = 0;
                var data = [];

                if (this.state.prop.id > 0) {

                    data = await this.getResponse({
                        route: "Task",
                        act: "GET",
                        id: this.state.prop.id,
                    })

                    status_id = data.parent_id;
                    status2_id = data.child_id;
                }
            // }
        this.append(this.state.interface, this.state.cases);

        this.append(this.state.cases, this.createFieldSet("შექმნის თარიღი", "create_date"));
        this.append(this.state.divfieldset["create_date"], this.buildTabContent("create_date"));

        this.append(this.state.tabcontent["create_date"], this.buildDiv());
        this.append(this.state.element.div, this.buildDivForDate("period"));
        this.append(this.state.divdate['period'], this.buildLabelForDate("პერიოდი"));
        this.append(this.state.divdate['period'], this.buildDateInput("start_date"));
        this.append(this.state.element.div, this.buildTire());
        this.append(this.state.element.div, this.buildDateInput("end_date"));

        this.append(this.state.tabcontent["create_date"], this.buildInputText("აბონენტი", "abonent"));
        this.append(this.state.tabcontent["create_date"], this.buildInputText("ტელეფონი", "phone"));
        this.append(this.state.tabcontent["create_date"], this.buildInputText("მომართვის ნომერი", "mom_nuber"));

        this.append(this.state.tabcontent["create_date"], this.buildDivSelector("status"));
        this.append(this.state.divselector['status'], this.buildKendoSelector("სტატუსი", "status", status_id, status2_id, this.onChangeStatus));

        //this.append(this.state.tabcontent["create_date"], this.buildDivSelector("status2"));
        //this.append(this.state.divselector['status2'], this.buildKendoSelector("სტატუსი 2", "status2", status2_id, status_id, await this.onChangeStatus2));

        this.append(this.state.tabcontent["create_date"], this.buildKendoMultiSelector("განყოფილება", "user_department", "", "Task", "GETUSERDEPARTMENTS"));
        this.append(this.state.tabcontent["create_date"], this.buildKendoMultiSelector("ჯგუფი", "user_group", "", "Task", "GETUSERGROUPS"));
        this.append(this.state.tabcontent["create_date"], this.buildKendoMultiSelector("პასუხისმგებელი პირი", "responsible_user"));
        this.append(this.state.tabcontent["create_date"], this.buildKendoMultiSelector("ზეინკლები", "zeinkals", "", "Task", "getZeinkalsSelect"));

        this.append(this.state.cases, this.createFieldSet("კომენტარი", "comment"));
        this.append(this.state.divfieldset['comment'], this.buildTabContent("comment"));
        this.append(this.state.tabcontent["comment"], this.buildInputText("კომენტარი", "comment", "textarea", this.state.prop.id));

        this.append(this.state.cases, this.createFieldSet("შედეგი", "result"));
        this.append(this.state.divfieldset["result"], this.buildTabContent("result"));
        this.append(this.state.tabcontent["result"], this.buildInputText("შედეგი", "result", "textarea", this.state.prop.id));
        console.log(typeof(this.state.prop.onSave))
        if(typeof(this.state.prop.onSave) != "undefined"){
            this.state.divfieldset['comment'].style.display = "none";
            this.state.divfieldset['result'].style.display = "none";
        }

        new MultiSelector(this.state.multiselectorkendo['user_department']).init();
        new MultiSelector(this.state.multiselectorkendo['user_group']).init();
        new MultiSelector(this.state.multiselectorkendo['responsible_user']).init();
        new MultiSelector(this.state.multiselectorkendo['zeinkals']).init();
        
        if(this.state.prop.inc_id > 0){
            this.state.inputtext['phone'].children[0].value =  self.WorkGround.state.globalPhoneNumber;
            this.state.inputtext['mom_nuber'].children[0].value = this.state.prop.inc_id;
            this.state.inputtext['abonent'].children[0].value = self.WorkGround.state.globalClientName;
        }

        if (data.id > 0) {
            this.state.dateinput['start_date'].value = data.start_date;
            this.state.dateinput['end_date'].value = data.end_date;
            this.state.dateinput['end_date'].value = data.end_date;
            this.state.inputtext['comment'].children[0].value = data.comment;
            this.state.inputtext['result'].children[0].value = data.result;
            this.state.inputtext['phone'].children[0].value = data.phone;
            this.state.inputtext['mom_nuber'].children[0].value = data.request_number;
            this.state.inputtext['abonent'].children[0].value = data.abonent;

            var user_ids = [];
            var dep_ids = [];
            var group_ids = [];
            var zeinkal_ids = [];

            this.state.multiselectdata = data.multiselect;
            this.state.zeinkal_ids = data.zeinkal_ids;

            if (this.state.zeinkal_ids) {
                this.state.zeinkal_ids.forEach(o => {
                    if (o.zeinkal_id > 0) {
                        zeinkal_ids.push(o.zeinkal_id);
                    }
                })

                if (zeinkal_ids.length > 0) {
                    $(this.state.multiselectorkendo['zeinkals']).getKendoMultiSelect().value(zeinkal_ids);
                }
            }

            if (this.state.multiselectdata) {
                this.state.multiselectdata.forEach(o => {
                    if (o.user_id > 0) {
                        user_ids.push(o.user_id);
                    }

                    if (o.dep_id > 0) {
                        dep_ids.push(o.dep_id);
                    }

                    if (o.group_id > 0) {
                        group_ids.push(o.group_id);
                    }
                })

                if (user_ids.length > 0) {
                    $(this.state.multiselectorkendo['responsible_user']).getKendoMultiSelect().value(user_ids);
                }
                if (dep_ids.length > 0) {
                    $(this.state.multiselectorkendo['user_department']).getKendoMultiSelect().value(dep_ids);
                }
                if (group_ids.length > 0) {
                    $(this.state.multiselectorkendo['user_group']).getKendoMultiSelect().value(group_ids);
                }
            }


            var b = $(self.TaskCase.state.selectorkendo['status']).data("kendoDropDownList");
            b.value(data.parent_id);
            b.trigger("change");
            b.refresh();

        }

    }

    createLogsTab = () => {
        this.state.logs = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }
        })

        this.append(this.state.interface, this.state.logs);

        this.append(this.state.logs, this.createFieldSet("ლოგები", "logs"));
        this.append(this.state.divfieldset["logs"], this.createLogsTable());

        return this.state.logs;

    }

    createZeinkalLogsTab = () => {
        this.state.zeinkallogs = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }
        })

        this.append(this.state.interface, this.state.zeinkallogs);

        this.append(this.state.zeinkallogs, this.createFieldSet("ზეინკალის ლოგები", "zeinkal_logs"));
        this.append(this.state.divfieldset["zeinkal_logs"], this.createTable());

        return this.state.zeinkallogs;

    }

    onChangeStatus = function () {

        // let id = kendo_SelectedID(self.TaskCase.state.selectorkendo['status']);
        // let id2 = kendo_SelectedID(self.TaskCase.state.selectorkendo['status2']);

        // if (id == 0) {
        //     id2 = 0;

        //     var x = $(self.TaskCase.state.selectorkendo['status2']).data("kendoDropDownList");
        //     x.value(id2);
        //     x.trigger("change");
        //     x.refresh();

        //     new Selector().setDataSource({
        //         element: self.TaskCase.state.selectorkendo['status2'],
        //         data: {
        //             route: "Task",
        //             act: "GETSTATUS",
        //             name: "status2"
        //         }
        //     })

        // } else {

        //     self.TaskCase.state.divselector['status2'].remove();
        //     self.TaskCase.state.divselector['status'].parentNode.insertBefore(self.TaskCase.buildDivSelector("status2"), self.TaskCase.state.divselector['status'].nextSibling);
        //     self.Tdg.append(self.TaskCase.state.divselector['status2'], self.TaskCase.buildKendoSelector("სტატუსი 2", "status2", id2, id, self.TaskCase.onChangeStatus2));

        //     var x = $(self.TaskCase.state.selectorkendo['status2']).data("kendoDropDownList");
        //     x.value(id2);
        //     x.trigger("change");
        //     x.refresh();

        // }

    }

    onChangeStatus2 = async function () {
        // let id = kendo_SelectedID(self.TaskCase.state.selectorkendo['status2']);
        // let id2 = kendo_SelectedID(self.TaskCase.state.selectorkendo['status']);

        // if (id2 == 0 && id > 0) {
        //     var data = [];
        //     data = await self.Tdg.getResponse({
        //         route: "Task",
        //         act: "GETSTATUS",
        //         id: id,
        //         name: "GETPARENTID"
        //     })


        //     var x = $(self.TaskCase.state.selectorkendo['status']).data("kendoDropDownList");
        //     x.value(data[0].id);
        //     x.trigger("change");
        //     x.refresh();

        // }
    }


    createFieldSet = (title, name) => {
        this.state.divfieldset[name] = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: title,
            style: {
                // "grid-template-columns": "unset"
                'min-width': '200px',
                width: '100%',
                display: 'flex',
                'flex-direction': 'column',
                'flex-wrap': 'wrap'
            }
        })

        return this.state.divfieldset[name];
    }

    buildDiv = () => {
        this.state.element.div = this.CreateElement({
            element: "periodcontent",
            style: {
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-end',
                marginTop: '-17px'
            }
        })

        return this.state.element.div
    }

    buildDivSelector = (name) => {
        this.state.divselector[name] = this.CreateElement({
            element: "selectorcontent"
        })

        return this.state.divselector[name]
    }

    buildDivForDate = (name) => {
        this.state.divdate[name] = this.CreateElement({
            element: "taskmodalcontent",
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: "5px"
            }
        })

        return this.state.divdate[name]
    }

    buildLabelForDate = (name) => {
        this.state.labeldate[name] = this.CreateElement({
            element: "label",
            children: name,
            style: {
                color: "#BEBEBE",
                fontSize: "10px",
                fontFamily: 'BPG2'
            }
        })

        return this.state.labeldate[name]
    }

    buildTire = () => {
        this.state.element.tire = this.CreateElement({
            element: "span",
            children: "-",
            style: {
                fontSize: '24px',
                marginBottom: '7px'
            }
        })

        return this.state.element.tire
    }

    buildDateInput = (name) => {

        this.state.dateinput[name] = this.CreateElement({
            element: "input",
            type: "datetime"
        });

        return this.state.dateinput[name]
    }

    buildInputText = (title, name, type = "text", id) => {

        var disabled = "";

        if (id > 0 && name == "comment") {
            disabled = "disabled";
        } else if (!(id > 0) && name == "result") {
            disabled = "disabled";
        }

        var style = {
            width: "180px"
        }

        if (type == "textarea") {
            style = {
                width: '52vw',
                maxWidth: '990px',
                minWidth: '200px',
                margin: '0px',
                minHeight: '170px',
                maxHeight: "220px"
            }
        }

        this.state.inputtext[name] = new Input({
            type: type,
            placeholderTitle: title,
            column: "2",
            style: style,
            attributes: [`${disabled}`]
        }).build();

        return this.state.inputtext[name]
    }

    buildKendoSelector = (title, name, id = 0, statuschangeid = 0, onChangeEvent, route = "Task", act = "GETSTATUS") => {

        this.state.selectorkendo[name] = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: title,
            value: Number(id),
            onchange: onChangeEvent,
            style: {
                width: "200px"
            },
            data: {
                route: route,
                act: act,
                name: name,
                id: statuschangeid
            }
        })

        return this.state.selectorkendo[name]
    }

    buildKendoMultiSelector = (title, name, id = 0, route = "Task", act = "GETOPERATORS") => {

        this.state.multiselectorkendo[name] = this.CreateElement({
            element: "kendo",
            type: "MultiSelector",
            title: title,
            value: Number(id),
            data: {
                route: route,
                act: act
            },
        })

        return this.state.multiselectorkendo[name]
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
                    field: "ფორმირების თარიღი"
                },
                {
                    field: "სერვის ცენტრი"
                },
                {
                    field: "ზეინკალი"
                },
                {
                    field: "პირადი ნომერი"
                },
                {
                    field: "სტატუსი"
                }
            ],
            data: {
                route: "Task",
                act: "getZeinkals",
                id: this.state.prop.id
            },
            onchange: () => {

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
            ondblclick: (cb) => {


            },
            callback: (cb) => {
                // console.log(cb)
            }
        })

        return this.state.element.table;

    }

    createLogsTable = () => {

        this.state.element.table = this.CreateElement({
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
                    field: "იუზერი"
                },
                {
                    field: "ძველი დეპარტ"
                },
                {
                    field: "ახალი დეპარტ"
                },
                {
                    field: "ცვლილება"
                }
            ],
            data: {
                route: "Task",
                act: "getLogs",
                id: this.state.prop.id
            },
            onchange: () => {

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
            ondblclick: (cb) => {


            },
            callback: (cb) => {
                // console.log(cb)
            }
        })

        return this.state.element.table;

    }



}

