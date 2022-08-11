import Tdg from "../../tdg.class.js"
import Flashpanel from "../../layouts/flashpanel.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive, kendo_SelectedText, kendo__multiSelectedName} from "../../helpers/kendo.helper.js";
import TaskModal from "./task.modal.js";

export default class Task extends Tdg {

    constructor() {
        super();

        self.Task = this;

        this.state = {
            sectionName: document.querySelector("section[task]"),
            flashpanel: new Flashpanel().init(),
            element: [],
            kendoselected: []
        }

        document.title = "Task";

        this.removeLoading()

        this.init();

    }


    init = async () => {

        this.append(this.state.sectionName, await this.buildTaskTabs());

        this.append(this.state.sectionName, this.buildTaskTabsSec());

        this.append(this.state.sectionName, this.buildTaskContent());

        this.append(this.state.element.taskContent, this.buildFilterBlock());

        this.append(this.state.element.filterBlock, this.buildStartDate());

        this.append(this.state.element.filterBlock, this.buildTire());

        this.append(this.state.element.filterBlock, this.buildEndDate());

        this.append(this.state.element.filterBlock, this.buildKendoSelector());

        this.append(this.state.element.filterBlock, this.buildfilterButton());

        this.append(this.state.element.taskContent, this.buildTaskButtons());

        this.append(this.state.element.taskButtons, this.buildAddButton());

        this.append(this.state.element.taskButtons, this.buildRemoveButton());

        this.append(this.state.element.taskButtons, this.buildStatusChangeButton());

        this.append(this.state.element.taskContent, this.buildDivForTable());
        this.append(this.state.element.tablediv, this.createTable())

        this.state.element.taskTabs.children[0].click();
        kendoResponsive()

    }

    buildStatusChangeButton = () => {
        this.state.element.statuschangebutton = new Button({
            text: "სტატუსის ცვლილება",
            class: "stbtn",
            style: {
                display: "none"
            },
            onclick: () => {

            }
        })

        return this.state.element.statuschangebutton
    }

