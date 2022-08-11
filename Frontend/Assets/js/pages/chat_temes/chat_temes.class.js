import Handbook from "../handbook/handbook.class.js";

export default class Chat_temes extends Handbook{

    constructor(){
        super();
        self.Chat_temes = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "chat_temes",
            GEOtitle: "ჩატის თემები "
        });

    }
    
}