import Tdg from "../../tdg.class.js";
import WorkGround from "./workGround.type.js";

export default class UssdModal extends Tdg {

    constructor(prop) {
        super()

        self.UssdModal = this
        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["ussd"]
            }),
            interface: [],
            prop: prop,
            id: prop.id,
            source: prop.source,
            fromtask: false
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

    build = async () => {


        this.append(this.state.dom, await new WorkGround(this.state.prop).init())

    }




}