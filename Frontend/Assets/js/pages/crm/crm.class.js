import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import WorkGround from "../incomming/workGround.type.js";

export default class Crm extends Tdg {

    constructor() {
        super();
        self.Crm = this;

        this.state = {
            sectionName: document.querySelector("section[Crm]"),
            element: [],
            userinfo: [],
            interface: this.CreateElement({
                element: "interface",
                attributes: ["Crm"],
            }),

        }
        
        document.title = "Crm";
        
        this.removeLoading()
        this.init();
    }

    init = () => {
        this.state.crmDiv = this.CreateElement ({
            element: "div",
            style: {
                marginTop: "10px",
                minWidth: '200px',
                padding: '10px',
                backgroundColor: "var(--block-bg-color)",
                borderRadius: '7px'
            }
        })

        this.state.filterDiv = this.CreateElement ({
            element: "div",
            style: {
                marginTop: "10px",
                minWidth: '200px',
                padding: '10px',
                backgroundColor: "var(--block-bg-color)",
                borderRadius: '7px'
            }
        })

        this.append(this.state.sectionName, this.buildTabs());
        this.append(this.state.sectionName, this.createDiv());
        this.append(this.state.element.createcrm, this.state.filterDiv);
        this.append(this.state.element.createcrm, this.state.crmDiv);
    }

    createDiv = () => {
        this.state.element.createcrm = this.CreateElement({
            element: "CRM",
        })  
        return this.state.element.createcrm;
    }


    getActiveTab = (tabs) => {
        let activeTab =  window.location.href.split("#")[1];
        if (activeTab == '' || activeTab == undefined) {
            tabs.children[0].click();
       } else {
            tabs.childNodes.forEach(tab => {
                if (tab.getAttribute("url") == activeTab) {
                    tab.click();
                }
            })
       }
    }

    getTabContent = (key) => {
        switch (key) {
            case "physical": 
                this.append(this.state.filterDiv, this.createFilterSection())
                this.append(this.state.crmDiv, this.createPhysical());                
            break;
            case "juridical": 
                this.append(this.state.filterDiv, this.createFilterSection())
                // this.append(this.state.crmDiv, this.createTable());                
            break;
            default:
                this.append(this.state.filterDiv, this.createFilterSection())
                this.append(this.state.crmDiv, this.createPhysical());
            break;
        }
    }
      
    getTabs = () => {
        let tabData =   [
            {
                name:"ფიზიკური",
                content_id: "physical",
                id: 1
            },
            {
                name:"იურიდიული",
                content_id: "juridical",
                id: 2
            },
        ];

        return tabData;
    }

