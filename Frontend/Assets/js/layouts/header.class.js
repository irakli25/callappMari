import Tdg from "../tdg.class.js";
import { Theme } from "../common/theme.class.js";
export default class Header extends Tdg {

  constructor(props) {
    super();

    self.Header = this;
    this.state = {
      section: document.querySelector('section[header]'),
      element: [],
      channelID: 0,
      callstatus: [],
      ...props
    };

  }


  init = async () => {

    await this.build();

  }


  build = async () => {

    
    this.append(this.state.section, this.createLogo());

    this.state.webSocketStatus = this.CreateElement({
      element: "live-circle",
      actived: self.init.state.webSocketStatus,
      id: "websocket-channel"
    })

    this.append(this.state.section, this.state.webSocketStatus)
    this.append(this.state.section, this.CreateElement({
      element: "event-log",
      style: {
        position: "absolute",
        marginLeft: "200px",
        color: "var(--green)",
        fontSize: "11px"
      }
    }))

    this.append(this.state.section, this.buildInterface())

    this.getInfo();

    // this.append(this.state.userInterface, await this.createChat())
    this.append(this.state.userInterface, await this.createNotification())
    // this.append(this.state.userInterface, await this.createLanguage())
    this.append(this.state.userInterface, await this.createProfile())

    this.deleteOrNot();

  }

  getInfo = async () => {

    this.state.callstatus = await self.Tdg.getResponse({
      route: "source",
      act: "getSubMenu",
      ns: "Helpers"
    })

  }

  getLanguages = async () => {
    var data = await this.getResponse({
      route: "getLanguage",
      act: "getLanguageList",
      ns: "Helpers"
    })
    // [
    //   {
    //     id: 1,
    //     name: "GEO",
    //     icon: "Georgia",
    //     selected: 1,
    //   },
    //   {
    //     id: 2,
    //     name: "ENG",
    //     icon: "USA",
    //     selected: 0,
    //   },
    //   {
    //     id: 3,
    //     name: "RUS",
    //     icon: "Russia",
    //     selected: 0,
    //   }
    // ]
    return data
  }


  deleteOrNot = (param = true) => {

    let dt = "";
    var data = [];
    data = self.Header.state.callstatus[1];
    var elemets = document.querySelectorAll(".channelsubmenu");

    this.state.element.channelsubmenu.childNodes.forEach(o => {
      if (o.getAttribute('class') == "profilemenuitems") {
        dt = o;
      }
    })

    if (this.state.callstatus['ext_id'] > 0) {
      dt.childNodes.forEach(o => {
        if (o.getAttribute("channel-id")) {
          if (!this.state.callstatus[o.getAttribute("channel-id")]) {
            o.removeChild(o.childNodes[0]);
            o.style.padding = "9px 20px 9px 30px";
          }
        }
      })

      if (data !== null) {

        for (let i = 0; i < data.length; i++) {

          if (!(data[i].actived > 0)) {
            $.each($(elemets[0].children[1].children), function (i, e) {
              if (typeof data[i] !== 'undefined') {
                if (data[i].source_id == $(e).attr("channel-id")) {
                  $(e.children[3].children[0]).removeClass("switchspanchange");
                  $(e.children[3].children[0].children[0]).removeClass("onoffspanchange");
                }
              }

            })
          } else {
            $.each($(elemets[0].children[1].children), function (i, e) {
              if (typeof data[i] !== 'undefined') {
                if (data[i].source_id == $(e).attr("channel-id")) {
                  $(e.children[3].children[0]).removeClass("switchspanchange");
                  $(e.children[3].children[0].children[0]).removeClass("onoffspanchange");
                }
              }
            })

          }
        }
      }


    } else {
      dt.childNodes.forEach(o => {

        if (o.getAttribute("channel-id")) {
          o.removeChild(o.childNodes[0]);
          o.style.padding = "9px 20px";
        }
      })
    }


  }

  /**
   * Create Header Logo
   * @returns LOGO
   */
  createLogo = () => {

    let logo = this.CreateElement({
      element: "logo",
      attributes: ["callapp"],
      onclick: () => {

        if (window.location.href.indexOf("id") >= 0) {
          window.location.href = window.location.href.split("/?")[0];
        } else {
          window.location.href = "";
        }

      }
    })

    return logo

  }

  buildInterface = () => {

    this.state.userInterface = this.CreateElement({
      element: "interface",
      attributes: ["user"]
    })

    return this.state.userInterface;
  }


  createDrop = (content, hideContent) => {

    this.state.drop = this.CreateElement({
      element: "drop"
    }, this.CreateElement({
      element: "content",
      children: content,
      onClick: this.handleDrop
    }), this.CreateElement({
      element: "hidecontent",
      class: "hidecontent1",
      attributes: [{ "aria-open": false }],
      children: hideContent
    }))

    return this.state.drop

  }

  createDrop2 = (content, hideContent) => {

    this.state.counter = this.CreateElement({
      element: "span",
      style: {
        position: "absolute",
        backgroundColor: '#FD0A50',
        padding: '3px',
        borderRadius: '100%',
        right: '17px',
        top: '4px',
        color: '#fff',
        padding: '2px 4px',
        'font-size': '10px',
        display: "none"
      }
    })

    this.state.drop = this.CreateElement({
      element: "drop",
    }, this.CreateElement({
      element: "content",
      children: content,
      onClick: this.handleDrop
    }), this.CreateElement({
      element: "hidecontent",
      style: {
        width: "436px",
        height: "434px",
        cursor: "auto",
      },
      attributes: [{ "aria-open": false }],
      children: hideContent
    }), this.state.counter)

    return this.state.drop

  }

  createDrop3 = (content, hideContent) => {

    this.state.drop = this.CreateElement({
      element: "drop",
    }, this.CreateElement({
      element: "content",
      children: content,
      onClick: this.handleDrop
    }), this.CreateElement({
      element: "hidecontent",
      style: {
        width: "354px",
        height: "700px",
        cursor: "auto",
      },
      attributes: [{ "aria-open": false }],
      children: hideContent,
    }))

    return this.state.drop

  }

  createLanguageDrop = (content, hideContent) => {
    this.state.langMenu = this.CreateElement({
      element: "content",
      children: content,
      attributes: ["language"],
      style: {
        width: '50px',
        height: '16px',
        background: 'rgba(40, 155, 255, 0.1)',
        'border-radius': '4px'
      },
      onClick: this.handleDrop
    })

    this.state.languageDrop = this.CreateElement({
      element: "drop",
    },this.state.langMenu, this.CreateElement({
      element: "hidecontent",
      style: {
        width: "90px",
        height: "auto",
        cursor: "auto",
      },
      attributes: [{ "aria-open": false }],
      children: hideContent,
    }))

    return this.state.languageDrop

  }

  createLanguage = async () => {
    this.state.language = this.createLanguageDrop(this.buildLanguage(), await this.languageTable())

    return this.state.language
  }

  buildLanguage = () => {
    this.state.langIcon = this.CreateElement({
      element: "i",
      class: "fas fa-chevron-down icontrans",
      style: {
        "color": "#1E88E5"
      }
    })

    this.state.element.buildLang = this.CreateElement({
      element: "div",
      class: "languageDiv",
      'lang-id': 0, 
    }, this.CreateElement({
      element: "img",
    }), this.CreateElement({
      element: "h2",
      style: {
        "font-family": 'BPG',
        "font-weight": "normal",
        "font-size": "11px",
        "color": "#1E88E5"
      }
    }), this.state.langIcon)

    return this.state.element.buildLang
  }

