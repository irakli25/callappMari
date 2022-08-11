
import Selector from "../../components/selector/selector.class.js";
import { kendo_SelectedID,kendo_SelectedText,kendo_setValue,sendKendoRequest, kendo__refresh, kendo_setValueByID, kendo__multiSelectedID, kendo__destroy } from "../../helpers/kendo.helper.js";

export default class Helper {

    buildTableColumns = (def)=> {
        // ეს ფუნქცია ქმნის კონფიგურაციას კენდოს table - სთვის
        var defineMe = def;

        // დეფაულტ კონფიგურაცია
        var kendoTemplate = {
            columns: [                
                { field: "ID", dbName: def.handbook + ".id" , hidden: true,  showInDialog: false},
                { field: "სახელი", dbName: def.handbook + ".name"},
            ],
            checkbox: true
        };

        // თუ არ გვაქვს ცნობარის კლასსში კონფიგურაცია მიდის დეფაულტ ცხრილი
        if(!def.hasOwnProperty("table")) {
            defineMe.table = kendoTemplate;
            this.separateDbNames(defineMe);
            return defineMe;
        }

        // თუ გვაქ კონფიგურაცია მაშინ სვამს სპეციალურად გაწერილ კონფიგურაციას
        if(!defineMe.table.hasOwnProperty("columns"))
            defineMe.table.columns = kendoTemplate.columns;

        if(!defineMe.table.hasOwnProperty("checkbox"))
            defineMe.table.checkbox = kendoTemplate.checkbox;
        
        return this.separateDbNames(defineMe);
    }

    separateDbNames = (defineMe)=> {
        // ეს ფუნქცია ცალკე იწერს ბაზის სახელებს - კონფიგურაციიდან
        var dbNameProperty = ['dbName'];
        var dbNames = [];
        // იღებს definer.table.columns დან dbName(ბაზის სახელებს) რომ კენდო გაიშვას
        // და წერს მასივში რასაც ცალკე იყენებს კენდო ბექში
        defineMe.table.columns.forEach( col => { dbNames.push( col.dbName );  });
        defineMe.table.dbNames = dbNames;
        return defineMe;
    }
    
    setUpSelector = async (el, chooseSelected = null)=> {
        await this.buildSelector(el);
        return (chooseSelected == null) ?  0 :  await this.chooseSelection(el);
    }

    buildSelector = async (el)=> {
        // ამ ფუნქციას მოაქვს option - ები სელექტორისთვის
        new Selector(el).init();
    } 

    chooseSelection = async (el)=> {
        // ედიტის დროს ირჩევს შესაბამის option - ს
        var id = 0;
        
        sendKendoRequest({
            route: "Handbook",
            act: "getSelectOpts",
            handbook: el.getAttribute("from"), 
            name: el.getAttribute("chosen")
        },
        {
            success: (res)=> {
                var thisSelector = $(el).data("kendoDropDownList");
                var value = res[0].id;
                el.setAttribute("value",value);
                thisSelector.value(value);
                thisSelector.trigger("change");
            },
            error: (res)=> {  }
        });

        return id;
    }

    request = (params) => {
        // ეს ფუნქცია ასრულებს ყველა სახის მოთხოვნას ბექთან და არეფრეშებს ცხრილს
        self.Tdg.getResponse(params).then(async function(data) {
            self.Handbook.buildNotice({ msg: data.message });
            kendo__refresh(self.Handbook.state.element.table, 'table');
        });
    }

}