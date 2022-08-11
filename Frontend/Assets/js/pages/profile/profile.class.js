import Tdg from "../../tdg.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy } from "../../helpers/kendo.helper.js";

export default class Profile extends Tdg {

    constructor() {
        super();
        self.Profile = this;

        this.state = {
            sectionName: document.querySelector("section[profile]"),
            element: [],
            userinfo: []
        }
        
        document.title = "Profile";
        
        this.removeLoading()
        this.getInfo();
    }

    getInfo = async ()=> {
      self.Tdg.getResponse({
        route:"Profile", 
        act: "getUserInfo", 
        user_id: 48
      }).then(async (data) => {

        this.state.userinfo = {
          job:          data[0]['job'],
          name:         data[0]['name'],
          adress:       data[0]['mail'],
          picture:      data[0]['image'],
          sex:          data[0]['gender'],
          place:        data[0]['region'],
          mail:         data[0]['address'],
          language:     data[0]['language'],
          department:   data[0]['department'],
          birthday:     data[0]['birth_date'],
          work:         data[0]['work_place'],
          company:      data[0]['company_name'],
          phone:        data[0]['mobile_number'],
          rating:       data[0]['raiting_number'],
          responsible:  data[0]['responsible_user'],
          fb:           data[0]['fb_link'],
          ig:           data[0]['instagram_link'],
          linkedin:     data[0]['linkedin_link'],
          twitter:      data[0]['twitter_link']
        }
        this.init();
      });
    }
    
    init = () => {
      this.append(this.state.sectionName, this.createCard())
      this.state.profilePageDiv = this.CreateElement ({
        element: "div",
        style: {
          minWidth: '200px'
        }
    })

    this.append(this.state.sectionName, this.buildTaskTabs());
    this.append(this.state.sectionName, this.FilterProfilePage());

    this.append(this.state.element.filterprofilepage, this.state.profilePageDiv);

    // window.addEventListener('load', function () {
    // javascriptCalendar.init({
    //     disablePastDays: true
    //   });
    // })

    //   var javascriptCalendar = {
    //       month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    //       next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    //       previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    //       label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    //       activeDates: null,
    //       date: new Date(),
    //       todaysDate: new Date(),
        
    //       init: function (options) {
    //         this.options = options
    //         this.date.setDate(1)
    //         this.createMonth()
    //         this.createListeners()
    //       },
        
    //       createListeners: function () {
    //         var _this = this
    //         this.next.addEventListener('click', function () {
    //           _this.clearCalendar()
    //           var nextMonth = _this.date.getMonth() + 1
    //           _this.date.setMonth(nextMonth)
    //           _this.createMonth()
    //         })

    //         this.previous.addEventListener('click', function () {
    //           _this.clearCalendar()
    //           var prevMonth = _this.date.getMonth() - 1
    //           _this.date.setMonth(prevMonth)
    //           _this.createMonth()
    //         })
    //       },
        
    //       createDay: function (num, day, year) {
    //         var newDay = document.createElement('div')
    //         var dateEl = document.createElement('span')
    //         dateEl.innerHTML = num
    //         newDay.className = 'cal-date'
    //         newDay.setAttribute('data-calendar-date', this.date)
        
    //         if (num === 1) {
    //           if (day === 0) {    
    //             newDay.style.marginLeft = (6 * 14.28) + '%'
    //           } else {
    //             newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
    //           }
    //         }
        
    //         if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
    //           newDay.classList.add('cal-date--disabled')          
    //         } else {
    //           newDay.classList.add('cal-date--active')
    //           newDay.setAttribute('data-calendar-status', 'active')
    //         }
        
    //         if (this.date.toString() === this.todaysDate.toString()) {
    //           newDay.classList.add('cal-date--today')
    //         }
        
    //         newDay.appendChild(dateEl)
    //         this.month.appendChild(newDay)

    //       },
          
        
    //       dateClicked: function () {
    //         var _this = this
    //         this.activeDates = document.querySelectorAll(
    //           '[data-calendar-status="active"]'
    //         )
    //         for (var i = 0; i < this.activeDates.length; i++) {
    //           this.activeDates[i].addEventListener('click', function (event) {
    //             var picked = document.querySelectorAll(
    //               '[data-calendar-label="picked"]'
    //             )[0]
    //             picked.innerHTML = this.dataset.calendarDate
    //             _this.removeActiveClass()
    //             this.classList.add('cal-date--selected')
    //           })
    //         }
    //       },
        
    //       createMonth: function () {
    //         var currentMonth = this.date.getMonth()
    //         while (this.date.getMonth() === currentMonth) {
    //           this.createDay(
    //             this.date.getDate(),
    //             this.date.getDay(),
    //             this.date.getFullYear(),
    //           )
    //           this.date.setDate(this.date.getDate() + 1)
    //         }

    //         this.date.setDate(1)
    //         this.date.setMonth(this.date.getMonth() - 1)
        
    //         this.label.innerHTML =
    //           this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    //         this.dateClicked()
    //       },
        
    //       monthsAsString: function (monthIndex) {
    //         return [
    //           'January',
    //           'Febuary',
    //           'March',
    //           'April',
    //           'May',
    //           'June',
    //           'July',
    //           'August',
    //           'September',
    //           'October',
    //           'November',
    //           'December'
    //         ][monthIndex]
    //       },
        
    //       clearCalendar: function () {
    //         javascriptCalendar.month.innerHTML = ''
    //       },
        
    //       removeActiveClass: function () {
    //         for (var i = 0; i < this.activeDates.length; i++) {
    //           this.activeDates[i].classList.remove('cal-date--selected')
    //         }
    //       }
    //   }

  }   

