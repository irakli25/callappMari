import { kendo_SelectedID,kendo_SelectedText,kendo_setValue,sendKendoRequest, kendo__refresh, kendo_setValueByID, kendo__multiSelectedID, kendo__destroy } from "../../helpers/kendo.helper.js";
import Tdg from "../../tdg.class.js";
import Helper from "./helper.class.js";
import Dialog from "./dialog.class.js";
import Flashpanel from "../../layouts/flashpanel.class.js";
import Button from "../../components/button/button.class.js";

export default class Handbook extends Tdg {

    constructor() {
        super();
        document.title;
        self.Tdg = this;
        this.state = null;
        self.helper = Helper;
        self.dilaog = Dialog;
        self.Handbook = this;
        this.removeLoading();
    }

    init = (def)=> {
        this.state = {
            sectionName: document.querySelector("section[" + def.handbook + "]"),
            flashpanel: new Flashpanel().init(),
            definer: new Helper().buildTableColumns(def),
            element: []
        }

        document.title = this.state.definer.route;
        this.append(this.state.sectionName, this.buildBar());
        this.append(this.state.sectionName, this.buildDivForTable());
        this.append(this.state.element.tablediv, this.buildTable());
    }

    buildDivForTable = () => {
        this.state.element.tablediv = this.CreateElement({ element: "div" });
        return this.state.element.tablediv;
    }

    buildBar = ()=> {
        // ეს ფუნქცია ქმნის სათაურს, დამატება და წაშლის ღილაკებს
        this.state.element.bar = this.CreateElement({
            element: "div",
            class: "title"
        });

        this.state.element.add = new Button({
            type: "add",
            text: "დამატება",
            onclick: async ()=> { this.create() },
            access: "add"
        });
        
        this.state.element.delete = new Button({
            children: `<div class="btn">წაშლა <img src='Frontend/Assets/images/icons/x.svg'/></div>`,
            style: {
                'background': '#FD0A50'
            },
            onclick: async ()=> { this.delete() },
            access: "delete"
        });

        this.state.element.title = this.CreateElement({
            element: "h1",
            text: this.state.definer.GEOtitle
        });

        this.state.element.bar.append(this.state.element.add, this.state.element.title, this.state.element.delete);
        return this.state.element.bar;
    }

    buildTable = () => {
        // ეს ფუნქცია ქმნის კენდოს თეიბლს
        var checkboxForKendo = {
            field: "",
            template: `<input type="checkbox" field-data="#:ID#">`,
            size: "2vw"
        };

        if(this.state.definer.table.checkbox)
            this.state.definer.table.columns.push(checkboxForKendo);
        
        // ეს მასივი ინახავს ინფორმაციას ჯოინის შესახებ, ბექისთვის
        var joins = "";
        if(this.state.definer.table.hasOwnProperty("joiner")){
            joins = [];
            this.state.definer.table.joiner.forEach(el => {
                joins.push([el.join, el.to]); 
            });
        }

        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: this.state.definer.table.columns,
            data: {
                route: this.state.definer.route,
                handbook: this.state.definer.handbook,
                act: "getList",
                columnNames: this.state.definer.table.dbNames,
                JoinData: joins,
            },
            options: {
                header: true,
                numberic: false,
                export: { excel: true, pdf: true },
                footer: true
            },
            ondblclick: this.update
        });
        return this.state.element.table;
    }

    create = ()=> {
        new Dialog(this.state.definer.table).buildDialog({
            route: this.state.definer.route,
            handbook: this.state.definer.handbook,
            JoinData: this.state.definer.table.joiner,
            act:   "create",
        });
    }

    update = (el)=> { 
        // ეს ფუნქცია კენდოს თეიბლზე ორჯერ კლიკისას დიალოგს ატანს კენდოსგან მოცემულ პარამეტრებს
        new Dialog(this.state.definer.table, el).buildDialog({
            route: this.state.definer.route,
            handbook: this.state.definer.handbook,
            act:   "update"
        });
    }

    delete = ()=> {
        // ეს ფუნქცია პოულობს მოჩეკილ სვეტებს და შლის
        var selected = document.querySelectorAll("kendo[type='table'] input[type=checkbox]:checked");
        var depList = [];

        selected.forEach( (el)=> {  depList.push(el.getAttribute("field-data"));  });

        if(depList.length > 0) {
            var parameters = {
                route: this.state.definer.route,
                handbook: this.state.definer.handbook,
                act: "delete",
                list: depList
            };
            
            new Helper().request(parameters);
        }
    }

}