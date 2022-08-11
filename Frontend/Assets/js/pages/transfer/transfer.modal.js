import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendoResponsive } from "../../helpers/kendo.helper.js";

export default class TransferModal extends Tdg {
    constructor() {
        super();
        self.TransferModal = this;

        this.state = {
            sectionName: document.querySelector("section[TransferModal]"),
            element: []
        }

        this.removeLoading()
    }
    
    createModalDiv = () => {
        this.state.element.modalDiv = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "უპასუხო ზარები",
            style: {
                height: "100%"
            }
        }, this.createTable())
        return this.state.element.modalDiv
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი",
                    size: 100,
                },
                {
                    field: "ტელეფონი",
                    size: 100,
                },
                {
                    field: "რიგი",
                    size: 100,
                },
                {
                    field: "ოპერატორი/ექსთენშენი",
                    size: 100,
                },
                {
                    field: "ხანგრძლივობა",
                    size: 100,
                }
            ],
            data: {
                route: "",
                act: "",
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
            onload: () => {

            },
        })
       return this.state.element.table
    }

}