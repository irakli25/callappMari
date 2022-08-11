import Tdg from "../../tdg.class.js";

export default class GroupStatus114 extends Tdg {

    constructor() {
        super();
        self.GroupStatus114 = this;

        this.state = {
            sectionName: document.querySelector("section[GroupStatus114]"),
            element: []
        }
                
        this.removeLoading()
        this.init();
    }

    init = () => {
        this.append(this.state.sectionName, this.createGroupStatus());
        this.append(this.state.element.groupStatus, this.createTable());

    }

    createGroupStatus = () => {
        this.state.element.groupStatus = this.CreateElement({
            element: "group_status"
        })
        return this.state.element.groupStatus
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            className: "kendo-table",
            column: [
                {
                    field: "id",
                    hidden: true
                },
                {
                    field: "დასახელება"
                },
                {
                    field: "ფერი",
                    template: `<span style="background:#: feri #; padding: 18px;display: flex;"></span>`
                },
            ],
            data: {
                route: "Group_status_114",
                act: "getList"
            },
            option: {
                header: true,
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
}