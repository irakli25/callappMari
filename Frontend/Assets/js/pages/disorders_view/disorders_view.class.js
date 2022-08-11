import Tdg from "../../tdg.class.js";

export default class Disorders_view extends Tdg {
    constructor() {
        super();
        self.disorders_view = this;
        this.state = {
            sectionName: document.querySelector("section[disorders_view]"),
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