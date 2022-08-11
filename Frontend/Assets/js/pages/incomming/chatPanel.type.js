import Input from "../../components/input/input.class.js";
import Uploader from "../../components/uploader/uploader.class.js";
import { selectize_SelectedValue } from "../../helpers/seletize.helper.js";
import Tdg from "../../tdg.class.js";
import sendMessage from "./sendMessage.class.js";

export default class ChatPanel extends Tdg {

    constructor(prop) {
        super();

        self.chatPanel = this;

        this.state = {
            interface: this.CreateElement({
                element: "interface",
                attributes: ["chatpanel"]
            }),
            element: [],
            header: [],
            body: [],
            footer: [],
            prop: prop,
            connection: '',
            requestData: [],
            messagesArr: [],
            showmorearea: [],
            files: []
        }

    }

    /**
     * INITIALIZE CHATPANEL 
     */
    init = async () => {

        await this.build();

        return this.state.interface;

    }

    /**
     * BUILD CHATPANEL COMPONENTS
     */
    build = async () => {

        this.append(this.state.interface, await this.createChatHead().then((header) => { this.buildChatHead(); return header }))
        this.append(this.state.interface, await this.createChatBody())
        this.append(this.state.interface, await this.createChatFooter().then((footer) => { this.buildChatFooter(); return footer }))

        await this.fetchData();

    }

    fetchData = async () => {

        this.state.connection = new this.Connection();
        this.state.connection.socket.onopen = (e) => {
           
            var chat_id = this.state.prop.data.mail_id > 0 ? this.state.prop.data.mail_id : this.state.prop.id;
            
            e.target.send(JSON.stringify({ route: "Chats", act: "fetchMessages", chat_id: chat_id, source: this.state.prop.source }))

            e.target.onmessage = (e) => {
                let data = JSON.parse(e.data)
               
                let result = data.result
                if (!result.length) return false;
                result.forEach((x, i) => {
                    if(this.state.prop.source == 'mail'){
                        this.buildMailMessage(x)
                    }else{
                        this.buildMessage(x)
                    }
                    this.state.detail_id = x['id'];

                    if(x.type == 'client'){
                        this.state.header.name.innerText = x['name'];
                    }
                })

                this.state.body.scrollTop = this.state.body.scrollHeight

                setInterval(() => {

                    e.target.send(JSON.stringify({ route: "Chats", act: "getMessages", chat_id: chat_id, source: this.state.prop.source, detail_id: this.state.detail_id }))

                }, 1000)

            }
        }

    }


    // DESTROY CHAT PANEL
    destroy = () => {

        this.state.interface.remove()

    }


    createChatHead = async () => {

        this.state.header = this.CreateElement({
            element: "chatHead"
        })

        return this.state.header;

    }

    buildChatHead = () => {

        this.state.header.name = this.CreateElement({
            element: "span",
            name: "name"
        })

        this.state.header.icons = this.CreateElement({
            element: "span",
            name: "icons"
        }, this.CreateElement({
            element: "icon",
            attributes: ["svg"],
            actived: true,
            name: "current",
            title: "ჩატი",
            style: {
            },
            children: `<svg viewBox="0 0 16 16" width="14" height="14">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg" />
                        </svg>`
        }), this.CreateElement({
            element: "icon",
            attributes: ["svg"],
            name: "history",
            title: "ისტორია",
            children: `<svg viewBox="0 0 16 16" width="14" height="14">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#tab-history" />
                        </svg>`
        }))

        this.state.header.toggle = this.CreateElement({
            element: "span",
            attributes: ["svg"],
            name: "toggle",
            children: `<svg viewBox="0 0 24 24" width="24" height="24">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#arrow-right" />
                        </svg>`,
            onclick: this.handleChatToggle
        })

        this.state.header.whois = this.CreateElement({
            element: "span",
            name: "whois",
            "grid-column": "3"
        })

        this.append(this.state.header, this.state.header.name)
        this.append(this.state.header, this.state.header.icons)
        this.append(this.state.header, this.state.header.toggle)
        this.append(this.state.header, this.state.header.whois)

    }

