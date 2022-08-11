`use strict`
import Helper from "../../helpers/helper.class.js";

export default class Input extends Helper {


    constructor(prop) {

        super();
        this.state = {
            dom: [],
            element: [],
            prop: prop,
            types: ["text", "password", "textarea", "checkbox", "radio","number","selectize"],
            column: prop.column,
            row: prop.row,
            searchShow: prop.searchShow,
            searchOnclick: prop.searchOnclick
        }

    }


    build = () => {
        if (typeof this.state.prop.column != 'undefined') delete this.state.prop.column
        if (typeof this.state.prop.row != 'undefined') delete this.state.prop.row

        if (!this.state.types.includes(this.state.prop.type)) {
            console.warn("Incorrect Type")
        } else {
            
            this.state.title = this.state.prop.placeholderTitle;
            // typeof (this.state.prop.placeholder) != undefined ? delete this.state.prop.placeholder : ""
            typeof (this.state.prop.searchOnclick) != undefined ? delete this.state.prop.searchOnclick : ""
            typeof (this.state.prop.searchShow) != undefined ? delete this.state.prop.searchShow : ""

            this.state.prop.type == "text" && this.state.searchShow ? this.state.element = this.buildTextWithSearch(this.state.prop) : this.state.element = this.buildText(this.state.prop)

            this.state.prop.type == "password" && (this.state.element = this.buildText(this.state.prop))

            this.state.prop.type == "radio" && (this.state.element = this.buildLabel(this.state.prop))

            this.state.prop.type == "checkbox" && (this.state.element = this.buildLabel(this.state.prop))

            this.state.prop.type == "textarea" && (this.state.element = this.buildTextArea(this.state.prop))

            this.state.prop.type == "selectize" && (this.state.element = this.buildSelectizeInput(this.state.prop))

            return this.state.element
        }
    }

    buildSelectizeInput = (prop) => {
        this.state.selectize = this.buildText(prop);

        var $select = $(this.state.selectize.children[0]).selectize({
            persist: true,
            createOnBlur: true,
            create: true,
            preload: 'focus'
            
        });

        prop.onchange ? this.setOnChangeSelectize($select, prop.onchange) : "";
        

        return this.state.selectize;
    }

    setOnChangeSelectize = ($select, onchange) => {
        
        var selectizeControl = $select[0].selectize;
        selectizeControl.on('change', onchange)

    }



    buildText = (arg) => {
        this.state.element.input = this.CreateElement({
            element: "field",
            "grid-column": (typeof this.state.column != 'undefined' ? this.state.column : ''),
            "grid-row": (typeof this.state.row != 'undefined' ? this.state.row : ''),
            title: (this.state.title ? this.state.title : '')
        }, this.CreateElement({
            element: "input",
            ...arg
        }))

        return this.state.element.input


    }

    buildTextWithSearch = (arg) => {
        var searcharea = this.CreateElement({
            element: "searcharea",
            onclick: () => {
                this.state.searchOnclick(arg.id,searcharea)
            },
            title: "ძიება",
            children: ` <svg viewBox="0 0 7 23" width="7" height="23" style="margin-left: 4px;">
                                <use xlink:href="Frontend/Assets/images/icons/icons.svg#search-line" />
                            </svg>
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <use xlink:href="Frontend/Assets/images/icons/icons.svg#search-loup" />
                            </svg>`
        });

        this.state.element.input = this.CreateElement({
            element: "field",
            searchShow: "show",
            "grid-column": (typeof this.state.column != 'undefined' ? this.state.column : ''),
            "grid-row": (typeof this.state.row != 'undefined' ? this.state.row : ''),
            title: (this.state.title ? this.state.title : '')
        }, this.CreateElement({
            element: "input",
            ...arg
        }), searcharea)



        return this.state.element.input;
    }

    buildLabel = (arg) => {

        this.state.element.input = this.CreateElement({
            element: "field",
            "grid-column": (typeof this.state.column != 'undefined' ? this.state.column : ''),
            "grid-row": (typeof this.state.row != 'undefined' ? this.state.row : ''),
            title: (this.state.title ? this.state.title : '')
        }, this.CreateElement({
            element: "input",
            ...arg
        }), this.CreateElement({
            element: "label",
            for: arg.id,
            children: arg.label
        }))

        return this.state.element.input
    }


    buildTextArea = (arg) => {
        this.state.element.textarea = this.CreateElement({
            element: "field",
            "grid-column": (typeof this.state.column != 'undefined' ? this.state.column : ''),
            "grid-row": (typeof this.state.row != 'undefined' ? this.state.row : ''),
            title: (this.state.title? this.state.title : '')
        }, this.CreateElement({
            element: "textarea",
            ...arg
        }))


        return this.state.element.textarea

    }


}