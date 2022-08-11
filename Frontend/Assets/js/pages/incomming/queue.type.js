import Tdg from "../../tdg.class.js";
import Input from "../../components/input/input.class.js";
import ChatPanel from "./chatPanel.type.js";
import WorkGround from "./workGround.type.js";


export default class Queue extends Tdg{

    constructor(prop){
        super();

        // SET Queue TO SELF
        self.Queue = this;

        this.state = {
            dom:  self.IncommingModal.state.dom,
            interface: this.CreateElement({
                element: "interface",
                attributes: ["Queue"]
            }),
            element: [],
            sources: [],
            queues: [],
            prop: prop,
            chatId: null,
            activeColor: ''
        }

    }

    /**
     * INITIALIZE Queue
     */
    init = async () => {

        await this.build()
        
        return this.state.interface

    }
    
    /**
     * BUILD Queue COMPONENTS
     * @returns {element} Queue COMPONENTS
     */
    build = async () => {

        // BUILD SOURCES
        this.append(this.state.interface, await this.buildSourceBlock())
        
        // BUILD QUEUES
        this.append(this.state.interface, await this.buildList())

        // BUILD TAKEN SECTION
        this.append(this.state.element.list, await this.createTakenSection())

        // BUILD WAITER SECTION
        this.append(this.state.element.list, await this.createWaiterSection())

        await this.buildSource();

    }



    /**
     * @returns {Element} SOURCE BLOCK ---------------------------------------------------------------
     */
    buildSourceBlock = async () => {
        this.state.element.source = this.CreateElement({
            element: "block",
            name: "source"
        })

        return this.state.element.source
    }
    

    buildSource = async () => {

        this.state.data = await this.getResponse({
            route: "source",
            act: "get",
            ns: "Helpers"})

        this.state.data.length > 0 && this.state.data.forEach(source => this.createSourceItem(source))

    }

    createSourceItem = async (source) => {
     
        let sourceEl = this.CreateElement({
            element: "icon",
            attributes: ["svg"],
            name: source.key,
            alt: source.name,
            dataset: {
                color: source.color
            },
            "source-id": source.id,
            children: `<svg viewBox="0 0 24 24" style="--fill: ${source.color}" width="24" height="24">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#${source.key}" />
                        </svg>`,
            onclick:  this.handleSourceClick
            
        })

        this.state.sources.push(sourceEl);
        this.append(this.state.element.source, sourceEl)

        if(source.key == this.state.prop.source){
            sourceEl.click();
            
            if(this.state.prop.source == 'phone') return false;
            
            this.getConverstation(this.state.prop);
        }

    }

    handleSourceClick = function() {

        self.Queue.state.element.source.childNodes.forEach(x => x.removeAttribute("active"))
        this.setAttribute("active", true);

        let key = this.getAttribute("name");
        let color = this.dataset.color;

        self.Helper.setSourceColor(key)
       
        self.Queue.state.activeColor = color

        self.Queue.state.queues.length > 0 && self.Queue.state.queues.forEach(x => x.remove())

        self.Queue.runSocket(key);

    }


    /**
     * @returns {Element} LIST BLOCK  ---------------------------------------------------------------
     */
    buildList = async () => {
        this.state.element.list = this.CreateElement({
            element: "block",
            name: "list"
        })

        // this.append(this.state.element.list, this.createSearchSection());

        return this.state.element.list
    }

    // SEARCH SECITON
    createSearchSection = () => {

        this.state.element.search = this.CreateElement({
            element: "div",
            name: "search",
            style: {
                display: "none"
            }
        })

        this.append(this.state.element.search, this.buildQueueSearch())

        return this.state.element.search
        
    }

    buildQueueSearch = () => {

        this.state.element.QueueSearch = this.CreateElement({
            element: "input",
            type: "text"
        })

        return this.state.element.QueueSearch;

    }

    // TAKEN SECTION
    createTakenSection = () => {

        this.state.element.taken = this.CreateElement({
            element: "div",
            name: "taken",
            children: this.CreateElement({
                element: "span",
                type: "title",
                text: "აქტიური",
                style: {
                    "background-color": "var(--source-bg)",
                    color: "var(--source-color)",
                    border: "1px dashed var(--source-color)"
                }
            })
        })

        return this.state.element.taken

    }
    

    // WAITER SECTION
    createWaiterSection = () => {

        this.state.element.waiter = this.CreateElement({
            element: "div",
            name: "waiter",
            children: this.CreateElement({
                element: "span",
                type: "title",
                text: "რიგი",
                style: {
                    backgroundColor: "var(--source-bg)",
                    color: "var(--source-color)",
                    border: "1px dashed var(--source-color)"
                }
            })
        })

        return this.state.element.waiter

    }

