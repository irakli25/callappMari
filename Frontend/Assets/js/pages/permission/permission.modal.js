import Tdg from "../../tdg.class.js";


export default class PermissionModal extends Tdg {


    constructor(props) {
        super();

        self.PermissionModal = this

        this.state = {
            section: this.CreateElement({
                element: "div",
                class: "modal-section"
            }),
            element: [],
            props: props,
            permissionList: [
                {
                    type: "view_page",
                    name: "გვერდის ნახვა",
                    setAll: true
                },
                {
                    type: "view",
                    name: "ნახვა"
                },
                {
                    type: "add",
                    name: "დამატება"
                },
                {
                    type: "delete",
                    name: "წაშლა"
                },
                {
                    type: "save",
                    name: "რედაქტირება"
    
                },
                {
                    type: "audio",
                    name: "აუდიო"
                },
                {
                    type: "download",
                    name: "ჩამოტვირთვა"
                }
            ],
            data: [],
            menu: [],
            permissionButton: [],
            title: [],
            permissionData: []
        }

    }


    /**
     * INITIALIZE MODAL
     */
    initialize = async () => {

        await this.build();

        return this.state.section;

    }


    /**
     * BUILD MODAL
     */
    build = async () => {

        this.append(this.state.section, this.buildHeaderTitle());
        this.append(this.state.section, this.buildHeader());
        this.append(this.state.section, this.createModal());

        this.state.data = await this.getMenuData();

        this.createModalContent(this.state.data);

    }


    buildHeaderTitle = () => {

        this.state.element.groupIcon = this.CreateElement({
            element: "icon",
            attributes: ["svg"],
            children: `<svg viewBox="0 0 14 14" width=14 height=14><use xlink:href="Frontend/Assets/images/icons/icons.svg#person" /></svg>`
        })

        this.state.element.groupTitle = this.CreateElement({
            element: "h1",
            children: "ოპერატორები",
            class: "group-title"
        })

        this.state.element.groupBlock = this.CreateElement({
            element: "div",
            class: "group-block"
        }, this.state.element.groupIcon, this.state.element.groupTitle)
    
        return this.state.element.groupBlock;
    }

    

    /**
     * Build Header With Search
     */

    buildHeader = () => {

        
        this.state.element.headerBlock = this.CreateElement({
            element: "div",
            class: "header-block"
        })

        //  -- SEARCH BLOCK
        this.state.element.inputDiv = this.CreateElement({
            element: "div",
            class: "input-block"
        })

        this.state.element.input = this.CreateElement({
            element: "input",
            type: "text",
            placeholder: "ძებნა",
            class: "permission-input",
            id: "permission-input"
        })

        this.append(this.state.element.inputDiv, this.state.element.input);
        this.append(this.state.element.headerBlock, this.state.element.inputDiv);
        // END SEARCH BLOCK --


        // EACH TYPE OF PERMISSION

        this.state.element.headerSet = this.CreateElement({
            element: "div",
            class: "header-set"
        })

        this.state.permissionList.forEach(permission => {

            this.state.element.permissionImg = this.CreateElement({
                element: "icon",
                attributes: ["svg"],
                children: `<svg style="margin-top: 5px;" viewBox="0 0 14 14" width=14 height=14><use xlink:href="Frontend/Assets/images/icons/icons.svg#check" /></svg>`
            })

            this.state.permissionTitle = this.CreateElement({
                element: "div",
                children: permission.name,
                class: "permission-title",
                type: permission.type,
                dataset: {
                    status: true
                },
                onClick: this.columnBalancer
            }, this.state.element.permissionImg)

            this.append(this.state.element.headerSet, this.state.permissionTitle);

        })

        this.append(this.state.element.headerBlock, this.state.element.headerSet);

        return this.state.element.headerBlock

    }

    /**
     * Get Menu Data
     * @returns {Object}
     */
    getMenuData = async () => {
        
        let getData = await this.getResponse({ 
            route: "Permission", 
            act: "getMenuData",
            group_id: this.state.props.id
        })

        return getData;
    }


    createModal = () => {
        this.state.createModal = this.CreateElement({
            element: "div",
            class: "modal-content"
        })
    
        return this.state.createModal;
    }


