import Tdg from "../../tdg.class.js";

export default class Inc_monitoring extends Tdg {
    constructor() {
        super();
        self.inc_monitoring = this;
        this.state = {
            sectionName: document.querySelector("section[inc_monitoring]"),
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
            src: "mepa/index.php?id=64",
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