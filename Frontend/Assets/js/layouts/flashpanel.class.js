
import Tdg from "../tdg.class.js";
import Helper from "../helpers/helper.class.js";
import { PhoneTakenHead, PhoneWaiterHead } from "./livepanel/phone.type.js";
import { chatTakenHead, chatWaiterHead } from "./livepanel/chat.type.js";
import { mailTakenHead, mailWaiterHead } from "./livepanel/mail.type.js";
import { ussdTakenHead, ussdWaiterHead } from "./livepanel/ussd.type.js";
import { jorkoTakenHead, jorkoWaiterHead } from "./livepanel/jorko.type.js";

export default class Flashpanel extends Tdg {

    constructor(props){
        super();

        self.Flashpanel = this;

        this.state = {
            dom: document.querySelector("section[content]"),
            element: [],
            interface: this.CreateElement({
                element: "interface",
                attributes: ["flashpanel"]
                
            }),
            content: this.CreateElement({
                element:"interface",
                attributes: ["flashpanel-content", "hidden"],
                // style: {
                //     right: "-9999px"
                // }
            }),
            fieldset: [],
            table: [],
            build: [],
            tableData: {},
            tableSort: [],
            status: false,
            filter: [],
            filterOpen: false,
            labelText: '',
            fp: {
                status: false,
                element: ''
            },
            counts: {
                phone: 2
            },
            ...props
        }

    }

    init = async () => {

        // await this.build(); 

        this.state.dom.insertBefore(this.state.interface, this.state.dom.lastChild)
        this.state.dom.insertBefore(this.state.content, this.state.dom.lastChild)
        
        
    }

    build = async () => {

        this.buildSource().then(() => {


            $.global.fp = new this.Connection();

            $.global.fp.open((e) => {

                e.target.send(JSON.stringify({wsRoute: "counts", live: 'flashPanel'}));

                e.target.onmessage = (e) => {

                    let data = JSON.parse(e.data)
                    
                    data.result.forEach(x => {
                        
                        if(x.value != 0 && typeof this.state.element[x.source] != 'undefined'){
                            this.state.count = x.value
                        }else{
                            this.state.count = '';
                        }
                        
                        typeof this.state.element[x.source] != 'undefined' && 
                        this.state.element[x.source].setAttribute('data-count', this.state.count)

                    })

                }
                
            })


        })

    }

  

    /**
     * CREATE ICON FOR FLASHPANEL
     * @param {*} dataObj 
     */
    createSourceItem = (source) => {
        
        this.state.element[source.key] = this.CreateElement({
            element: "icon",
            attributes: ["svg"],
            "data-count": '',
            children: `<svg viewBox="0 0 32 32" width="32" height="32">
                            <use xlink:href="Frontend/Assets/images/icons/sources/source.svg#${source.key}-o" />
                        </svg>`,
            onclick: function() {
                if(this.hasAttribute("actived")){
                    self.Flashpanel.hideFP(this, source);
                }else{

                    if(self.Flashpanel.state.fp.status){
                        self.Flashpanel.hideFP(this, source);
                    }

                    self.Flashpanel.showFP(this, source);
                }
                
            }
        })

        this.append(this.state.interface, this.state.element[source.key])
    }

    hideFP = (e, source) => {

        this.state.fp.status = false;
        this.state.fp.element.removeAttribute("actived");
        typeof this.state.element.blur != "undefined" && this.state.element.blur.remove()
        this.state.content.style.display = "none"
        
        typeof this.state.fieldset.taken != "undefined" && this.state.fieldset.taken.remove()
        typeof this.state.fieldset.waiter != "undefined" && this.state.fieldset.waiter.remove()

        $.socket.table[this.state.fp.taken] && $.socket.table[this.state.fp.taken].send(JSON.stringify({removeLoop: this.state.fp.taken}))
        $.socket.table[this.state.fp.waiter] && $.socket.table[this.state.fp.waiter].send(JSON.stringify({removeLoop: this.state.fp.waiter}))



    }

    showFP = (e, source) => {

        this.state.fp.taken && $.socket.table[this.state.fp.taken].send(JSON.stringify({removeLoop: this.state.fp.taken}))
        this.state.fp.waiter && $.socket.table[this.state.fp.waiter].send(JSON.stringify({removeLoop: this.state.fp.waiter}))

        this.state.fp = {
            status: true,
            element: e,
            taken: `${source.key}Taken`,
            waiter: `${source.key}Waiter`
        }

        e.setAttribute("actived", true)
        this.setBlur(this.state.dom);
        this.state.content.style.display = "grid"
        $(this.state.content).show(200, "swing")
        this.buildFieldSet(source);

    }