    createModalContent = (data, sub = false) => {
        
        
            data.length > 0 && data.forEach((data, i) => {
                
                this.state.menu[data.page_id] = this.CreateElement({
                    element: "div",
                    class: "permission-plus",
                    show: false,
                    onClick: this.showMoreClick
                })

                this.state.element.iconDiv = this.CreateElement({
                    element: "iconDiv",
                })

                this.state.permissionTitle = this.CreateElement({
                    element: "h1",
                    children: `${data.name}`,
                    title: typeof data.param != 'undefined' ? data.param.id : '',
                    id: "data-title",
                })


                this.generatePermissionButtons(data);

                
                this.state.title[i] = this.CreateElement({
                    element: "div",
                    class: "permissions",
                    aria: {
                        open: false
                    },
                }, this.CreateElement({
                    element: "permissionMenu",
                }, this.CreateElement({
                    element: "permissionDiv"
                }, this.state.menu[data.page_id], 
                   this.state.permissionTitle), 
                   this.state.element.iconDiv
                ))
                
                if (!sub) {
                    this.append(this.state.createModal, this.state.title[i]);
                    this.state.title[i].classList.add("permissions-menu");
                } else {
                    this.append(sub, this.state.title[i])
                    this.state.title[i].classList.add("permissions-submenu");
                }
                if(!data.sub){
                    this.state.menu[data.page_id].classList.add("permission-plus-disabled");
                }

                this.createModalContent(data.sub, this.state.title[i]);
            })
        
    }


    // MENU EXPENDING FUNCTION
    showMoreClick = (e) => {
        
        var showMore = e.target.closest(".permissions");
        
        var img = e.target;
        var check = showMore.getAttribute("aria-open");

        showMore.childNodes.forEach((o, i) => {
            if (check == "false") {
                if(i > 0) {
                    o.style.display = "block";
                    img.classList.remove("permission-plus");
                    img.classList.add("permission-minus");
                    showMore.style.background = "#d9edff";
                } else { 
                    showMore.setAttribute("aria-open", true);
                }
            } else {
                if(i > 0) {
                    o.style.display = "none";
                    img.classList.add("permission-plus");
                    img.classList.remove("permission-minus");
                    showMore.style.background = "transparent";
                } else {
                    showMore.setAttribute("aria-open", false);
                }
            }
        })
    }


    generatePermissionButtons = (data) => {
        this.state.permissionList.forEach((icons) => {

            this.state.permissionButton[data.page_id] = this.CreateElement({
                element: "icon",
                class: "icons",
                children: `<svg viewBox="0 0 14 14" width=14 height=14><use xlink:href="Frontend/Assets/images/icons/icons.svg#${icons.type}" /></svg>`,
            })

            this.state.permissionIcon = this.CreateElement({
                element: "div",
                type: icons.type,
                class: "permissionIcon",
                dataset: {
                    status:  data[icons.type] > "0" ? true : false,
                    id: data.page_id
                },
                onclick: this.handlePermissionButton
            }, this.state.permissionButton[data.page_id])

            // if(data[icons.type] == "0") {
            //     let a = $(`.permission-title[type=${icons.type}]`)[0]
            //     $(a).attr("data-status", false);
            // }

            this.append(this.state.element.iconDiv, this.state.permissionIcon)

        })
        
    }

    handlePermissionButton = (event) => {

        let button = event.target.parentElement;
        if(button.localName == 'svg' || button.localName == 'use' || button.localName == 'icon'){
            button = button.closest('.permissionIcon');
        }
        
        let buttonStatus = button.getAttribute("data-status");
        let pageId = button.getAttribute("data-id");

        if(buttonStatus == 'true'){
            button.setAttribute("data-status", false);
        }else{
            button.setAttribute("data-status", true);
        }

        this.state.permissionData = new Array();

        this.lineBalancer(button, pageId)


        $(".permissionIcon").each((i, x) => {
            let buttonType = x.getAttribute("type");
            let buttonStatus = x.getAttribute("data-status");
            let buttonPageId = x.getAttribute("data-id");

            if(!(buttonPageId in this.state.permissionData)){
                this.state.permissionData[buttonPageId] = {
                    [buttonType] : buttonStatus
                };
            }else{
                this.state.permissionData[buttonPageId] = {
                    ...this.state.permissionData[buttonPageId],
                    [buttonType] : buttonStatus
                }
            }

        })


    }



