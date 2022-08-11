import Tdg from "../../tdg.class.js";


export default class FieldsetModal extends Tdg {

    constructor(prop){
        super()
        
        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["automator"]
            }),
            interface: [],
            id: prop.id,
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

        this.append(this.state.dom, await new Rig().init())
        this.append(this.state.dom, await new ChatPanel().init())
        this.append(this.state.dom, await new WorkGround().init())

    }




}