  languageTable = async () => {
    this.state.element.languageTable = this.CreateElement({
      element: "div",
      children: `<div class="arrow-up" style="left: 38px;"></div>`,
      style: {
        display: 'flex',
        'flex-direction': 'column',
        gap: '13px',
        'padding-bottom': '21px'
      }
    })
    let data = await this.getLanguages()
    data.forEach(language => {
      if(this.getSessionLanguage() == language.id) {
        this.state.element.buildLang.children[0].src=`Frontend/Assets/images/icons/${language.icon}.svg`;
        this.state.element.buildLang.children[1].innerHTML=language.name;
        this.state.element.buildLang.setAttribute("lang-id", language.id);
      } else {
          var itemLang = this.CreateElement({
            element: "div",
            class: "languageDiv2",
            'lang-id': language.id,
            onClick: () => {
              this.handleLanguage(itemLang, this.state.element.buildLang)
            }
          }, this.CreateElement({
            element: "img",
            src: `Frontend/Assets/images/icons/${language.icon}.svg`
          }), this.CreateElement({
            element: "h2",
            children: language.name,
            class: "lang-title"
          }))
          this.append(this.state.element.languageTable, itemLang)}
      })
      
    return this.state.element.languageTable
  }

  getSessionLanguage = () => {
    var languageId = sessionStorage.getItem("lang-id")

    this.state.langId = typeof languageId != 'undefined' && languageId > 0 ? languageId : 1;

    return this.state.langId;

  }
  

  createChat = async () => {
    this.state.chat = this.createDrop3(this.buildSendMessage(), await this.createChatContent())

    return this.state.chat;

  }

  createChatContent = async () => {
    let users = [
      {
        name: "ქრისტინა კაჭარავა",
        img: "Frontend/Assets/images/icons/Group4.svg",
        msg: "გამაჯობათ გთხოვთ გამომიგზა...",
        time: "02:32 PM"
      },
      {
        name: "ნინო გოგუა",
        img: "Frontend/Assets/images/icons/Group3.svg",
        msg: "დიახ, გასაგებია",
        time: "04:32 PM"
      },
      {
        name: "გიორგი კაციტაძე",
        img: "Frontend/Assets/images/icons/Group2.svg",
      },
      {
        name: "მარიამ აბხაზავა",
        img: "Frontend/Assets/images/icons/Group1.svg",
      }


    ]

    let groups = [
      {
        title: "მენეჯმენტი",
        img: "Frontend/Assets/images/icons/12.svg",
        members: "ნინო გოგუა, ქრისტინა კაჭარავა, +12",
        time: "04:32 PM"
      },
      {
        title: "გაყიდვები",
        img: "Frontend/Assets/images/icons/11.svg",
        members: "ნინო გოგუა, ქრისტინა კაჭარავა, +12",
        time: "04:32 PM"
      }
    ]

    let chatmessages = [
      {
        message: "გამაჯობა 11213435446578790 11213435446578790 11213435446578790 11213435446578790 11213435446578790",
        img: "Frontend/Assets/images/icons/chat12.svg"
      },
      {
        message: "11213435446578790",
        img: "Frontend/Assets/images/icons/chat2.svg"
      }
    ]

    this.state.emojisdiv = this.CreateElement({
      element: "divemojis",
      id: "divemojis",
      style: {
        height: "0px",
        padding: "0px 3px 0px 7px",
        left: "134px",
        bottom: "43px"
      }
    }, this.CreateElement({
      element: "span",
      close: "emojis",
      text: "დახურვა",
      onclick: this.handleEmojis
    }))

    this.state.activeContacts = this.CreateElement({
      element: "div",
      className: ["active-contacts"],
    })

    this.state.groupChatActiveContacts = this.CreateElement({
      element: "div",
      className: ["active-contacts"],
    })

    this.state.privateChatActiveContacts = this.CreateElement({
      element: "div",
      className: ["active-contacts"],
    })

    this.state.chatMessageContent = this.CreateElement({
      element: "div",
      style: {
        display: "block"
      }
    });

    this.state.hideshowgroupchat = this.CreateElement({
      element: "div",
      style: {
        display: "block"
      }
    })

    this.state.groupchatReccomendedUsers = this.CreateElement({
      element: "p",
      className: ["reccomended-users"],
      children: "რეკომენდირებული"
    })

    this.state.privatechatReccomendedUsers = this.CreateElement({
      element: "p",
      className: ["reccomended-users"],
      children: "რეკომენდირებული"
    })

    this.state.element.chatcontent = this.CreateElement({
      element: "div",
      children: `<div class="arrow-up" ></div>`
    }, this.CreateElement({
      element: "div",
      className: ["chatcontent"],
    }, this.CreateElement({
      element: "div",
      className: ["chat"],
      id: "chat"
    }, this.CreateElement({
      element: "div",
      className: ["grid"]
    }, this.CreateElement({
      element: "h4",
      children: "წევრები"
    }), this.CreateElement({
      element: "h5",
      children: "Create new",
      onClick: () => this.createNewChat()
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/chevron-right1.svg",
      className: ["create-new-chat"],
      id: "create-new-chat"
    }),
      this.CreateElement({
        element: "span",
        className: ["createnewchat"],
        id: "createnewchat",
      }, this.CreateElement({
        element: "div",
        className: ["createnewchat-grid"]
      }, this.CreateElement({
        element: "p",
        children: `<img src="Frontend/Assets/images/icons/lock1234.svg" style="margin-right: 10px;">პირადი ჩატი`,
        onClick: () => this.createNewPrivateChat()
      }), this.CreateElement({
        element: "p",
        children: `<img src="Frontend/Assets/images/icons/frame1234.svg" style="margin-right: 10px;">ჯგუფის შექმნა`,
        onClick: () => this.createNewGroupChat()
      }))))), this.state.activeContacts)))

    if (users) {
      users.forEach(user => {
        this.append(this.state.groupChatActiveContacts, this.CreateElement({
          element: "img",
          src: `${user.img}`
        }))

        this.append(this.state.privateChatActiveContacts, this.CreateElement({
          element: "img",
          src: `${user.img}`
        }))

        this.append(this.state.activeContacts, this.CreateElement({
          element: "img",
          src: `${user.img}`
        }))

        this.append(this.state.privatechatReccomendedUsers, this.CreateElement({
          element: "div",
          className: ["privatechat-users"],
        }, this.CreateElement({
          element: "img",
          src: `${user.img}`,
        }), this.CreateElement({
          element: "p",
          children: `${user.name}`,
          onClick: () => this.createPrivateChat()
        })))

        this.append(this.state.groupchatReccomendedUsers, this.CreateElement({
          element: "div",
          className: ["groupchat-users"],
        }, this.CreateElement({
          element: "img",
          src: `${user.img}`,
        }), this.CreateElement({
          element: "p",
          children: `${user.name}`,
        }), this.CreateElement({
          element: "input",
          type: "checkbox",
        })))

        if (user.msg) {
          this.append(this.state.chatMessageContent, this.CreateElement({
            element: "div",
            className: ["chat-message-content"],
            id: "chat-contacts",
            onClick: () => this.openChatBtn()
          },
            this.CreateElement({
              element: "div",
              className: ["chat-msg1"]
            }, this.CreateElement({
              element: "img",
              src: `${user.img}`
            })), this.CreateElement({
              element: "div",
              className: ["chat-msg2"]
            }, this.CreateElement({
              element: "h3",
              children: `${user.name}`
            }), this.CreateElement({
              element: "p",
              children: `${user.msg}`
            })), this.CreateElement({
              element: "div",
              className: ["chat-msg3"]
            }, this.CreateElement({
              element: "p",
              children: `${user.time}`
            }))))
        }
      })
    }


