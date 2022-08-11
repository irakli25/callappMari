`use strict`;

import kendoSelector from "../../components/selector/selector.class.js";
import {kendo_SelectedID} from '../../helpers/kendo.helper.js'
import Tdg from "../../tdg.class.js"
import Input from "../../components/input/input.class.js";
export default class Authorization extends Tdg{

    constructor(){
        super();

        this.state = {
            sectionName: document.querySelector("section[Authorization]"),
            username: '',
            password: '',
            interface: '',
            element: []
        }

        document.title = "Authorization"

        $.ajaxSetup({
            url: "index.php",
            async: true,
            method: "POST",
            dataType: "json"
        })

        this.initializeAuth();

    }

    createInterface = () => {
        let interfaceEl = this.CreateElement({
            element: "interface",
            attributes: ["auth"],
            onkeyup: (event) => {
                if (event.keyCode === 13) this.handleAuth(event)
            }
        })
        return interfaceEl;
    }

    createLogo = () => {
        let logo = this.CreateElement({
            element: "logo",
            attributes: ["callapp"]
        })
        return logo;
    }

    /* page 1 */

    createEyeIcon = () => {
        let icon = this.CreateElement({
            element: "icon",
            id: "eye-icon",
            attributes: ["eyeicon"],
            onClick: () => this.handleShowPassword()
        })
        return icon;
    }

    handleShowPassword = () => {
        var x = document.getElementById("password");

        if (x.type === "password") {
          x.type = "text"

            var styles = {
                position: 'relative',
                display: 'block',
                height: '20px',
                width: '20px',
                background: 'url("Frontend/Assets/images/icons/eye2.svg")'
            };
            
            var obj = document.getElementById("eye-icon");
            Object.assign(obj.style, styles);
        } else {
          x.type = "password";

          var styles2 = {
            position: 'relative',
            display: 'block',
            height: '20px',
            width: '20px',
            background: 'url("Frontend/Assets/images/icons/eye.svg")'
          };
          var obj = document.getElementById("eye-icon");
          Object.assign(obj.style, styles2);
        }      
    }
    
    createInfoIcon = () => {
        let info = this.CreateElement({
            element: "info",
            attributes: ["infoicon"],
            children: `<span>შიდა ნომრის არჩევა სავალდებულოა თანამშრომლებისთვის, რომლებმაც უნდა მიიღონ და შინაარსობრივად დაამუშავონ სატელეფონო მომართვები</span>`,
        })
        return info;
    }

    createTitle = () => {
        let title = this.CreateElement({
            element: "div",
            className: ["auth-title"],
            children: "სისტემაში შესვლა"
        })
        return title;
    }

    createUsernameInput = () => {
        this.state.element.username = new Input({
            element: "input",
            type: "text",
            placeholder: "მომხმარებელი",
            className: ["username-input"],
            value: this.state.username,
            onInput: (e) => this.state.username = e.target.value
        }).build();

        return this.state.element.username
    }

    createPasswordInput = () => {
        this.state.element.password = new Input({
            element: "input",
            type: "password",
            id: "password",
            className: ["password-input"],
            placeholder: "პაროლი",
            value: this.state.password,
            onInput: (e) => this.state.password = e.target.value
        }).build();

        return this.state.element.password
    }

    createRememberPassword = () => {
        this.state.element.createrememberpassword = this.CreateElement({
            element: "input",
            type: "checkbox",
            id: "checkbox",
        })

        return this.state.element.createrememberpassword
    }

    createRememberPasswordLabel = () => {
        this.state.element.createrememberpasswordlabel = this.CreateElement({
            element: "label",
            for: "checkbox",
            children: "დაიმახსოვრე პაროლი",
        })

        return this.state.element.createrememberpasswordlabel
    }

    createForgotPassword = () => {
        this.state.element.createforgotpassword = this.CreateElement({
            element: "a",
            children: "დაგავიწყდა პაროლი",
            onClick: () => this.handleForgotPassword()
        })
        return this.state.element.createforgotpassword
    }

    createButton = () => {
        this.state.element.button = this.CreateElement({
            element: "button",
            children: "შესვლა",
            onClick: (e) => this.handleAuth(e)
        })

        return this.state.element.button;
    }

