
// SYSTEM LIBRARY
import System from "./system.class.js";

export default class Helper extends System {

  constructor(element, callback) {
    super()

    self.Helper = this

    this.state = {

      elementObj: {},

      callback: () => {

        return this.setEvent(element, callback)

      },
      option: {

      },
      

    }


    this.CreateElement.bind(this)

  }

  setEvent = (element, callback) => {
    return callback
  }

  /**
   * 
   * @param {object} obj 
   * @param {html} children
   * @returns Element
   */
  CreateElement = (obj, ...children) => {

    // DEFAULT STATES
    this.state.permission = true;
    this.state.message = '';

    // CHECK 
    if (typeof obj != "object") return console.warn("obj Is not a Object");
    if (!obj.element) return console.warn("No Element field In Object");

    var element = document.createElement(obj.element);

    // new CustomEvent('bound', {detail: {}})
    // new CustomEvent('load', {detail: {}})

    // element.setAttribute("aria-appended", false);

    typeof obj.modal == "object" && this.buildModal(element, obj.modal)

    typeof obj.tooltip == "object" && this.buildTooltip(element, obj.tooltip)

    obj.loading && this.setLoadingForm(element)

    this.buildElement(element, obj, children)

    return (obj.html ? element.outerHTML : element);

  }

  formatDate = () => {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  buildModal = async (element, option, prop = {}) => {

    if (option == undefined) return console.warn("Modal option is a empty");

    let footer = [];
    let modal;
    let confirmOnCancel = option.confirmOnCancel ? option.confirmOnCancel : false;

    // Access Modal
    this.access = option.access ? false : true;

    let access = option.access ? await this.checkPermission(option.access) : false;

    if(access && !access.status){
      option.content = '';
      this.buildNotice({msg: access.message, color: "red"})
      return false;
    }else{
      if(typeof option.content == "function"){
        option.content = option.content.call()
      }
    }

    // check buttons Object
    typeof option.buttons == "object" && Object.entries(option.buttons || {}).forEach(([name, value]) => {
      typeof value != "function" &&
        footer.push(this.CreateElement({
          element: "button",
          attributes: [name, typeof value.disabled != "undefined" ? "disabled" : ""],
          text: value.name,
          onclick: (event) => value.onclick(modal, event),
          class: "modal-button",
          tooltip: value.tooltip,
          style: value.style,
          access: value.access
        }))

    })

    typeof option.buttons == "undefined" && footer.push(this.CreateElement({
      element: "button",
      attributes: ["cancel"],
      text: "დახურვა",
      onclick: function () {
        if (confirmOnCancel) {
          self.buildConfirmModal(modal)
        } else {
          modal.close().destroy()
        }
      },
      class: "modal-button"
    }))


    if (typeof option.buttons != 'undefined') {

      typeof option.buttons.cancel == "undefined" &&
        footer.push(this.CreateElement({
          element: "button",
          attributes: ["cancel"],
          text: "დახურვა",
          onclick: function () {

            if (confirmOnCancel) {
              self.Helper.buildConfirmModal(modal)
            } else {
              modal.close().destroy()
            }

          },
          class: "modal-button"
        }))
    }


    //  Remove buttons from option Object
    option.buttons && delete option.buttons;


    element && (element.onclick = () => {
      modal = new jBox('Modal', {
        attach: element,
        draggable: 'title',
        animation: false,
        blockScroll: true,
        footer: footer,
        zIndex: 'auto',
        ...option
      }).open()
    })

    !element && (modal = new jBox('Modal', {
      draggable: 'title',
      animation: false,
      blockScroll: true,
      footer: footer,
      zIndex: 'auto',
      ...option
    }).open())

    this.close = modal.close;

    return modal

  }

  buildTooltip = (element, option) => {

    // element.localName == "kendo" && (element = element.parent)

    new jBox('Tooltip', {
      ...option
    }).attach(element)


  }


  /**
   * 
   * @param {JSON} option 
   */
  buildNotice = (option) => {

    new jBox('Notice', {
      theme: 'NoticeFancy',
      attributes: (option.attributes ? option.attributes : {
        x: 'left',
        y: 'bottom',
        style: "background-color:red;"
      }),
      color: (option.color ? option.color : 'blue'),
      content: `<span style='font-family: BPG2; font-size: 11px'>${option.msg}<span>`,
      animation: (option.animation ? option.animation : {
        open: 'slide:bottom',
        close: 'slide:left'
      })
    });

  }

  buildConfirmModal = (modal = false, prop = {}) => {

    let confirmModal = new jBox('Confirm', {
      content: prop.content || 'ნამდვილად გსურთ დიალოგის დახურვა?',
      cancelButton: 'გაუქმება',
      confirmButton: prop.confirmButton || 'დახურვა',
      zIndex: 'auto',
      confirm: function () {

        typeof prop.confirm == 'function' && prop.confirm()

        confirmModal.close()

        modal && modal.close().destroy()

      },
      cancel: function () {
        typeof prop.cancel == 'function' && prop.cancel()

        confirmModal.close()
      },
      onCloseComplete: function () {
        confirmModal.destroy()
      }
    })

    confirmModal.open()

  }

  buildElement = (element, obj, children) => {

    // ----------------------------------------------
    // SET ATTRIBUTES WITH MULTI OBJECT
    // ----------------------------------------------
    (obj.attributes ? (typeof obj.attributes != "object" ? console.warn("Attributes Is not Array Object") :
      obj.attributes.forEach((x, i) => {
        if (x == '') return false;
        typeof x == 'object' ? element.setAttribute(Object.keys(x)[0], Object.values(x)[0]) : element.setAttribute(x, '');

      })
    ) : ''
    )

    // ----------------------------------------------
    // SET STYLE
    // ----------------------------------------------
    if (typeof obj.style == 'object') Object.assign(element.style, obj.style)


    // ----------------------------------------------
    // SET CHILDREN AS TEXT
    // ----------------------------------------------
    
    if (typeof obj.text == 'string' || typeof obj.text == 'number') {
      $(element).append(obj.text)
    } else {
      if (typeof obj.text != "undefined") {
        
        console.warn("Text is not a String")
      }
    }



    // ----------------------------------------------
    // UNIQUE CHILD ATTRIBUTE
    // ----------------------------------------------

    if (Array.isArray(obj.children)) {
      obj.children.forEach(x => {
        $(element).append(x);
      })
    } else {
      if (obj.children) $(element).append(obj.children);
    }

    children.forEach(child => {

      self.Tdg.append(element, child);

    });




    // ----------------------------------------------
    // SET CLASS NAME WITH ARRAY
    // ----------------------------------------------
    (obj.className ? (typeof obj.className != "object" ? console.warn("className Is not Array Object") :
      obj.className.forEach((x, i) => {
        if (x == '') return false;
        element.classList.add(x)
      })
    ) : ''
    )

    // ----------------------------------------------
    // SET DATASET ATTRIBUTES
    // ----------------------------------------------
    if (typeof obj.dataset == 'object') {
      Object.entries(obj.dataset || {}).forEach(([name, value]) => {
        if (typeof value == "object") value = JSON.stringify(value)
        element.setAttribute("data-" + name, value.toString())
      })
    }

    // ----------------------------------------------
    // SET ARIA ATTRIBUTES
    // ----------------------------------------------
    if (typeof obj.aria == 'object') {
      Object.entries(obj.aria || {}).forEach(([name, value]) => {

        if (typeof value == "undefined") return false;
        if (typeof value == "object") value = JSON.stringify(value)

        element.setAttribute("aria-" + name, value)
      })
    }


    // ----------------------------------------------
    // CHECK PERMISSION
    // ----------------------------------------------
    if (obj.access) {

      this.sendRequest({
        route: "accessPermission",
        act: "initial",
        ns: "Helpers",
        accessTo: obj.access
      }, () => {

        element.setAttribute("disabled", true)

      }, (response) => {
        this.state.permission = response.status
        this.state.message = response.message

        if (this.state.permission) element.removeAttribute("disabled")

        this.configureElement(element, obj)

      })

    } else {

      this.configureElement(element, obj)

    }




    // if(obj.type == "table"){
    //   $(this.state.element.table).data("kendoGrid").bind("dataBound", obj.callback)
    // }

    if (obj.type == "table") {
      if (typeof obj.template != 'undefined') $(element).append(`<script type="text/x-kendo-template"> ${obj.template} </script>`)
    }

  }

  // ----------------------------------------------
  // CONFIGURE EVENTS AND ATTRIBUTES
  // ----------------------------------------------
  configureElement = (element, obj) => {

    let misAttr = ["attributes", "style", "children", "className", "element", "callback", "access", "text", "modal", "tooltip", "aria", "dataset", "loading", "template", "html"]


    Object.entries(obj || {}).forEach(([name, value]) => {

      if (name.startsWith("on") && name.toLowerCase() in window) {


        if (name == "ondblclick" && obj.type == "table") {
          element.addEventListener(name.toLowerCase().substr(2), (e) => {

            if (e.target.localName == "th"
              || e.target.localName == "a"
              || e.target.localName == "input") return false;
            var selectedItem = $(element).data("kendoGrid").dataItem(e.target.parentNode);
            value(selectedItem)
          })

        } else if (name == "onclick" && obj.type == "table") {
          element.addEventListener(name.toLowerCase().substr(2), (e) => {

            if (e.target.localName == "th"
              || e.target.localName == "a"
              || e.target.localName == "input") return false;
            var selectedItem = $(element).data("kendoGrid").dataItem(e.target.parentNode);
            value(selectedItem)
          })
        } else {

          if (this.state.permission && typeof value == 'function') {
            element.addEventListener(name.toLowerCase().substr(2), value);
          } else {
           
            element.setAttribute(name, value);
          }

        }

      } else if (name.startsWith("on")) {
        if (name == 'onclickEl') {
          element.addEventListener("click", value.bind(null, element));
        } else {
          element.addEventListener(name.toLowerCase().substr(2), (e) => {
            console.log(e)
          })
        }

      } else if (name == 'data' && typeof value == 'object') {

        if (typeof value == "object") value = this.toStringUrl(value)

        element.setAttribute("data", value)

      } else if (name == 'callback') {

        value(this.state.callback)

      } else if (!misAttr.includes(name)) {

        if (typeof value == 'undefined') {
          console.warn(`${name} is a undefined`);
          return false;
        }


        if (typeof value == "object") value = JSON.stringify(value, function (key, value) {

          if (typeof value === 'function') {

            let setFunc = value.toString();

            // if(eval(`typeof setFunc === 'function'`)){ 
            //   console.log("function")
            // }else{
            //   console.log('not')
            // }
            return setFunc;

          } else {

            if (value != null) {
              if (typeof value.outerHTML != 'undefined') {
                return value.outerHTML;
              } else {
                return value;
              }
            }


          }
        })


        value && element.setAttribute(name, value.toString());
      }
    });

  }


  setLoadingForm = (element) => {

    // element.classList.add('loading-form')
    this.appendChild(element, this.CreateElement({
      element: "icon",
      attributes: ["loading"],
      style: {
        position: "absolute",
        top: "50%",
        left: "50%"
      },
      children: `
        <div class="loader">
          
          <div class="wrapper">
            <t>callapp</t>
            <span style="  background:#e9ab42;"></span>
            <span style="  background:#15a54e;"></span>
            <span style="  background:#bd4e9c"></span>
            <span style="  background:#e02548;"></span>
            <span style="  background:#3a559e"></span>
            <span style="  background:#2f9cd7"></span>
            <span style="  background:#78489b"></span>
            <span style="  background:#1d9693"></span>
           
          </div>
        </div>`,
    }))

  }

  removeLoading = () => {
    $("loading").fadeOut(400, function() { 
        // $(this).remove(); 
    })
  }


  setLoading = (where, prop = {}) => {

    let loadedForm = $('loading');
    
    if(loadedForm.length > 0){
      $(loadedForm).fadeIn();
    }else{
      $(where).hide().append(this.createLoadingForm()).fadeIn(100);
    }

  }

  createLoadingForm = () => {

    let loading = this.CreateElement({
      element: "loading",
      spinner: true
    })

    let loaderBoxBorder = this.CreateElement({
      element: "div",
      class: "loaderBoxBorder"
    })

    let loaderBox = this.CreateElement({
      element: "div",
      class: "loaderBox"
    })

    let loaderBoxCenter = this.CreateElement({
      element: "div",
      class: "loaderBoxCenter"
    })

    let loaderDiv = this.CreateElement({
      element: "div",
      class: "spinner-triple"
    })

    let callappImg =  this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/callapp.svg"
    })

