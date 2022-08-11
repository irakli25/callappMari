import Tdg from "../../tdg.class.js";

export default class info_category extends Tdg{
    constructor(){
        super();
        self.info_category = this;
        this.state = {
            sectionName: document.querySelector("section[info_category]"),
            element: []
        }
        this.removeLoading();
        this.init();

       
    }

    init = () => {
        
        this.append(this.state.sectionName,this.buildIframe())

    }

    buildIframe = () =>{
        this.state.iframe = this.CreateElement({
            element: "iframe",
            src:"tecallapp_OLD/index.php?id=75",
            style:{
                width: '100%',
                height: '1100px',
                border: '0px',
                overflow: 'hidden',
            }
        });

        return this.state.iframe;
    }

}