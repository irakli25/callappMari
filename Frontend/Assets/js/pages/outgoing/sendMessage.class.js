import Tdg from "../../tdg.class.js";

export default class sendMessage extends Tdg{

    constructor(prop){
        super();

        self.sendMessage = this;

        this.state = {
            prop: prop
        }

    }

    exec = async () => {

        let sendRequest = await this.getResponse({ 
            route: "Chats", 
            act: "sendMessage", 
            ...this.state.prop
        })

        return sendRequest

    }

    


}