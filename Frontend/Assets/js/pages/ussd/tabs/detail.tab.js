import Tdg from "../../../tdg.class.js";
import Input from "../../../components/input/input.class.js";

export default class TabDetail extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabDetail = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: [],
            data: []
        }
    }



    init = async () => {

        await this.getResponse({
            route: "IncommingTabs",
            act: "getDetails",
            inc_id: this.state.prop.id
        }).then(async (data) => {
            self.Ussd.tab.TabDetail.state.data = data;

            self.Ussd.TabDetail = this.CreateElement({
                element: "div",
                attributes: ["fieldset"],
                title: "დეტალები",
                style: {
                    "grid-template-columns": "unset",
                    display: 'flex'
                }
            });

            this.state.fieldSet = self.Ussd.TabDetail;

            this.append(this.state.interfaceName, this.state.fieldSet);


            this.append(this.state.fieldSet, this.buildInputOperator());
            this.append(this.state.fieldSet, this.buildInputDate());
            this.append(this.state.fieldSet, this.buildInputMomNuber());
            this.append(this.state.fieldSet, this.buildInputWaitTime());
            this.append(this.state.fieldSet, this.buildInputTalkTime());
            this.append(this.state.fieldSet, this.buildInputDamushXan());
        })

        this.state.data = this.state.data[0];



    }


    buildInputOperator = () => {

        this.state.element.inputoperator = new Input({
            type: "text",
            placeholderTitle: "ოპერატორი",
            value: self.Ussd.tab.TabDetail.state.data.operator ? self.Ussd.tab.TabDetail.state.data.operator : "",
            column: "2",
            id: "oeprator_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputoperator
    }


    buildInputDate = () => {
        this.state.element.inputDate = new Input({
            type: "text",
            placeholderTitle: "თარიღი",
            value: self.Ussd.tab.TabDetail.state.data.datetime ? self.Ussd.tab.TabDetail.state.data.datetime : "",
            column: "2",
            id: "date_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputDate
    }


    buildInputMomNuber = () => {
        this.state.element.inputmomnumber = new Input({
            type: "text",
            placeholderTitle: "მომართვის ნომერი",
            column: "2",
            value: self.Ussd.tab.TabDetail.state.data.id ? self.Ussd.tab.TabDetail.state.data.id : "",
            id: "momnum_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputmomnumber
    }


    buildInputWaitTime = () => {
        this.state.element.inputwaittime = new Input({
            type: "text",
            placeholderTitle: "ლოდინის დრო",
            column: "2",
            value: self.Ussd.tab.TabDetail.state.data.wait_time ? self.Ussd.tab.TabDetail.state.data.wait_time : "",
            id: "waittime_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputwaittime
    }


    buildInputTalkTime = () => {
        this.state.element.inputtalktime = new Input({
            type: "text",
            placeholderTitle: "საუბრის ხანგრძლივობა",
            column: "2",
            value: self.Ussd.tab.TabDetail.state.data.talk_time ? self.Ussd.tab.TabDetail.state.data.talk_time : "",
            id: "talktime_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputtalktime
    }


    buildInputDamushXan = () => {
        this.state.element.inputdamushxan = new Input({
            type: "text",
            placeholderTitle: "დამუშავების ხანგრძლივობა",
            column: "2",
            value: self.Ussd.tab.TabDetail.state.data.processed_time ? self.Ussd.tab.TabDetail.state.data.processed_time : "",
            id: "damushxan_inp",
            disabled: "true",
            style: {
                width: "210px"
            }
        }).build()

        return this.state.element.inputdamushxan
    }


    destroy = () => {

        if (!self.Ussd.TabDetail) return false;
        self.Ussd.TabDetail.remove();

    }

}