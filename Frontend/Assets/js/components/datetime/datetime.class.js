
import Helper from "../../helpers/helper.class.js";

export default class Datetime extends Helper {

    constructor(element){
        super();

        this.state = {
            dom: [],
            element: element,
            value: (element.value ? element.value : new Date())
        }

    }

    init = (type) =>{



        switch(type){
            case "date":
                $(this.state.element).kendoDatePicker({
                    componentType: "modern",
                    format: "yyyy-MM-dd",
                    value: this.state.value
                });
            break;
            case "time":
                $(this.state.element).kendoTimePicker({
                    componentType: "modern",
                    timeFormat: "HH:mm",
                    value: this.state.value
                });
            break;
            default:

                $(this.state.element).datetimepicker({
                    dateFormat: "yy-mm-dd",
                    showSecond: true,
                    changeMonth: true,
                    changeYear: true,
                    timeFormat: 'HH:mm:ss'
                });

                // $(this.state.element).kendoDateTimePicker({
                //     componentType: "modern",
                //     format: "yyyy-MM-dd HH:mm",
                //     timeFormat: "HH:mm",
                //     value: this.state.value
                // });
        }
        

    }


}