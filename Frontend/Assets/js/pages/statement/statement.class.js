import Tdg from "../../tdg.class.js";
import workGround from "../incomming/workGround.type.js";
import GivenInformationModal from "../incomming/givenInformation.modal.js";
import TabSms from "../incomming/tabs/sms.tab.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";


export default class Statement extends Tdg {
    constructor(){
        super();
        self.Statement = this;
        this.state = {
            sectionName: document.querySelector("section[statement]"),
            element: []
        }


        this.removeLoading();
        this.init();

       
    }

    init = async () => {
        
        this.append(this.state.sectionName, await this.buildIframe())

        // document.querySelector("iframe").contentDocument.querySelector("#example tbody tr").addEventListener("dblclick", function(e) {
        //     console.log(123)
        // })

        document.querySelector("iframe").contentDocument.querySelector("#ussd_dialog");
    }

    UssdDialog = async (id) => {
        await self.Tdg.getResponse({
            route: "Ussd",
            act: "GetDialog",
            id: id
        }).then((data)=>{
            var ussdModalInfo = new GivenInformationModal();

            this.buildModal(null, {
                width: '993px',
                height: '295px',
                content: ussdModalInfo.openBtnTwoModal(data),
                buttons: {
                    save: {
                        name: "დამატება",
                        onclick: function (modal) {
                            self.Tdg.getResponse({
                                route: "Ussd",
                                act: "Save",
                                id: data.ussd_id,
                                AccidentTypeId: ussdModalInfo.get("AccidentTypeId"),
                                CaseRegId: ussdModalInfo.get("CaseRegId"),
                                GnercId: ussdModalInfo.get("GnercId"),
                                StatusId: ussdModalInfo.get("StatusId"),
                                ResultId: ussdModalInfo.get("ResultId"),
                                DeadLine: ussdModalInfo.get("DeadLine"),
                                CompensationAmount: ussdModalInfo.get("CompensationAmount"),
                                CompensationTransId: ussdModalInfo.get("CompensationTransId"),
                                NeedCompensation: ussdModalInfo.get("NeedCompensation"),
                                ActualDt: ussdModalInfo.get("ActualDt"),
                                CompensationDeadLine: ussdModalInfo.get("CompensationDeadLine"),
                                DistrictName: ussdModalInfo.get("region")
                            }).then(function (data) {
                                modal.close().destroy()
                                self.Tdg.buildNotice({ msg: "შენახვა" });
                            })
                            },
                                access: "add"
                            }
                        },
                        confirmOnCancel: true
    
            })
        });
    } 

    SmsDialog = async (id) => {
        this.buildModal(null, {
            width: '40vw',
            maxWidth: '570px',
            height: 'auto',
            content: this.modalContent('',id),
            buttons: {
                save: {
                    name: "გაგზავნა",
                    onclick: async () => {
                        await this.getResponse({
                            route: "IncommingTabs",
                            act: "insertSms",
                            phones: this.state.phonesinput.children[0].value,
                            text: this.state.textinput.children[0].value,
                            ussdResult: (kendo_SelectedID(this.state.element.smsType) == "75" ) ? 1 : (
                                        (kendo_SelectedID(this.state.element.smsType) == "76" ) ? 2 : 0 ),
                            inc_id: self.WorkGround.state.prop.id
                        }).then((data) => {
                            if (data.status) {
                                self.Tdg.buildNotice({ msg: "შეტყობინება გაგზავნილია" });

                                if(this.ussd_id != null) {
                                    self.Tdg.getResponse({
                                        route: "Ussd",
                                        act: "SetSmsFullText",
                                        text: this.state.textinput.children[0].value,
                                        ussd_id: this.ussd_id
                                    }).then((data)=>{
                                        console.log(data);
                                    });
                                }

                                this.state.textinput.children[0].value = "";
                            } else {
                                self.Tdg.buildNotice({ msg: "შეტყობინება არ გაიგზავნა" });
                            }

                            kendo__refresh(this.state.table, 'table');

                        })
                    }
                }
            }
        })

    }

    modalContent = (phoney,inc_id) => {

        let content = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "ახალი SMS",
            style: {
                "grid-template-columns": "unset",
                display: 'flex'
            }
        }, this.CreateElement({
            element: "tabcontent",
            style: {
                display: 'flex',
                flexDirection: 'column',
                margin: '0px auto',
                width: '96%'
            }
        },this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '96%'
            }
        },this.buildSmsTypeSelector(inc_id), this.buildShablonButton()), this.buildPhonesInput(phoney), this.buildTextInput())) //, this.buildLengthCount()))

        return content;
    }
    
    buildSmsTypeSelector = (val = '') => {
        this.state.element.smsType = this.CreateElement({
            element: "kendo",
            type: 'selector',
            data: {
                route: "Ussd",
                act: "GetSmsTypes"
            },
            onchange: async (e)=> {
                await self.Tdg.getResponse({
                    route: "Ussd",
                    act: "GetSmsTemplate",
                    id: $(e.target).val(),
                    inc_id: val
                }).then((data)=>{
                    if(data.error != "") 
                        console.error(data.error);
                    else {
                        this.ussd_id = data.fill.id;
                        var text = data.text;
                        text = text.replace("N _______",data.fill.CaseRegId);
                        text = text.replace("N:_________",data.fill.GnercId);
                        text = text.replace("_______",data.fill.phoneNumber);
                        text = text.replace("YYYY-MM-DD, HH:MM:SS",data.fill.Rd);
                        this.state.textinput.children[0].value = text;
                    }
                });
            },
            title: "შედეგი"
        })

        return this.state.element.smsType
    }

    buildShablonButton = () => {
        this.state.element.shablonbutton = new Button({
            text: "შაბლონი",
            style: {
                width: '129px'
            },
            onclick: () => {
                this.state.shablonmodal = this.buildModal(null, {
                    width: '40vw',
                    maxWidth: '570px',
                    height: 'auto',
                    content: this.shablonContent(),
                    buttons: {
                        save: {
                            name: "გაგზავნა",
                            onclick: async () => {


                            }
                        }
                    }
                })
            }
        })

        return this.state.element.shablonbutton
    }



    buildPhonesInput = (val = '') => {

        this.state.phonesinput = new Input({
            type: "text",
            placeholderTitle: "ადრესატი",
            value: val,
            style: {
                width: '216px'
            }
        }).build();

        return this.state.phonesinput;
    }

    buildTextInput = () => {
        this.state.textinput = new Input({
            type: "textarea",
            placeholderTitle: "შეტყობინება",
            // maxlength: "150",
            // onkeyup: (e) => {
            //     this.state.counter.innerHTML = e.target.value.length;
            // },
            // onkeydown: (e) => {
            //     this.state.counter.innerHTML = e.target.value.length;
            // },
            style: {
                maxWidth: "530px",
                minHeight: "180px",
                minWidth: '200px'
            }
        }).build();

        return this.state.textinput;
    }



    buildIframe = async () =>{
        this.state.iframe =  this.CreateElement({
            element: "iframe",
            src:"tecallapp_OLD/index.php?id=69",
            style:{
                width: '100%',
                height: '1400px',
                border: '0px',
                overflow: 'hidden',
            }
        });

        return this.state.iframe;
    }

}