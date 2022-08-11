import Tdg from "../../tdg.class.js";

export default class Monitoring_question extends Tdg {
    constructor() {
        super();
        self.monitoring_question = this;
        this.state = {
            sectionName: document.querySelector("section[monitoring_question]"),
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
            src: "mepa/index.php?id=146",
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