    buildQueueItem = (conv) => {
       
       let QueueItem = this.CreateElement({
                element: 'conv',
                aria: {
                    taken: conv.taken,
                    active: conv.active,
                    new: conv.newMessage
                },
                dataset: {
                    img: conv.imgUrl,
                    name: conv.name,
                    lastmessage: conv.lastMessage,
                    id: conv.id,
                    source: conv.sourceKey
                },
                actived: (conv.id == this.state.chatId ? true : false),
                onclick: (conv.sourceKey == 'phone' && conv.type == 'taken' ? this.getConverstation.bind(this, conv) : (conv.sourceKey != 'phone' ? this.getConverstation.bind(this, conv) : false) )

            }, 
            this.CreateElement({
                element: "img",
                name: "img",
                src: conv.imgUrl,
                alt: "no image",
                draggable: false
            }), 

            this.CreateElement({
                element: "div",
                name: "group-1"
            }, this.CreateElement({
                element:"span",
                name: "name",
                text: conv.name,
                title: conv.name,
                style: {
                    color: (conv.id == this.state.chatId ? "var(--source-color)" : '')
                }
            }),this.CreateElement({
                element: "span",
                name: "lastmessage",
                text: conv.lastMessage,
                title: conv.lastMessage
            })), 
            
            this.CreateElement({
                element: "div",
                name: "group-2"
            }, this.CreateElement({
                element: "span",
                name: "datetime",
                text: conv.lastDateTime
            }),
            this.CreateElement({
                element: "span",
                name: "newmessage",
                aria: {
                    status: conv.newMessage
                } 
            }))
        
        )

        this.state.queues.push(QueueItem);

        if(conv.type == "taken"){
            this.append(this.state.element.taken, QueueItem)
        }else if(conv.type == "waiter"){
            this.append(this.state.element.waiter, QueueItem)
        }else{
            console.warn("Type is not Vaild", conv)
        }
    }


    getConverstation = async (data, e) => {

        self.Queue.state.queues.length > 0 && self.Queue.state.queues.forEach(x => x.removeAttribute("actived"))

        if(e) e.currentTarget.setAttribute("actived", true)

        self.chatPanel && self.chatPanel.state.interface.remove()
        self.WorkGround && self.WorkGround.state.interface.remove()


        if(typeof data.sourceKey != 'undefined'){
            self.IncommingModal.state.id = data.incommingId;
            self.IncommingModal.state.source = data.sourceKey
            this.state.prop.id = data.incommingId;
            this.state.prop.source = data.sourceKey
        }

        if(data.chat_id){
            this.state.chatId = data.chat_id; 
            data.name = data.telefoni; 
        }else{
            this.state.chatId = data.id 
        }

        if(data.sourceKey !== 'phone' && data.source !== 'ussd'){
            this.append(this.state.dom, await new ChatPanel({ data: data, id: this.state.chatId, source: (typeof data.sourceKey == 'undefined' ? this.state.prop.source : data.sourceKey) }).init())
        }else{
            self.ChatPanel && self.ChatPanel.destroy();
        }

        this.append(this.state.dom, await new WorkGround(this.state.prop).init())

    }


    runSocket = async (key) => {
       
        // let spinner = new this.spinner()
        // let last = spinner.spinner.create();

        // this.append(self.Queue.state.element.waiter.childNodes[0], last);
      
        $.socket['incommingPanel'] && $.socket['incommingPanel'].interval && clearInterval($.socket['incommingPanel'].interval)
        $.socket['incommingPanel'] && $.socket['incommingPanel'].close();
        self.Queue.resetQueue();
        
        
        new this.Connection().open(function(e){

            $.socket['incommingPanel'] = this;
         
            // this.send(JSON.stringify({wsRoute: key, live: 'incommingPanel'}));
            $.socket['incommingPanel'].interval = setInterval(() => {
             
                this.send(JSON.stringify({ route: 'Queue', act: 'getQueue', source: key, userId: $.global.user.id }));
            }, 1000)
            
            this.onmessage = (e) => {
                // last .remove()
                let data = JSON.parse(e.data)

                let result = data.result;
            
                self.Queue.resetQueue();

                let counts = {
                        taken: 0,
                        waiter: 0
                }

                typeof result != 'undefined' && result != null &&  result.length > 0 && result.forEach(item => {
                    counts[item.type] += 1;

                    self.Queue.state.element.taken.childNodes[0].setAttribute("data-count", counts.taken)
                    self.Queue.state.element.waiter.childNodes[0].setAttribute("data-count", counts.waiter)

                    self.Queue.buildQueueItem(item)
                })


                
            }
        })


    }

    resetQueue = () => {

        this.state.queues.length > 0 && this.state.queues.forEach(x => x.remove())


        self.Queue.state.element.taken.childNodes[0].setAttribute("data-count", 0)
        self.Queue.state.element.waiter.childNodes[0].setAttribute("data-count", 0)

    }



}