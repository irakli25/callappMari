import Handbook from "../handbook/handbook.class.js";

export default class Chat_setting extends Handbook{

    constructor(){
        super();
        self.Chat_setting = this;
        self.Handbook = this;

        self.Handbook.init({
            route: "Handbook",
            handbook: "chat_setting",
            GEOtitle: "ჩატის პარამეტრები"
        });

    }
    
}