    handleChatToggle = function (e) {
        e.preventDefault()

        this.toggleAttribute("actived")

        if (this.hasAttribute("actived")) {
            self.WorkGround.state.interface.style.display = "none"
            self.chatPanel.state.interface.style.width = "auto"
            self.chatPanel.state.interface.setAttribute("grid-column", 2)
        } else {
            self.WorkGround.state.interface.style.display = ""
            self.chatPanel.state.interface.style.width = ""
            self.chatPanel.state.interface.removeAttribute("grid-column")
        }
    }

    createChatBody = async () => {

        this.state.body = this.CreateElement({
            element: "chatBody"
        })

        return this.state.body;
    }

    createMessageReplayArea = (e, data) => {
        if (e.target.getAttribute("aria-open")) {

            let replayarea = this.CreateElement({
                element: "div",
                class: "ReplayArea"
            }, this.CreateElement({
                element: "p",
                onclick: () => {
                    this.state.footer.address.style.display = "flex";
                    this.destroyMessageReplayArea(e);
                    this.replayAll(data)
                },
                text: "Replay All"
            }), this.CreateElement({
                element: "p",
                onclick: () => {
                    this.destroyMessageReplayArea(e);
                    this.forward(data)
                },
                text: "Forward"
            }))

            if (e.target.getAttribute("aria-open") == "false") {
                e.target.setAttribute("aria-open", "true");
                this.append(e.target, replayarea);

            } else {
                this.destroyMessageReplayArea(e);
            }

        }

    }

    destroyMessageReplayArea = (e) => {
        e.target.setAttribute("aria-open", "false");
        e.target.innerHTML = "";
    }

    replayAll = (data) => {
        if(data.detail[0].cc){
            data.detail[0].cc = data.detail[0].cc.split(",");

            var $select = $(this.state.ccinput.children[0]).selectize({
                persist: false,
                createOnBlur: true,
                create: true,
            });
    
            var selectize = $select[0].selectize;
            data.detail[0].cc.forEach(value => {
                selectize.addOption({value: value, text: value});
            });
            
            selectize.refreshOptions();
        }

        if(data.detail[0].bcc){
            data.detail[0].bcc = data.detail[0].bcc.split(",");

            var $select = $(this.state.bccinput.children[0]).selectize({
                persist: false,
                createOnBlur: true,
                create: true,
            });
    
            var selectize = $select[0].selectize;
            data.detail[0].bcc.forEach(value => {
                selectize.addOption({value: value, text: value});
            });
            selectize.refreshOptions();
        }

        this.state.footer.editor.innerHTML = this.state.messagesArr[data.id].innerHTML;
        this.state.files = data.files;
    }

    forward = (data) => {
        this.state.footer.editor.innerHTML = this.state.messagesArr[data.id].innerHTML;
        this.state.files = data.files;
    }

    buildMailMessage = (data, forwarded = false) => {
        if (data.forwarded == '1') {
            forwarded = true;
        }

        this.state.messagesArr[data.id] = this.CreateElement({
            element: "span",
            name: "message",
            'type': data.type == "client" ? "true" : "false",
            text: data.message
        })

        let message = this.CreateElement({
            element: "message",
            type: data.type
        }, this.CreateElement({
                element: "avatar",
                children: `<img name"avatar" src=${data.avatar} />`
            }), 
            this.CreateElement({
                element: "content"
            }, this.CreateElement({
                element: "span",
                name: "name",
                text: data.name,
                children: ` <i class="fas fa-chevron-down showmore"></i>`,
                onclick: () => {
                    this.showMore(data.id);
                }
                }), 
                this.CreateElement({
                    element: "span",
                    name: "datetime",
                    text: data.datetime.slice(-8)
                }), 
                this.CreateElement({
                    element: "span",
                    name: "option",
                    'aria-open': "false",
                    onclick: (e) => {
                        this.createMessageReplayArea(e, data);
                    },
                    class: "k-icon k-i-more-vertical"
                }), 
                (this.state.prop.source == 'mail' ? this.createShowMoreArea(data) : ''), 
                this.state.messagesArr[data.id], 
                this.CreateElement({
                    element: "span",
                    text: forwarded ? "-- Forwarded" : ""
                })
            )
        )


        if (data.files) {
            let content = this.CreateElement({
                element: "div",
                id: "filesDiv"
            });

            this.state.messageattachments = data.files;

            this.append(this.state.messagesArr[data.id], content);

            this.findImages(this.state.messagesArr[data.id]);
            data.files != null && data.files.forEach(o => {
                let file = this.CreateElement({
                    element: "a",
                    href: o.url + o.hashedName,
                    target: "_blank",
                    text: o.realName,
                    id: "file"
                })

                this.append(content, file);
            })



        }

        this.append(this.state.body, message)

    }

