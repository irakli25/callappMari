

import Tdg from "../../tdg.class.js";
import TabsContent from "./tabscontent.class.js";

export default class Tabs extends Tdg {
    constructor(name, json){
        super();

        this.state = {
            section: $("component[techreport]"),
            element: []
        };

        if(name == "maintabs1") {
            this.state.section=$("component[techreport] > div");
        }

        this.json = json;
        this.name = name;
        this.hash = window.location.hash.substr(1);
        this.content = new TabsContent(this.hash);

       
       
    }

    
  /**
   * @description Create Tabs Element
   * @returns Tabs Element
   */
    createTabs = () => {
        let tabs = this.CreateElement({
            element: "tabs",
            attributes: [
                {name: this.name}
            ]
        })

        return tabs;
    }


      /**
   * @description Create Tabs Element and append Tabitems
   * @returns Tabs Element with tabitems
   */

    buildTabs = (data) => {
        
        let tabs = this.createTabs();
        let tabscontent = this.content.state.contentArea;

        Promise.all( data.map( (item, index) => {
            //alert(item.text)
            let tabsitem = this.CreateElement({
                attributes: [
                  {content_id: item.content_id},
                  {refresh: item.refresh},
                  this.hash ? (this.hash == item.content_id ? 'active' : '') : (index == 0 ? 'active' : '')
                ]
                 ,
                element: "tabitem",
                children: item.text,
                onClick: (e) => {
                    console.log(e.target)
                    this.onClick(e.target);
                    item.eventAttached();
                }
            })

            tabs.append(tabsitem); 
               
        })).then(()=>{
            this.append(this.state.section, tabscontent);
            this.append(this.state.section, tabs);
        })
       
        return tabs;

    }

    onClick = (e) => {
        let content_id = e.getAttribute("content_id");
        let isRefreshable = e.getAttribute("refresh");
        let name = e.parentElement.getAttribute("name");
        let allTabitem = document.querySelectorAll(`tabs[name='${name}'] tabitem`);
        let checkTabContent = document.querySelector(`tabscontent[content_id='${content_id}']`);

        for (let Tabitem of allTabitem){
            let toRemoveFromDOM = Tabitem.getAttribute("refresh");
            let itemContentID = Tabitem.getAttribute("content_id");

            if(toRemoveFromDOM == 'true'){
               // alert(itemContentID);
                let DOMToRemove = document.querySelector(`tabscontent[content_id='${itemContentID}']`);
                console.log(DOMToRemove)
                if(DOMToRemove != null && content_id != itemContentID){
                    DOMToRemove.remove();
                }
                
            }
            Tabitem.removeAttribute("active");
        }
        e.setAttribute("active","");
        window.location.hash = content_id;
        
        
        let allLoadedContents = document.querySelectorAll(`tabscontent`);
        for (let loadedContent of allLoadedContents){
            loadedContent.style.display = "none";
        }

        if(checkTabContent == null){
            let tabContent = this.content.createTabsContent(content_id);
            this.append(this.state.section, tabContent);

            this.content.creatContent(tabContent, content_id);
            
        }
        else{
            checkTabContent.style.display = "block";
        }
        
        
    }

    setActive = () => {
        let activeContentId = document.querySelector(`tabs[name='${this.name}'] tabitem[active]`).getAttribute('content_id'); 
        this.content.changeContent(activeContentId);
    }
    
    initializeTabs = () => {
        this.append(this.state.section, this.buildTabs(this.json)); 
        let tabHash = window.location.hash.substr(1);
        
        let table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "1"
                },
                {
                    field: "2"
                },
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                footer: true
            },
            ondblclick: (cb) => {
                
                // sendRequest({

                // }, (data) => {
                    
                // })

            }
        });

        if(tabHash == null || tabHash == ''){
            this.append(this.content.state.contentArea, table);
        }
        else{
            this.append(this.content.state.contentArea, table);
        }
        
    }
}
