import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
export default class TabRecord extends Tdg {
    constructor() {
        super();

        self.Incomming.tab = [];
        self.Incomming.tab.TabRecord = this;

        this.state = {
            prop: self.IncommingModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: [],
            serverAddress: "http://10.0.18.19:80/records/"
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

        self.Incomming.TabRecord = this.CreateElement({
            element: "div",
            style: {
                gap: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }
        });

        this.state.fieldSet = self.Incomming.TabRecord;

        this.append(this.state.interfaceName, this.state.fieldSet);

        this.append(self.Incomming.TabRecord, this.buildRecords());
        this.append(self.Incomming.TabRecord, this.buildIncCall());
        this.append(self.Incomming.TabRecord, this.buildOutcCall());
        
        this.append(this.state.records, this.buildAudioPlayer());

        this.append(this.state.inccall, this.buildTableInc());
        this.append(this.state.outcall, this.buildTableOut());

    }

    buildRecords = () => {
        this.state.records = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ჩანაწერი",
            style: {
                "grid-template-columns": "unset",
                "grid-column": "auto / span 2"
            }
        });

        return this.state.records;
    }

    buildIncCall = () => {
        this.state.inccall = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "შემომავალი ზარი",
            style: {
                "grid-template-columns": "unset"
            }
        })

        return this.state.inccall;
    }

    buildOutcCall = () => {
        this.state.outcall = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "გამავალი ზარი",
            style: {
                "grid-template-columns": "unset"
            }
        })

        return this.state.outcall;
    }

    buildAudioPlayer = () => {
        this.state.element.player = this.CreateElement({
            element: "audio",
            controls: true,
            type: "audio/wav",
            children: `<source>`,
            style: {
                width: '64%',
                height: '40px'
            }
        })

        return this.state.element.player
    }

    buildDiv = () => {
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '73%',
                flexWrap: 'wrap',
                gap: '30px'
            }
        })

        return this.state.div;
    }

    buildTableInc = () => {

        this.state.tableinc = this.CreateElement({
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
                    field: "ხანგრძლივობა"
                },
                {
                    field: "მოსმენა",
                    hidden: true
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getRecordsInc",
                phone: self.WorkGround.state.globalPhoneNumber
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: false,
                footer: true
            },
            onclick: (callback) => {

                this.playRecord(callback);

            }
        })

        return this.state.tableinc;

    }

    playRecord = (link) => {
        let src = this.state.serverAddress + link.mosmena;

        this.state.element.player.children[0].setAttribute('src', src);
        this.state.element.player.load()
    }

    buildTableOut = () => {

        this.state.tableout = this.CreateElement({
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
                    field: "ხანგრძლივობა"
                },
                {
                    field: "მოსმენა",
                    hidden: true
                }
            ],
            data: {
                route: "IncommingTabs",
                act: "getRecordsOut",
                phone: self.WorkGround.state.globalPhoneNumber
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
            onclick: (callback) => {

                this.playRecord(callback);

            }
        })

        return this.state.tableout;

    }


    getModalContent = (callback) => {

        console.log(callback)

    }


    destroy = () => {

        if (!self.Incomming.TabMail) return false;
        self.Incomming.TabMail.remove();

    }

}