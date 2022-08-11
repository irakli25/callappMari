import Input from "../../components/input/input.class.js";
import Uploader from "../../components/uploader/uploader.class.js";
import Tdg from "../../tdg.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive } from "../../helpers/kendo.helper.js";

export default class GivenInformationModal extends Tdg {
    constructor() {
        super();

        self.GivenInformationModal = this;
       
        this.state = {
            element: [],
            addFiles: [],
            download: [],
            id: 0,
            ussd: new Object()
        }

    }
    

    get = (key) => {
        var valueUSSD = "";
        if($(this.state.ussd[key]).attr("type") == "selector") kendo_SelectedID(this.state.ussd[key]);
        if($(this.state.ussd[key]).attr("type") == "textarea") valueUSSD = $(this.state.ussd[key]).text();
        else  valueUSSD = $(this.state.ussd[key]).val();

        return valueUSSD;
    }

    openBtnTwoModal = (data) => {
        this.state.id = data.ussd_id;
        this.state.element.openBtnTwoModal = this.CreateElement({
            element: "div",
            title: "დამატებითი ველები",
            attributes: ['fieldset'],
            class: "modal-fieldset"
        }, this.dateTimeField(null), this.CreateElement({
            element: "div",
            class: "openBtnTwo-modal"
        },this.typeSelector(data.AccidentTypeId), 
           this.registrationNumber(data.CaseRegId), this.registrationNumberSemec(data.GnercId), this.semecStatus(data.StatusId), 
           this.resultSelector(data.ResultId), this.dateTimePicker(data.DeadLine), this.compensation(data.CompensationAmount), this.compensationTransaction(data.CompensationTransId), 
           this.dateTimePickerActualDt(data.ActualDt),this.dateTimePickerCompensation(data.NeedCompensation),this.changeTime(data.LastUpdateDt),this.compensationDeadline(data.CompensationDeadLine),this.region(data.DistrictName)
           ),this.CreateElement({
            element: "div",
            class: "modal-div-two"
        },this.reactingAct(data.ReagirebaDoc), this.compensationPay(data.CompensationDocUrl), this.outerCause(data.ExtraDocUrl)))
        return this.state.element.openBtnTwoModal
    }

    

    dateTimeField = (val = '') => {
        this.state.element.dateTimeField = this.CreateElement({
            element: "input",
            value: val,
            class: "date-picker",
            value: this.formatDate(),
            disabled: "true",
        })
        return this.state.element.dateTimeField
    }

    typeSelector = (val = '') => {
        this.state.element.type = this.CreateElement({
            element: "kendo",
            type: 'selector',
            value: Number(val),
            data: {
                route: "Ussd",
                act: "GetTypes"
            },
            title: "ტიპი",
            disabled: "true"
        })

        this.state.ussd['AccidentTypeId'] = this.state.element.type;

        return this.state.element.type
    }