    /**
     * Line Balancer
     * @param {Element} button 
     * @param {Integer} pageId 
     * @requires 
     */
    lineBalancer = (button, pageId) => {

        let onLine = $('.permissionIcon[data-id="'+pageId+'"]')

        if(onLine.length > 0){

            onLine.each((i, x) => {
                let buttonType = x.getAttribute("type");
                let buttonStatus = x.getAttribute("data-status");
                
                buttonType != "view_page" && 
                button.getAttribute('type') == 'view_page' &&
                button.getAttribute('data-status') == 'false' &&
                x.setAttribute("data-status", false);

                buttonType != "view_page" && 
                button.getAttribute('type') == 'view_page' &&
                button.getAttribute('data-status') == 'true' &&
                x.setAttribute("data-status", true);

            })
        }


        // CHECK "PAGE VIEW" PERMISSION IF ONE OF THE OTHER PERMISSIONS IS TRUE
        if(button.getAttribute('type') != 'view_page'){
            let page = $('.permissionIcon[data-id="'+pageId+'"][type="view_page"]')[0];
            if(button.dataset.status == 'false'){
                // $(page).attr('data-status', false);
            }else{
                $(page).attr('data-status', true);
            }
        }
        // --------------------------------------------------


        // CHILDREN PERMISSION BALANCER
        button.getAttribute('type') == 'view_page' &&
        this.childrenBalancer(button)

    }



    /**
     * SELECT ALL CHILDREN PERMISSION
     * @param {Element} button 
     */
    childrenBalancer = (button) => {
        let children = $(button).parents(".permissions").children(".permissions")
        let checkChildren = $(button).parents(".permissions-submenu")
        
        if(children.length > 0 && checkChildren.length == 0){ // SELECT CHILDRENS
            let childrenLines = children.find(".permissionIcon")
            childrenLines.each((i, x) => {
                    button.getAttribute('data-status') == 'false' ? 
                    x.setAttribute("data-status", false) : 
                    x.setAttribute("data-status", true);
            })
        }else{ // SELECT PARENT IF CHILDREN WILL BE SELECTED
            let parent = $(button).parents(".permissions-menu").children('permissionmenu');
            let parentLines = parent.find(".permissionIcon")

            parentLines.each((i, x) => {

                    button.getAttribute('data-status') == 'false' ? 
                    x.setAttribute("data-status", false) : 
                    x.setAttribute("data-status", true);
            })
        }
    }


    /**
     * COLUMN BUTTON HANDLER; CHANGE PERMISSION STATUS MULTIPLE
     * @param {Event} event 
     */
    columnBalancer = (event) => {

        let button = event.target;
        if(button.localName == 'svg' || button.localName == 'use' || button.localName == 'icon'){
            button = button.closest('.permission-title');
        }

        let buttonStatus = button.getAttribute("data-status");
        let buttonType = button.getAttribute("type");

        if(buttonStatus == 'true'){
            button.setAttribute("data-status", false);
            $('.permissionIcon').each((i, x) => {
                if(buttonType == 'view_page'){
                    x.setAttribute("data-status", false);

                    // SET ALL HEADER BUTTON TO "FALSE"
                    $('.permission-title').each((i, x) => {
                        x.setAttribute("data-status", false);
                    })

                }else if(x.getAttribute("type") == buttonType){
                    x.setAttribute("data-status", false);
                }
            })
        }else{
            button.setAttribute("data-status", true);
            $('.permissionIcon').each((i, x) => {
                if(buttonType == 'view_page'){
                    x.setAttribute("data-status", true);

                    // SET ALL HEADER BUTTON TO "FALSE"
                    $('.permission-title').each((i, x) => {
                        x.setAttribute("data-status", true);
                    })
                }else if(x.getAttribute("type") == buttonType){
                    x.setAttribute("data-status", true);
                }
            })
        }

    }


}