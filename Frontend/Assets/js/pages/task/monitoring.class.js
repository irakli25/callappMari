import Tdg from "../../tdg.class.js";
import workGround from "../incomming/workGround.type.js"

export default class Monitoring extends Tdg {

    constructor(prop) {
        super();

        self.TaskCase = this;


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
            id: prop && prop.id,
            addInput: [],
            divfieldset: [],
            tabcontent: [],
            dateinput: [],
            inputtext: [],
            selectorkendo: [],
            divdate: [],
            labeldate: [],
            multiselectorkendo: [],
            divselector: []
        }

    }


    /**
     * INITIALIZE RIG
     */
    init = async (prop = {}) => {
        if (typeof prop.incomming_id != 'undefined') {
            this.state.prop = prop
        }

        if (this.state.prop.incomming_id > 0) {
            self.Incomming = { state: { prop: { id: this.state.prop.incomming_id } } };
            self.IncommingModal = { state: { prop: { id: this.state.prop.incomming_id } } };
            self.IncommingModal.fromtask = true;
        }

        this.build();

        return this.state.interface;
    }


    build = () => {

        this.buildTab();

    }


    createTab = async () => {

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
            }, {
                key: "sms",
                title: "Sms"
            }, {
                key: "mail",
                title: "Mail"
            },
            {
                key: "log",
                title: "ლოგები"
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
                            <use xlink:href="../Assets/images/icons/icons.svg#tab-${tab.key}" />
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
            this.state.casestabel = this.state.element.tabItem;
        }

        return this.state.element.tabItem

    }

    buildTab = async () => {
        this.append(this.state.interface, await this.createTab());

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
            case "info":
                self.TaskCase.getInfoTab("info");
                break;
            case "history":
                self.TaskCase.getOtherTab("history");
                break;
            case "comment":
                self.TaskCase.getOtherTab("comment");
                break;
            case "record":
                self.TaskCase.getOtherTab("record");
                break;
            case "file":
                self.TaskCase.getOtherTab("file");
                break;
            case "sms":
                self.TaskCase.getOtherTab("sms");
                break;
            case "mail":
                self.TaskCase.getOtherTab("mail");
                break;
            case "log":
                if (!(self.TaskCase.state.prop.incomming_id > 0)) {
                    self.Incomming = { state: { prop: { id: 0 }, withoutincoming: true } };
                    self.IncommingModal = { state: { prop: { id: 0 } } };
                    self.IncommingModal.fromtask = true;
                }

                self.TaskCase.getOtherTab("log");
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

        console.log(this.state.infotab.children[0].childNodes)

        this.state.infotab.children[0].childNodes.forEach((el, i) => {
            el.childNodes.forEach(node => {
                console.log(node.childNodes[0].nodeName)
                if (node.childNodes[0].nodeName == "SPAN") {
                    node.classList.add("k-state-disabled");
                } else {
                    if (node.childNodes[0].nodeName == "BUTTONAREA") {
                        node.remove();
                    }
                    node.childNodes[0].disabled = true;
                }
            });
        })

        this.state.infotab.children[0].style.overflow = 'auto';
        this.state.infotab.children[0].style.height = '597px';
        this.state.infotab.children[0].style.width = '100%';

        this.append(this.state.interface, this.state.infotab);
    }

    getOtherTab = async (key) => {
        var prop = {
            id: this.state.prop.incomming_id,
            key: key,
            globalPhoneNumber: this.state.globalPhoneNumber
        }

        this.state.infotab = this.CreateElement({
            element: "div",
            attributes: ["tasktabcontent"]
        })

        this.append(this.state.interface, this.state.infotab);

        await new workGround(prop, true).init();


        this.state.infotab.children[0].style.overflow = 'auto';
        this.state.infotab.children[0].style.height = '597px';
        this.state.infotab.children[0].style.width = '33vw';
    }

    buildTabContent = (name) => {

        this.state.tabcontent[name] = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '30px',
                alignItems: "flex-end"
            }
        })

        return this.state.tabcontent[name];
    }


    createFieldSet = (title, name) => {
        this.state.divfieldset[name] = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: title,
            style: {
                "grid-template-columns": "unset"
            }
        })

        return this.state.divfieldset[name];
    }

}

