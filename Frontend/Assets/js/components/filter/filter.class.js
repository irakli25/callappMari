import Tdg from "../../tdg.class.js";
import kendoSelector from "../selector/selector.class.js";

export default class filter extends Tdg {

    constructor(){
        super();

        this.state = {
            filterBlock: '',
        }

    }


    build = () => {

        this.createFilterBlock();

    }


    createFilterBlock = () => {

        this.state.filterBlock = this.CreateElement({
            element: "filterblock"
        })

        this.addComponent({
            type: "input"
        })

    }

    


}