    registrationNumber = (val = '') => {
        this.state.element.regNumber = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "რეგისტრაციის ნომერი შიდა",
            disabled: "true"
        }).build()
        
        this.state.ussd['CaseRegId'] = $(this.state.element.regNumber).find("input");

        return this.state.element.regNumber
    }

    registrationNumberSemec = (val = '') => {
        this.state.element.regNumberSemec = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "რეგისტრაციის ნომერი სემეკი",
            disabled: "true"
        }).build()

        this.state.ussd['GnercId'] = $(this.state.element.regNumberSemec).find("input");

        return this.state.element.regNumberSemec
    }

    semecStatus = (val = '') => {
        this.state.element.semecStatus = this.CreateElement({
            element: "kendo",
            type: 'selector',
            data: {
                route: "Ussd",
                act: "GetStatus"
            },
            value: Number(val),
            title: "სემეკის სტატუსი",
            disabled: "true"
        })

        this.state.ussd['StatusId'] = this.state.element.semecStatus;

        return this.state.element.semecStatus
    }

    resultSelector = (val = '') => {
        this.state.element.result = this.CreateElement({
            element: "kendo",
            type: 'selector',
            data: {
                route: "Ussd",
                act: "GetResult"
            },
            value: Number(val),
            title: "შედეგი"
        })

        this.state.ussd['ResultId'] = this.state.element.result;

        return this.state.element.result
    }

    dateTimePicker = (val = '') => {
        this.state.createdateinp = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "217px"
            },
            value: val,
            type: "datetime",
            disabled: "true"
        });

        this.state.element.datetime = this.CreateElement({
            element: "div",
            class: "datetime-div"
        }, 
        this.state.createdateinp, 
        this.CreateElement({
            element: "label",
            class: "datetimelabel",
            children: "რეაგირების ბოლო ვადა"
        }));

        this.state.ussd['DeadLine'] = $(this.state.element.datetime).find("input");

        return this.state.element.datetime;
    }

    compensation = (val = '') => {
        this.state.element.compensation = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "კომპენსაციის ოდენობა"
        }).build()

        this.state.ussd['CompensationAmount'] = $(this.state.element.compensation).find("input");

        return this.state.element.compensation
    }

    compensationTransaction = (val = '') => {
        this.state.element.compensationTransaction = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "კომპენსაციის ტრანზაქციის ნ."
        }).build()

        this.state.ussd['CompensationTransId'] = $(this.state.element.compensationTransaction).find("input");

        return this.state.element.compensationTransaction
    }


    dateTimePickerCompensation = (val = '') => {
        this.state.createdateinp = this.CreateElement({
            element: "input",
            value: val,
            style: {
                height: "37px",
                width: "217px"
            },
            type: "datetime",
            disabled: "true"
        });

        this.state.element.datetime = this.CreateElement({
            element: "div",
            class: "datetime-div"
        }, 
        this.state.createdateinp, 
        this.CreateElement({
            element: "label",
            class: "datetimelabel",
            children: "კომპენსაციის ბოლო ვადა"
        }));

        this.state.ussd['NeedCompensation'] = $(this.state.element.datetime).find("input");

        return this.state.element.datetime;
    }

    dateTimePickerActualDt = (val = '') => {
        this.state.createdateinp = this.CreateElement({
            element: "input",
            value: val,
            style: {
                height: "37px",
                width: "217px"
            },
            type: "datetime",
        });

        this.state.element.datetime = this.CreateElement({
            element: "div",
            class: "datetime-div"
        }, 
        this.state.createdateinp, 
        this.CreateElement({
            element: "label",
            class: "datetimelabel",
            children: "რეაგირების ფაქტობრივი ვადა"
        }));

        this.state.ussd['ActualDt'] = $(this.state.element.datetime).find("input");

        return this.state.element.datetime;
    }

    compensationDeadline = (val = '') => {
        this.state.element.compensationDeadline = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "კონპენსაციის დედლაინი",
            disabled: "true"
        }).build()

        this.state.ussd['CompensationDeadLine'] = $(this.state.element.compensationDeadline).find("input");

        return this.state.element.compensationDeadline
    }

    changeTime = (val = '') => {
        this.state.element.changeTime = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "ჩანაწერზე ბოლო  დრო",
            disabled: "true"
        }).build()
        return this.state.element.changeTime
    }

    region = (val = '') => {
        this.state.element.region = new Input ({
            type: "text",
            value: val,
            placeholderTitle: "რეგიონი",
            disabled: "true"
        }).build()
        return this.state.element.region
    }

    reactingAct = (val = '') => {
        this.state.element.ReagirebaDoc = this.CreateElement({
            element: "div",
            class: "modal-div"
        }, this.addFiles('ReagirebaDoc',val), 
        this.CreateElement({
            element: "p",
            class: "modal-label",
            children: "რეაგირების აქტი"
        }));
        return this.state.element.ReagirebaDoc;
    }

    compensationPay = (val = '') => {
        this.state.element.CompensationDocUrl = this.CreateElement({
            element: "div",
            class: "modal-div"
        }, this.addFiles('CompensationDocUrl',val), 
        this.CreateElement({
            element: "p",
            class: "modal-label",
            children: "კონპენსაციის გადახდის დოკ."
        }));
        return this.state.element.CompensationDocUrl;
    }

    outerCause = (val = '') => {
        this.state.element.ExtraDocUrl = this.CreateElement({
            element: "div",
            class: "modal-div"
        }, this.addFiles('ExtraDocUrl',val), 
        this.CreateElement({
            element: "p",
            class: "modal-label",
            children: "გარე მიზეზის დოკ."
        }));
        return this.state.element.ExtraDocUrl;
    }

    addFiles = (which,val) => {
        let view = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/eye-black.svg",
            onclick: () => {
                this.importFiles(which)
            }
        })

        this.state.download[which] = this.CreateElement({
            element: "a",
            href: `http://10.0.18.29/${val}`,
            attributes: ["download"]
        },this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/download-black.svg"
        }))

        this.state.addFiles[which] = this.CreateElement({
            element: "div",
            class: "add-files",
            children: "დაამატე ფაილი",
        }, this.CreateElement({
            element: "div",
            class: "modal-div-icons"
        },view,this.state.download[which]));
        return this.state.addFiles[which]
    }

    importFiles = async (which) => {
        await new Uploader({
            custom:true,
            route: "Ussd",
            act: "UploadFile",
            which: which,
            id: this.state.id,
            callback: (e) => {
                console.log(e);
                if(e.error == "") {
                    this.state.download[which].href = `http://10.0.18.29/${e.data[0].link}`;
                    self.Tdg.buildNotice({ msg: "ფაილი წარმატებით აიტვირთა" });
                }
                else {
                    self.Tdg.buildNotice({ msg: "ფაილი ვერ აიტვირთა" })
                    console.error(e.error);
                }
                
            }
        }).init()
    }

}