  FilterProfilePage = () => {

    this.state.element.filterprofilepage = this.CreateElement({
        element: "filterprofilepage",
    })

    return this.state.element.filterprofilepage;
  }


    getActiveTab = (tabs) => {
      let activeTab =  window.location.href.split("#")[1];
      if (activeTab == '' || activeTab == undefined) {
        tabs.children[0].click();
      } else {
      tabs.childNodes.forEach(tab => {
        if (tab.getAttribute("url") == activeTab) {
          tab.click();
        }
      })
    }
  }

  getTabContent = (key) => {
      switch (key) {
        case "main": 
          this.append(this.state.profilePageDiv, this.createUserInfo());                
        break;
        case "tasks": 
          this.append(this.state.profilePageDiv, this.createTableInfo());                
        break;
        case "calendar": 
          this.append(this.state.profilePageDiv, this.createCalendarInfo());                
        break;
        default:
          this.append(this.state.profilePageDiv, this.createUserInfo());
        break;
      }
  }

  getTabs = () => {
    let tabData =   [
        {
            name:"<img id='task-img' src='Frontend/Assets/images/icons/user1.svg'> მთავარი",
            content_id: "main",
            id: 1
        },
        {
            name:"<img id='task-img' src='Frontend/Assets/images/icons/briefcase.svg'> დავალებები",
            content_id: "tasks",
            id: 2
        },
        {
            name:"<img id='calendar-img' src='Frontend/Assets/images/icons/calendar.svg'> კალენდარი",
            content_id: "calendar",
            id: 3
        }
    ];

    return tabData;
  }

  buildTaskTabs = () => {
    var tmp = [];
    tmp = this.getTabs();

    this.state.element.taskTabs = this.CreateElement({
        element: "taskTabs"
    })

    tmp.forEach(el => {
        this.append(this.state.element.taskTabs, this.CreateElement({
            element: "tab",
            children: el.name,
            'tab-id': el.id,
            onclick: this.tabClick,
            url: el.content_id
        }))
    })

    this.getActiveTab(this.state.element.taskTabs);

    return this.state.element.taskTabs;

  }