    buildMessage = (data) => {

        let message = this.CreateElement({
            element: "message",
            type: data.type
        }, this.CreateElement({
            element: "avatar",
            children: `<img name"avatar" src=${data.avatar} />`
        }), this.CreateElement({
            element: "content"
        }, this.CreateElement({
            element: "span",
            name: "name",
            text: data.name
        }), this.CreateElement({
            element: "span",
            name: "datetime",
            text: data.datetime.slice(-8)
        }), this.CreateElement({
            element: "span",
            name: "option",
            class: "k-icon k-i-more-vertical"
        }), this.CreateElement({
            element: "span",
            name: "message",
            text: data.message
        })))

        this.append(this.state.body, message)

    }

    showMore = (id) => {
        var display = this.state.showmorearea[id].style.display;
    
        if(display == "none" || display == ""){
            this.state.showmorearea[id].style.display = "block";
        }else{
            this.state.showmorearea[id].style.display = "none";
        }
    }

    createShowMoreArea = (data) => {
        this.state.showmorearea[data.id] = this.CreateElement({
            element:"div",
            class:"showmorearea",
            style:{
                position:"relative"
            }
        },this.CreateElement({
            element:"div",
        },this.CreateElement({
            element:"p",
            children:"From: " + (data.detail[0].from != null ? data.detail[0].from : "")
        }),this.CreateElement({
            element:"p",
            children:"To: " + (data.detail[0].to != null ? data.detail[0].to : "")
        }),this.CreateElement({
            element:"p",
            children:"Subject: " + data.detail[0].subject
        }),this.CreateElement({
            element:"p",
            children:"Cc: " + (data.detail[0].cc != null ? data.detail[0].cc : "")
        }),this.CreateElement({
            element:"p",
            children:"Bcc: " + (data.detail[0].bcc != null ? data.detail[0].bcc : "")
        })))

        return this.state.showmorearea[data.id];
    }

    findImages = (element) => {
        if (element.childNodes.length > 0) {
            element.getAttribute("type") == "true" ? "" : false;
            var index = 0;
            element.childNodes.forEach(el => {
                this.findImages(el);
                if (el.tagName == 'IMG') {
                    if (this.state.messageattachments.length == 1) {
                        el.src = this.state.messageattachments[0].url + this.state.messageattachments[0].hashedName;
                    } else {
                        this.state.messageattachments.forEach(o => {
                            if (el.src.indexOf(o.realName) >= 0) {
                                el.src = o.url + o.hashedName;
                            } else {
                                if (el.src.indexOf('cid:') >= 0) {
                                    element.children[index].setAttribute("index", index);
                                    element.children[index].src = this.state.messageattachments[index].url + this.state.messageattachments[index].hashedName;
                                    index += 1;
                                }
                            }
                        })
                    }

                }
            })
        }
    }

    createChatFooter = async () => {

        this.state.footer = this.CreateElement({
            element: "chatFooter"
        })

        return this.state.footer;

    }