    setBlur = (dom) => {
        this.state.element.blur = this.CreateElement({
            element: "overflow",
            type: "blur"
        })

        dom.insertBefore(this.state.element.blur, dom.lastChild)
    }
    removeBlur = () => {
        document.querySelector("overflow[type='blur']").remove();
    }

    /**
     * GET SOURCE DATA
     */
    buildSource = async () => {

        this.state.data = await this.getResponse({
                            route: "source",
                            act: "get",
                            ns: "Helpers"
                        })
                    
        this.state.data.length > 0 && this.state.data.forEach(source => this.createSourceItem(source))
    }

       /**
     * 
     * @returns SOURCES
     */
        getSource = () => {

            let sources = this.getResponse({
                route: "source",
                act: "get",
                ns: "Helpers"
            })
    
            return sources
    
        }



    /************************************************************************************************ */


    buildFieldSet = async (source) => {
        
        switch (source.key){
            case "phone":
                source.taken = PhoneTakenHead(this.state)
                source.waiter = PhoneWaiterHead(this.state)
            break;
            case "chat":
                source.taken = chatTakenHead(this.state)
                source.waiter = chatWaiterHead(this.state)
            break;
            case "messenger":
                source.taken = chatTakenHead(this.state)
                source.waiter = chatWaiterHead(this.state)
            break;
            case "mail":
                source.taken = mailTakenHead(this.state)
                source.waiter = mailWaiterHead(this.state)
            break;
            case "ussd":
                source.taken = ussdTakenHead(this.state)
                source.waiter = ussdWaiterHead(this.state)
            break;
            case "jorko":
                source.taken = jorkoTakenHead(this.state)
                source.waiter = jorkoWaiterHead(this.state)
            break;
        }

        // this.TableSocket(source)

        source.type = 'taken';
        await this.buildTakenFieldSet(source)
        source.type = 'waiter';
        await this.buildWaiterFieldSet(source)

    }

    /************************************************************************************************ */
    