  tabClick = (e) => {
    this.state.profilePageDiv.innerHTML = '';
    this.state.element.taskTabs.childNodes.forEach(child => {
      child.classList.remove("active");
    });

    e.target.classList.add("active");

    var content_id = e.target.getAttribute("url");

    window.location.hash = content_id;

    this.getTabContent(content_id);
  }

  createCard = () => {
    this.state.element.card = this.CreateElement({
      element: "div",
      class: "card",
    },this.createProfilePicture(), this.CreateElement({
      element: "div",
    }, this.createUserName(), this.createUserWorkPlace(), 
      this.createUserRating()), this.createUserPlace(), 
      this.createSocialMediaIcons())
    return this.state.element.card;
  }

  createProfilePicture = () => {
    this.state.element.profilepicture = this.CreateElement({
      element: "img",
      src: this.state.userinfo.picture
    })
      return this.state.element.profilepicture
  }

  createUserName = () => {
    this.state.element.username = this.CreateElement({
      element: "h3",
      children: this.state.userinfo.name
    })
      return this.state.element.username
  }

  createUserWorkPlace = () => {
    this.state.element.userworkplace = this.CreateElement({
      element: "p",
      class: "userworkplace",
      children: this.state.userinfo.work
    })
    return this.state.element.userworkplace
  }

  createUserRating = () => {
    this.state.element.userrating = this.CreateElement({
      element: "p",
      class: "rating",
      children: this.state.userinfo.rating
    },this.CreateElement({
      element: "div",
      children: `<img src="Frontend/Assets/images/icons/star.svg" alt="star">
        <img src="Frontend/Assets/images/icons/star.svg" alt="star">
        <img src="Frontend/Assets/images/icons/star.svg" alt="star">
        <img src="Frontend/Assets/images/icons/star.svg" alt="star">
        <img src="Frontend/Assets/images/icons/star3.png" alt="star">`
      }))

      return this.state.element.userrating
    }

    createUserPlace = () => {
      this.state.element.userplace = this.CreateElement({
        element: "div",
        class: "place",
        children: this.state.userinfo.place
      }, this.CreateElement({
        element: "img",
        src: "Frontend/Assets/images/icons/mappin.svg"
      }))
      return this.state.element.userplace
    }

    createSocialMediaIcons = () => {
      this.state.element.socialmedia = this.CreateElement({
        element: "div",
        class: "socialmedia",
      }, this.createFbLink(), this.createIgLink(), this.createLinkedInLink(), this.createTwitterLink())
      return this.state.element.socialmedia
    }

    createFbLink = () => {
      this.state.element.fblink = this.CreateElement({
        element: "a",
        children: `<img src="Frontend/Assets/images/icons/facebook2.svg">`,
        href: this.state.userinfo.fb
      })
      return this.state.element.fblink
    }

    createIgLink = () => {
      this.state.element.iglink = this.CreateElement({
        element: "a",
        children: `<img src="Frontend/Assets/images/icons/instagram3.svg">`,
        href: this.state.userinfo.ig
      })
      return this.state.element.iglink
    }

    createLinkedInLink = () => {
      this.state.element.linkedin = this.CreateElement({
        element: "a",
        children: `<img src="Frontend/Assets/images/icons/linkedin.svg">`,
        href: this.state.userinfo.linkedin
      })
      return this.state.element.linkedin
    }

    createTwitterLink = () => {
      this.state.element.twitter = this.CreateElement({
        element: "a",
        children: `<img src="Frontend/Assets/images/icons/twitter.svg">`,
        href: this.state.userinfo.twitter
      })
      return this.state.element.twitter
    }

