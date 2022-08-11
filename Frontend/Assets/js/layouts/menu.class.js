
import Tdg from "../tdg.class.js";

export default class Menu extends Tdg{

  constructor(){
    super();

    this.state = {
      element: { menu: [], menuItem: [] }
     
    }


    this.menuSection = "section[menu]";

    this.appendTo = (e) => $(this.menuSection).append(e)

    window.addEventListener('popstate', (event) => {

      let url = new URL(window.location.href);
      let id = null;

      if(url.searchParams.get("id")){
        id = url.searchParams.get("id");
      }

      this.menuHandleClick(id, true);


    });	

  }


  
  /**
   * @event onClick
   * @returns burger Element
   */
  createBurgerMenu = () => {

    let thisClass = this;
      let burgerEl = this.CreateElement({
        element: "burgerMenu",
        onClick: function() {
          thisClass.burgerMenuHandler(this)
        }
      })

      for(let i = 0; i < 3; i++){

        let burgerSpanEl = this.CreateElement({
          element: "span",
          id: "menu-span"
        })

        this.state.burgerMenuSpan = burgerSpanEl;
        burgerEl.append(burgerSpanEl);
      }
      
      this.state.burgerMenu = burgerEl;


      return burgerEl;

  }

  /**
   * 
   * @param {Event} e 
   */
  burgerMenuHandler = (e) => {
    var widthOutput  = window.innerWidth;

    if(!$(e).hasClass("active") && widthOutput  >= 590){
      $(e).addClass("active")
      $(this.menuSection).attr("active", true)
      $(this.menuSection).animate({
        width: "300px"
      }).removeClass('remove-scroll')
      // this.state.menu.forEach(x => $(x).animate({
      //   "height": "auto"
      // }))
    }else if ($(e).hasClass("active") && widthOutput  >= 590) {
      $(e).removeClass("active")
      $(this.menuSection).removeAttr("active").animate({
        width: "60px"
      }).addClass('remove-scroll')
      // this.state.menu.forEach(x => $(x).animate({
      //   "height": "44px"
      // }))
      if (this.state.element.menuItem.map((e)=>{return $(e).hasClass("max-content")})) {
        this.state.element.menuItem.map((e)=>{return $(e).removeClass("max-content")})
        this.state.element.menu.map((e)=>{return $(e).attr("aria-open", false)})
      }
    }

    if(!$(e).hasClass("active") && widthOutput  <= 590){
      $(e).addClass("active");
      $(e).css("background", "var(--dark-blue)");
      $(e.children).css("background", "var(--white)");
      $(this.menuSection).attr("active", true);
      $(this.menuSection).animate({
        width: "300px"
      }).removeClass('remove-scroll')
    }else if ($(e).hasClass("active") && widthOutput  <= 590){
      $(e).css("background", "var(--white)").slideUp( 1 ).delay( 400 ).fadeIn( 100 );
      $(e.children).css("background", "var(--header-icon-color)");
      $(e).removeClass("active");
      $(this.menuSection).removeAttr("active").animate({
        width: "0px"
      }).addClass('remove-scroll');

      if (this.state.element.menuItem.map((e)=>{return $(e).hasClass("max-content")})) {
        this.state.element.menuItem.map((e)=>{return $(e).removeClass("max-content")})
        this.state.element.menu.map((e)=>{return $(e).attr("aria-open", false)})
      }
    }
  }

  menuHandleClick = async (param, linking = false) => {
    let id = (typeof param != 'object' ? param : param.target.dataset.id);
    if(typeof id == 'undefined' || id == '') return false
    
    
    let url = new URL(window.location.href);
    
    if(url.searchParams.get("id") == id && !linking) return false;


    // REMOVE CONTENT FROM DIV
    $('section[content]').remove();
    $('div.k-list-container, div.k-datetime-container').remove();

    // CLOSE FLASHPANEL WEBSOCKET CONNECTION
    $.global.fp ? $.global.fp.socket.close() : '';

  
    // SHOW LOADING SNIPPET
    this.setLoading();

    // GET NEW CONTENT FROM ROUTER
    this.getResponse({
      route: "RouterHelper",
      act: "getRoute",
      ns: "Helpers",
      page_id: id
    }).then(x => {

      let url = new URL(window.location.href);

      if(url.searchParams.get("id")){
        url.searchParams.set("id", id);
      }else{
        url.searchParams.append("id", id);
      }
      window.history.pushState({}, "", url);

      $('body').append(x.content)

      // if ($(this.menuSection).attr("active") && window.innerWidth >= 590) {
      //   this.state.burgerMenu.classList.remove("active");
      //   $(this.menuSection).removeAttr("active").animate({
      //     width: "60px"
      //   }).addClass('remove-scroll');
      // }

      // if ($(this.menuSection).attr("active") && window.innerWidth <= 590) {

      //   $(this.menuSection).removeAttr("active").animate({
      //     width: "0px"
      //   }).addClass('remove-scroll');
        
      //   $(this.state.burgerMenu).removeClass("active");
      //   $(this.state.burgerMenu).css("background", "var(--white)").slideUp( 1 ).delay( 400 ).fadeIn( 100 );
      //   $('span[id="menu-span"').css("background", "var(--header-icon-color)");
      // }

    })

  }


