
import { Theme } from "./common/theme.class.js";
import Helper from "./helpers/helper.class.js";
import Menu from './layouts/menu.class.js';
import Header from './layouts/header.class.js';

class init extends Helper {

    constructor(){
        super()

        self.init = this;
        
        $.global = {}

        this.state = {
            isLoading: false,
            pendingRequests: 0,
            completeRequests: 0,
            requestProgress: 0,
            webSocketStatus: false,
            webSocketMessage: ''
        }
        
        // INITIALIZE THEME
        new Theme().setTheme();
        new Theme().onSwitchClick();


        // INITIALIZE AJAX SETUP
        this.ajaxSetup();

        $.global.id = this.getParam('id')

        // INITIALIZE SCREEN LOADER
        this.setLoading("body");
        this.isLoading = true;


        this.getBaseLanguageData().then(x => {
            new Header(x).init();
        })

        // INITIALIZE MENU
        new Menu().initializeMenu()


        document.title = "callapp"

        // GLOBAL FUNCTIONS

        $.socket = {
            ip: '192.168.0.116', // 192.168.0.116
            port: '8085',
            kendo: [],
            table: [],
            connections: []
        }

        this.createWebSocketConnection();

    }

    /**
     * @description AJAX SETUP
     */
    ajaxSetup = () => {

        $.ajaxSetup({
            // compontentName=${$.global.currentRequestData.route}
            url: `index.php`,
            async: true,
            method: "POST",
            dataType: "json",
            beforeSend: () => {
                this.state.pendingRequests++
                
            },
            complete: () => {
                this.state.pendingRequests--
                this.state.completeRequests++

            },
            xhr: () => {
                var xhr = new window.XMLHttpRequest();
        
                // Upload progress
                xhr.upload.addEventListener("progress", (evt) =>{
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                    }
                }, false);
                
                // Download progress
                xhr.addEventListener("progress", (evt) =>{
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        this.state.requestProgress = percentComplete
                    }
                }, false);
                
                return xhr;
            },
            error: function(jqXHR, exception){
               
                if (jqXHR.status === 0) {
                    location.reload(true);
                } else if (jqXHR.status == 404) {
                    window.location = "index.php";
                } else if (jqXHR.status == 500) {
                    location.reload(true);
                } else if (exception === "parsererror") {
                    console.log(jqXHR.responseText);
                } else if (exception === "timeout") {
                    location.reload(true);
                } else if (exception === "abort") {
                    location.reload(true);
                } else {
                    location.reload(true);
                }
            }
        })

    }

    runCallappSocket = () => {

        $.socket.callapp = new this.Connection();
        $.socket.callapp.socket.onopen = function() {

            let extID = localStorage.getItem("ext_id");
            let userID = localStorage.getItem("user_id");
            
            setInterval(() => {
                this.send(JSON.stringify({ route: "call", act: 'checkExtStatus', ns: "Helpers", extID: extID, userID: userID }));
            }, 1000)
            
            this.onmessage = (event) => {
                new Helper()._createEvent("oncall", event.data, {parsed: true})
            }
        }
        
    }



    /**
     * @description CREATE WEBSOCKET CONNECTION
     * 
     *
     */
    createWebSocketConnection = () => {

        $.socket.connections.callapp = new this.Connection()
        this.setWebsocketStatus("pending")

        $.socket.connections.callapp.socket.onopen = () => this.setWebsocketStatus(true)
        $.socket.connections.callapp.socket.onerror = () => $.socket.connections.callapp.socket.close()
        $.socket.connections.callapp.socket.onclose = () => {
            this.setWebsocketStatus(false)
            setTimeout(() => this.createWebSocketConnection(), 1000)
        }

        $.socket.connections.callapp.socket.onmessage = (event) => {

            // PUSH RESPONSE DATA TO STATE AND CHECK IF DATA IS A JSON OR A STRING
            this.state.webSocketMessage = this._isJson(event.data) || event.data

            // CHANGE STATUS WHEN MESSAGE IS RECEIVED
            new Promise((resolve, reject) => {
                this.setWebsocketStatus("pending")
                setTimeout(() => {
                    resolve(true)
                }, 100)
            }).then((status) => {
                this.setWebsocketStatus(status)
            })

            this.pushToLog(this.state.webSocketMessage.event)

            // CREATE EVENT FROM SOCKET MESSAGE
            switch(this.state.webSocketMessage.event) {
                case "initializing":
                    this._createEvent("initializing", this.state.webSocketMessage.data, {parsed: false})
                    
                break;
                default:
                    this.state.webSocketMessage.event
            }

        }

    }


    /**
     * 
     * @param {boolean|string} status 
     */
    setWebsocketStatus = (status) => {
        this.state.webSocketStatus = status;
        $('#websocket-channel').attr("actived", status)
    }

    pushToLog = (...msg) => {
        $('event-log').text(msg)
    }



}


new init();