    createUserInfo = () => {
        this.state.element.userinfo = this.CreateElement({
          element: "div",
          style: {
            width: "100%",
            background: "var(--white)",
            borderRadius: "7px"
          }
        }, this.CreateElement({
          element: "div",
          class: "user-info",
          id: "userinfo",
        },this.workingPlaceInfo(),
          this.contactInfo(), 
          this.mainInfo(), 
          this.companyInfo()))
        return this.state.element.userinfo;
    }

    workingPlaceInfo = () => {
      this.state.element.workingplaceinfo = this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "h3",
        class: "main-title",
        children: `სამუშაო ადგილი  <img src="Frontend/Assets/images/icons/rectangle.svg">`,
      }, this.createEditBtn(), this.createSaveBtn()), this.CreateElement({
        element: "div",
        class: "container",
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }
      }, this.CreateElement({
        element: "div",
        class: "left",
      }), this.CreateElement({
        element: "div",
        class: "right",
      }, this.createWorkingPlace(), this.createLocation())))
      return this.state.element.workingplaceinfo
    }


    createWorkingPlace = () => {
      this.state.element.workingplace = this.CreateElement({
        element: "input",
        class: "workingplace",
        id: "workingplace",
        readonly: true,
        value:  this.state.userinfo.job
      })
      return this.state.element.workingplace
    }

    createLocation = () => {
      this.state.element.createlocation = this.CreateElement({
        element: "input",
        class: "place-input",
        id: "place-input",
        readonly: true,
        value: this.state.userinfo.place
      })
      return this.state.element.createlocation
    }

    contactInfo = () => {
      this.state.element.contactinfo = this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "h3",
        class: "main-title",
        children: `საკონტაქტო ინფო  <img src="Frontend/Assets/images/icons/rectangle.svg">`,
      }, this.createEditBtn(), this.createSaveBtn()),
      this.CreateElement({
        element: "div",
        className: ["container"]
      }, this.CreateElement({
        element: "div",
        class: "left",
        children: `<p><img src="Frontend/Assets/images/icons/vector.svg" style="filter: var(--icon-color)">ტელეფონი</p>
        <p><img src="Frontend/Assets/images/icons/map-pin.svg" style="filter: var(--icon-color)">მისამართი</p>
        <p><img src="Frontend/Assets/images/icons/at-sign.svg" style="filter: var(--icon-color)">E-mail</p>`
      }), this.CreateElement({
        element: "div",
        class: "right"
      }, this.createPhone(), this.createAdress(), this.createMail())))
      return this.state.element.contactinfo
    }

    createPhone = () => {
      this.state.element.phone =  this.CreateElement({
        element: "input",
        class: "phone",
        id: "phone",
        readonly: true,
        value: this.state.userinfo.phone
      })
      return this.state.element.phone
    }

    createAdress = () => {
      this.state.element.createadress = this.CreateElement({
        element: "input",
        id: "adress",
        class: "adress",
        readonly: true,
        value: this.state.userinfo.adress
      })
      return this.state.element.createadress
    }

    createMail = () => {
      this.state.element.createmail = this.CreateElement({
        element: "input",
        id: "mail",
        class: "mail",
        readonly: true,
        value: this.state.userinfo.mail
      })
      return this.state.element.createmail
    }

    mainInfo = () => {
      this.state.element.maininfo = this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "h3",
        class: "main-title",
        children: `ძირითადი ინფო  <img src="Frontend/Assets/images/icons/rectangle.svg">`,
      }, this.createEditBtn(), this.createSaveBtn()), this.CreateElement({
        element: "div",
        class: "container"
      }, this.CreateElement({
        element: "div",
        class: "left",
        children: `<p><img src="Frontend/Assets/images/icons/calendar.svg" style="filter: var(--icon-color)">დაბადების თარიღი</p>
        <p><img src="Frontend/Assets/images/icons/sex.svg" style="filter: var(--icon-color)">სქესი</p>
        <p><img src="Frontend/Assets/images/icons/globe.svg" style="filter: var(--icon-color)">ენა</p>`
      }), this.CreateElement({
        element: "div",
        class: "right",
      }, this.createBirthday() , this.createGender(), this.createLanguage())))
      return this.state.element.maininfo
    }

    createBirthday = () => {
      this.state.element.createbirthday = this.CreateElement({
        element: "input",
        readonly: true,
        class: "birthday",
        id: "birthday",
        value: this.state.userinfo.birthday
        
      })
      return this.state.element.createbirthday
    }

    // createGender = () => {
    //   this.state.element.creategender = this.CreateElement({
    //     element: "input",
    //     readonly: true,
    //     class: "sex",
    //     id: "sex",
    //     value: this.state.userinfo.sex
    //   })
    //   return this.state.element.creategender
    // }
    
    createGender= () => {
      this.state.element.creategender = this.CreateElement({
        element: "kendo",
        type: "selector",
        class: "sex",
        id: "sex",
        title: this.state.userinfo.sex,
        data: {
          route:"Profile", 
          // act: "getDepartment",
        },
        onLoad: (event) => {

        },
        onChange: (event) => {

        }
      })
      return this.state.element.creategender
    }

    createLanguage = () => {
      this.state.element.createlanguage = this.CreateElement({
        element: "input",
        readonly: true,
        class: "language",
        id: "language",
        value: this.state.userinfo.language
      })
      return this.state.element.createlanguage
    }

    companyInfo = () => {
      this.state.element.companyinfo = this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "h3",
        class: "main-title",
        children: `კომპანია  <img src="Frontend/Assets/images/icons/rectangle.svg">`,
      }, this.createEditBtn(), this.createSaveBtn()), this.CreateElement({
        element: "div",
        class: "container"
      }, this.CreateElement({
        element: "div",
        class: "left",
        children: `<p><img src="Frontend/Assets/images/icons/business.svg" style="filter: var(--icon-color)">კომპანიის დასახელება</p>
        <p><img src="Frontend/Assets/images/icons/user1.svg" style="filter: var(--icon-color)">პასუხისმგებელი პირი</p>
        <p><img src="Frontend/Assets/images/icons/settings.svg" style="filter: var(--icon-color)">დეპარტამენტი</p>`
      }), this.CreateElement({
        element: "div",
        class: "right",
      }, this.createCompany(), this.createResponsible(), this.createDepartment())))
      return this.state.element.companyinfo
    }
    
    createCompany = () => {
      this.state.element.createcompany = this.CreateElement({
        element: "input",
        readonly: true,
        class: "company",
        id: "company",
        value: this.state.userinfo.company
      })
      return this.state.element.createcompany
    }

    // createResponsible = () => {
    //   this.state.element.createresponsible = this.CreateElement({
    //     element: "input",
    //     readonly: true,
    //     class: "responsible",
    //     id: "responsible",
    //     value: this.state.userinfo.responsible
    //   })
    //   return this.state.element.createresponsible
    // }

    createResponsible = () => {
      this.state.element.createresponsible = this.CreateElement({
        element: "kendo",
        type: "selector",
        class: "responsible",
        id: "responsible",
        title: this.state.userinfo.responsible,
        data: {
          route:"Profile", 
          act: "getResponsibleUser",
        },
        onLoad: (event) => {
    
        },
        onChange: (event) => {
    
        }    
      })
      return this.state.element.createresponsible
    }

    // createDepartment = () => {
    //   this.state.element.createdepartment = this.CreateElement({
    //     element: "input",
    //     readonly: true,
    //     class: "department",
    //     id: "department",
    //     value: this.state.userinfo.department
    //   })
    //   return this.state.element.createdepartment
    // }


    createDepartment = () => {
      this.state.element.createdepartment = this.CreateElement({
        element: "kendo",
        type: "selector",
        class: "department",
        id: "department",
        title: this.state.userinfo.department,
        data: {
          route:"Profile", 
          act: "getDepartment",
        },
        onLoad: (event) => {
    
        },
        onChange: (event) => {
    
        }    
      })
      return this.state.element.createdepartment
    }

    createEditBtn = () => {
      this.state.element.editicon = this.CreateElement({
        element: "img",
        class: "pen",
        id: "pen",
        src: "Frontend/Assets/images/icons/pen.svg",
        onClick: (e) => this.onEditClick(e)
      })
      return this.state.element.editicon
    }

    createSaveBtn = () => {
      this.state.element.saveicon = this.CreateElement({
        element: "img",
        class: "arrow",
        id: "arrow",
        src: "Frontend/Assets/images/icons/check.svg",
        onClick: (e) => this.onSaveClick(e)
      })
      return this.state.element.saveicon
    }

    onEditClick = (e) => {
      var dataInput = e.target.parentNode.parentNode.children[1].children[1];
      var dataImg = e.target.parentNode;
      dataImg.children[1].style.display="none";
      dataImg.children[2].style.display="initial";
      dataInput.children[0].removeAttribute('readonly');
      dataInput.children[0].style.cssText = "border: 1px solid #1E88E5;border-radius: 4px; cursor: text";
      dataInput.children[1].removeAttribute('readonly');
      dataInput.children[1].style.cssText = "border: 1px solid #1E88E5;border-radius: 4px; cursor: text;";
      dataInput.children[2].removeAttribute('readonly');
      dataInput.children[2].style.cssText = "border: 1px solid #1E88E5;border-radius: 4px; 14px;cursor: text;";    
    }

    onSaveClick = (e) => {
      var dataInput = e.target.parentNode.parentNode.children[1].children[1];
      var dataImg = e.target.parentNode;
      dataImg.children[2].style.display="none";
      dataImg.children[1].style.display="initial";
      dataInput.children[0].style.cssText="border: none; cursor: default";
      dataInput.children[1].style.cssText="border: none; cursor: default";
      dataInput.children[2].style.cssText="border: none; cursor: default";
      dataInput.children[0].setAttribute('readonly', '1');
      dataInput.children[1].setAttribute('readonly', '2');
      dataInput.children[2].setAttribute('readonly', '3');
    }


    createTableInfo = () => {
      this.state.element.tableinfo = this.CreateElement({
        element: "div",
        style: {
          width: "100%",
          height: '400px',
          background: "var(--white)",
          borderRadius: "7px"
        }
      }, this.CreateElement({
        element: "div",
        class: "table-info",
        id: "userinfo",
      }, this.createTable()))
      return this.state.element.tableinfo
    }

    createTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            id: "table",
            className: ["kendo-table"],
            children: `<button>დამატება + </button>`,
            column: [
                {
                    field: "დაწყების თარიღი"
                },
                {
                    field: "ბოლო ვადა"
                },
                {
                    field: "დასახელება"
                },
                {
                    field: "შემსრულებელი"
                },
                {
                    field: "პასუხისმგებელი პირი"
                },
                {
                    field: "განყოფილება"
                },
                {
                    field: "სტატუსი"
                },
            ],
            option: {
                header: false,
                numeric: false,
                export: {
                    excel: true,
                    pdf: false
                },
                footer: false
            },
        })
        return this.state.element.table;
    }

    tasks = [
      {
        time: "02:00",
        taskname: "შეხვედრა",
        time2: "02:00 - 03:00"
      },
      {
        time: "04:00",
        taskname: "შეხვედრა_2",
        time2: "04:00 - 05:00"
      }
    ]

    createCalendarInfo = () => {
      this.state.element.calendarinfo = this.CreateElement({
        element: "div",
        style: {
          width: "100%",
          height: '600px',
          background: "var(--white)",
          borderRadius: "7px"
        }
      }, this.CreateElement({
        element: "div",
        class: "calendar-info",
        id: "userinfo",
      }, this.createTaskBox()))
      return this.state.element.calendarinfo
    }

    createTaskBox = () => {
      this.state.element.taskbox = this.CreateElement({
        element: "div",
        class: "box-container"
      }, this.CreateElement({
        element: "div",
        class: "box"
      }, this.CreateElement({
        element: "div"
      }, this.CreateElement({
        element: "div",
        class: "box-border-grid"
      }, this.CreateElement({
        element: "div",
        class: "box-border"
      }), this.taskBoxTime() , this.CreateElement({
        element: "div",
        class: "box-border"
      })), this.CreateElement({
        element: "div",
        class: "box-grid"
      }, this.CreateElement({
        element: "div",
        class: "box-square"
      }), this.taskBoxTitle(), this.taskboxDateTime()), 
      this.CreateElement({
        element: "div",
        class: "box-border-grid"
      }, this.CreateElement({
        element: "div",
        class: "box-border"
      }), this.CreateElement({
        element: "div",
        class: "box-task-title",
        children: `${this.tasks[1].time}`
      }), this.CreateElement({
        element: "div",
        class: "box-border"
      })), this.CreateElement({
        element: "div",
        class: "box-grid"
      }, this.CreateElement({
        element: "div",
        class: "box-square",
        style: {
          background: "#FEB019"
        }
      }), this.CreateElement({
        element: "p",
        class: "box-p",
        children: `${this.tasks[1].taskname}`
      }), this.CreateElement({
        element: "p",
        class: "box-p-time",
        children: `${this.tasks[1].time2}`
      })))))
      return this.state.element.taskbox
    }
    
    taskBoxTime = () => {
      this.state.element.taskboxtime = this.CreateElement({
        element: "div",
        class: "box-task-title",
        children: `${this.tasks[0].time}`
      })
      return this.state.element.taskboxtime
    }

    taskBoxTitle = () => {
      this.state.element.taskboxtitle = this.CreateElement({
        element: "p",
        class: "box-p",
        children: `${this.tasks[0].taskname}`
      })
      return this.state.element.taskboxtitle
    }

    taskboxDateTime = () => {
      this.state.element.taskboxdatetime = this.CreateElement({
        element: "p",
        class: "box-p-time",
        children: `${this.tasks[0].time2}`
      })
      return this.state.element.taskboxdatetime
    }


    // calendar = () => {
    //     this.state.element.calendartable = this.CreateElement({ 
    //         element: "div",
    //         className: ["calendartable"],
    //         id: "calendartable",
    //         type: "calendar",
    //     }, this.CreateElement({
    //       element: "button",
    //       children: "დამატება +"
    //     }), this.CreateElement({
    //       element: "div",
    //       className: ["calendar-grid-container"]
    //     }, this.CreateElement({
    //       element: "div",
    //       className: ["calendarcontainer"]
    //     }, this.CreateElement({
    //       element: "div",
    //       className: ["cal-header"],
    //       children: `<div class="cal-header-label" data-calendar-label="month"></div>
    //       <button class="cal-btn" data-calendar-toggle="previous">
    //        <p> < </p>
    //       </button>
    //       <button class="cal-btn" data-calendar-toggle="next">
    //        <p> > </p>
    //       </button>
    //       </div>`
    //     }), this.CreateElement({
    //       element: "div",
    //       id: "js-cal"
    //     }, this.CreateElement({
    //       element: "div",
    //       className: ["cal-week"],
    //       children: `
    //       <span>M</span>
    //       <span>T</span>
    //       <span>W</span>
    //       <span>T</span>
    //       <span>F</span>
    //       <span>S</span>
    //       <span>S</span>
    //       <div class="cal-body" data-calendar-area="month"></div>
    //       `
    //     })), this.CreateElement({
    //       element: "p",
    //       className: ["date-picked"],
    //       children: `<span data-calendar-label="picked"></span>`
    //     }))))

    //     return this.state.element.calendartable; 
    // }

}
