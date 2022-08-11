import Tdg from "../../../tdg.class.js";

export default class TabLink extends Tdg {
    constructor() {
        super();
        self.TabLink = this;
        this.state = {
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: "",
            element: []
        }
    }

    init = () => {

        self.Ussd.TabLink = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            style: {
                "grid-template-columns": "unset"
            }
        });

        this.state.fieldSet = self.Ussd.TabLink;
        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildIframe())

    }

    buildIframe = () => {
        this.state.iframe = this.CreateElement({
            element: "iframe",
            src: "http://10.0.0.5:8180/gasbilling/login.jsp",
            style: {
                width: '100%',
                height: '78vh',
                border: '0px',
                overflow: 'auto'
            }
        });

        return this.state.iframe;
    }

}