    buildTabs = () => {
        var tmp = [];
        tmp = this.getTabs();
        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs"
        })
        tmp.forEach(el => {
            this.append(this.state.element.taskTabs, this.CreateElement({
                element: "tab",
                children: el.name,
                'tab-id': el.id,
                onclick: this.tabClick,
                url: el.content_id
            }))
        })
        this.getActiveTab(this.state.element.taskTabs);
        return this.state.element.taskTabs;
    }

    tabClick = (e) => {
        this.state.crmDiv.innerHTML = '';
        this.state.filterDiv.innerHTML = '';
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });
        e.target.classList.add("active");
        var content_id = e.target.getAttribute("url");
        window.location.hash = content_id;
        this.getTabContent(content_id);  
    }

    createFilterSection = () => {
        this.state.element.filtercrm = this.CreateElement({
            element: "filtercrm"
        }, this.createAbonentNumber(), this.createPhoneNumber(), this.filterBtn())
        return this.state.element.filtercrm
    }

    createAbonentNumber = () => {
        this.state.element.abonentnumber = new Input({
            type: "text",
            placeholderTitle: "აბონენტის ნომერი",
            class: "abonentnumber"
        }).build()
        return this.state.element.abonentnumber
    }

    createPhoneNumber = () => {
        this.state.element.phonenumber = new Input({
            type: "text",
            placeholderTitle: "ტელეფონის ნომერი",
            class: "phonenumber"
        }).build()
        return this.state.element.phonenumber
    }

    filterBtn = () => {
        this.state.element.addbutton = new Button({
            text: "ფილტრი",
            onclick: () => {
                alert("filter")
            }
        })

        return this.state.element.addbutton
    }

    createPhysical = () => {
        this.state.element.physical = this.CreateElement({
            element: "physical"
        }, this.addBtn(),this.createTable())
        return this.state.element.physical
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "table",
            className: "kendo-table",
            column: [
                {
                    field: "სახელი,გვარი"
                },
                {
                    field: "აბონეტის ნომერი"
                },
                {
                    field: "პირადი ნომერი"
                },
                {
                    field: "მისამართი"
                }
            ],
            option: {
                header: false,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: false
            },
        })
        return this.state.element.table;
    }


    addBtn = () => {
        this.state.element.addbuttonnew = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => { 
                this.buildModal(null, {
                    width: '1880',
                    height: '1040',
                    content: await this.createModal(),
                    buttons: {
                        save: {
                            name: "დამატება",
                            onclick: async function (modal) {
                                await self.Tdg.getResponse({
                                    route: "Crm",
                                    act: "ADD",
                                }).then(function (data) {
                                    modal.close().destroy();
                                    self.Tdg.buildNotice({ msg: "დამატებულია" });
                                    kendo__refresh(self.Action.state.element.table, 'table');
                                })
                            },
                            access: "add"
                        },
                        companyadd: {
                            name: "კამპანიაში დამატება",
                            access: "add"
                        }

                    },
                    confirmOnCancel: true
                })
            },
            access: "add"
        })

        return this.state.element.addbuttonnew
    }
    
    createModal = async () => {
        this.state.interface.innerHTML='';
        self.Crm.state.fieldset = this.CreateElement({
            element: "div",
            attributes: ['fieldset']
        })
        this.state.element.modal = this.CreateElement({
            element: "modal"
        },this.createDivForInfo(), this.CreateElement({
            element: "modal-content"
        }, this.state.interface, self.Crm.state.fieldset))
        this.buildCrmTab();
        return this.state.element.modal
    }

    createDivForInfo = () => {
        this.state.element.divforinfo = this.CreateElement({
            element: "divforinfo"
        }, this.createPersonInfo(), this.momartvebi())
        return this.state.element.divforinfo
    }

    createPersonInfo = () => {
        this.state.element.personinfo = this.CreateElement({
            element: "person-info"
        }, this.createPersonImg(), this.createPersonName(), this.createPersonRating())
        return this.state.element.personinfo
    }

    createPersonImg = () => {
        this.state.element.personimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/physicalperson.svg"
        })
        return this.state.element.personimg
    }

    createPersonName = () => {
        this.state.element.personname = this.CreateElement({
            element: "person-name",
            children: "დავით კუხიანიძე"
        })
        return this.state.element.personname
    }

    createPersonRating = () => {
        this.state.element.rating = this.CreateElement({
            element: "div",
            children: `<img src="Frontend/Assets/images/icons/star123.svg"/>
            <img src="Frontend/Assets/images/icons/star123.svg"/>
            <img src="Frontend/Assets/images/icons/star123.svg"/>
            <img src="Frontend/Assets/images/icons/star123.svg"/>
            <img src="Frontend/Assets/images/icons/star123.svg"/>`
        })
        return this.state.element.rating

    }

    momartvebi = () => {
        this.state.element.momartvebi = this.CreateElement({
            element: "momartvebi"
        }, this.momartvebiTitle(), this.momartvebiDiv())
        return this.state.element.momartvebi
    }

    momartvebiTitle = () => {
        this.state.element.momartvebititle = this.CreateElement({
            element: "momartvebititle",
            children: "მომართვები"
        })
        return this.state.element.momartvebititle
    }

    momartvebiDiv = () => {
        this.state.element.momartvebidiv = this.CreateElement({
            element: "momartvebi-div",
        }, this.createAll(), this.createCurrent(), this.createFinished())
        return this.state.element.momartvebidiv
    }

    createAll = () => {
        this.state.element.createAll = this.CreateElement({
            element: "h1",
            children: "სულ",
        }, this.CreateElement({
            element: "div",
            children: "12",
            style: {
                color: "#3E4457"
            }
        }))
        return this.state.element.createAll
    }
    
    createCurrent = () => {
        this.state.element.createcurrent = this.CreateElement({
            element: "h1",
            children: "მიმდ."
        }, this.CreateElement({
            element: "div",
            children: "2",
            style: {
                color: "#FEB019"
            }
        }))
        return this.state.element.createcurrent
    }

    createFinished = () => {
        this.state.element.createfinished = this.CreateElement({
            element: "h1",
            children: "დასრ."
        }, this.CreateElement({
            element: "div",
            children: "10",
            style: {
                color: "#3FB969"
            }
        }))
        return this.state.element.createfinished
    }


    createTabOnlyCrm = async () => {
        this.state.element.tab = this.CreateElement({
            element: "tab",
            attributes: ["task"]
        })

        let data = [
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
                title: "SMS"
            },
            {
                key: "mail",
                title: "Email"
            },
            {
                key: "record",
                title: "ჩანაწერი"
            },
            {
                key: "file",
                title: "ფაილები"
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
        if (tab.key == "info") {
            this.state.infotable = this.state.element.tabItem;
        }
        return this.state.element.tabItem
    }

    buildCrmTab = async () => {
        this.append(this.state.interface, await this.createTabOnlyCrm());
        this.state.infotable.click()
    }

    handleTabClick = async function () {
        self.Crm.state.element.tab.childNodes.forEach(x => {
            x.removeAttribute("actived")
            x.children[1].style.display = "none"
            x.children[1].style.visibility = "hidden"
        })
        let key = this.getAttribute("key");
        self.Crm.state.fieldset.innerHTML = '';
        switch (key) {
            case "info":
                self.Crm.createInfoTab();
            break;
            case "history":
                self.Crm.getOtherTab("history");
            break;
            case "sms":
                self.Crm.getOtherTab("sms");
            break;
            case "mail":
                self.Crm.getOtherTab("mail");
            break;
            case "record":
                self.Crm.getOtherTab("record");
            break;
            case "file":
                self.Crm.getOtherTab("file");
            break;
        }
        this.children[1].style = { display: "inline-block", visibility: "visible" }
        this.setAttribute("actived", true)
    }

    getOtherTab = async (key) => {
        this.state.incomming_id = 37911;
        this.state.globalPhoneNumber = "995592158660";

        if (this.state.incomming_id > 0) {
            self.Incomming = { state: { prop: { id: this.state.incomming_id } } };
            self.IncommingModal = { state: { prop: { id: this.state.incomming_id } } };
            self.IncommingModal.crm = true;
        }

        var prop = {
            id: this.state.incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            attributes: ["tasktabcontent"]
        })

        this.append(self.Crm.state.fieldset, this.state.infotab);

        await new WorkGround(prop, true).init();
    }
    

    createInfoTab = () => {
        this.state.element.infoTab = this.CreateElement({
            element: "infotab-div"
        }, this.CreateElement({
            element: "div",
            class: "personal-comment"
        }, this.createPersonalInfo(), 
           this.createCommentSection()), 
           this.createContactInfo());
        this.append(this.state.fieldset, this.state.element.infoTab) 
    }

    createPersonalInfo = () => {
        this.state.element.personalinfo = this.CreateElement({
            element: "personalinfo",
        }, this.createPersonalInfoTitle(), 
        this.createDivForInputs())
        return this.state.element.personalinfo
    }

    createDivForInputs = () => {
        this.state.element.divforinputs = this.CreateElement({
            element: "divforinputs",
        }, this.createNameInput(),
           this.createLastNameInput(),
           this.creatPersonalNumberInput(),
           this.creatAbonentNumberInput(),
           this.creatAdressInput())
        return this.state.element.divforinputs
    }

    createNameInput = () => {
        this.state.element.nameinput = new Input({
            type: "text",
            placeholderTitle: "სახელი",
        }).build()
        return this.state.element.nameinput
    }

    createLastNameInput = () => {
        this.state.element.lastnameinput = new Input({
            type: "text",
            placeholderTitle: "გვარი",
        }).build()
        return this.state.element.lastnameinput
    }

    creatPersonalNumberInput = () => {
        this.state.element.personalnumber = new Input({
            type: "text",
            placeholderTitle: "პირადი ნომერი",
        }).build()
        return this.state.element.personalnumber
    }

    creatAbonentNumberInput = () => {
        this.state.element.abonentnum = new Input({
            type: "text",
            placeholderTitle: "აბონენტის ნომერი",
        }).build()
        return this.state.element.abonentnum
    }

    creatAdressInput = () => {
        this.state.element.adress = new Input({
            type: "text",
            placeholderTitle: "მისამართი",
        }).build()
        return this.state.element.adress
    }

    createPersonalInfoTitle = () => {
        this.state.element.personalinfotitle = this.CreateElement({
            element: "personalinfotitle",
            children: "პერსონალური ინფო"
        })
        return this.state.element.personalinfotitle
    }

    createCommentSection = () => {
        this.state.element.commentsection = this.CreateElement({
            element: "commentsection"
        }, this.commentTitle())
        return this.state.element.commentsection
    }
 
    commentTitle = () => {
        this.state.element.commenttitle = this.CreateElement({
            element: "commenttitle",
            children: "კომენტარი"
        }, this.creatCommentInput())
        return this.state.element.commenttitle
    }

    creatCommentInput = () => {
        this.state.element.abonentnum = new Input({
            type: "textarea",
            placeholderTitle: "კომენტარი",
            class: "comment-input"
        }).build()
        return this.state.element.abonentnum
    }

    createContactInfo = () => {
        this.state.element.contactinfo = this.CreateElement({
            element: "contactinfo",
        }, this.createContactInfoTitle(), this.createDivForContactInfo() )
        return this.state.element.contactinfo
    }

    createContactInfoTitle = () => {
        this.state.element.contactinfotitle = this.CreateElement({
            element: "contactinfotitle",
            children: "საკონტაქტო"
        })
        return this.state.element.contactinfotitle
    }

    createDivForContactInfo = () => {
        this.state.element.divforcontactinfo = this.CreateElement({
            element: "divforcontactinfo",
        }, this.createDivForPhoneInput(),
           this.createDivForAdressInput(), 
           this.createDivForEmailInput(),
           this.createDivForFbInput(), 
           this.createDivForLinkedinInput())
        return this.state.element.divforcontactinfo
    }

    createCopyBtn = () => {
        this.state.element.copybtn = this.CreateElement({
            element: "copybtn",
            children: `<img src="Frontend/Assets/images/icons/copy.svg" />`,
            onClick: (e) => {
                var inputValue = e.target.parentNode.parentNode.children[0].children[0];
                inputValue.select();
                inputValue.setSelectionRange(0, 9999);
                navigator.clipboard.writeText(inputValue.value);
            }
        })
        return this.state.element.copybtn
    }

    createDivForPhoneInput = () => {
        this.state.element.phoneinputdiv = this.CreateElement({
            element: "divforcontactinfo",
        }, this.createPhoneImg(),
           this.divForPhoneInputAndCopyButton(), 
           this.createDivForCheckbox(), 
           this.buildAddPhoneButton())
        return this.state.element.phoneinputdiv
    }

    createPhoneImg = () => {
        this.state.element.phoneimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/contactinfo-phone.svg"
        })
        return this.state.element.phoneimg
    }

    phoneInput = () => {
        this.state.element.addphoneinput = new Input({
            type: "text",
            placeholderTitle: "ტელეფონი",
            class: "addphoneinput",
        }).build()
        return this.state.element.addphoneinput
    }

    divForPhoneInputAndCopyButton = () => {
        this.state.element.divinputcopy = this.CreateElement({
            element: "divinputcopy",
        }, this.phoneInput(), this.createCopyBtn())
        return this.state.element.divinputcopy
    }


    createDivForCheckbox = () => {
        this.state.element.checkboxdiv = this.CreateElement({
            element: "checkboxdiv",
        }, this.createDivForContactCheckbox(), 
           this.createDivForSmsCheckbox())
        return this.state.element.checkboxdiv
    }

    createDivForContactCheckbox = () => {
        this.state.element.smscheckboxdiv = this.CreateElement({
            element: "checkboxdivs",
        }, this.contactCheckboxTitle(), this.checkboxContactInput())
        return this.state.element.smscheckboxdiv
    }

    createDivForSmsCheckbox = () => {
        this.state.element.smscheckboxdiv = this.CreateElement({
            element: "checkboxdivs",
        }, this.smsCheckboxTitle(), this.checkboxSmsInput())
        return this.state.element.smscheckboxdiv
    }

    contactCheckboxTitle = () => {
        this.state.element.contactCheckboxTitle = this.CreateElement({
            element: "p",
            children: "საკონტაქტო",
            class: "checkboxtitle"
        })
        return this.state.element.contactCheckboxTitle
    }

    smsCheckboxTitle = () => {
        this.state.element.smsCheckboxTitle = this.CreateElement({
            element: "p",
            children: "SMS",
            class: "checkboxtitle"
        })
        return this.state.element.smsCheckboxTitle
    }


    checkboxContactInput = () => {
        this.state.element.checkboxcontactinput = new Input({
            type: "checkbox",
            class: "checkboxcontactinput"
        }).build()
        return this.state.element.checkboxcontactinput
    }

    checkboxSmsInput = () => {
        this.state.element.checkboxsmsinput = new Input({
            type: "checkbox",
            class: "checkboxsmsinput"
        }).build()
        return this.state.element.checkboxsmsinput
    }

    buildAddPhoneButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/addcrmbtn.svg'/></div>`,
            class: "crm-button",
            style: {
                marginLeft: '3px'
            },
            onClick: () =>{
                var phoneInfo = document.createElement('div');
                phoneInfo = this.CreateElement({
                    element: "phoneDiv",
                }, this.divForPhoneInputAndCopyButton(), 
                   this.createDivForCheckbox(), 
                   this.buildRemoveBtn())
                this.state.element.phoneinputdiv.append(phoneInfo);
            }
        })
        return this.state.element.addbutton
    }

    buildRemoveBtn = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/deletecrmbtn.svg'/></div>`,
            class: "crm-button",
            onClick: (e) => {
                let confirmModal = new jBox('Confirm', {
                    content: 'ნამდვილად გსურთ წაშლა?',
                    cancelButton: 'გაუქმება',
                    confirmButton: 'წაშლა',
                    zIndex: 'auto',
                    confirm: () => {
                        e.target.parentNode.parentNode.parentNode.remove();
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

    createDivForAdressInput = () => {
        this.state.element.adressinputdiv = this.CreateElement({
            element: "divforadressinfo",
        }, this.createAdressImg(), this.divForAdressInputAndCopyButton(), this.buildAddAdressButton())
        return this.state.element.adressinputdiv
    }

    createAdressImg = () => {
        this.state.element.adressimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/contactinfo-adress.svg"
        })
        return this.state.element.adressimg
    }

    divForAdressInputAndCopyButton = () => {
        this.state.element.divinputcopy = this.CreateElement({
            element: "divinputcopy",
        }, this.adressInput(), this.createCopyBtn())
        return this.state.element.divinputcopy
    }

    adressInput = () => {
        this.state.element.addadressinput = new Input({
            type: "text",
            placeholderTitle: "მისამართი",
            class: "addadressinput"
        }).build()
        return this.state.element.addadressinput
    }

    buildAddAdressButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/addcrmbtn.svg'/></div>`,
            class: "crm-button",
            style: {
                marginLeft: '3px'
            },
            onClick: () =>{
                var adressInfo = document.createElement('div');
                adressInfo = this.CreateElement({
                    element: "adressDiv",
                }, this.divForAdressInputAndCopyButton(),this.buildRemoveBtn())
                this.state.element.adressinputdiv.append(adressInfo);
            }
        })
        return this.state.element.addbutton
    }


    createDivForEmailInput = () => {
        this.state.element.emailinputdiv = this.CreateElement({
            element: "divforemailinfo",
        }, this.createEmailImg(), this.divForEmailInputAndCopyButton(),
           this.createDivForCheckbox(), this.buildAddEmailButton())
        return this.state.element.emailinputdiv
    }

    createEmailImg = () => {
        this.state.element.emailimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/contactinfo-mail.svg"
        })
        return this.state.element.emailimg
    }


    divForEmailInputAndCopyButton = () => {
        this.state.element.divinputcopy = this.CreateElement({
            element: "divinputcopy",
        }, this.emailInput(), this.createCopyBtn())
        return this.state.element.divinputcopy
    }

    emailInput = () => {
        this.state.element.addphoneinput = new Input({
            type: "text",
            placeholderTitle: "ელ-ფოსტა",
            class: "addmailinput"
        }).build()
        return this.state.element.addphoneinput
    }

    buildAddEmailButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/addcrmbtn.svg'/></div>`,
            class: "crm-button",
            style: {
                marginLeft: '3px'
            },
            onClick: () =>{
                var emailInfo = document.createElement('div');
                emailInfo = this.CreateElement({
                    element: "emailDiv",
                }, this.divForEmailInputAndCopyButton(), this.createDivForCheckbox(), this.buildRemoveBtn())
                this.state.element.emailinputdiv.append(emailInfo);
            }
        })
        return this.state.element.addbutton
    }


    createDivForFbInput = () => {
        this.state.element.fbinputdiv = this.CreateElement({
            element: "divforfbinfo",
        }, this.createFbImg(), this.divForFbInputAndCopyButton(), this.createDivForCheckbox(), this.buildAddFbButton())
        return this.state.element.fbinputdiv
    }

    createFbImg = () => {
        this.state.element.fbimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/contactinfo-fb.svg"
        })
        return this.state.element.fbimg
    }

    divForFbInputAndCopyButton = () => {
        this.state.element.divinputcopy = this.CreateElement({
            element: "divinputcopy",
        }, this.fbInput(), this.createCopyBtn())
        return this.state.element.divinputcopy
    }

    fbInput = () => {
        this.state.element.addfbinput = new Input({
            type: "text",
            placeholderTitle: "Facebook",
            class: "addfbinput"
        }).build()
        return this.state.element.addfbinput
    }

    buildAddFbButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/addcrmbtn.svg'/></div>`,
            class: "crm-button",
            style: {
                marginLeft: '3px'
            },
            onClick: () =>{
                var fbInfo = document.createElement('div');
                fbInfo = this.CreateElement({
                    element: "fbDiv",
                }, this.divForFbInputAndCopyButton(), this.createDivForCheckbox(), this.buildRemoveBtn())
                this.state.element.fbinputdiv.append(fbInfo);
            }
        })
        return this.state.element.addbutton
    }


    createDivForLinkedinInput = () => {
        this.state.element.linkedininputdiv = this.CreateElement({
            element: "divforlinkedininfo",
        }, this.createLinkedinImg(), this.divForLinkedinInputAndCopyButton(), 
           this.createDivForCheckbox(), this.buildAddLinkedinButton())
        return this.state.element.linkedininputdiv
    }

    createLinkedinImg = () => {
        this.state.element.linkedinimg = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/contactinfo-linkedin.svg"
        })
        return this.state.element.linkedinimg
    }

    divForLinkedinInputAndCopyButton = () => {
        this.state.element.divinputcopy = this.CreateElement({
            element: "divinputcopy",
        }, this.linkedinInput(), this.createCopyBtn())
        return this.state.element.divinputcopy
    }

    linkedinInput = () => {
        this.state.element.addlinkedininput = new Input({
            type: "text",
            placeholderTitle: "Linkedin",
            class: "addlinkedininput"
        }).build()
        return this.state.element.addlinkedininput
    }

    buildAddLinkedinButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="crmbtn"><img src='Frontend/Assets/images/icons/addcrmbtn.svg'/></div>`,
            class: "crm-button",
            style: {
                marginLeft: '3px'
            },
            onClick: () =>{
                var linkedinInfo = document.createElement('div');
                linkedinInfo = this.CreateElement({
                    element: "linkedinDiv",
                }, this.divForLinkedinInputAndCopyButton(), this.createDivForCheckbox(), this.buildRemoveBtn())
                this.state.element.linkedininputdiv.append(linkedinInfo);
            }
        })
        return this.state.element.addbutton
    }


}