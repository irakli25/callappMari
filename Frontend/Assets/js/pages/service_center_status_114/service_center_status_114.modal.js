import Input from '../../components/input/input.class.js';
import Tdg from '../../tdg.class.js';

export default class ServiceCenterStatus114Modal extends Tdg {
    constructor(){
        super();
        self.ServiceCenterStatus114Modal = this;

        this.state = {
            element: [],
        }
    }

   createModal = () => {
        this.state.element.modal = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            class: "service-center-modal",
            title: "ძირითადი ინფორმაცია"
        }, this.createInput())
        return this.state.element.modal
    }

   createInput = () => {
        this.state.element.input = new Input({
            type: "text",
            placeholderTitle: "დასახელება"
        }).build()
        return this.state.element.input
    }
}