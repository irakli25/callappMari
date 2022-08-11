import Table from "./components/table/table.class.js"
import Selector from "./components/selector/selector.class.js"
import MultiSelector from "./components/multiselector/multiselector.class.js"
import DateTime from "./components/datetime/datetime.class.js"
import Input from "./components/input/input.class.js"
import Helper from "./helpers/helper.class.js"
import SelectorWithIcons from "./components/selector/SelectorWithIcons.class.js"

export default class Tdg extends Helper {

    constructor(prop){
        super()
        
        self.Tdg = this
        this.state = {
            prop: prop
        }

        // new Event('onBound')


    }
    
// /**
//  * @description SET STATE
//  * @param {Object} param 
//  */
//     setState = (param = null) => {
        
//         if(param != null || param != undefined || param != '' || param != 'object') this.state = Object.assign(this.state, param)

//         if(typeof param === "object"){
//             $.each(param, (f, v) => {
//                 if(typeof v === "function") return v()
//             })
//         }
        
//         window.state = this.state;
//     }

//     updateState = (param = null) => {
//         if(param != null || param != undefined || param != '') this.state = Object.assign(this.state, param)
//     }

    removeLoading = () => {
        $("loading").fadeOut(400, function() { 
            // $(this).remove(); 
        })
      }


   

    /**
     * ADD COMPONENT IN DOM
     */
    append = (to, what, prop = {}, callback) => {

        if(typeof to != 'undefined' && typeof what != 'string') {
            if(typeof what == 'object' && typeof what.length == 'undefined') to.append(what)
          
            if(typeof what != 'undefined'){
                if(typeof what.length){
                    if(what.length > 0){
                        what.map((i, x) => to.append(x))
                    }
                }
                
            } 
        }

        if(typeof to != 'undefined' && typeof what == 'string') $(to).append(what)


        if(prop.setTimeout){
            setTimeout(function(){
                what.remove()
            }, prop.setTimeout)
        }

        let type = (typeof what != 'undefined' && typeof what != 'string' && typeof what.length == 'undefined' ? what.getAttribute("type") : null);
    
        

        switch(type){
            case "table":
                new Table(what, callback).init();
                
                $(what).data("kendoGrid").bind("dataBound", (e) => {
                   
                    what.dispatchEvent(new CustomEvent('load', {detail: e}))
                });
            break;
            case "selector":
                new Selector(what, callback).init();

                what.dispatchEvent(new CustomEvent('load', {detail: {
                    element: what
                }}))
            
                $(what).data("kendoDropDownList").bind("change", (e) => {
                    what.dispatchEvent(new CustomEvent('change', {detail: e}))
                });

                break;
            case "multiselector":
                new MultiSelector(what).init();

                what.dispatchEvent(new CustomEvent('load', {detail: {
                    element: what
                }}))
            
                $(what).data("kendoMultiSelect").bind("change", (e) => {
                    what.dispatchEvent(new CustomEvent('change', {detail: e}))
                });
            break;
            case "datetime":
                new DateTime(what).init();
            break;
            case "date":
                new DateTime(what).init("date");
            break;
            case "time":
                new DateTime(what).init("time");
            break;
            case "selectorWithIcons":
                new SelectorWithIcons(what, callback).init();
    
                what.dispatchEvent(new CustomEvent('load', {
                    detail: {
                        element: what
                    }
                }))
    
                $(what).data("kendoDropDownList").bind("change", (e) => {
                    what.dispatchEvent(new CustomEvent('change', { detail: e }))
                });
    
            break;
            default:
                
                typeof what != 'undefined' && typeof what == 'object' && what.dispatchEvent(new CustomEvent('load', {detail: {
                    element: what
                }}))
                
        }

        

    }



    sortBy(e, column, index, prop, source){

        let k_link = e.childNodes[0]
        let sortBy = e.dataset.sortby
        // 1 = asc, 2 = desc;

        sortBy != 2 ? sortBy++ : (sortBy = 0);
        e.dataset.sortby = sortBy;
       

        self.Flashpanel.state.tableSort[source] = { 
            index: index,
            sortBy: sortBy,
            column: column
            // [source]: prop.tableData[source].sort(sortByProperty(column.field, sortBy))
        }
    }

    sortByProperty = (property, sort) => {  
        return (a,b) => {

            if(this.isNum(this.getDescendantProp(a, property))){
                a = Number(this.getDescendantProp(a, property))
            }else{
                a = this.getDescendantProp(a, property)
            }

            if(this.isNum(this.getDescendantProp(b, property))){
                b = Number(this.getDescendantProp(b, property))
            }else{
                b = this.getDescendantProp(b, property)
            }

            // ---------------------------  SORT BY
            if(sort == 1){
                if(a > b)  
                    return 1;  
                else if(a < b)  
                    return -1;  
            
                return 0;  
            }else if(sort == 2){
                if(a > b)  
                    return -1;  
                else if(a < b)  
                    return 1;  
            
                return 0;  
            }else{
                    return 0
            }
        }  
    }

    isNum(val){
        return !isNaN(val)
    }

    getDescendantProp(obj, desc) {
        var arr = desc.split(".");
        while(arr.length && (obj = obj[arr.shift()]));
        return obj;
    }


    render = (node) => {

        let content = document.querySelector("section[content]")
        let dom = this.CreateElement({
            element: "section",
            [node]: true
        })
        this.append(content, dom)

        return dom;

    }


}
