import Tdg from "../../tdg.class.js"
import Button from "../../components/button/button.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy, kendoResponsive, kendo__multiSelectedName } from "../../helpers/kendo.helper.js";

export default class All_records extends Tdg{

    constructor(){
        super();
        self.All_records = this;

        this.state = {
            sectionName: document.querySelector("section[All_records]"),
            element: []
        }
        document.title = "All Records";
        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.recordsBlock());
        this.append(this.state.element.recordsBlock, this.startDateTime());
        this.append(this.state.element.recordsBlock, this.buildTire());
        this.append(this.state.element.recordsBlock, this.endDateTime());
        this.append(this.state.element.recordsBlock, this.callType());
        // this.append(this.state.element.recordsBlock, this.allStatus());                          //სტატუსის ფილტრი   
        this.append(this.state.element.recordsBlock, this.filterBtn());

        this.append(this.state.sectionName, this.buildDivForTable());
        this.append(this.state.element.tableDiv, this.createRecordsTable());
        kendoResponsive();

    }

    recordsBlock = () => {

        this.state.element.recordsBlock = this.CreateElement({
            element: "recordsBlock"
        })

        return this.state.element.recordsBlock;
    }

    buildDivForTable = () => {

        this.state.element.tableDiv = this.CreateElement({
            element: "tablediv",
            id: "kendotable"
        })

        return this.state.element.tableDiv;
    }

    startDateTime = () => {

        this.state.element.startDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 00:00:00"
        })

        return this.state.element.startDateTime
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


    endDateTime = () => {

        this.state.element.endDateTime = this.CreateElement({
            element: "input",
            type: "datetime",
            value: this.formatDate() + " 23:59:59"
        })

        return this.state.element.endDateTime
    }

    callType = () => {
        this.state.element.callType = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "ზარის ტიპი",
            data: {
                route: "All_records",
                act: "getCallType",
            }
        })

        return this.state.element.callType
    }

    // allStatus = () => {                                                                      //სტატუსის ფილტრი
    //     this.state.element.allStatus = this.CreateElement({
    //         element: "kendo",
    //         type: "multiselector",
    //         title: "ყველა სტატუსი",
    //         data: {
    //             route: "All_records",
    //             act: "getAllStatus",
    //         }
    //     })

    //     return this.state.element.allStatus
    // }

    filterBtn = () => {
        this.state.element.filterBtn = new Button({
            text: "ფილტრი",
            onclick: () => {
                kendo__destroy(this.state.element.table);
                this.state.element.tableDiv.remove();

                this.append(this.state.sectionName, this.buildDivForTable());
                this.append(this.state.element.tableDiv, this.createRecordsTable());
                kendoResponsive();
            }
        })

        return this.state.element.filterBtn
    }

    createRecordsTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "თარიღი",
                    size: 120
                },
                {
                    field: "წყარო",
                    size: 100
                },
                {
                    field: "ადრესატი",                    
                    size: 120
                },
                {
                    field: "ოპერატორი",
                    size: 120
                },
                {
                    field: "ზარის ტიპი",
                    size: 120
                },
                {
                    field: "სტატუსი",
                    size: 120
                },
                {
                    field: "საუბრის ხ_ობა",
                    size: 140
                },
                {
                    field: "მოსმენა",
                    size: 120,
                    template: `<span class="table-download-btn">
                                    <span class='audio' data-bound='#: mosmena #'></span>
                                    # if(mosmena != null) { # <a class="download-ico-txt" href='http://10.0.18.19:80/records/#= mosmena #' target='_blank'><img class="download-ico" src="Frontend/Assets/images/icons/download.svg"><p>ჩამოტვირთვა</p></a>  #} #
                                </span>`
                }
            ],
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
            data:{
                route: "All_records",
                act: "getList",
                start_date: this.state.element.startDateTime.value,
                end_date: this.state.element.endDateTime.value,
                call_type: kendo__multiSelectedID(this.state.element.callType)
                // all_status: kendo__multiSelectedID(this.state.element.allStatus)         //სტატუსის ფილტრი
            },
            onload: (cb) => {
                $('.audio').each((i, x) => {
                    let link = $(x).attr("data-bound");

                    $(x).css('display', "none");

                    if (link != 'null') {
                        $(x).css('display', "none");
                        $(x).after(this.audioPlayer(`http://212.72.155.174:7000/${link}`))
                    }
                })
            },
            ondblclick: this.voiceDblClick
        })

        return this.state.element.table;
    }

}