    buildChatFooter = async () => {

       

        var obj = new Array();

        var template = await this.getResponse({
            route: "Incomming",
            act: "getChatTemplate"
        })

        template.forEach((x) => {
            obj.push({ label: x.name, value : x.comment, id: x.id });
            // obj.push(x.comment);
        })

        this.state.footer.editor = this.CreateElement({
            element: "editor",
            name: "chat",
            contenteditable: true,
            onkeyup: (e) => {
                if (e.keyCode == 13) {
                    if (!e.shiftKey) {
                        e.preventDefault();
                        this.handleSendMessage();
                    }
                }
            },
            onkeydown: (e) => {
                if (e.keyCode == 13) {
                    if (e.shiftKey) {

                        return false
                    } else {
                        e.preventDefault();
                    }
                    // if(this.state.footer.editor.innerHTML == '') return false;
                }
            }
        })

        $(this.state.footer.editor).autocomplete({
            source: obj,
            select:function (event,ui) {
                
                $(this).val(ui.item.value);
               
             }
        });


        this.state.forwardinput = new Input({
            type: "selectize",
            placeholderTitle: "forward",
            class: "forward"
        }).build()


        this.state.footer.forward = this.CreateElement({
            element: "div",
            name: "fordward"
        }, this.state.forwardinput)

        this.state.ccinput = new Input({
            type: "selectize",
            placeholderTitle: "cc",
        }).build()

        this.state.bccinput = new Input({
            type: "selectize",
            placeholderTitle: "bcc",
        }).build()

        this.state.footer.address = this.CreateElement({
            element: "div",
            name: "address"
        }, this.state.ccinput, this.state.bccinput)

        this.state.ccbccicon = this.CreateElement({
            element: "span",
            text: "cc/bcc",
            style: {
                width: "200px"
            },
            style: {
                cursor: 'pointer',
                color: "#BEBEBE"
            },
            onclick: this.handleCcBcc
        })

        let emojis = await this.getResponse({
            route: "Incomming",
            act: "get_emojis",
        })

        this.state.emojisdiv = this.CreateElement({
            element: "divemojis",
        }, this.CreateElement({
            element: "span",
            close: "emojis",
            text: "დახურვა",
            onclick: this.handleEmojis
        }))

        this.state.smileincon = this.CreateElement({
            element: "img",
            src: "Frontend/Assets/images/icons/smile.svg",
            style: {
                cursor: 'pointer'
            },
            onclick: this.handleEmojis
        })

        if (emojis) {
            emojis.forEach(em => {
                this.append(this.state.emojisdiv, this.CreateElement({
                    element: "span",
                    style: {
                        cursor: "pointer"
                    },
                    text: `&#${em.code};`,
                    onclick: (e) => {
                        this.state.footer.editor.innerHTML += e.target.innerHTML;
                    }
                }))
            });

        }



        this.state.footer.tools = this.CreateElement({
            element: "div",
            name: "tools"
        },  this.CreateElement({
            element: "span",
            name: "copy"
        }), this.CreateElement({
            element: "span",
            name: "style"
        }), this.CreateElement({
            element: "span",
            name: "address"
        }, (this.state.prop.source == 'mail' ? this.state.ccbccicon : '')), this.CreateElement({
            element: "span",
            name: "smile",
            style: {
                position: 'relative',
            },
        }, this.state.smileincon, this.state.emojisdiv), this.CreateElement({
            element: "span",
            name: "attachment",
            children: `<img style="cursor:pointer;" src="Frontend/Assets/images/icons/uploadfile.svg">`,
            onclick: () => {
                let param = {
                    inc_id: self.WorkGround.state.prop.id,
                    append_to: this.state.footer.filesdiv,
                    req: "chat"
                }
                new Uploader(param).init();
            }
        }), this.CreateElement({
            element: "span",
            attributes: ["svg"],
            name: "send",
            text: "გაგზავნა",
            style: {
                backgroundColor: "var(--source-color)"
            },
            children: `<svg viewBox="0 0 20 20" width="15" height="20">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#sendmessage" />
                        </svg>`,
            onclick: this.handleSendMessage
        }))


        this.append(this.state.footer, this.showfiles());
        if (this.state.prop.source == "mail") {
            this.append(this.state.footer, this.state.footer.address);
            this.append(this.state.footer, this.state.footer.forward);
        }
        this.append(this.state.footer, this.state.footer.editor);
        this.append(this.state.footer, this.state.footer.tools);

        // this.state.editor = new MediumEditor(this.state.footer.editor, {
        //     anchorPreview: false,
        //     placeholder: true,
        //     autoLink: true,
        //     targetBlank: true,
        //     imageDragging: false,
        //     hideOnClick: false,
        //     extensions: {
        //         // 'multi_placeholder': new MediumEditorMultiPlaceholders({
        //         //   placeholders: [
        //         //       {
        //         //         tag: 'h1',
        //         //         text: 'Title place'
        //         //       }
        //         //   ]
        //         // })
        //     },
        //     toolbar: {
        //         allowMultiParagraphSelection: true,
        //         buttonLabel: 'fontawesome',
        //         buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'orderedlist', 'unorderedlist', 'justifyLeft', 'justifyCenter', 'justifyRight', 'pre', 'indent', 'outdent'],
        //         diffLeft: 0,
        //         diffTop: -10,
        //         relativeContainer: null,
        //         standardizeSelectionStart: false,
        //         static: false,
        //         /* options which only apply when static is true */
        //         align: 'left',
        //         sticky: false,
        //         updateOnEmptySelection: true,
        //     },
        //     anchor: {
        //         customClassOption: null,
        //         customClassOptionText: 'Button',
        //         linkValidation: false,
        //         placeholderText: 'Paste or type a link',
        //         targetCheckbox: false,
        //         targetCheckboxText: 'Open in new window'
        //     }
        // });

    }