    buildRemoveButton = () => {
        this.state.element.addbutton = new Button({
            type: "delete",
            text: "წაშლა",
            onclick: function () {
                self.Task.kendoselected = self.Task.state.element.table.children[1].children[0].children[1].childNodes;
                let confirmModal = new jBox('Confirm', {
                    content: 'ნამდვილად გსურთ წაშლა?',
                    cancelButton: 'გაუქმება',
                    confirmButton: 'წაშლა',
                    zIndex: 'auto',
                    confirm: () => {
                        self.Task.kendoselected.forEach(data => {
                            if (data.classList.contains("k-state-selected")) {
                                self.Tdg.getResponse({
                                    route: "Task",
                                    act: "DELETE",
                                    id: data.children[0].innerHTML
                                }).then(function (data) {
                                    self.Tdg.buildNotice({ msg: "დავალება წაშლილია" });
                                    kendo__refresh(self.Task.state.element.table, 'table');
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

    buildfilterButton = () => {
        this.state.element.addbutton = new Button({
            text: "ფილტრი",
            onclick: () => {
                kendo__destroy(this.state.element.table);
                this.state.element.tablediv.remove();
                this.append(this.state.element.taskContent, this.buildDivForTable());
                this.append(this.state.element.tablediv, this.createTable());
            }
        })

        return this.state.element.addbutton
    }

    buildAddButton = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                this.buildModal(null, {
                    width: '54vw',
                    height: '84vh',
                    content: new TaskModal({ id: 0 }).init(),
                    buttons: {
                        save: {
                            name: "დამატება",
                            onclick: function (modal) {
                                self.Tdg.getResponse({
                                    route: "Task",
                                    act: "ADD",
                                    start_date: self.TaskCase.state.dateinput['start_date'].value,
                                    end_date: self.TaskCase.state.dateinput['end_date'].value,
                                    phone: self.TaskCase.state.inputtext['phone'].children[0].value,
                                    abonent: self.TaskCase.state.inputtext['abonent'].children[0].value,
                                    request_number: self.TaskCase.state.inputtext['mom_nuber'].children[0].value,
                                   // task_status_child_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status2']),
                                    task_status_parent_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status']),
                                    dep_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_department'])}`,
                                    group_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_group'])}`,
                                    user_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['responsible_user'])}`,
                                    zeinkal_ids: `${kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['zeinkals'])}`,
                                    comment: self.TaskCase.state.inputtext['comment'].children[0].value,
                                    task_source_id: 1
                                }).then(function (data) {
                                    modal.close().destroy()
                                    self.Tdg.buildNotice({ msg: "დავალება დამატებულია" });
                                    kendo__refresh(self.Task.state.element.table, 'table');
                                })
                            },
                            access: "add"
                        },
                    },
                    confirmOnCancel: true
                })
            },
            access: "add"
        })

        return this.state.element.addbutton
    }

    buildKendoSelector = () => {

        this.state.selectorkendo = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ოპერატორი",
            onchange: (e) => {
                var id = kendo_SelectedID(this.state.selectorkendo);
                if (id > 0) {
                    var value = kendo_SelectedText(this.state.selectorkendo);
                }
            },
            data: {
                route: "Task",
                act: "GETOPERATORS"
            }
        })

        return this.state.selectorkendo;
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

    buildStartDate = () => {
        this.state.element.startdate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startdate
    }

    buildEndDate = () => {
        this.state.element.enddate = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.enddate
    }

    buildFilterBlock = () => {

        this.state.element.filterBlock = this.CreateElement({
            element: "taskFilter"
        })

        return this.state.element.filterBlock;
    }

    buildDivForTable = () => {

        this.state.element.tablediv = this.CreateElement({
            element: "div"
        })

        return this.state.element.tablediv;
    }

    buildTaskButtons = () => {

        this.state.element.taskButtons = this.CreateElement({
            element: "taskButtons"
        })

        return this.state.element.taskButtons;
    }

    getParent = async () => {

        var data = [];

        data = await this.getResponse({
            route: "Task",
            act: "GETSTATUS",
            name: "status"
        })

        return data;
    }

    getChildren = async (num) => {

        var data = [];

        data = await this.getResponse({
            route: "Task",
            act: "GETSTATUS",
            name: "status2",
            id: num
        })

        return data;
    }

    buildTaskTabs = async () => {
        var tmp = [];
        tmp = await this.getParent();

        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs"
        },
            this.CreateElement({
                element: "tab",
                class: "active",
                children: "ყველა",
                'tab-id': "999999",
                onclick: this.tabClick,

            }))

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

    buildTaskContent = () => {
        this.state.element.taskContent = this.CreateElement({
            element: "taskContent"
        })

        return this.state.element.taskContent;
    }

    buildTaskTabsSec = () => {
        this.state.element.taskTabsSec = this.CreateElement({
            element: "taskTabsSec"
        })

        return this.state.element.taskTabsSec;
    }

    tabClick = async (e) => {
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");

        var id = e.target.getAttribute("tab-id");

        this.state.element.taskTabsSec.innerHTML = "";

        if (id != "999999") {
            this.state.element.taskTabsSec.style.height = "0px";
            this.state.element.taskTabsSec.style.padding = "0px";
            this.state.tab_id = id;
            kendo__destroy(this.state.element.table);
            this.state.element.tablediv.remove();
            this.append(this.state.element.taskContent, this.buildDivForTable());
            this.append(this.state.element.tablediv, this.createTable());
        } else {
            this.state.element.taskTabsSec.style.height = "0px";
            this.state.element.taskTabsSec.style.padding = "0px";
            this.state.tab_id = "";
            kendo__destroy(this.state.element.table);
            this.state.element.tablediv.remove();
            this.append(this.state.element.taskContent, this.buildDivForTable());
            this.append(this.state.element.tablediv, this.createTable());
        }


    }

    tabSecClick = (e) => {
        this.state.element.taskTabsSec.childNodes.forEach(child => {
            child.classList.remove("activeSec");
        });

        e.target.classList.add("activeSec");

        this.state.tab_id = e.target.getAttribute("child_id");
        kendo__destroy(this.state.element.table);
        this.state.element.tablediv.remove();
        this.append(this.state.element.taskContent, this.buildDivForTable());
        this.append(this.state.element.tablediv, this.createTable());
    }

    getSubCategory = async (num) => {
        var arr = [];
        var tmp = [];

        tmp = await this.getChildren(num);
        tmp.forEach(el => {
            arr.push(this.CreateElement({
                element: "tabSec",
                children: el.name,
                child_id: el.id,
                onclick: this.tabSecClick,

            }))
        });

        return arr;
    }

    createTable = () => {

        if(this.state.tab_id != 11){
            var  archiveChecker = true
        }else{
            var  archiveChecker = false
        }
        
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "tasktable",
            column: [
                {
                    field: "ID",
                    name: "id",
                    size: 80
                },
                {
                    field: "phoneNumber",
                    hidden:true
                },
                {
                    field: "CustomerNumber",
                    hidden:true
                },
                {
                    field: "CustomerFullName",
                    hidden:true
                },
                {
                    field: "CustomerAddres",
                    hidden:true
                },

                {
                    name: "incomming_id",
                    size: 150,
                    hidden: true
                },
                {
                    field: "ფორმირების თარიღი",
                    size: 200
                },
                {
                    field: "დამფორმირებელი",
                    size: 180
                },
                {
                    field: "ტელეფონი",
                    size: 120,
                    template: `<span># if(phoneNumber != null) { 
                                    # <span>#= phoneNumber #</span># 
                                     #                     
                                # }else { #  
                                    <span>#= (telefoni == null) ? '' : telefoni  #</span># 
                                    #                     
                               # } #</span>`
                },
                {
                    field: "აბონენტის ნომერი",
                    size: 120,
                    template: `<span># if(CustomerNumber != null) { 
                                    # <span>#= CustomerNumber #</span># 
                                     #                     
                                # }else { #  
                                    <span>#= (abonentis_nomeri == null) ? '' : abonentis_nomeri  #</span># 
                                    #                     
                               # } #</span>`
                },
                {
                    field: "აბონენტი",
                    size: 120,
                    template: `<span># if(CustomerFullName != null) { 
                                    # <span>#= CustomerFullName #</span># 
                                     #                     
                                # }else { #  
                                    <span>#= (abonenti == null) ? '' : abonenti  #</span># 
                                    #                     
                               # } #</span>`
                },
                {
                    field: "პასუხისმგებელი პირი",
                    size: 200
                },
                {
                    field: "განყოფილება",
                    size: 200
                },
                {
                    field: "ქვე კატეგორია",
                    size: 200
                },
                {
                    field: "მისამართი",
                    size: 130,
                    template: `<span># if(CustomerAddres != null) { 
                                    # <span>#= CustomerAddres #</span># 
                                     #                     
                                # }else { #  
                                    <span>#= (misamarti == null) ? '' : misamarti  #</span># 
                                    #                     
                               # } #</span>`
                },
                {
                    field: "დააარქივა",
                    size: 170,
                    hidden: archiveChecker
                },
                {
                    field: "დაარქივების თარიღი",
                    size: 200,
                    hidden: archiveChecker
                },
                {
                    field: "სტატუსი",
                    size: 120
                },
                {
                    field: "USSD სტატუსი",
                    size: 120
                }

            ],
            onmouseover:(e) => {
                if (e.target.parentNode.parentNode.children[0].innerText.split("	")[0] >0 ){
                    // e.target.class = ".overflow-tip";
                    // document.getElementById("tooltiptext").innerText = e.target.innerText;
                    var title=(e.target.innerText);
                    this.state.element.table.title =  title;
                }else{
                    // document.getElementById("tooltiptext").innerText = "";
                }
            },
            data: {
                route: "Task",
                act: "getList",
                start_date: this.state.element.startdate.value,
                end_date: this.state.element.enddate.value,
                operator: kendo_SelectedID(this.state.selectorkendo),
                status: this.state.tab_id
            },
            onchange: (e) => {

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
                count: 50
            },
            ondblclick: (cb) => {

                this.buildModal(null, {
                    width: '54vw',
                    height: '84vh',
                    content: new TaskModal({
                        ...cb
                    }).init(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            onclick: function (modal) {
                                var data = [];
                                var index = 0;

                                data['multiselect'] = self.TaskCase.state.multiselectdata;
                                data['zeinkal_ids_data'] = self.TaskCase.state.zeinkal_ids;
                                data['dep_ids'] = kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_department']);
                                data['group_ids'] = kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['user_group']);
                                data['user_ids'] = kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['responsible_user']);
                                data['zeinkal_ids'] = kendo__multiSelectedID(self.TaskCase.state.multiselectorkendo['zeinkals']);

                                data['delete_dep_ids'] = [];
                                data['delete_group_ids'] = [];
                                data['delete_user_ids'] = [];
                                data['delete_zeinkal_ids'] = [];

                                if (data['zeinkal_ids_data'] && data['zeinkal_ids_data'].length > 0) {
                                    data['zeinkal_ids_data'].forEach(sel => {
                                        if (data['zeinkal_ids'].includes(sel.zeinkal_id)) {
                                            index = data['zeinkal_ids'].indexOf(sel.zeinkal_id);
                                            if (index !== -1) {
                                                data['zeinkal_ids'].splice(index, 1);
                                            }
                                        } else {
                                            if (sel.zeinkal_id > 0) {
                                                data['delete_zeinkal_ids'].push(sel.zeinkal_id);
                                            }
                                        }
                                    });
                                }

                                if (data['multiselect'] && data['multiselect'].length > 0) {
                                    data['multiselect'].forEach(sel => {
                                        if (data['dep_ids'].includes(sel.dep_id)) {
                                            index = data['dep_ids'].indexOf(sel.dep_id);
                                            if (index !== -1) {
                                                data['dep_ids'].splice(index, 1);
                                            }
                                        } else {
                                            if (sel.dep_id > 0) {
                                                data['delete_dep_ids'].push(sel.dep_id);
                                            }
                                        }

                                        if (data['group_ids'].includes(sel.group_id)) {
                                            index = data['group_ids'].indexOf(sel.group_id);
                                            if (index !== -1) {
                                                data['group_ids'].splice(index, 1);
                                            }
                                        } else {
                                            if (sel.group_id > 0) {
                                                data['delete_group_ids'].push(sel.group_id);
                                            }
                                        }

                                        if (data['user_ids'].includes(sel.user_id)) {
                                            index = data['user_ids'].indexOf(sel.user_id);
                                            if (index !== -1) {
                                                data['user_ids'].splice(index, 1);
                                            }
                                        } else {
                                            if (sel.user_id > 0) {
                                                data['delete_user_ids'].push(sel.user_id);
                                            }
                                        }

                                    });
                                }

                                self.Tdg.getResponse({
                                    route: "Task",
                                    act: "UPDATE",
                                    start_date: self.TaskCase.state.dateinput['start_date'].value,
                                    end_date: self.TaskCase.state.dateinput['end_date'].value,
                                    result: self.TaskCase.state.inputtext['result'].children[0].value,
                                    abonent: self.TaskCase.state.inputtext['abonent'].children[0].value,
                                    phone: self.TaskCase.state.inputtext['phone'].children[0].value,
                                    request_number: self.TaskCase.state.inputtext['mom_nuber'].children[0].value,
                                   // task_status_child_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status2']),
                                    task_status_parent_id: kendo_SelectedID(self.TaskCase.state.selectorkendo['status']),
                                    dep_ids: `${data['dep_ids']}`,
                                    group_ids: `${data['group_ids']}`,
                                    user_ids: `${data['user_ids']}`,
                                    zeinkal_ids: `${data['zeinkal_ids']}`,
                                    delete_dep_ids: `${data['delete_dep_ids']}`,
                                    delete_group_ids: `${data['delete_group_ids']}`,
                                    delete_user_ids: `${data['delete_user_ids']}`,
                                    delete_zeinkal_ids: `${data['delete_zeinkal_ids']}`,
                                    id: cb.id,
                                    task_source_id: 1
                                }).then(function (data) {
                                    modal.close().destroy()
                                    self.Tdg.buildNotice({ msg: "დავალება განახლებულია" });
                                    kendo__refresh(self.Task.state.element.table, 'table');
                                })
                            },
                            access: "view"
                        },
                        print: {
                            id: "task-button-print",
                            name: "ბეჭდვა",
                            title: "ბეჭდვა",
                            style: {
                                'background-color': '#fff',
                                'color': '#e20040',
                                'border': '1px solid rgb(209, 0, 0)'
                            },
                            onclick: () => {

                                var a = window.open('', '', 'height=500, width=500');
                                a.document.write('<html style="box-sizing: border-box;">');
                                a.document.write('<body style="font-size: 24px; width: 100%; height: 100%; margin: 0; padding: 0;">');
                                a.document.write(this.printFunction());
                                a.document.write('</body></html>');
                                a.document.close();
                                a.print();
                              }
                        
                        }
                    },
                    confirmOnCancel: true
                })

            },
            callback: (cb) => {
                // console.log(cb)
            }
        })

        return this.state.element.table;

    }

    printFunction = () => {
      
        this.state.element.printFunction = this.CreateElement({
        element: "div",
        children:`
        <h3>შექმნის თარიღი</h3>
        პერიოდი - ${self.TaskCase.state.dateinput['start_date'].value} - ${self.TaskCase.state.dateinput['end_date'].value}<br>
        აბონენტი - ${self.TaskCase.state.inputtext['abonent'].children[0].value}<br>
        ტელეფონი - ${self.TaskCase.state.inputtext['phone'].children[0].value}<br>
        მომართვის ნომერი - ${self.TaskCase.state.inputtext['mom_nuber'].children[0].value}<br>
        სტატუსი - ${kendo_SelectedText(self.TaskCase.state.selectorkendo['status'])}<br>
        განყოფილება - ${kendo__multiSelectedName(self.TaskCase.state.multiselectorkendo['user_department'])}<br>
        ჯგუფი - ${kendo__multiSelectedName(self.TaskCase.state.multiselectorkendo['user_group'])}<br>
        პასუხისმგებელი პირი - ${kendo__multiSelectedName(self.TaskCase.state.multiselectorkendo['responsible_user'])}<br>
        ზეინკლები - ${kendo__multiSelectedName(self.TaskCase.state.multiselectorkendo['zeinkals'])}<br>
        <br>
        <h3>ქოლ ცენტრი</h3>
        ტელეფონი - ${self.WorkGround.state.inputs[0].value}<br>
        პრიორიტეტი - ${kendo_SelectedText(self.WorkGround.state.inputs[1])}<br>
        ტელეფონი 2 - ${self.WorkGround.state.inputs[2].value}<br>
        მომართვის ავტორი - ${self.WorkGround.state.inputs[3].value}<br>
        მომხმარებლის კატეგორია - ${self.WorkGround.state.inputs[4].value}<br>
        ბიზნეს-ცენტრი -  ${kendo_SelectedText(self.WorkGround.state.inputs[5])}<br>
        აბონენტის ნომერი - ${self.WorkGround.state.inputs[6].value}<br>
        აბონენტი - ${self.WorkGround.state.inputs[7].value}<br>
        აბონენტის სპ # - ${self.WorkGround.state.inputs[8].value}<br>
        მიმდინარე დავალიანება -  ${self.WorkGround.state.inputs[9].value}<br>
        მისამართი -  ${self.WorkGround.state.inputs[10].value}<br>
        განაცხადის ნომერი -  ${self.WorkGround.state.inputs[11].value}<br>
        მშობელი კვანძი -  ${self.WorkGround.state.inputs[12].value}<br>
        ბლოკის ნომერი -  ${self.WorkGround.state.inputs[13].value}<br>
        გათიშვის მიზეზი - ${kendo_SelectedText(self.WorkGround.state.inputs[14])}<br>

        <h4>მომართვის ინფო</h4>
        რეაგირება(სტატუსი) - ${kendo_SelectedText(self.WorkGround.state.inputs[20])}<br>
        პრიორიტეტი - ${kendo_SelectedText(self.WorkGround.state.inputs[21])}<br>
        კომუნიკაციის არხი - ${kendo_SelectedText(self.WorkGround.state.inputs[22])}<br>
        ინფორმაციის წყარო - ${self.WorkGround.state.inputs[23].value}<br>

        <h4>გაცემული ინფორმაცია</h4>
        კატეგორია - ${kendo_SelectedText(self.WorkGround.state.inputs[24])}<br>
        ზარის ტიპი - ${kendo_SelectedText(self.WorkGround.state.inputs[25])}<br>
        ქვე-კატეგორია - ${kendo_SelectedText(self.WorkGround.state.inputs[26])} <br>
        მომართვის ტიპი - ${kendo_SelectedText(self.WorkGround.state.inputs[27])}<br>

        კომენტარი - ${self.WorkGround.state.inputs[31].value}<br>

        <br>
        <h3>114</h3>
        ტელეფონი -  ${self.WorkGround.state.inputs[15].value}<br>
        რაიონი - ${kendo_SelectedText(self.WorkGround.state.inputs[16])}<br>
        საკ.პირი -  ${self.WorkGround.state.inputs[17].value}<br>
        საკ.პირი ტელეფონი -  ${self.WorkGround.state.inputs[18].value}<br>
        საკ.პირი მისამართი -  ${self.WorkGround.state.inputs[19].value}<br>

        <h4>მომართვის ინფო </h4>
        რეაგირება(სტატუსი) - ${kendo_SelectedText(self.WorkGround.state.inputs[20])}<br>
        პრიორიტეტი - ${kendo_SelectedText(self.WorkGround.state.inputs[21])}<br>
        კომუნიკაციის არხი - ${kendo_SelectedText(self.WorkGround.state.inputs[22])}<br>
        ინფორმაციის წყარო - ${self.WorkGround.state.inputs[23].value}<br>


        <h4>გაცემული ინფორმაცია - 114</h4>
        კატეგორია - ${kendo_SelectedText(self.WorkGround.state.inputs[28])}<br>
        ზარის ტიპი - ${kendo_SelectedText(self.WorkGround.state.inputs[29])}<br>
        ქვე-კატეგორია -  ${kendo_SelectedText(self.WorkGround.state.inputs[30])}<br>
        კომენტარი - ${self.WorkGround.state.inputs[31].value}
        `,
    })
    return this.state.element.printFunction.innerHTML
    }


}