  buildMenuContent = (dataObj) => {
      let thisClass = this;
  
      let menu = this.CreateElement({
          element: "menu",
          attributes: [
            (dataObj.sub == "" && dataObj.url ? { url: dataObj.url } : ''),
            (dataObj.sub == "" && dataObj.page ? { page: dataObj.page } : ''),
            (dataObj.sub == "" && dataObj.page_id ? { "data-id": dataObj.page_id } : ''),
            // (dataObj.sub == "" && dataObj.param ? { param: new URLSearchParams(dataObj.param).toString() } : '' ),
            (dataObj.page_id == $.global.id ? "active" : ''),
            (dataObj.sub ? { "aria-open": false } : '')
          ],
          onClick: function (e) {
            thisClass.menuHandler(e.target, this, dataObj)
          } 
      })

      // MENU ICON
      let menuIcon = this.CreateElement({
        element: "icon",
        attributes: ["svg"],
        children: `<span title="${dataObj.name}" showtitle></span><svg title="test" viewBox="0 0 24 24" width="24" height="24">
        <use xlink:href="Frontend/Assets/images/icons/menu/menu.svg#${dataObj.icon}" />
      </svg>`
      })
      menu.append(menuIcon)

      // MENU ITEM
      let menuItem = this.CreateElement({
        element: "menuitem",
        children:  (dataObj.sub == "" && dataObj.page_id ? `<span><a data-id="${dataObj.page_id}">${dataObj.name}</a></span>`  : `<span>${dataObj.name}</span>`),
        onclick: (dataObj.sub == "" && dataObj.page_id ? this.menuHandleClick : '')
      })
      menu.append(menuItem)


      // TOGGLE ARROW
      let menuArrow = this.CreateElement({
        element: "icon",
        attributes: ["font"]
      })

      // MENU SUBITEM
      if(typeof dataObj.sub == "object"){
        let subMenu
        dataObj.sub.map((x, i) => {
          subMenu = this.CreateElement({
            element: (typeof x.sub == "object" ? 'menu' : "submenu"),
            attributes: [(typeof x.sub == "object" ? {"aria-open": false} : "")],
            children: (typeof x.sub == "object" ? '' : (x.page_id ? `<span><a data-id="${x.page_id}">${x.name}</a></span>`  : `<span>${x.name}</span>`)),
            onclick: (typeof x.sub == "object" ? '' : this.menuHandleClick)
          })

          menuItem.append(subMenu)
          menu.append(menuArrow)

          if(typeof x.sub == "object"){
           
              // MENU ITEM
              let menuItem = this.CreateElement({
                element: "menuitem",
                children: `<span>${x.name}</span>`
              })
              subMenu.append(menuItem)
              
              let menuArrow = this.CreateElement({
                element: "icon",
                attributes: ["font"],
                style: {
                  width: "16px"
                }
              })

              subMenu.append(menuArrow)
              

              x.sub.map((x, i) => {
                let subMenuItem = this.CreateElement({
                  element: (typeof x.sub == "object" ? 'menuitem' : "submenu"),
                  children: (x.sub == "" && x.page_id ? `<span><a data-id="${x.page_id}">${x.name}</a></span>`  : `<span>${x.name}</span>`),
                  onclick: this.menuHandleClick
                })
                menuItem.append(subMenuItem)
    
            })
          }

        })

      }

    this.state.element.menuItem.push(menuItem);
    this.state.element.menu.push(menu);
    return menu;

  }

    /**
   * 
   * @param {Event} event 
   * @param {Object} dataObj 
   */
     menuHandler = (target, event, dataObj, sub = false) => {
       
     

      let parent = $(target).parent();
      let checkMenuParent = $(target).parents("menu");

      if(checkMenuParent[0].getAttribute("aria-open") == null) {

        $("menu, submenu").removeAttr("active")
        $(event).attr("active", true)

      }else{
        if(typeof $(target).parents("submenu")[0] != 'undefined'){

          $("menu, submenu").removeAttr("active")

          $(target).parents("submenu").attr("active", true)
          $(target).parents("menu").attr("active", true)

        }
        // if($(target).parents("submenu")[0]){

      }

   

      
      if(parent[0].localName == "section" || parent[0].localName == "submenu" || parent[0].localName == "span") return false;

      if(checkMenuParent[0].getAttribute("aria-open") != null) {

        // FOR TOGGLING ATTRIBUTE  - EASY WAY! USE IT!
        $(checkMenuParent[0]).attr("aria-open", (i, attr) => attr == "false" ? true : false)
       
        $(checkMenuParent[0]).children("menuitem").toggleClass("max-content")

        if(!$("burgermenu").hasClass("active")){
          this.burgerMenuHandler($("burgermenu"))
        }

      }else{

        
        this.menuHandleClick($(event).attr("data-id"))

        // window.location = `?id=${$(event).attr("data-id")}`
      }
    }


  createMenu = (dataObj) => {

    dataObj.forEach((x, i) => {

      let menuItem = this.buildMenuContent(x);

      this.appendTo(menuItem)

    })

  }


  initializeMenu = () =>  {
    
      this.appendTo(this.createBurgerMenu());

    let thisClass = this;
    
    $.ajax({
      data: {
        route: "Menu",
        act: "getMenuData"
      },
      success: function(data){

        thisClass.appendTo(thisClass.createMenu(data))

      }
    })

    }

  


}