import Tdg from "../../../tdg.class.js";


export default class GeneratePage extends Tdg {

    constructor(){
        super();

        self.GeneratePage = this;
        
        this.state = {
            section: this.render("GeneratePage"),
            element: [],
            todo: "HELLO WORLD"
        }


        this.removeLoading();
        this.init()

    }



    init = () => {

      // this.state.section.innerHTML = ''

      this.state.element.span = this.CreateElement({
        element: "button",
        text: "Click me",
        onclick: (event) => {

          $.socket.connections.callapp.socket.send(JSON.stringify({event: "get_data", data: {"a": "b"}}))

        }
      })

      this.append(this.state.section, this.state.element.span)

    }


}