    this.state.groupChat = this.CreateElement({
      element: "div",
      className: ["chat-groups"]
    }, this.CreateElement({
      element: "h4",
      id: "hideGroup",
      children: "ჯგუფები",
      onClick: () => this.hideGroupBtn()
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/chevron-right111.svg",
      id: "hidegroupimg"
    })), this.state.hideshowgroupchat)


    this.append(this.state.activeContacts, this.CreateElement({
      element: "div",
      className: ["chat-content"],
    }, this.CreateElement({
      element: "h4",
      id: "hideChat",
      children: "ჩატი",
      onClick: () => this.hideChatBtn()
    }, this.CreateElement({
      element: "img",
      id: "hidechatimg",
      src: "Frontend/Assets/images/icons/chevron-right111.svg"
    })), this.state.chatMessageContent, this.state.groupChat))


    if (groups) {
      groups.forEach(group => {
        this.append(this.state.hideshowgroupchat, this.CreateElement({
          element: "div",
          id: "group",
          className: ["chat-group-content"],
          onClick: () => this.openChatBtn(),
          style: {
            display: "grid"
          }
        }, this.CreateElement({
          element: "div",
          className: ["group-msg1"],
        }, this.CreateElement({
          element: "img",
          src: `${group.img}`
        })), this.CreateElement({
          element: "div",
          className: ["group-msg2"]
        }, this.CreateElement({
          element: "h3",
          children: `${group.title}`
        }), this.CreateElement({
          element: "p",
          children: `${group.members}`
        })), this.CreateElement({
          element: "div",
          className: ["group-msg2"]
        }, this.CreateElement({
          element: "p",
          children: `${group.time}`
        }))))
      })
    }


    this.state.openChatMessages = this.CreateElement({
      element: "div",
      className: ["openchat-content"]
    }, this.CreateElement({
      element: "div",
      className: ["user-msg-grid"],
      children: `<div class="arrow-left"></div>`
    }, this.CreateElement({
      element: "img",
      src: `${chatmessages[1].img}`
    }), this.CreateElement({
      element: "div",
      className: ["sentMessage"],
      children: `${chatmessages[1].message}`
    })), this.CreateElement({
      element: "div",
      className: ["user-msg-grid2"],
      children: `<div class="arrow-right"></div>`
    }, this.CreateElement({
      element: "div",
      className: ["sentMessage2"],
      children: `${chatmessages[0].message}`,
    }), this.CreateElement({
      element: "img",
      src: `${chatmessages[0].img}`
    })))


    this.append(this.state.element.chatcontent, this.CreateElement({
      element: "div",
      className: ["openchat"],
      id: "openchat",
    }, this.CreateElement({
      element: "div",
      className: ["open-chat-grid"]
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/Back-Arrow.svg",
      id: "back-arrow",
      style: {
        filter: "var(--icon-color2)"
      },
      onClick: () => this.goBackBtn()
    }), this.CreateElement({
      element: "div"
    }, this.CreateElement({
      element: "h3",
      children: "user name"
    }), this.CreateElement({
      element: "p",
      children: "Operator"
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/4.svg",
      className: ["operator-img"],
    }))), this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/bell.svg",
      style: {
        filter: "var(--icon-color)"
      }
    })), this.state.openChatMessages
      , this.CreateElement({
        element: "div",
        id: "open-chat-send-message",
        className: ["open-chat-send-message"],
      }, this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "div",
        className: ["open-chat-border"]
      }), this.CreateElement({
        element: "img",
        src: "Frontend/Assets/images/icons/paperclip2.svg",
        style: {
          filter: "var(--icon-color)"
        }
      }), this.CreateElement({
        element: "input",
        type: "text",
        id: "message",
        name: "message",
        placeholder: "დაწერე ტექსტი...",
        // onKeyUp: () => this.onInputClick()
      }), this.CreateElement({
        element: "span",
      }, this.CreateElement({
        element: "img",
        src: "Frontend/Assets/images/icons/smile2.svg",
        className: ["smile"],
        onclick: this.handleEmojis
      }), this.state.emojisdiv,
        this.CreateElement({
          element: "span",
        }))))))


    this.append(this.state.element.chatcontent, this.CreateElement({
      element: "div",
      id: "privateChatCreate",
      className: ["privateChatCreate"],
      style: {
        display: "none"
      }
    }, this.CreateElement({
      element: "div",
      className: ["create-new-private-chat"]
    }, this.CreateElement({
      element: "div",
      className: ["gobackbutton"],
      onClick: () => this.goBackToChat()
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/gobackvector.svg",
      style: {
        padding: "6px",
        filter: "var(--icon-color)"
      }
    }), this.CreateElement({
      element: "div",
      style: {
        background: "var(--white)",
        color: "var(--dark-sky)",
        margin: "5px"
      },
      children: "პირადი ჩატი"
    })), this.state.privateChatActiveContacts, this.CreateElement({
      element: "div",
    }, this.CreateElement({
      element: "div",
      style: {
        padding: "10px"
      }
    }, this.CreateElement({
      element: "input",
      placeholder: "Search",
      className: ["privatechat-input"]
    }), this.CreateElement({
      element: "div",
      style: {
        border: "1px solid var(--dark-sky)",
        height: "25px",
        position: "absolute",
        bottom: "442px",
        right: "52px"
      }
    }), this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/Groupsearch.svg",
      className: ["privatechat-input-img"],
      style: {
        bottom: "449px",
        filter: "var(--icon-color)"
      }
    })), this.CreateElement({
      element: "div",
      className: ["creategroupchat-grid"],
      onClick: () => this.groupCreate()
    }, this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/GroupCreate.svg"
    }), this.CreateElement({
      element: "p",
      children: "ჯგუფის შექმნა",
    }), this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/Vectorgroupcreate.svg",
      style: {
        marginLeft: "107px",
        marginTop: "14px",
        filter: "var(--icon-color)"
      }
    })), this.CreateElement({
      element: "div",
      className: ["reccomended"],
    }, this.state.privatechatReccomendedUsers)))))


    this.append(this.state.element.chatcontent, this.CreateElement({
      element: "div",
      id: "groupChatCreate",
      className: ["groupChatCreate"],
      style: {
        display: "none"
      }
    }, this.CreateElement({
      element: "div",
      className: ["create-new-group-chat"]
    }, this.CreateElement({
      element: "div",
      className: ["gobackbutton"],
      style: {
        background: "var(--white)",
        color: "var(--dark-sky)",
        margin: "5px"
      },
      onClick: () => this.goBackBtn()
    }, this.CreateElement({
      element: "div",
      style: {
        filter: "var(--icon-color)",
        margin: "5px"
      },
      children: `<img src="Frontend/Assets/images/icons/gobackvector.svg">`,
    }), this.CreateElement({
      element: "div",
      style: {
        marginTop: "3.5px"
      },
      children: "ჯგუფის შექმნა"
    })), this.state.groupChatActiveContacts, this.CreateElement({
      element: "div",
    }, this.CreateElement({
      element: "div",
      style: {
        padding: "10px"
      }
    }, this.CreateElement({
      element: "input",
      className: ["groupchatinput"],
      placeholder: "ჯგუფის სახელი",
      style: {
        marginBottom: "10px"
      }
    }), this.CreateElement({
      element: "input",
      placeholder: "Search",
      className: ["groupchat-input"]
    }), this.CreateElement({
      element: "div",
      style: {
        border: "1px solid var(--dark-sky)",
        height: "25px",
        position: "absolute",
        bottom: "401px",
        right: "52px"
      }
    }), this.CreateElement({
      element: "img",
      src: "Frontend/Assets/images/icons/Groupsearch.svg",
      style: {
        position: "absolute",
        left: "315px",
        bottom: "409px",
        filter: "var(--icon-color)"
      }
    })), this.state.groupchatReccomendedUsers))))



    let emojis = await this.getResponse({
      route: "Incomming",
      act: "get_emojis",
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
            document.getElementById("message").value += e.target.innerHTML;
          }
        }))
      });
    }

    return this.state.element.chatcontent
  }

  // onInputClick () {
  //   alert("123")
  // }

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


  hideChatBtn = () => {
    if (this.state.chatMessageContent.style.display == "block") {
      this.state.chatMessageContent.style.display = "none";
      document.getElementById("hidechatimg").src = "Frontend/Assets/images/icons/chevron-right1.svg";

    } else {
      this.state.chatMessageContent.style.display = "block";
      document.getElementById("hidechatimg").src = "Frontend/Assets/images/icons/chevron-right111.svg";
    }
  }

  hideGroupBtn = () => {
    if (this.state.hideshowgroupchat.style.display == "block") {
      document.getElementById("hidegroupimg").src = "Frontend/Assets/images/icons/chevron-right1.svg";
      this.state.hideshowgroupchat.style.display = "none";

    } else {
      document.getElementById("hidegroupimg").src = "Frontend/Assets/images/icons/chevron-right111.svg";
      this.state.hideshowgroupchat.style.display = "block";
    }
  }

  openChatBtn = () => {
    document.getElementById("chat").style.display = "none";
    document.getElementById("openchat").style.display = "block";
  }

  goBackBtn = () => {
    document.getElementById("chat").style.display = "block";
    document.getElementById("openchat").style.display = "none";
    document.getElementById("groupChatCreate").style.display = "none";
    document.getElementById("privateChatCreate").style.display = "none";
  }

  createNewChat = () => {
    if (document.getElementById("createnewchat").style.display === "none") {
      document.getElementById("createnewchat").style.display = "grid";
      document.getElementById("create-new-chat").src = "Frontend/Assets/images/icons/chevron-right111.svg";

    } else {
      document.getElementById("createnewchat").style.display = "none";
      document.getElementById("create-new-chat").src = "Frontend/Assets/images/icons/chevron-right1.svg";
    }
  }

  createNewPrivateChat = () => {
    document.getElementById("chat").style.display = "none";
    document.getElementById("privateChatCreate").style.display = "block";
    document.getElementById("groupChatCreate").style.display = "none";
  }

  createPrivateChat = () => {
    document.getElementById("privateChatCreate").style.display = "none";
    document.getElementById("openchat").style.display = "block";
  }

  goBackToChat = () => {
    document.getElementById("chat").style.display = "block";
    document.getElementById("privateChatCreate").style.display = "none";
    document.getElementById("groupChatCreate").style.display = "none";
  }

  createNewGroupChat = () => {
    document.getElementById("chat").style.display = "none";
    document.getElementById("groupChatCreate").style.display = "block";
  }

  groupCreate = () => {
    document.getElementById("privateChatCreate").style.display = "none";
    document.getElementById("groupChatCreate").style.display = "block";
  }

  buildSendMessage = () => {

    this.state.element.chat = this.CreateElement({
      element: "icon",
      name: "webchat",
      className: ["webchat-icon"],
      style: {
        display: 'none',
        filter: "var(--icon-color)",
        top: "13px"
      }
      // children: `<svg viewbox="0 0 24 24" width=24 height=24>
      //             <use xlink:href="Frontend/Assets/images/icons/icons.svg#sendmessage" />
      //           </svg>`
    })

    return this.state.element.chat

  }

  createNotification = async () => {

    this.state.notification = this.createDrop2(this.buildNotification(), await this.notificationTable())

    return this.state.notification;

  }

  getNotifications = () => {

    // $.socket.notify = new this.Connection();
    // $.socket.notify.socket.onopen = function() {

    //   let userID = localStorage.getItem("user_id");
      
    //     setInterval(() => {
    //         this.send(JSON.stringify({ route: "Notifications", act: 'GET', user_id: userID }));
    //     }, 5000)
        
    //     this.onmessage = (event) => {
    //         new Tdg()._createEvent("onNotify", event.data, {parsed: true})
    //     }
        
    // }
    
  }

  HideOnclick = (id = 0) => {
    self.Tdg.getResponse({
      route: "Notifications",
      act: "REMOVE",
      id: id
    })

  }

  notificationTable = async () => {

    this.state.notifications = this.CreateElement({
      element: "div",
      className: ["notificationtable-grid"],
    })

    this.getNotifications();

    document.addEventListener('onNotify',  (e) => {

      let data = e.detail.result.statement

      this.state.notifications.innerHTML = "";
      this.state.counter.style.display = "none";
     
      if (typeof data != "undefined" && data !== null && data.length > 0) {
        this.state.counter.style.display = "block";
        this.state.counter.innerHTML = data.length;

        self.init.state.audio.play();
        
        data.forEach(notifications => {
          this.append(this.state.notifications, this.CreateElement({
            element: "div",
            'id': notifications.id,
            // 'page-id': notifications.page_id,
            onclick: () => {
              // this.HideOnclick(notifications.id);
            },
            className: ["notificationtbl"]
          }, this.CreateElement({
            element: "div",
            className: ["tbl-content1"],
            style: {
              borderLeft: `3px solid ${notifications.color}`
            }
          }, this.CreateElement({
            element: "div",
            children: `<svg viewBox="0 0 24 24" width="24" height="24">
                        <use xlink:href="Assets/images/icons/menu/menu.svg#${notifications.icon}"></use>
                      </svg>`
          })), this.CreateElement({
            element: "div",
            className: ["tbl-content2"]
          }, this.CreateElement({
            element: "h3",
            children: `${notifications.title}`
          }), this.CreateElement({
            element: "p",
            children: `${notifications.info}`
          })), this.CreateElement({
            element: "div",
            className: ["tbl-content3"]
          }, this.CreateElement({
            element: "p",
            children: `${notifications.time}`
          }))))
        })
      }

    })

     


    this.state.element.notificationtable = this.CreateElement({
      element: "div",
      children: `<div class="arrow-up" style="left: 210px;"></div>`
    }, this.CreateElement({
      element: "div",
      className: ['notificationtable'],
    }, this.state.notifications,
      this.CreateElement({
        element: "div",
        className: ["notificationtable-btn"],
      })))

    // this.CreateElement({
    //   element: "button",
    //   children: "More notifications"
    // })

    return this.state.element.notificationtable
  }


  buildNotification = () => {

    this.state.element.notification = this.CreateElement({
      element: "icon",
      name: "notification",
      children: `<svg style="margin-top: 8px; margin-right:-4px;" viewBox="0 0 24 24" width="24" height="24">
                    <use xlink:href="Frontend/Assets/images/icons/icons.svg#notification" />
                </svg>`,
      style: {
        filter: "var(--icon-color)"
      }
    })

    return this.state.element.notification

  }

  createProfile = async () => {
    let user = await this.getResponse({
      route: "user",
      act: "getAuthorizedUser",
      ns: "Helpers"
    })

    $.global.user = user;

    let selected_status = await this.getResponse({
      route: "user",
      act: "getSelectedWorkStatus",
      id: user.work_status_id,
      ns: "Helpers"
    })

    let status = await this.getResponse({
      route: "user",
      act: "getWorkStatus",
      selected_status_id: user.work_status_id,
      ns: "Helpers"
    })

    let channel = await this.getResponse({
      route: "user",
      act: "getSource",
      ns: "Helpers"
    })

    this.state.profile = this.createDrop(this.buildProfile(user), this.buildProfileMenu(this.buildStatusSubMenu(status), this.buildChannelSubMenu(channel), selected_status))

    return this.state.profile;

  }

  buildProfile = (user) => {
    let image = (user.image ? `Frontend/Uploads/avatars/${user.image}` : "Frontend/Assets/images/no-image.png");
    this.state.element.profile = this.CreateElement({
      element: "menu",
      name: "profileMenu",
    }, this.CreateElement({
      element: "div",
      class: "menuheader",
      children: `<div class="usernameDiv">
                    <span class="callapp_username" name="username" style="color: var(--dark-sky)">${user.name}</span>
                    <span class="callapp_status" name="status">${user.group}</span>
                </div>`
    }, this.CreateElement({
      element: "div",
      children: `<div name="photo">
                    <img src="${image}" />
                </div>`
    }), this.CreateElement({
      element: "i",
      class: "fas fa-chevron-down icontrans",
    })))

    return this.state.element.profile

  }

  buildProfileMenu = (statussubmenu, channelsubmenu, selected_status) => {

    this.state.element.profilemenu = this.CreateElement({
      element: "div",
      class: "profilemenuitems",
    },
      this.CreateElement({
        element: "section",
        class: "status_sub_menu",
        children: statussubmenu
      }),
      this.CreateElement({
        element: "section",
        class: "channel_sub_menu",
        children: channelsubmenu
      }), this.CreateElement({
        element: "icon",
        children: `<svg viewBox="0 0 19 11" width="19" height="11">
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#polygon" />
                </svg>`,
        style: {
          width: "16px",
          position: "absolute",
          top: "-8px",
          right: "51px",
          fill: "var(--block-bg-color)"
        }
      }), this.CreateElement({
        element: "a",
        attributes: [{ "href": "?id=99" }]
      }, this.CreateElement({
        element: "icon",
        children: `<svg viewBox="0 0 14 14" width=14 height=14>
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#userprof" />
                </svg>`,
        style: {
          width: "16px",
          justifySelf: "center"
        }
      }), this.CreateElement({
        element: "span",
        text: this.state.langData.PROFILE || null
      })), this.CreateElement({
        element: "a",
        "status-id": `${selected_status.id}`,
        attributes: [{ "btn": "status" }],
        onclick: this.handleMenu
      }, this.CreateElement({
        element: "i",
        class: "far fa-circle icontrans",
        style: {
          color: `${selected_status.color}`
        }
      }), this.CreateElement({
        element: "span",
        text: `${selected_status.name}`,
      }), this.CreateElement({
        element: "span"
      }, this.CreateElement({
        element: "i",
        class: "fas fa-angle-right icontrans",
        style: {
          float: "right"
        }
      }))), this.CreateElement({
        element: "a",
        attributes: [{ "btn": "channel" }],
        onclick: this.handleMenu
      }, this.CreateElement({
        element: "icon",
        children: `<svg viewBox="0 0 14 14" width=14 height=14>
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#monitor" />
                </svg>`,
        style: {
          width: "16px",
          justifySelf: "center"
        }
      }), this.CreateElement({
        element: "span",
        text: "კომ. არხი",
      }), this.CreateElement({
        element: "span"
      }, this.CreateElement({
        element: "i",
        class: "fas fa-angle-right icontrans",
        style: {
          float: "right"
        }
      }))), this.CreateElement({
        element: "a",
        attributes: [{ "btn": "switch" }],
        onclick: this.handleMenu
      }, this.CreateElement({
        element: "icon",
        children: `<svg viewBox="0 0 14 14" width=14 height=14>
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#darkmode" />
                </svg>`,
        style: {
          width: "16px",
          justifySelf: "center"
        }
      }), this.CreateElement({
        element: "span",
        text: "Dark Mode",
      }), this.CreateElement({
        element: "span"
      }, this.CreateElement({
        element: "span",
        class: `switchspan ${(new Theme().getTheme() == "dark" ? 'switchspanchange' : '')}`,
        onclick: this.handleSwitchDark,
        attributes: [{ "aria-on": false }],
        style: {
          width: "14px"
        }
      }, this.CreateElement({
        element: "span",
        class: `onoffspan ${(new Theme().getTheme() == "dark" ? 'onoffspanchange' : '')}`,
        style: {
          width: "0px"
        }
      }), this.CreateElement({
        element: "i",
        class: "fas fa-times onoffexit icontrans",
        style: {
          fontSize: '9px'
        }
      }),
        this.CreateElement({
          element: "i",
          class: "fas fa-check onoffaccept icontrans",
          style: {
            fontSize: '8px'
          }
        })))), this.CreateElement({
          element: "a",
          attributes: [{ "btn": "switch" }],
          "channel-id": "sound",
          'ext_id': this.state.callstatus['ext_id'],
          onclick: this.handleMenu
        }, this.CreateElement({
          element: "icon",
          children: `<svg viewBox="0 0 14 14" width=14 height=14>
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#volume-up" />
                </svg>`,
          style: {
            width: "16px",
            justifySelf: "center"
          }
        }), this.CreateElement({
          element: "span",
          text: "ხმა",
        }), this.CreateElement({
          element: "span"
        }, this.CreateElement({
          element: "span",
          class: `switchspan`,
          "channel-id": "sound",
          'ext_id': this.state.callstatus['ext_id'],
          onclick: this.handleSwitch,
          attributes: [{ "aria-on": false }],
          style: {
            width: "14px"
          }
        }, this.CreateElement({
          element: "span",
          class: `onoffspan`,
          style: {
            width: "0px"
          }
        }), this.CreateElement({
          element: "i",
          class: "fas fa-times onoffexit icontrans",
          style: {
            fontSize: '9px'
          }
        }),
          this.CreateElement({
            element: "i",
            class: "fas fa-check onoffaccept icontrans",
            style: {
              fontSize: '8px'
            }
          })))), this.CreateElement({
            element: "a",
            onclick: this.logOut
          }, this.CreateElement({
            element: "icon",
            children: `<svg viewBox="0 0 14 14" width=14 height=14>
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#logout" />
                </svg>`,
            style: {
              width: "16px",
              justifySelf: "center"
            }
          }), this.CreateElement({
            element: "span",
            text: "გასვლა"
          })))

    return this.state.element.profilemenu
  }

  logOut = async () => {
    await this.getResponse({
      route: "Authorization",
      act: "logout"
    })

    localStorage.setItem("ext_id", 0)

    location.reload();
  }

  buildStatusSubMenu = (status) => {

    let submenu = [];

    status.forEach(item => {
      submenu.push(this.CreateElement({
        element: "a",
        "status-id": `${item.id}`,
        attributes: [{ "btn": "status" }],
        onclick: this.handleStatusMenu
      }, this.CreateElement({
        element: "i",
        class: "far fa-circle",
        style: {
          color: `${item.color}`
        }
      }), this.CreateElement({
        element: "span",
        text: `${item.name}`,
      })))
    })

    this.state.element.statussubmenuitems = this.CreateElement({
      element: "div",
      class: "profilemenuitems"
    });

    submenu.forEach(o => {
      this.append(this.state.element.statussubmenuitems, o);
    });

    this.state.element.statussubmenu = this.CreateElement({
      element: "section",
      class: "statussubmenu"
    }, this.CreateElement({
      element: "icon",
      children: `<svg viewBox="0 0 19 11" width="19" height="11">
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#polygon" />
                </svg>`,
      style: {
        width: '16px',
        position: 'absolute',
        top: '18px',
        right: '-9px',
        fill: 'var(--block-bg-color)',
        transform: 'rotate(90deg)'
      }
    }), this.state.element.statussubmenuitems)

    return this.state.element.statussubmenu
  }

  buildCallCenterStatusSubMenu = (status) => {


    let submenu = [];

    status.forEach(item => {

      var elemets = document.querySelectorAll(".channelsubmenu");

      sessionStorage.setItem(item.key + "_actived_id_" + item.id, item.actived);
      submenu.push(this.CreateElement({
        element: "a",
        btn: "callstatus",
        checkopen: "false",
        "status-id": `${item.id}`,
        "key": `${item.key}`,
        "queue": item.name,
        "channel-id": item.source_id
      }, this.CreateElement({
        element: "span",
        children: `<svg viewBox="0 0 16 16" width="16" height="16">
        <use xlink:href="Frontend/Assets/images/icons/sources/source.svg#${item.key}-o" />
    </svg>`,
        style: {
          width: "16px",
          justifyContent: "center"
        }
      }), this.CreateElement({
        element: "span",
        btn: "callstatus",
        text: `${item.name}`,
      }), this.CreateElement({
        element: "span",
        switch: "true"
      }, this.CreateElement({
        element: "span",
        class: `switchspan ${item.actived == 1 ? "switchspanchange" : ""}`,
        "status-id": `${item.id}`,
        "key": `${item.key}`,
        "queue": item.name,
        "channel-id": item.source_id,
        onclick: this.handleCallStatusMenu,
        switch: "true",
        attributes: [{ "aria-on": false }],
        style: {
          width: "14px"
        }
      }, this.CreateElement({
        element: "span",
        class: `onoffspan ${item.actived == 1 ? "onoffspanchange" : ""}`,
        style: {
          width: "0px"
        }
      }), this.CreateElement({
        element: "i",
        class: "fas fa-times onoffexit icontrans",
        style: {
          fontSize: '9px'
        }
      }),
        this.CreateElement({
          element: "i",
          class: "fas fa-check onoffaccept icontrans",
          style: {
            fontSize: '8px'
          }
        })))))


      if (!(item.actived > 0)) {
        $.each($(elemets[0].children[1].children), function (i, e) {
          if ($(e).attr("channel-id") == item.source_id) {
            $(e.children[3].children[0]).removeClass("switchspanchange");
            $(e.children[3].children[0].children[0]).removeClass("onoffspanchange");
          }
        })
      } else {
        $.each($(elemets[0].children[1].children), function (i, e) {
          if ($(e).attr("channel-id") == item.source_id) {
            $(e.children[3].children[0]).addClass("switchspanchange");
            $(e.children[3].children[0].children[0]).addClass("onoffspanchange");
          }
        })
      }
    })

    this.state.element.callstatussubmenuitems = this.CreateElement({
      element: "div",
      class: "profilemenuitems"
    });

    submenu.forEach(o => {
      this.append(this.state.element.callstatussubmenuitems, o);
    });

    this.state.element.callstatussubmenu = this.CreateElement({
      element: "section",
      class: "callstatussubmenu"
    }, this.CreateElement({
      element: "icon",
      children: `<svg viewBox="0 0 19 11" width="19" height="11">
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#polygon" />
                </svg>`,
      style: {
        width: '16px',
        position: 'absolute',
        top: '18px',
        right: '-9px',
        fill: 'var(--block-bg-color)',
        transform: 'rotate(90deg)'
      }
    }), this.state.element.callstatussubmenuitems)



    // if (!add) {
    //   $(elemets[0].children[1].children[1].children[3].children[0]).removeClass("switchspanchange");
    //   $(elemets[0].children[1].children[1].children[3].children[0].children[0]).removeClass("onoffspanchange");
    // } else {
    //   $(elemets[0].children[1].children[1].children[3].children[0]).addClass("switchspanchange");
    //   $(elemets[0].children[1].children[1].children[3].children[0].children[0]).addClass("onoffspanchange");
    // }

    return this.state.element.callstatussubmenu

  }

  buildChannelSubMenu = (channel) => {

    let submenu = [];

    this.state.callsubmenuap = this.CreateElement({
      element: "section",
      class: "call_sub_menu",
    });

    channel.forEach(item => {
      sessionStorage.setItem("source_" + item.id, item.actived);
      submenu.push(this.CreateElement({
        element: "a",
        btn: "callstatus",
        checkopen: "false",
        style: {
          padding: "9px 20px 9px 0px"
        },
        "channel-id": `${item.id}`,
        'ext_id': this.state.callstatus['ext_id'],
        onclick: this.handleMenu
      }, this.CreateElement({
        element: "i",
        class: "fas fa-angle-right icontrans",
        style: {
          float: "right",
          'margin-right': '-14px',
          'margin-top': '-3px'
        }
      }), this.CreateElement({
        element: "span",
        children: `<svg viewBox="0 0 16 16" width="16" height="16">
        <use xlink:href="Frontend/Assets/images/icons/sources/source.svg#${item.key}-o" />
    </svg>`,
        style: {
          width: "0px"
        }
      }), this.CreateElement({
        element: "span",
        btn: "callstatus",
        style: {
          width: '52px'
        },
        text: `${item.name}`,
      }), this.CreateElement({
        element: "span",
        switch: "true"
      }, this.CreateElement({
        element: "span",
        class: `switchspan ${item.actived == 1 ? "switchspanchange" : ""}`,
        "channel-id": `${item.id}`,
        'ext_id': this.state.callstatus['ext_id'],
        onclick: this.handleSwitch,
        switch: "true",
        attributes: [{ "aria-on": false }],
        style: {
          width: "14px"
        }
      }, this.CreateElement({
        element: "span",
        class: `onoffspan ${item.actived == 1 ? "onoffspanchange" : ""}`,
        style: {
          width: "0px"
        }
      }), this.CreateElement({
        element: "i",
        class: "fas fa-times onoffexit icontrans",
        style: {
          fontSize: '9px'
        }
      }),
        this.CreateElement({
          element: "i",
          class: "fas fa-check onoffaccept icontrans",
          style: {
            fontSize: '8px'
          }
        })))));
    });


    this.state.element.channelsubmenuitems = this.CreateElement({
      element: "div",
      class: "profilemenuitems"
    }, this.state.callsubmenuap);

    submenu.forEach(o => {
      this.append(this.state.element.channelsubmenuitems, o);
    });

    this.state.element.channelsubmenu = this.CreateElement({
      element: "section",
      class: "channelsubmenu"
    }, this.CreateElement({
      element: "icon",
      children: `<svg viewBox="0 0 19 11" width="19" height="11">
                  <use xlink:href="Frontend/Assets/images/icons/icons.svg#polygon" />
                </svg>`,
      style: {
        width: '16px',
        position: 'absolute',
        top: '18px',
        right: '-9px',
        fill: 'var(--block-bg-color)',
        transform: 'rotate(90deg)'
      }
    }), this.state.element.channelsubmenuitems)

    return this.state.element.channelsubmenu
  }

  handleDrop = function () {

    $('hidecontent > .profilemenuitems > a[btn="channel"] > span:eq(1) > i').removeClass('fasrotate');
    $('hidecontent > .profilemenuitems > a[btn="status"] > span:eq(1) > i').removeClass('fasrotate');
    $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"] > i').removeClass('fasrotate');
    $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"]').attr('checkopen', "false");

    $(".statussubmenu").hide(200, "linear");
    $(".channelsubmenu").hide(200, "linear");
    $(".callstatussubmenu").hide(200, "linear");

    var rotate = $(this).children('menu').children(".menuheader").children(".fas");
    var check = $(this).nextAll("hidecontent").attr("aria-open");
    var checkname = $(this).children('menu').attr("name");

    if (check == "false") {
      var hidecontent = document.querySelector('hidecontent[aria-open=true]');
      $(hidecontent).attr("aria-open", "false");
      $(hidecontent).hide(200, "swing");
    }

    if (checkname) {
      rotate.toggleClass('fasrotate');
    } else {
      $(".fasrotate").removeClass('fasrotate');
    }

    // if(this.getAttribute("language") == "") {
    //   if (self.Header.state.langIcon.style.transform == "" || self.Header.state.langIcon.style.transform == "rotate(0deg)") {
    //     self.Header.state.langIcon.style.transform = "rotate(180deg)"
    //   } else {
    //     self.Header.state.langIcon.style.transform = "rotate(0deg)"
    //   }
    // } else {
    //   self.Header.state.langIcon.style.transform = "rotate(0deg)"
    // }


    $(this).nextAll("hidecontent").attr("aria-open", "true");
    $(this).nextAll("hidecontent").toggle(200, "swing");
  }

  handleSwitchDark = function () {
    $(this).toggleClass("switchspanchange");
    $(this).children('.onoffspan').toggleClass("onoffspanchange");

    if ($(this).hasClass("switchspanchange")) {
      new Theme().DarkMode()
    } else {
      new Theme().LightMode()
    }

  }

  setSourceControl = (id, actived) => {
    self.Tdg.getResponse({
      route: "user",
      act: "setSourceControl",
      source_id: id,
      actived: actived,
      ns: "Helpers"
    })
  }

  handleSwitch = async function (e) {
    var channel_id = $(this).attr("channel-id");
    if ($(this).attr("ext_id") > 0) {
      var elemets = document.querySelectorAll(".callstatussubmenu");
      if ($(this).attr("channel-id") == 1) {
        if (self.Header.state.callstatus[1]) {
          if (!$(this).hasClass("switchspanchange")) {
            await self.Header.setQueueControl(0, 1, "", true);
            if (elemets[0]) {
              elemets[0].children[1].childNodes.forEach(o => {
                if (channel_id == $(o).attr("channel-id")) {
                  $(o.children[2].children[0]).addClass("switchspanchange");
                  $(o.children[2].children[0].children[0]).addClass("onoffspanchange");
                }
              })
            }

          } else {
            await self.Header.setQueueControl(0, 0, "", true);
            if (elemets[0]) {
              elemets[0].children[1].childNodes.forEach(o => {
                if (channel_id == $(o).attr("channel-id")) {
                  $(o.children[2].children[0]).removeClass("switchspanchange");
                  $(o.children[2].children[0].children[0]).removeClass("onoffspanchange");
                }
              })
            }


          }

        }

      } else if (!$(this).hasClass("switchspanchange")) {
        sessionStorage.setItem("source_" + $(this).attr("channel-id"), "1");
        self.Header.setSourceControl($(this).attr("channel-id"), 1);

      } else {
        sessionStorage.setItem("source_" + $(this).attr("channel-id"), "0")
        self.Header.setSourceControl($(this).attr("channel-id"), 0);
      }

      if (!$(this).hasClass("switchspanchange")) {
        if (elemets[0]) {
          elemets[0].children[1].childNodes.forEach(o => {
            if (channel_id == $(o).attr("channel-id")) {
              $(o.children[2].children[0]).addClass("switchspanchange");
              $(o.children[2].children[0].children[0]).addClass("onoffspanchange");
            }
          })
        }

      } else {
        if (elemets[0]) {
          elemets[0].children[1].childNodes.forEach(o => {
            if (channel_id == $(o).attr("channel-id")) {
              $(o.children[2].children[0]).removeClass("switchspanchange");
              $(o.children[2].children[0].children[0]).removeClass("onoffspanchange");
            }

          })
        }
      }


      $(this).toggleClass("switchspanchange");
      $(this).children('.onoffspan').toggleClass("onoffspanchange");
    } else {
      self.Tdg.buildNotice({ msg: "გთხოვთ აირჩიოთ ექსთენშენი" });
    }

  }

  swapElement = function (a, b) {

    var aNext = $('<span>').insertAfter(a);
    a.insertAfter(b);
    b.insertBefore(aNext);
    aNext.remove();

  }


  handleMenu = async function (e) {
    var check = true;

    if (e.target.getAttribute("switch") == "true") {
      check = false;
    }

    if (check) {
      if ($(this).attr("btn") == "switch") {
        self.Header.state.channelID = $(this).attr("channel-id");
      }

      if ($(this).attr("btn") == "status") {
        $(this).children().last().children("i").toggleClass("fasrotate");
        $('hidecontent > .profilemenuitems > a[btn="channel"] > span:eq(1) > i').removeClass('fasrotate');
        $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"] > i').removeClass('fasrotate');
        $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"]').attr('checkopen', "false");

        $(".channelsubmenu").hide(200, "linear");
        $(".statussubmenu").toggle(200, "linear");
        $(".callstatussubmenu").hide(200, "linear");
      } else if ($(this).attr("btn") == "channel") {
        $('hidecontent > .profilemenuitems > a[btn="status"] > span:eq(1) > i').removeClass('fasrotate');
        $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"] > i').removeClass('fasrotate');
        $('.channelsubmenu > .profilemenuitems > a[btn="callstatus"]').attr('checkopen', "false");

        $(this).children().last().children("i").toggleClass("fasrotate");
        $(".statussubmenu").hide(200, "linear");
        $(".channelsubmenu").toggle(200, "linear");
        $(".callstatussubmenu").hide(200, "linear");
      } else if ($(this).attr("btn") == "callstatus") {
        if (!$(this).attr("ext_id")) {
          self.Tdg.buildNotice({ msg: "გთხოვთ აირჩიოთ ექსთენშენი" });
        } else {
          if (!($(e.target).hasClass("switchspan") || $(e.target).hasClass('onoffspan') || $(e.target).hasClass('onoffexit') || $(e.target).hasClass('onoffaccept') || $(e.target).attr('switch') == "true")) {
            $('a[btn="callstatus"] > i').removeClass('fasrotate');

            var clicked_id = $(this).attr("channel-id");
            let callstatus = self.Header.state.callstatus[clicked_id];
            console.log(callstatus);

            $.each($('a[btn="callstatus"]'), function (i, ee) {
              if (clicked_id != $(ee).attr("channel-id")) {
                $(ee).attr('checkopen', 'false');
              }
            })

            if ($(this).attr("checkopen") == "false") {

              self.Header.state.callsubmenuap.innerHTML = "";
              self.Tdg.append(self.Header.state.callsubmenuap, self.Header.buildCallCenterStatusSubMenu(callstatus));
              var num = $(this).index() - 1;
              var pxels = num * 38;
              self.Header.state.callsubmenuap.children[0].style.top = pxels + "px";

              if ($(this).attr("checkopen") == "false") {
                $(this).attr("checkopen", "true");
                $(".callstatussubmenu").show(200, "linear");
                $(this).children("i").addClass("fasrotate");
              } else {
                $(".callstatussubmenu").hide(200, "linear");
                $(this).children("i").removeClass("fasrotate");
                $(this).attr("checkopen", "false");

              }

            } else {
              $(".callstatussubmenu").hide(200, "linear");

              setTimeout(() => {
                self.Header.state.callsubmenuap.innerHTML = "";
                self.Tdg.append(self.Header.state.callsubmenuap, self.Header.buildCallCenterStatusSubMenu(callstatus));
                var num = $(this).index() - 1;
                var pxels = num * 38;
                self.Header.state.callsubmenuap.children[0].style.top = pxels + "px";

                if ($(this).attr("checkopen") == "false") {
                  $(this).attr("checkopen", "true");
                  $(".callstatussubmenu").show(200, "linear");
                  $(this).children("i").addClass("fasrotate");
                } else {
                  $(".callstatussubmenu").hide(200, "linear");
                  $(this).children("i").removeClass("fasrotate");
                  $(this).attr("checkopen", "false");

                }
              }, 200);
            }
          }

        }


      }
    }

  }

  handleLanguage = (element, parent) => {
    this.swapLanguage(parent,element);

    sessionStorage.setItem("lang-id", parent.getAttribute("lang-id"));

      this.getResponse({
      route: "setLanguage",
      act: "changeLanguage",
      ns: "Helpers",
      lang_id: parent.getAttribute("lang-id")
    }).then(x => {
      this.buildNotice({ msg: "ენა შეიცვალა" });
      this.state.langMenu.click();
      window.location.reload()
    })

  
  }

  swapLanguage = (parent, element) => {
    var oldElement = {
      src: parent.children[0].src,
      name: parent.children[1].innerHTML,
      id: parent.getAttribute("lang-id")
    }

    var newElement = {
      src: element.children[0].src,
      name: element.children[1].innerHTML,
      id: element.getAttribute("lang-id")
    }

    element.children[0].src=oldElement.src;
    element.children[1].innerHTML=oldElement.name;
    element.setAttribute("lang-id", oldElement.id);
    
    parent.children[0].src=newElement.src;
    parent.children[1].innerHTML=newElement.name;
    parent.setAttribute("lang-id", newElement.id);
  }

  handleStatusMenu = function (e) {

    self.Tdg.getResponse({
      route: "user",
      act: "setUserWorkStatus",
      work_status_id: $(this).attr('status-id'),
      ns: "Helpers"
    })

    var AswapI = $(this).children("i");
    var AswapSpan = $(this).children("span");

    var A_id = $(this).attr('status-id');
    var B_id = $('hidecontent > .profilemenuitems > a[btn="status"]').attr('status-id');

    $(this).attr('status-id', B_id);
    $('hidecontent > .profilemenuitems > a[btn="status"]').attr('status-id', A_id);

    var BswapI = $('hidecontent > .profilemenuitems > a[btn="status"]').children("i:eq(0)");
    var BswapSpan = $('hidecontent > .profilemenuitems > a[btn="status"]').children("span:eq(0)");

    self.Header.swapElement(AswapI, BswapI);
    self.Header.swapElement(AswapSpan, BswapSpan);
  }


  handleCallStatusMenu = async function (e) {

    var source_id = 0;
    var key = "";


    if ($(e.target.parentNode).attr("key")) {
      key = $(e.target.parentNode).attr("key");
      source_id = $(e.target.parentNode).attr("channel-id");
    } else {
      key = $(e.target.parentNode.children[0]).attr("key");
      source_id = $(e.target.parentNode.children[0]).attr("channel-id");
    }

    if ($(this).attr("channel-id") == 1) {
      if (!$(this).hasClass("switchspanchange")) {

        sessionStorage.setItem($(this).attr("key") + "_actived_id_" + $(this).attr("status-id"), "1")

        await self.Header.setQueueControl($(this).attr("status-id"), 1, $(this).attr("queue"), true, source_id);

      } else {
        sessionStorage.setItem($(this).attr("key") + "_actived_id_" + $(this).attr("status-id"), "0")

        await self.Header.setQueueControl($(this).attr("status-id"), 0, $(this).attr("queue"), true, source_id);
      }
    } else {
      if (!$(this).hasClass("switchspanchange")) {
        sessionStorage.setItem($(this).attr("key") + "_actived_id_" + $(this).attr("status-id"), "1")

        //await self.Header.setQueueControl($(this).attr("status-id"), 1, $(this).attr("queue"));


      } else {
        sessionStorage.setItem($(this).attr("key") + "_actived_id_" + $(this).attr("status-id"), "0")

        //await self.Header.setQueueControl($(this).attr("status-id"), 0, $(this).attr("queue"));
      }
    }


    $(this).toggleClass("switchspanchange");
    $(this).children('.onoffspan').toggleClass("onoffspanchange");
    var num = 0;


    var data = document.querySelectorAll('a[key="' + key + '"]');

    data.forEach(o => {
      if (!o.children[2].children[0].getAttribute("class").includes('switchspanchange')) {
        num++;
      }
    })

    console.log(num)

    var elemets = document.querySelectorAll(".channelsubmenu");

    console.log($(elemets[0].children[1].children));
    $.each($(elemets[0].children[1].children), function (i, e) {

      if (i > 0) {
        if (data.length == num) {

          if ($(e).attr("channel-id") == source_id) {
            $(e.children[3].children[0]).removeClass("switchspanchange");
            $(e.children[3].children[0].children[0]).removeClass("onoffspanchange");
          }
        } else {
          if ($(e).attr("channel-id") == source_id) {

            $(e.children[3].children[0]).addClass("switchspanchange");
            $(e.children[3].children[0].children[0]).addClass("onoffspanchange");
          }
        }
      }

    })



  }

  setQueueControl = async (id, actived, queue, array = false, channel_id) => {
    if (array) {
      var data = [];
      data = self.Header.state.callstatus[channel_id];

      for (let i = 0; i < data.length; i++) {
        await self.Tdg.getResponse({
          route: "user",
          act: "setQueueControl",
          ext_id: data[i].id,
          queue_name: data[i].name,
          actived: actived,
          ns: "Helpers"
        })

        data[i].actived = actived;
      }

    } else {
      await self.Tdg.getResponse({
        route: "user",
        act: "setQueueControl",
        ext_id: id,
        queue_name: queue,
        actived: actived,
        ns: "Helpers"
      })
    }

  }

}