    let loaderButton = this.CreateElement({
      element: "button",
      class: "loaderButton",
      text: "Cancel"
    })

    this.appendChild(loaderBoxCenter, loaderDiv)
    this.appendChild(loaderBoxCenter, callappImg)
    this.appendChild(loaderBox, loaderBoxCenter)
    // this.appendChild(loaderBox, loaderButton)

    this.appendChild(loaderBoxBorder, loaderBox)
    this.appendChild(loading, loaderBoxBorder)

    return loading

  }


  /**
   * NESTED APPEND CHILD FUNCTION
   * @param {*} parent 
   * @param {*} child 
   */
  appendChild = (parent, child) => {

    if (Array.isArray(child)) {
      child.forEach(nestedChild => this.appendChild(parent, nestedChild));
    }
    else {
      parent.appendChild(child.nodeType ? child : document.createTextNode(child));
    }
  };



  /**
   * SEND REQUEST
   * @param {*} data 
   * @param {Function} beforeSend 
   * @param {Function} success 
   */
  sendRequest = (data, beforeSend, success, noBefore = false) => {

    this.state.ajax = $.ajax({
      data: data,
      beforeSend: beforeSend,
      success: success
    })

  }

  getResponse = async (data) => {
    
    // SET REQUESETED DATA TO GLOBAL VARIABLE
    $.global.currentRequestData = data;

    this.state.ajax = $.ajax({
      data: data,
      success: (data) => this.state.ajax = data,
      error: (xhr, status, err) => this.state.ajax = err
    })

    return await this.state.ajax
  }

  /**
   * 
   * @param {*} data 
   * @param {Function} response 
   */
  sendFetchRequest = async (data, err) => {

    const response = await fetch("index.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(error => err = error)

    return response.json();

  }



  /**
   * 
   * @param {Array} arr 
   * @returns Response
   */
  removeFromArray = (arr, arg) => {

    var what, a = arg, L = a.length, ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }



  /**
   * @name Translator GEO -> LATIN
   * @param {String} str
   */
  geo_to_latin(str) {
    var ru = {
      ა: "a",
      ბ: "b",
      გ: "g",
      დ: "d",
      ე: "e",
      ვ: "v",
      ზ: "z",
      თ: "t",
      ი: "i",
      კ: "k",
      ლ: "l",
      მ: "m",
      ნ: "n",
      ო: "o",
      პ: "p",
      რ: "r",
      ს: "s",
      ტ: "t",
      უ: "u",
      ფ: "f",
      ქ: "q",
      ღ: "gh",
      ყ: "y",
      შ: "sh",
      ჩ: "ch",
      ც: "c",
      ძ: "dz",
      წ: "w",
      ჭ: "ch",
      ხ: "x",
      ჯ: "j",
      ჰ: "h",
      ჟ: "zsh",
      " ": "_",
      ".": "_",
      "/": "_",
      "*": "_",
      "=": "_",
      "+": "_",
    },
      n_str = [];
    for (var i = 0; i < str.length; ++i) {
      n_str.push(
        ru[str[i]] ||
        (ru[str[i].toLowerCase()] == undefined && str[i]) ||
        ru[str[i].toLowerCase()].replace(/^(.)/, function (match) {
          return match.toUpperCase();
        })
      );
    }
    return n_str.join("");
  }

  getSequence(template) {
    var r = "",
      ch,
      n;
    for (var i = 0; i < template.length; i++) {
      ch = template.substr(i, 1);
      if (ch == "n") {
        r += parseInt(Math.random() * 10);
      } else if (ch == "A") {
        r += String.fromCharCode(65 + parseInt(Math.random() * 26));
      } else if (ch == "e") {
        n = parseInt(Math.random() * 36);
        if (n > 9) {
          r += String.fromCharCode(55 + n);
        } else {
          r += n;
        }
      } else {
        r += ch;
      }
    }
    return r;
  }


  toStringUrl = (obj) => {

    return Object.entries(obj).map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');

  }

  getParam = (key) => {

    let url = new URL(location.href);

    return url.searchParams.get(key)

  }

toJsonUrl = (url) => {

    if (typeof url == "object") return false

    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
   
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      myJson[hash[0]] = decodeURIComponent(hash[1]);
    }

    return myJson;
    
  }


  // DELETE CHILDRENS 
  removeAllChildNodes = (parent) => {


    while (parent.firstChild) {

      if (parent.firstChild.localName == 'conv') {
        parent.firstChild.remove()
      }

    }

  }

  setSourceColor = (key, a = '1f') => {

    let color;

    switch (key) {
      case "phone":
        color = "#3eb868"
        break;
      case "chat":
        color = "#ff54b0"
        break;
      case "messenger":
        color = "#289bff"
        break;
      case "mail":
        color = "#d10000"
        break;
      case "skype":
        color = "#289bff"
        break;
      case "viber":
        color = "#6f56ed"
        break;
      case "videocall":
        color = "#3b9cad"
        break;
      case "whatsapp":
        color = "#3fb969"
        break;
      case "fbcomment":
        color = "#3f53b7"
        break;
      case "instagram":
        color = "#6f56ed"
        break;
      case "ussd":
        color = "#6f56ed"
        break;
    }


    if (typeof color != 'undefined') document.documentElement.style.setProperty('--source-color', color);
    if (typeof color != 'undefined') document.documentElement.style.setProperty('--source-bg', color + a);

  }


  spinner = function (obj = new Object()) {

    this.spinner = {
      element: '',
      create: () => {
        this.spinner.element = self.Helper.CreateElement({
          element: "span",
          style: {
            margin: "0 5px"
          },
          class: "fa-1x"
        }, self.Helper.CreateElement({
          element: 'i',
          class: "fas fa-slash fa-spin"
        }))
        return this.spinner.element
      },
      remove: () => {
        this.spinner.element.remove();
      }
    }

    this.spinner.create.bind(this)
    this.spinner.remove.bind(this)

  }



  // CREATE SOCKET CONNECTION

  Connection = function () {

    this.socket = new WebSocket(`ws://${$.socket.ip}:${$.socket.port}`)
    
    this.open = (e) => (this.socket.onopen = e)
    this.send = (e) => this.socket.send(e)

    this.onmessage  = this.socket.onmessage
    this.onerror    = this.socket.onerror
    this.onclose    = this.socket.onclose

  }


  /**
   * CREATE CUSTOM EVENT FOR ANY TARGET 
   * @param {String} event 
   * @param {*} data 
   * @param {object} prop 
   * @param  {...any} any 
   */
  _createEvent = function (event, data, prop = {}, ...any) {

    typeof prop.target == 'undefined' && (prop.target = document)
    typeof prop.parsed != 'undefined' && prop.parsed && (data = JSON.parse(data))

    prop.target.dispatchEvent(new CustomEvent(event, { detail: data }))

  }

  _isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return JSON.parse(str);
}


  getBaseLanguageData = async () => {

    let data = await this.getResponse({
      route: "getLanguage",
      act: "getBaseLanguageData",
      ns: "Helpers"
    })

    return data;

  }

}




