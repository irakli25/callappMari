import Tdg from "../../tdg.class.js";

export default class Monitoring_shablon extends Tdg {
    constructor() {
        super();
        self.monitoring_shablon = this;
        this.state = {
            sectionName: document.querySelector("section[monitoring_shablon]"),
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
            src: "mepa/index.php?id=147",
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