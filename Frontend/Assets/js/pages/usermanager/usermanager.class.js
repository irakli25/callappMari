import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendoResponsive, kendo__multiSelectedID } from "../../helpers/kendo.helper.js";
import Uploader from "../../components/uploader/uploader.class.js";

export default class UserManager extends Tdg {
    constructor() {
        super();
        self.UserManager = this;

        this.state = {
            sectionName: document.querySelector("section[usermanager]"),
            element: []
        }
        this.removeLoading();
        this.init();
    }

    init = () => {
        this.state.userManagerDiv = this.CreateElement({
            element: "div",
            class: "userManagerDiv"
        })

        this.append(this.state.sectionName, this.buildTaskTabs());

        this.append(this.state.sectionName, this.buildUserManager());
        this.append(this.state.element.createusermanager, this.state.userManagerDiv);
        this.getActiveTab(this.state.element.taskTabs);
        kendoResponsive();

    }

    buildUserManager = () => {
        this.state.element.createusermanager = this.CreateElement({
            element: "createusermanager",
            class: "createusermanager"
        });
        return this.state.element.createusermanager;
    }

    getActiveTab = (tabs) => {
        let activeTab = window.location.href.split("#")[1];
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
            case "current":
                this.append(this.state.userManagerDiv, this.createCurrent());
                break;
            case "archive":
                this.append(this.state.userManagerDiv, this.createArchive());
                break;
            default:
                this.append(this.state.userManagerDiv, this.createCurrent());
                break;
        }
    }

    getTabs = () => {
        let tabData = [
            {
                name: "მიმდინარე",
                content_id: "current",
                id: 1
            },
            {
                name: "არქივი",
                content_id: "archive",
                id: 2
            }
        ];

        return tabData;
    }

    buildTaskTabs = () => {
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

        return this.state.element.taskTabs;

    }

    tabClick = (e) => {
        this.state.userManagerDiv.innerHTML = '';
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");

        var content_id = e.target.getAttribute("url");

        window.location.hash = content_id;

        this.getTabContent(content_id);

    }

    createCurrent = () => {
        this.state.element.current = this.CreateElement({
            element: "current",
            class: "current",
        }, this.createDivForButtons(), this.createTable())
        return this.state.element.current
    }

    createDivForButtons = () => {
        this.state.element.buttondiv = this.CreateElement({
            element: "buttondiv",
            class: "buttondiv",
        }, this.buildAddButton(), this.buildRemoveButton(), this.buildStatusChangeButton())
        return this.state.element.buttondiv
    }

    buildAddButton = () => {
        this.state.element.addbutton = new Button({
            type: "add",
            text: "დამატება",
            onclick: async () => {
                this.buildModal(null, {
                    width: '1034px',
                    height: '658px',
                    content: await this.UserManagerModal(),
                    buttons: {
                        save: {
                            name: "დამატება",
                            onclick: (modal) => {
                                self.Tdg.getResponse({
                                    route: "UserManager",
                                    act: "ADD",
                                    nameSurname: this.state.element.nameinput.children[0].value,
                                    personalNumber: this.state.element.personalnumber.children[0].value,
                                    position_id: kendo_SelectedID(this.state.element.position),
                                    department_id: kendo_SelectedID(this.state.element.department),
                                    extension_id: kendo_SelectedID(this.state.element.extension),
                                    email: this.state.element.emailinput.children[0].value,
                                    address: this.state.element.adressinput.children[0].value,
                                    mobile: this.state.element.phoneinput.children[0].value,
                                    userName: this.state.element.userinput.children[0].value,
                                    password: this.state.element.passwordinput.children[0].value,
                                    group_id: kendo_SelectedID(this.state.element.groupselector),
                                    service_center_id: kendo_SelectedID(this.state.element.work),
                                    chat_theme_ids: `${kendo__multiSelectedID(this.state.element.chat_themes)}`,
                                    // group_head: this.state.inputcheckbox.checked ? "1" : "0",
                                    image: this.state.imageId,
                                    comment: this.state.element.remark.children[0].value
                                }).then((data) => {
                                    modal.close().destroy()
                                    self.Tdg.buildNotice({ msg: "დამატებულია" });
                                    kendo__refresh(this.state.element.table, 'table');
                                })
                            },
                            access: "add"
                        }
                    },
                    confirmOnCancel: true
                })
            },
            access: "view"
        })

        return this.state.element.addbutton
    }

    buildRemoveButton = () => {
        this.state.element.addbutton = new Button({
            children: `<div class="btn">წაშლა <img src='Frontend/Assets/images/icons/x.svg'/></div>`,
            class: "delbtn",
            onclick: function () {
                self.UserManager.kendoselected = this.state.element.table.children[1].children[0].children[1].childNodes;
                self.UserManager.kendoselected.forEach(data => {
                    if (data.classList.contains("k-state-selected")) {
                        self.Tdg.getResponse({
                            route: "UserManager",
                            act: "DELETE",
                            id: data.children[0].innerHTML
                        }).then(function (data) {
                            self.Tdg.buildNotice({ msg: "წაშლილია" });
                            kendo__refresh(this.state.element.table, 'table');
                        })
                    }
                });
            },
            access: "delete"
        })
        return this.state.element.addbutton
    }

    buildStatusChangeButton = () => {
        this.state.element.statuschangebutton = new Button({
            type: "archive",
            text: "დაარქივება",
            onclick: () => {

            }
        })

        return this.state.element.statuschangebutton
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
                    field: "მომხმარებელი",
                    size: 100
                },
                {
                    field: "ექსთენშენი",
                    size: 100
                },
                {
                    field: "მობილური",
                    size: 100
                },
                {
                    field: "თანამდებობა",
                    size: 100
                },
                {
                    field: "მისამართი",
                    size: 100
                }
            ],
            data: {
                route: "UserManager",
                act: "getList"
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

    tableDblClickHandler = async (e) => {
        this.buildModal(null, {
            width: '1034px',
            height: '658px',
            content: await this.UserManagerModal(e.id),
            buttons: {
                save: {
                    name: "შენახვა",
                    onclick: (modal) => {
                        self.Tdg.getResponse({
                            route: "UserManager",
                            act: "UPDATE",
                            nameSurname: this.state.element.nameinput.children[0].value,
                            personalNumber: this.state.element.personalnumber.children[0].value,
                            position_id: kendo_SelectedID(this.state.element.position),
                            department_id: kendo_SelectedID(this.state.element.department),
                            extension_id: kendo_SelectedID(this.state.element.extension),
                            email: this.state.element.emailinput.children[0].value,
                            address: this.state.element.adressinput.children[0].value,
                            mobile: this.state.element.phoneinput.children[0].value,
                            userName: this.state.element.userinput.children[0].value,
                            password: this.state.element.passwordinput.children[0].value,
                            group_id: kendo_SelectedID(this.state.element.groupselector),
                            service_center_id: kendo_SelectedID(this.state.element.work),
                            chat_theme_ids: `${kendo__multiSelectedID(this.state.element.chat_themes)}`,
                            chat_theme_ids_old: this.state.chat_temes_ids,
                            // group_head: this.state.inputcheckbox.checked ? "1" : "0",
                            image: this.state.imageId,
                            id: e.id,
                            comment: this.state.element.remark.children[0].value
                        }).then((data) => {
                            modal.close().destroy()
                            self.Tdg.buildNotice({ msg: "შენახულია" });
                            kendo__refresh(this.state.element.table, 'table');
                        })
                    },
                    access: "save"
                }
            },
            confirmOnCancel: true
        })
    }

    createDivForArchiveButton = () => {
        this.state.element.archivebutton = this.CreateElement({
            element: "archivebuttondiv",
            class: "archivebuttondiv",
        }, this.buildRemoveButton())
        return this.state.element.archivebutton
    }

    createArchive = () => {
        this.state.element.archive = this.CreateElement({
            element: "archive",
            class: "archive",
        }, this.createDivForArchiveButton(), this.createTable())
        return this.state.element.archive
    }

    UserManagerModal = async (id = 0) => {
        if (id > 0) {
            await self.Tdg.getResponse({
                route: "UserManager",
                act: "GET",
                id: id
            }).then((data) => {
                this.state.position_id = data.position_id;
                this.state.department_id = data.department_id;
                this.state.extension_id = data.extension_id;
                this.state.group_id = data.group_id;
                this.state.service_center_id = data.service_center_id;
                this.state.chat_temes_ids = data.chat_temes_ids;
                this.state.editdata = data;

            })
        }

        this.state.element.modal = this.CreateElement({
            element: "usermanagermodal",
            class: "modal",
        }, this.createInfoModal(), this.createUserModal(), this.createPictureModal())

        if (this.state.editdata) {
            this.renderImg("Frontend/Uploads/avatars/" + this.state.editdata.filename);
            this.state.element.nameinput.children[0].value = this.state.editdata.name;
            this.state.element.personalnumber.children[0].value = this.state.editdata.tin;
            this.state.element.emailinput.children[0].value = this.state.editdata.email;
            this.state.element.adressinput.children[0].value = this.state.editdata.address;
            this.state.element.phoneinput.children[0].value = this.state.editdata.mobile_number;
            this.state.element.userinput.children[0].value = this.state.editdata.username;
            this.state.element.passwordinput.children[0].value = "**z**1**m**";
            this.state.element.remark.children[0].value = this.state.editdata.comment;
            // this.state.inputcheckbox.checked = this.state.editdata.group_head == 1 ? true : false;

            var b = $(this.state.element.position).data("kendoDropDownList");
            b.value(this.state.position_id);
            b.trigger("change");
            b.refresh();

            var b = $(this.state.element.department).data("kendoDropDownList");
            b.value(this.state.department_id);
            b.trigger("change");
            b.refresh();

            var b = $(this.state.element.extension).data("kendoDropDownList");
            b.value(this.state.extension_id);
            b.trigger("change");
            b.refresh();

            var b = $(this.state.element.groupselector).data("kendoDropDownList");
            b.value(this.state.group_id);
            b.trigger("change");
            b.refresh();

            if (this.state.chat_temes_ids) {
                const myArray = this.state.chat_temes_ids.split(",");
                $(this.state.element.chat_themes).getKendoMultiSelect().value(myArray);
            }

        }

        return this.state.element.modal
    }

    createInfoModal = () => {
        this.state.element.infomodal = this.CreateElement({
            element: "div",
            class: "infomodal"
        }, this.createInfoModalTitle(), this.CreateElement({
            element: "div",
            class: "modal-content"
        }, this.nameInput(), this.personalNumberInput(), this.positionInput(), this.departmentInput(), this.workInput(), this.extensionInput(), this.emailInput(), this.adressInput(), this.phoneInput(), this.chatInput(), this.createRemarkInput()))

        return this.state.element.infomodal
    }

    createInfoModalTitle = () => {
        this.state.element.infotitle = this.CreateElement({
            element: "h1",
            children: "ძირითადი ინფორმაცია",
            class: "title"
        })
        return this.state.element.infotitle
    }

    nameInput = () => {
        this.state.element.nameinput = new Input({
            type: "text",
            placeholderTitle: "სახელი გვარი",
        }).build()
        return this.state.element.nameinput
    }

    personalNumberInput = () => {
        this.state.element.personalnumber = new Input({
            type: "text",
            placeholderTitle: "პირადი ნომერი",
        }).build()
        return this.state.element.personalnumber
    }

    positionInput = () => {
        this.state.element.position = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "თანამდებობა",
            value: this.state.position_id ? this.state.position_id : "",
            style: {
                width: "200px"
            },
            data: {
                route: "UserManager",
                act: "getPosition"
            }
        });

        return this.state.element.position;
    }

    departmentInput = () => {
        this.state.element.department = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "განყოფილება",
            value: this.state.department_id ? this.state.department_id : "",
            style: {
                width: "200px"
            },
            data: {
                route: "UserManager",
                act: "getDepartment"
            }
        })

        return this.state.element.department
    }

    extensionInput = () => {

        this.state.element.extension = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ექსთენშენი",
            value: this.state.extension_id ? this.state.extension_id : "",
            style: {
                width: "200px"
            },
            data: {
                route: "UserManager",
                act: "getExtension"
            }
        });


        return this.state.element.extension
    }

    emailInput = () => {
        this.state.element.emailinput = new Input({
            type: "text",
            placeholderTitle: "ელ-ფოსტა",
        }).build()
        return this.state.element.emailinput
    }

    adressInput = () => {
        this.state.element.adressinput = new Input({
            type: "text",
            placeholderTitle: "მისამართი",
        }).build()
        return this.state.element.adressinput
    }

    phoneInput = () => {
        this.state.element.phoneinput = new Input({
            type: "text",
            placeholderTitle: "ტელეფონი",
        }).build()
        return this.state.element.phoneinput
    }

    createCheckBox = () => {
        this.state.inputcheckbox = this.CreateElement({
            element: "input",
            type: "checkbox"
        })

        let name = this.CreateElement({
            element: "span",
            text: 'ჯგუფის უფროსი',
            style: {
                fontFamily: 'BPG2',
                fontSize: '11px',
                fontWeight: 'bold'
            }
        })

        let div = this.CreateElement({
            element: "div",
            style: {
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                width: '200px'
            }
        }, this.state.inputcheckbox, name)


        return div;
    }

    createRemarkInput = () => {
        this.state.element.remark = new Input({
            type: "textarea",
            placeholderTitle: "შენიშვნა",
            class: "remark-input"
        }).build()
        return this.state.element.remark
    }

    createUserModal = () => {
        this.state.element.usermodal = this.CreateElement({
            element: "div",
            class: "usermodal"
        }, this.createUserModalTitle(), this.CreateElement({
            element: "div",
            class: "modal-content"
        }, this.userInput(), this.passwordInput(), this.createGroupSelector()))
        return this.state.element.usermodal
    }

    createUserModalTitle = () => {
        this.state.element.usertitle = this.CreateElement({
            element: "h1",
            children: "მომხმარებელი",
            class: "title"
        })
        return this.state.element.usertitle
    }

    userInput = () => {
        this.state.element.userinput = new Input({
            type: "text",
            placeholderTitle: "მომხმარებელი"
        }).build()
        return this.state.element.userinput
    }

    passwordInput = () => {
        this.state.element.passwordinput = new Input({
            type: "password",
            placeholderTitle: "პაროლი"
        }).build()
        return this.state.element.passwordinput
    }

    createGroupSelector = () => {
        this.state.element.groupselector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ჯგუფი",
            value: this.state.group_id ? this.state.group_id : "",
            style: {
                width: "200px"
            },
            data: {
                route: "UserManager",
                act: "getGroup"
            }
        });

        return this.state.element.groupselector
    }

    createPictureModal = () => {
        this.state.element.picturemodal = this.CreateElement({
            element: "div",
            class: "picturemodal"
        }, this.createPictureModalTitle(), this.uploadButton(), this.createImgDiv())
        return this.state.element.picturemodal
    }

    createPictureModalTitle = () => {
        this.state.element.picturetitle = this.CreateElement({
            element: "h1",
            children: "თანამშრომლის სურათი",
            class: "title"
        })
        return this.state.element.picturetitle
    }

    uploadButton = () => {
        this.state.element.upload = this.CreateElement({
            element: "button",
            children: "ატვირთე ფაილი",
            class: "uploadbtn",
            id: "importcontent",
            onClick: () => this.importFiles()
        })
        return this.state.element.upload
    }

    importFiles = async () => {
        let param = {
            table: this.state.element.table,
            inc_id: 0,
            multiple: false,
            setUploads: this.getImageData,
            req: "profile"
        }

        await new Uploader(param).init();
    }

    getImageData = (image) => {
        this.state.imageId = image.id;
        this.renderImg(image.link);
    }

    renderImg = (image) => {
        this.state.element.imgDiv.innerHTML = "";

        this.state.element.renderImg = this.CreateElement({
            element: "div",
            class: "render-img"
        }, this.CreateElement({
            element: "img",
            src: image
        }))

        this.state.element.renderDefaultImg = this.CreateElement({
            element: "div",
            class: "render-img"
        }, this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/no-image.png"
        }))

        if (image.substr(-4) === ".jpg" || image.substr(-4) === ".png" || image.substr(-5) === ".jpeg") {
            this.append(this.state.element.imgDiv, this.state.element.renderImg)
        } else {
            this.append(this.state.element.imgDiv, this.state.element.renderDefaultImg)
        }
    }

    createImgDiv = () => {
        this.state.element.imgDiv = this.CreateElement({
            element: "div"
        })

        return this.state.element.imgDiv;
    }

    chatInput = () => {
        this.state.element.chat_themes = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "ჩატის თემები",
            data: {
                route: "UserManager",
                act: "GET_CHATTHEMES"
            }
        })
        return this.state.element.chat_themes
    }

    workInput = () => {
        this.state.element.work = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "სამსახური",
            value: this.state.service_center_id ? this.state.service_center_id : "",
            style: {
                width: '222px'
            },
            data: {
                route: "UserManager",
                act: "GET_SERVICE_CENTER"
            }
        })
        return this.state.element.work
    }
}

