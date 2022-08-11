import Tdg from "../../tdg.class.js";
import ChatPanel from "./chatPanel.type.js";
import WorkGround from "./workGround.type.js";
import Queue from "./queue.type.js";

export default class IncommingModal extends Tdg {

    constructor(prop){
        super()
        
        self.IncommingModal = this
        this.state = {
            dom: this.CreateElement({
                element: "interface",
                attributes: ["incomming"]
            }),
            interface: [],
            prop: prop,
            id: prop.id,
            source: prop.source,
            fromtask: false,
            fromstatement: false
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
        

        this.append(this.state.dom, await new Queue(this.state.prop).init())

        if(this.state.prop.source != 'phone') return false;
        
        this.append(this.state.dom, await new WorkGround(this.state.prop).init())

    }




}