    /**
     * Create FieldSet Element
     * @param {String} name 
     * @param {String} title 
     * @returns 
     */
    buildTakenFieldSet = async (source) => {

        typeof this.state.fieldset.taken != "undefined" && this.state.fieldset.taken.remove()
        this.state.fieldset.taken = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            name: "taken",
            "data-title": this.state.langData.TAKEN_APPLY
        })

        this.append(this.state.content, this.state.fieldset.taken)
        
        this.state.table.taken = this.buildTable(source)


        this.append(this.state.fieldset.taken, this.state.table.taken) 

    }

    buildWaiterFieldSet = (source) => {

        typeof this.state.fieldset.waiter != "undefined" && this.state.fieldset.waiter.remove()
        this.state.fieldset.waiter = this.CreateElement({
            element: "div",
            name: "waiter",
            "data-title": this.state.langData.IN_QUEUE,
            attributes: ["fieldset"]
        })

        this.append(this.state.content, this.state.fieldset.waiter)

        this.state.table.waiter = this.buildTable(source)

        this.append(this.state.fieldset.waiter, this.state.table.waiter) 

    }

    /************************************************************************************************ */


    buildTable = (source) => {
        
        this.state.build[source.key+source.type] = this.CreateElement({
            element: "table",
            name: source.key
        })

        this.append(this.state.build[source.key+source.type], source[source.type].head)
        // this.append(this.state.build[source.key+source.type], source[source.type].search)

        
        this.state.build[source.key+source.type].body = this.CreateElement({
            element: "tbody"
        })

       


        let type = source.type;
        
        document.addEventListener(`on${source.key + source.type}`, (data) => {
           
            // EMPTY TABLE
            this.state.build[source.key+type].body.innerHTML = ''
            this.state.tableData[source.key+type] = data.detail.result;
            let tableArray = [];

            // CHECK IF ARRAY IS NOT NULL
            if(!this.state.tableData[source.key+type]) return false;

            if(this.state.filter[source.key+type]){
                var obj = this.state.filter[source.key+type]
                    let tempArr = [];
                    this.state.tableData[source.key+type].filter((arr, i) => {

                        if(obj.field == 'astNumber'){
                            obj.field = 'account.text'
                        }
                        if(obj.field == 'queue'){
                            obj.field = 'exten'
                        }

                        let searchedValue = this.getDescendantProp(arr, obj.field);
                        if(obj.value){
                           
                            obj.value.map((i, x) => {
                                
                                if(searchedValue == null) return false

                                if(searchedValue.includes(x.value)){
                                    tempArr.push(arr)
                                }
                            })
                        }

                    })
                    if(tempArr.length != 0)
                        tableArray = tempArr;
                    else
                        tableArray = this.state.tableData[source.key+type];
               
            }else{
                tableArray = this.state.tableData[source.key+type];
            }

            if(this.state.tableSort[source.key+type]){
                tableArray = tableArray.sort(this.sortByProperty(this.state.tableSort[source.key+type].column.field, this.state.tableSort[source.key+type].sortBy))
            }

            // ITERATE DATA
            tableArray && tableArray.map((x, i) => 
            {
                
                data = this.template(x, source.key+type, i + 1)

                this.append(this.state.build[source.key+type].body, data);
            })
        })

        this.append(this.state.build[source.key+source.type], this.state.build[source.key+source.type].body)

        return this.state.build[source.key+source.type];

    }

    template = (data, type, count) => {
        
        let template;

        switch(type){
            case "phonewaiter":

                template = this.CreateElement({
                    element: "tr",
                    children: () => {

                        

                        return `
                        
                            <td name="id">
                                ${count}
                            </td>
 
                            <td name="exten">
                                ${data.exten}
                            </td>

                            <td name="number">
                                ${data.number}
                            </td>
                            <td name="number">
                                ${data.incomming_author}
                            </td>

                            <td name="comment">
                                ${data.comment}
                            </td>

                            <td name="time">
                                ${data.time}
                            </td>

                        `

                    },
                    onclick: () => {
                        console.log("HI")
                    }
                })



            break;
            case "phonetaken":

                template = this.CreateElement({
                    element: "tr",
                    children: () => {

                        let sources = '';

                        data.sources.forEach(x => {
                            if(x == '') return false;
                            sources += `<icon fpsvg data-count="0"><svg viewBox="0 0 20 20" key="${x}" style="--fill: ${data.status == 'busy' ? 'var(--red)' : data.status == 'ringing' ? 'var(--orange)' : data.status == 'onhold' ? 'var(--orange)' : 'var(--green)'} " width="20" height="20">
                                                     <use xlink:href="Frontend/Assets/images/icons/icons.svg#${x}" />
                                                 </svg></icon>`
                        })

                        let author = '<div class="customer">';


                        if(data.author.number.text){
                            if(data.author.number.name){
                                author += `<span>${data.author.number.name}</span>`;
                                author += `<pn>${data.author.number.name}</pn>`;
                            }else{
                                author += `<span class="name" title="${data.author.number.text}">${data.author.number.text}</span>`;
                            }
                        }

                        author += "</div>";

                        let Org = '';

                        if(data.account.icon){
                            Org = `<img title='${data.account.text}' alt='${data.account.text}' src='Frontend/Uploads/icons/${data.account.icon}' />`
                        }else{
                            Org = data.account.text
                        }


                        let lang = '';

                        if(data.account.lang){
                            lang = `<span>${data.account.lang}</span>`;
                        }

                        return `
                                <td class="operator" name="operator">
                                    <div>
                                        ${data.operator.avatar == null || data.operator.avatar == ''
                                            ? (data.operator.avatar == '' ? '' : `<img class="avatar" src="Frontend/Assets/images/no-image.png" />`)
                                            : `<img class="avatar" src="Frontend/Uploads/avatars/${data.operator.avatar}" />`
                                        }
                                        
                                        <span class="name" style="text-overflow: ellipsis; overflow: hidden">${data.operator.text}</span>
                                        <span class="extension" style="background-color: ${data.operator.extension.background}; color: ${data.operator.extension.foreground}">${data.operator.extension.text}</span>
                                    </div>
                                </td>
                                
                                <td name="account"><div>${Org} ${lang}</div></td>
                                <td class="source"><div>${sources}</div></></td>

                                
                                <td class="author" ${!data.author.number.text ? `style="display: table-cell"` : ''}>
                                    ${author}
                                </td> 

                                <td class="duration">
                                    <div>
                                        <span title="${data.status} - ${data.callType}" class="count">${data.duration != '00:00' ? data.duration : ''} </span>
                                        ${data.callType != null ? `
                                        <svg viewBox="0 0 20 20" style="--stroke: ${data.status == 'busy' ? 'var(--red)' : data.status == 'ringing' ? 'var(--orange)' : data.status == 'onhold' ? 'var(--orange)' : ''}" width="20" height="20">
                                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#${data.callType}" />
                                        </svg>` : ''}
                                    </div>
                                </td>

                            `
                        
                    },
                })

            break;
            case "messengerwaiter":
            case "chatwaiter": 
            case "jorkowaiter":
                

            template = this.CreateElement({
                element: "tr",
                children: () => {

                    return `
                    
                        <td>${data.id}</td>
                        <td>${data.account}</td>
                        <td>${data.sender_name}</td>
                        <td>${data.comment}</td>
                        <td>${data.duration}</td>
                    
                    
                    `


                },
                onClick: () => {

                    this.setLoading(this.state.content)

                    this.getRequestId(data.chat_id).then(response => {
                       
                        self.Incomming.tableDblClickHandler({ source: type.replace('waiter', ''), id: response.id, telefoni: response.name, chat_id: data.chat_id });
                        this.removeLoading()
                    });

                    
                }
            })

            break;
            case "ussdtaken":

                template = this.CreateElement({
                    element: "tr",
                    children: () => {
                       
                        let sources = '';

                        // data.sources.forEach(x => {
                        //     if(x == '') return false;
                           
                        //     sources += `<icon fpsvg data-count=""><svg viewBox="0 0 20 20" key="${x}" style="--fill: ${data.status == 'busy' ? 'var(--red)' : data.status == 'ringing' ? 'var(--orange)' : data.status == 'onhold' ? 'var(--orange)' : 'var(--green)'} " width="20" height="20">
                        //                              <use xlink:href="Frontend/Assets/images/icons/icons.svg#${x}" />
                        //                          </svg></icon>`
                        // })


                        let author = '<div>';
    
                            if(!data.author.avatar){
                                if(data.author.text){
                                    author += `<img class="avatar" src="Frontend/Assets/images/no-image.png" />`;
                                }
                            }else{
                                author += `<img class="avatar" src="${data.author.avatar}" />`;
                            }
    
                            if(data.author.text){
                                author += `<span class="name" title="${data.author.text}">${data.author.text}</span>`;
                            }
    
                            author += "</div>";
    
    
                        return `
                        
                            <td class="operator">
                                <div>
                                    ${data.operator.text != null ? !data.operator.avatar  ?
                                        `<img class="avatar" src="Frontend/Assets/images/no-image.png" />`
                                    : 
                                        `<img class="avatar" src="${data.operator.avatar}" />`
                                    : ''
                                    }
                                    <span class="name">${data.operator.text != null ? data.operator.text : ''}</span>
                                </div>
                            </td>
                            <td class="source"><div> 
                                <svg viewBox="0 0 20 20" key=${data.sourceKey} width="20" height="20">
                                    <use xlink:href="Frontend/Assets/images/icons/icons.svg#${data.sourceKey}" />
                                </svg>
                            </div></></td>
                            <td class="source"><div>${sources}</div></></td>
                            </td>
                            <td class="duration">
                                <span class="count">${data.duration}</span>
                            </td>
                            <td class="author">
                                <div>
                                    ${author}
                                </div>
                            </td>
                        
                        
                        `
    
    
                    },
                    onclick: () => {
                        
                        this.setLoading(this.state.content)
    
                        self.Incomming.tableDblClickHandler({ source: type.replace('taken', ''), id: data.id, chat_id: data.ussd_id });
                       
                        this.removeLoading()
    
                    }
                })


            break;
            case "mailtaken":
            case "messengertaken":
            case "chattaken":
            case "jorkotaken":


            template = this.CreateElement({
                element: "tr",
                children: () => {

                    let author = '<div>';

                        if(!data.author.avatar){
                            if(data.author.text){
                                author += `<img class="avatar" src="Frontend/Assets/images/no-image.png" />`;
                            }
                        }else{
                            author += `<img class="avatar" src="${data.author.avatar}" />`;
                        }

                        if(data.author.text){
                            author += `<span class="name" title="${data.author.text}">${data.author.text}</span>`;
                        }

                        author += "</div>";


                    return `
                    
                        <td class="operator">
                            <div>
                                ${data.operator.text != null ? !data.operator.avatar  ?
                                    `<img class="avatar" src="Frontend/Assets/images/no-image.png" />`
                                : 
                                    `<img class="avatar" src="${data.operator.avatar}" />`
                                : ''
                                }
                                <span class="name">${data.operator.text != null ? data.operator.text : ''}</span>
                            </div>
                        </td>
                        <td>
                        <div><span class="account" style="background-color: ${data.account.foreground}1f; color: ${data.account.foreground}" title="${data.account.text}">${data.account.text}</span></div>
                        </td>

                        <td class="source"><div> 
                            <svg viewBox="0 0 20 20" key=${data.sourceKey} width="20" height="20">
                                <use xlink:href="Frontend/Assets/images/icons/icons.svg#${data.sourceKey}" />
                            </svg>
                        </div></></td>
                        </td>
                        <td class="duration">
                            <span class="count">${data.duration}</span>
                        </td>
                        <td class="author">
                            <div>
                                ${author}
                            </div>
                        </td>
                        <td class="author">
                            <div>
                                
                            </div>
                        </td>
                    
                    
                    `


                },
                onclick: () => {
                    
                    this.setLoading(this.state.content)

                    self.Incomming.tableDblClickHandler({ source: type.replace('taken', ''), id: data.id, telefoni: data.author.text, chat_id: data.chat_id });
                   
                    this.removeLoading()

                }
            })

            break;
            case "mailwaiter":
                

                template = this.CreateElement({
                    element: "tr",
                    children: () => {

                        return `
                        
                            <td>${data.id}</td>
                            <td></td>
                            <td>${data.sender_name}</td>
                            <td></td>
                            <td>${data.duration}</td>
                        
                        `

                    },
                    onclick: () => {
                    
                        this.setLoading(this.state.content)
    
                        self.Incomming.tableDblClickHandler({ source: type.replace('waiter', ''), id: data.id, telefoni: data.sender_name, mail_id: data.chat_id });
                       
                        this.removeLoading()
    
                    }
                })
            break;
            case "ussdwaiter":
                

                template = this.CreateElement({
                    element: "tr",
                    children: () => {

                        return `
                        
                            <td>${data.id}</td>
                            <td>${data.sender_phone}</td>
                            <td>${data.sender_name}</td>
                            <td>${data.duration}</td>
                        
                        `

                    },
                    onclick: (e) => {
                        this.setLoading(this.state.content)

                        self.Incomming.tableDblClickHandler({ source: 'ussd', id: data.incomming_id, chat_id: data.ussd_id });
                    
                        self.Tdg.getResponse({
                            route: "Ussd",
                            act: "ChangeToTaken",
                            id: data.ussd_id
                        }).then((e)=>{
                            this.removeLoading()
                        });
                        

                    }
                })

            break;
  
        
        }

        return template;
    }
    




    getRequestId = async (chatId) => await this.getResponse({ route: "queue", act: "getRequestId", ns: "Helpers", chat_id: chatId})

    









    /************************************************************************************************ */


    TableSocket = (source) => {


        // WAITER
        $.socket.table[this.state.fp.waiter] = new this.Connection();
        $.socket.table[this.state.fp.waiter].open((e) => {
            
            e.target.onmessage = function (e) {
                var data = JSON.parse(e.data);
                if(!data) return false;
                new Helper()._createEvent(`on${source.key}waiter`, data, {parsed: false})

            };

            e.target.send(JSON.stringify({
                wsRoute: `${source.key}Waiter`,
                live: "flashPanel"
            }));
        });


        // TAKEN
        $.socket.table[this.state.fp.taken] = new this.Connection();
        $.socket.table[this.state.fp.taken].open((e) => {
            
            e.target.onmessage = function (e) {
                var data = JSON.parse(e.data);
                if(!data) return false;
                new Helper()._createEvent(`on${source.key}taken`, data, {parsed: false})

            };

            e.target.send(JSON.stringify({
                wsRoute: `${source.key}Taken`,
                live: "flashPanel"
            }));
        });



    }

}