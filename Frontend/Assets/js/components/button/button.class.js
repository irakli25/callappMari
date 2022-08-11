import Tdg from "../../tdg.class.js"

export default class Button extends Tdg{


    constructor(prop){
        super()

        this.state = {
            element: [],
            text: prop.text,
            style: prop.style,
            onclick: prop.onclick,
            access: prop.access,
            class: prop.class,
            types: ["add", "delete", "archive"],
            prop: prop
        }

        return this.build()
    }

    build = () => {


        if (!this.state.types.includes(this.state.prop.type)) {
            
            this.state.element.button = this.CreateElement({
                element: "button",
                ...this.state.prop
            })
    
            return this.state.element.button
    
        } else {
            
            this.state.prop.type == "add" && (this.state.element = this.buildAddBtn(this.state.prop))

            this.state.prop.type == "delete" && (this.state.element = this.buildDeleteBtn(this.state.prop))

            this.state.prop.type == "archive" && (this.state.element = this.buildArchiveBtn(this.state.prop))

            return this.state.element
        }

    }


    buildAddBtn = () => {
        this.state.element.button = this.CreateElement({
            element: "button",
            children: `<img src='Frontend/Assets/images/icons/plus_1.svg'/>`,
            ...this.state.prop
        })

        return this.state.element.button
    }

    
    buildDeleteBtn = () => {
        this.state.element.button = this.CreateElement({
            element: "button",
            children: `<img src='Frontend/Assets/images/icons/x.svg'/>`,
            ...this.state.prop
        })

        return this.state.element.button
    }

    buildArchiveBtn = () => {
        this.state.element.button = this.CreateElement({
            element: "button",
            children: `<img src='Frontend/Assets/images/icons/archive.svg'/>`,
            ...this.state.prop
        })

        return this.state.element.button

    }


} 