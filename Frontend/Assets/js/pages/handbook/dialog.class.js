import Tdg from "../../tdg.class.js";
import Helper from "./helper.class.js";

export default class Dialog extends Tdg {

    constructor(AllFields, Values = null) {
        super();
        this.dialogContent;
        self.helper = Helper;
        this.updateValue = Values;
        this.fields = AllFields.columns;
        this.DBname = AllFields.dbNames;
    }

    buildConfig = (field, dbname)=> {
        // ეს ფუნქცია ქმნის ველების შესაქმნელად კონფიგურაციას
        var show = field.showInDialog == false ? "none" : "";
        var textValue =  this.updateValue == null ? '' : this.updateValue[field.fieldName] == null ? '': this.updateValue[field.fieldName];

        // დეფაულტ კონფიგურაცია დიალოგში ველის შესაქმნელად
        if(!field.hasOwnProperty("inDialog")) {
            field.inDialog = {
                element : "textarea",
                type: "input",
                text: textValue,
                placeholder: field.Geoname,
                class: 'item_' + field.fieldName,
                style: { width: "350px", display: show }
            };
            return field.inDialog;
        } 
        
        // თუ აქვს კომფიგურაცია ჩაამატებს საჭირო პარამეტრებს
        field.inDialog.text   = textValue;
        field.inDialog.chosen = textValue;
        field.inDialog.from   = dbname.split('.')[0];
        field.inDialog.class  = 'item_' + field.fieldName;

        if(!field.inDialog.hasOwnProperty("title")) field.inDialog.title = field.Geoname;
        if(!field.inDialog.hasOwnProperty("id"))  field.inDialog.id = field.fieldName;
        if(!field.inDialog.hasOwnProperty("data") && field.inDialog.type == "selector") {
            field.inDialog.data = {
                route: "Handbook",
                act: "getSelectOpts",
                handbook: dbname.split('.')[0], 
                onlyActives: true
            };
        }
        return field.inDialog;
    }

    buildFields = ()=> {
        // ეს ფუნქცია ქმნის ველებს დიალოგში, რომელიც აქვს ცხრილს 
        var kendo_Fields = document.querySelectorAll("kendo[type='table'] thead th");
        var requestFields = []; // შენახვის რექვესთის პარამეტრები

        kendo_Fields.forEach( (el, ind) => {
            var fieldName = el.getAttribute("data-field");
            var Geoname  = el.getAttribute("data-title");

            if(fieldName != null && fieldName != "") {
                var fieldConfig = this.fields[ind];
                var fieldDbname = this.DBname[ind];
                
                fieldConfig.fieldName = fieldName;
                fieldConfig.Geoname = Geoname;

                if(!fieldConfig.hasOwnProperty("showInDialog")) fieldConfig.showInDialog = true;
                // dbCol არის ბაზაში არსებული სელქტორის value (!!და არა სახელი რაც არჩეულია!!)
                var DBfield = (fieldConfig.hasOwnProperty("dbCol")) ? fieldConfig.dbCol : fieldDbname;

                if(!fieldConfig.hasOwnProperty("template")) {
                    var field = this.buildConfig(fieldConfig, fieldDbname);
                     // ამატებს დიალოგისთვის გადასაცემ დივში ველებს
                    this.append(this.dialogContent, this.CreateElement(field));

                    // შენახვის რექვესთის დროს, ვიყენებთ ველების ინფორმაციის შესანახად 
                    requestFields.push({
                        title:fieldName, 
                        dbName: DBfield, 
                        geoTitle: Geoname, 
                        Eltype: field.type
                    });
                }
            }
            
        });
        return requestFields;
    }

    buildDialog = (parameters) => {
        // ეს ფუნქცია აწყობს დიალოგის ფანჯარას
        this.dialogContent = this.CreateElement({ element:"div", id:"dialogContent" });
        var requestFields = this.buildFields();
        parameters.requestData = [];

        // დიალოგის კონფიგურაცია
        var dialog = new jBox('Confirm', {
            content: this.dialogContent,
            cancelButton: 'გაუქმება',
            confirmButton: 'შენახვა',
            zIndex: 'auto',
            onOpen: async ()=> {
                var dialogSelectors = document.querySelectorAll("kendo[type='selector']");
                dialogSelectors.forEach( el=> {
                    if(!el.hasAttribute("data"))
                        console.log(" მოხდა შედომა ``" + el.title + "`` სელექტორს არ მოყვება 'data' კონფიგურაცია ");
                    // დიალოგში არსებულ სელქტორებს გარდაქმნის კენდო სელექტორებად, თუ ედიტია აირჩევს option - ს
                    new Helper().setUpSelector(el, this.updateValue);
                });
            },
            confirm: () => {
                requestFields.forEach( el => {
                    var dialogFieldValue = (el.Eltype == "selector") ? $("#"+el.title).data("kendoDropDownList").value() : document.querySelector(".item_" + el.title).value;
                    parameters.requestData.push({ title: el.title, geoTitle: el.geoTitle, fieldie: el.dbName, value: dialogFieldValue });
                });
                new Helper().request(parameters);
            },
            onCloseComplete: ()=> { dialog.destroy(); }
        });

        dialog.open();
    }

}