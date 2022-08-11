
import Helper from "../../helpers/helper.class.js";
import {sendKendoRequest} from "../../helpers/kendo.helper.js";

export default class MultiSelector extends Helper{

    constructor(element){
        super();

        this.state = {
			dom: [],
			element: element,
		}
        
    }

    init = () => {

        this.state.element.height   = this.state.element.getAttribute("height");
        this.state.element.title    = this.state.element.getAttribute("title");
        this.state.element.data     = this.state.element.getAttribute("data");

        this.build();
    }


    build = () => {

        if (!this.state.element.height || this.state.element.height == '') {
            this.state.element.height = 200;
        }

        $(this.state.element).kendoMultiSelect({
            filter: "contains",
            placeholder: this.state.element.title,
            dataTextField: "name",
            dataValueField: "id",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: (options) => {
                        sendKendoRequest(this.state.element.data, options)
                    }
                },
                schema: {
                    data: (data) => {
                        
                        if (data == null) {
                            data = [];
                            return data
                        }
                        return data;
                    }
                }
            }),
            height: this.state.element.height
        });
    
    }

}