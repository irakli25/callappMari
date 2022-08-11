import Tdg from "../../tdg.class.js";
import Input from "../../components/input/input.class.js";
import Selector from "../../components/selector/selector.class.js";
export default class paramModal extends Tdg {

    constructor(prop){
        super()

        self.paramModal = this;

        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["paramSelector"],
                style: {
                    'margin-top': '10px',
                    display: 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': 'wrap',
                    gap: '13px',
                    'justify-content': 'center',
                }
            }),
            interface: [],
            element: [],
            inputParam: '',
            selectorkendo: [],
            id: prop.id
        }

    }

    // INITIALIZE BUILD
    init = () => {

        this.build()
        return this.state.dom

    }

    /**
     * BUILD INCOMMING COMPONENTS
     */
    // 
    build = async () => {

        if (this.state.id > 0) {
            
            var InputData = await this.getResponse({
                route: "Automator",
                act: "getSelectorParam",
                selector_id: this.state.id,
                input_id: self.inputModal.state.id
            })

            this.state.inputParam = InputData.param;
        }

        this.append(this.state.dom, this.paramInput());

        
    }


    paramInput = () => {
        this.state.element.inputParam = new Input({
            type: "text",
            placeholder: "შეიყვანეთ პარამეტრი",
            column: "5",
            value: this.state.inputParam,
            id: "param_name",
            style: {
                width: "270px"
            }
        }).build()

        return this.state.element.inputParam;
    }

    


}