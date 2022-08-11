import Tdg from "../../tdg.class.js";

export default class Outgoing_company extends Tdg {
    constructor() {
        super();
        self.Outgoing_company = this;
        this.state = {
            sectionName: document.querySelector("section[outgoing_company]"),
            element: []
        }
        this.removeLoading();
        this.init();


    }

    init = () => {

        this.append(this.state.sectionName, this.buildIframe())

    }

    buildIframe = () => {
        this.state.iframe = this.CreateElement({
            element: "iframe",
            src: "mepa/index.php?id=135",
            style: {
                width: '100%',
                height: '1000px',
                border: '0px',
                overflow: 'hidden',
            }
        });

        return this.state.iframe;
    }

}