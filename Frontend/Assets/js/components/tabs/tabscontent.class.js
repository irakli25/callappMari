
import Tdg from "../../tdg.class.js";

export default class TabsContent extends Tdg {
  
    constructor(tabContentID = '') {
        super();
        this.state = {
            contentArea: this.createTabsContent(tabContentID)
        }
        
    }

    createTabsContent = (tabContentID) => {
        let tabscontent = this.CreateElement({
            element: "tabscontent",
            content_id: tabContentID
        })
        return tabscontent;
    }


    creatContent = (section, toAppend) => {
        this.append(section, toAppend);
        
    }

     

}