    createKendo = () => {
        this.state.element.ext =  this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "ექსტენშენი",
            data: {
                route: "Authorization",
                act: "getExt"
            },
            style: {
                width: "394px",
            }
        })

        return this.state.element.ext
    }

    handleForgotPassword = () => {
        document.getElementById("rightelement").style.display="none"
        document.getElementById("rightelementpage2").style.display="grid"
    }

    /* page 2 */

    createTitle2 = () => {
        let title2 = this.CreateElement({
            element: "div",
            className: ["auth-title"],
            children: "დაგავიწყდა პაროლი?!"
        })
        
        return title2;
    }

    createUsernameInput2 = () => {
        this.state.element.username2 = new Input({
            element: "input",
            type: "text",
            placeholder: "მომხმარებელი",
            className: ["username-input"],
            value: this.state.username,
            onInput: (e) => this.state.username = e.target.value
        }).build();

        return this.state.element.username2
    }
    
    createButton2 = () => {
        let button2 = this.CreateElement({
            element: "button",
            children: "შემდეგი",
            onClick: () => this.handleForgotPassword2(),
        })
        return button2;
    }

    handleForgotPassword2 = () => {
        if (this.state.username == "") {
            window.alert("enter username")
        } else {
            document.getElementById("rightelementpage3").style.display="grid"
            document.getElementById("rightelementpage2").style.display="none"
        }
    }


    createGoBack = () => {
        this.state.element.goback = this.CreateElement({
            element: "a",
            children: "უკან",
            attributes: ["goback"],
            onClick: () => this.handleGoBack()
        })

        return this.state.element.goback
    }

    
    handleGoBack = () => {
        document.getElementById("rightelementpage2").style.display="none"
        document.getElementById("rightelement").style.display="grid"
    }


    /* page 3 */

    createTitle3 = () => {
        let title3 = this.CreateElement({
            element: "div",
            className: ["auth-title"],
            children: "დაგავიწყდა პაროლი?!"
        })

        return title3;
    }

    createSmsInput = () => {
        this.state.element.smsinput = new Input({
            element: "input",
            type: "radio",
            label: "SMS",
            id: "sms",
            name: "radio",
            checked: "checked",
            className: ["sms-input"],
        }).build();

        return this.state.element.smsinput
    }

    createEmailInput = () => {
        this.state.element.emailinput = new Input({
            element: "input",
            type: "radio",
            label: "Email",
            id: "email",
            name: "radio",
            className: ["email-input"],
        }).build();

        return this.state.element.emailinput
    }

    createButton3 = () => {
        let button3 = this.CreateElement({
            element: "button",
            children: "გაგზავნა",
            onClick: () => this.handleSend()
        })

        return button3;
    }

    createGoBack2 = () => {
        this.state.element.goback2 = this.CreateElement({
            element: "a",
            children: "უკან",
            attributes: ["goback"],
            onClick: () => this.handleGoBack2()
        })

        return this.state.element.goback2
    }

    handleGoBack2 = () => {
        document.getElementById("rightelementpage3").style.display="none"
        document.getElementById("rightelementpage2").style.display="grid"
    }
    
    
    handleSend = () => {
        document.getElementById("rightelementpage3").style.display="none"
        document.getElementById("rightelementpage4").style.display="grid"
    }

    /* page 4 */

    createTitle4 = () => {
        let title4 = this.CreateElement({
            element: "div",
            className: ["auth-title"],
            children: "დაგავიწყდა პაროლი?!"
        })
        return title4;
    }

    createSmsInfoIcon = () => {
        let smsinfo = this.CreateElement({
            element: "smsinfo",
            attributes: ["smsinfoicon"],
            children: `<span>პაროლი ვალიდურია სისტემიდან გამოსვლამდე, გთხოვთ შეცვალოთ პაროლი</span>`,
        })
        return smsinfo;
    }


    createSmsCodeInput = () => {
        this.state.element.smscode = new Input({
            element: "input",
            type: "text",
            placeholder: "SMS კოდი",
            className: ["username-input"],
            style: {
                width: '394px'
            }
        }).build();

        return this.state.element.smscode
    }

    createButton4 = () => {
        let button4 = this.CreateElement({
            element: "button",
            children: "შესვლა",
            onClick: () => this.handleLogIn()
        })

        return button4;
    }

    handleLogIn = () => {
        if (this.state.smscode == "") {
            window.alert("enter sms code")
        } else {
            location.reload()
        }
    }

    createGoBack3 = () => {
        this.state.element.goback3 = this.CreateElement({
            element: "a",
            children: "უკან",
            attributes: ["goback"],
            onClick: () => this.handleGoBack3()
        })

        return this.state.element.goback3
    }

    handleGoBack3 = () => {
        document.getElementById("rightelementpage4").style.display="none"
        document.getElementById("rightelementpage3").style.display="grid"
    }

    /**
     * @param {String} text 
     * @returns callback Element
     */
    createCallBack = (text) => {
        let callback = this.CreateElement({
            element: "callback",
            children: text
        })
        return callback;
    }

    handleAuth = (e) => {
        this.state.ext = kendo_SelectedID(this.state.element.ext)
        

        $.ajax({
            url: "index.php",
            async: true,
            method: "POST",
            dataType: "json",
            data: {
                route: "Authorization",
                act: "login",
                username: this.state.username,
                password: this.state.password,
                ext: this.state.ext
            },
            beforeSend:() =>{
                this.state.element.button.innerText = "დაელოდეთ.."
            },
            success: (data) => {

                if (data.status == 1) {
                    this.buildNotice({ msg: data.message, attributes: { x: 'right', y: 'bottom'}, color: "green"})
                    
                    this.setExtToStorage();
                    this.setUserId(data.userId);
                    
                    location.reload()
                }else{
                    this.buildNotice({ msg: data.message, attributes: { x: 'right', y: 'bottom'}, color: "yellow"})
                    this.state.element.button.innerText = "შესვლა"
                }


                
            },
            error: () => {
                this.state.element.button.innerText = "შესვლა"
            }

        })
    }

    setExtToStorage = () => {
        localStorage.setItem("ext_id",  this.state.ext)
    }
    
    /**
     * 
     * @param {Integer} user_id 
     */
    setUserId = (user_id) => {
        localStorage.setItem("user_id", user_id);
    }

    buildAuth = () => {
        this.state.interface = this.createInterface();

        this.append(this.state.interface, this.CreateElement({
            element: "div",
            attributes: ["left"]
        }, this.createLogo() ));

        this.append(this.state.interface, this.CreateElement({
            element: "div",
            id: "border",
            attributes: ["border"]
        }));

        let rightDiv =  this.CreateElement({
            element: "div",
            id: "rightelement",
            attributes: ["right"],
            style: {
                marginTop: "30px"
            }
        });
        this.append(this.state.interface, rightDiv)
        this.append(rightDiv, this.createTitle());
        this.append(rightDiv, this.createUsernameInput());
        this.append(rightDiv, this.createPasswordInput());

        this.append(rightDiv, this.createKendo());
        this.append(rightDiv, this.createButton());

        this.append(rightDiv, this.createEyeIcon());
        this.append(rightDiv, this.createInfoIcon());


        let rightDivPage2 =  this.CreateElement({
            element: "div",
            id: "rightelementpage2",
            attributes: ["right"],
            style: { 
                display: "none",
            }
        });
        this.append(this.state.interface, rightDivPage2)
        this.append(rightDivPage2, this.CreateElement({
            element: "div",
            attributes: ["gobackbutton"]
        }, this.createGoBack()  ))
        this.append(rightDivPage2, this.createTitle2());
        this.append(rightDivPage2, this.createUsernameInput2());
        this.append(rightDivPage2, this.createButton2());

        let rightDivPage3 =  this.CreateElement({
            element: "div",
            id: "rightelementpage3",
            attributes: ["right"],
            style: { 
                display: "none",
            }
        });
        this.append(this.state.interface, rightDivPage3)
        this.append(rightDivPage3, this.CreateElement({
            element: "div",
            attributes: ["gobackbutton"]
        }, this.createGoBack2()  ))
        this.append(rightDivPage3, this.createTitle3());
        this.append(rightDivPage3, this.CreateElement({
            element: "div",
            attributes: ["inputwithlabels"],
        },this.createSmsInput(), this.createEmailInput()))
        this.append(rightDivPage3, this.createButton3());

        let rightDivPage4 =  this.CreateElement({
            element: "div",
            id: "rightelementpage4",
            attributes: ["right"],
            style: { 
                display: "none",
            }
        });
        this.append(this.state.interface, rightDivPage4)
        this.append(rightDivPage4, this.CreateElement({
            element: "div",
            attributes: ["gobackbutton"]
        }, this.createGoBack3()))
        this.append(rightDivPage4, this.createTitle4())
        this.append(rightDivPage4, this.createSmsCodeInput())
        this.append(rightDivPage4, this.createButton4());
        this.append(rightDivPage4, this.createSmsInfoIcon());

        return this.state.interface;
    }


    initializeAuth = () => {

        this.append(this.state.sectionName, this.buildAuth())

    }

}