    handleCcBcc = () => {
        var display = this.state.footer.address.style.display;
        if (display == "" || display == "none") {
            // this.state.footer.style.gridTemplateRows = "auto 1fr 52%";
            this.state.footer.address.style.display = "flex";
        } else {
            this.state.footer.style.gridTemplateRows = "auto 1fr auto";
            this.state.footer.address.style.display = "none"
        }
    }

    showfiles = () => {
        this.state.footer.filesdiv = this.CreateElement({
            element: "div",
            style: {
                position: 'absolute',
                top: '-116px',
                width: '100%',
                backgroundColor: 'white'
            }
        })

        return this.state.footer.filesdiv;
    }

    handleEmojis = () => {
        if (this.state.emojisdiv.style.height) {
            if (this.state.emojisdiv.style.height == "0px") {
                this.state.emojisdiv.style.height = "130px";
                this.state.emojisdiv.style.padding = "27px 3px 5px 7px";
            } else {
                this.state.emojisdiv.style.height = "0px";
                this.state.emojisdiv.style.padding = "0px 3px 0px 7px";
            }
        } else {
            this.state.emojisdiv.style.height = "130px";
            this.state.emojisdiv.style.padding = "27px 3px 5px 7px";
        }

    }


    handleSendMessage = async () => {

        if (this.state.footer.editor.innerHTML == '' && this.state.requestData.length == 0) return false;

        let links = "";
        var ind = this.state.requestData.length;

        this.state.requestData.forEach((x, i) => {
            if(i == ind){
                links += x.link;
            }else{
                links += x.link + ', ';
            }
        })

        var ind = this.state.files;

        this.state.files.forEach((x, i) => {
            if(links != ""){
                links += ', ';
            }

            if(i == ind){
                links += x.url + x.hashedName;
            }else{
                links += x.url + x.hashedName + ', ';
            }
            
        })

        var chat_id = this.state.prop.data.mail_id > 0 ? this.state.prop.data.mail_id : this.state.prop.id;
        var forwarded = false;
        if (selectize_SelectedValue(this.state.forwardinput) != "") {
            forwarded = true;
        }
        await new sendMessage({
            source: this.state.prop.source,
            chat_id: chat_id,
            message: this.state.footer.editor.innerHTML,
            isOperator: true,
            fileLinks: links,
            cc: selectize_SelectedValue(this.state.ccinput),
            bcc: selectize_SelectedValue(this.state.bccinput),
            forward: selectize_SelectedValue(this.state.forwardinput)
        }).exec().then((data) => {

            if(this.state.prop.source == 'mail'){
                this.buildMailMessage(data.result, forwarded)
            }else{
                this.buildMessage(data.result)
            }

            new Uploader({}).clean();
            this.state.requestData = [];

        })

        // this.state.connection.socket.onmessage = (e) => {
        //     console.log(JSON.parse(e.data))
        // }

        this.state.footer.editor.innerHTML = '';
        this.state.body.scrollTop = this.state.body.scrollHeight
        this.state.files = [];

    }
}

