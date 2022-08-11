import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendo_SelectedID, kendo__refresh, kendoResponsive, kendo__multiSelectedID } from "../../helpers/kendo.helper.js";
import Uploader from "../../components/uploader/uploader.class.js";


export default class activity_page extends Tdg {
    constructor() {
        super();
        self.activity_page = this;

        this.state = {
            sectionName: document.querySelector("section[activity_page]"),
            element: []
        }
        this.removeLoading();
        this.init();
        
    }

    getPersonalMessages = () => {
        return [{datetime:"2025.05.12",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ანი გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამარჯობა დათო როგორ ხარ?"
            },
            {
                datetime:"2022.07.22",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            {
                datetime:"2022.07.22",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:" გამოგიგზვანე უკვე ფაილები"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამოგიგზვანე უკვე ფაილები"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამარჯობა როგორ ხარ?"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            ];
    }

    getUnreadMessages = () => {
        return [{datetime:"2025.05.12",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"გიორგი გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამარჯობა დათო როგორ ხარ?"
            },
            {
                datetime:"2022.07.22",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ლაშა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            {
                datetime:"2022.07.22",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ლუკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:" გამოგიგზვანე უკვე ფაილები"

            },
            {
                datetime:"2022.07.13",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"თიკო გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამოგიგზვანე უკვე ფაილები"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"გამარჯობა როგორ ხარ?"

            },
            {
                datetime:"2022.07.23",
                surati1:"Frontend/Assets/images/icons/default.svg",
                surname:"ნიკა გაბუნია",
                time:"20:05:07",
                imgpoitns:"Frontend/Assets/images/icons/point.svg",
                ask:"დაზღვევაზე მოთხოვნის გასაგზავნად დილერი ცხრილში მონიშნავს იმ მანქანას რომლის დაზღვევაც სურს და დააჭერს ცხრილის თავზე არსებულ დაზღვევის ღილაკს"

            },
            ];
    }

    init = () =>{
        this.append(this.state.sectionName,this.containerDiv())
    
    }
    containerDiv = () =>{
        this.state.element.containerDiv = this.CreateElement({
            element:"div",
            class:"div",
        },this.frameDiv(),this.userName(),this.grup(),this.grupTupe(),
           this.filenameDiv1(),this.CreatePost(),this.news1(),this.Surveys(),
           this.initiative(),this.CreatePost2())
         return this.state.element.containerDiv
    }


    frameDiv = () =>{
        this.state.element.frameDiv = this.CreateElement({
            element:"div",
            class:"Frame",
        },this.frameDiv1(),this.frameDiv2(),this.frameDiv3(),this.frameDiv4(),)
         return this.state.element.frameDiv
    }
    
    frameDiv1 = () =>{
        this.state.element.containerDiv = this.CreateElement({
            element:"div",
            class:"frameDiv",
        },this.pimgDiv(),this.pimgDiv1(),this.pimgDiv2(),this.pimgDiv3(),this.pimgDiv4(),this.pimgDiv5(),)
        return this.state.element.containerDiv
    }

    
    pimgDiv = () =>{
        this.state.element.pimgDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv",
        },this.createImg(),this.paragrap())
         return this.state.element.pimgDiv
    }

    createImg = () =>{
        this.state.element.createImg = this.CreateElement({
            element:"img",
            class:"img",
            src:"Frontend/Assets/images/icons/sms1.svg"
        })
        return this.state.element.createImg
    }

    paragrap = () =>{
        this.state.element.paragrap = this.CreateElement({
            element:"p",
            class:"text",
            text:"Threads",
            onclick: () =>{
                let out=document.getElementById("#useri")
                $("#useri").css({"display":"flex"},)

                let show=document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"none","flexDirection":"column"})

                let out1 =document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"none"})

                let out2 =document.getElementById("#new1id")
                $("#new1id").css({"display":"none"})

                let out3 =document.getElementById("#createpostid")
                $("#createpostid").css({"display":"none"})

                let ou =document.getElementById("#surveysid")
                $("#surveysid").css({"display":"none"})

                let init =document.getElementById("#initiativeid")
                $("#initiativeid").css({"display":"none"})

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})

            }
        })
        return this.state.element.paragrap
    }

    pimgDiv1 = () =>{
        this.state.element.pimgDiv = this.CreateElement({    
            element:"div",
            class:"pimgDiv",
        },this.createImg1(),this.paragrapText())
         return this.state.element.pimgDiv
    }

    createImg1 = () =>{
        this.state.element.createImg1 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/Vr.svg"
        })
        return this.state.element.createImg1
    }

    paragrapText = () =>{
        this.state.element.paragrapText = this.CreateElement({
            element:"p",
            class:"texti",
            text:"პირადი შეტყობინება",
            id:"person",

            onclick: () =>{
                let out=document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"flex","flexDirection":"column"},)

                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})

                let out1 =document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"none"},)

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})
            }
        })
        return this.state.element.paragrapText
    }


    pimgDiv2 = () =>{
        this.state.element.pimgDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv",
        },this.createImg2(),this.paragrap2())
         return this.state.element.pimgDiv
    }

    createImg2 = () =>{
        this.state.element.createImg2 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/align-left 1.svg"
        })
        return this.state.element.createImg2
    }

    paragrap2 = () =>{
        this.state.element.paragrap2 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"წაუკითხავი შეტყობინება",
            onclick: ()=>{

                let out=document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"flex","flexDirection":"column"},)
            
                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})
    
                let out1 =document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"none"},)

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})
            }
             

        })
        return this.state.element.paragrap2
    }

    pimgDiv3 = () =>{
        this.state.element.pimgDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv",
        },this.createImg3(),this.paragrap3())
         return this.state.element.pimgDiv
    }

    createImg3 = () =>{
        this.state.element.createImg3 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/save.svg"
        })
        return this.state.element.createImg3
    }

    paragrap3 = () =>{
        this.state.element.paragrap3 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"შენახული",
            onclick: () =>{

                let out=document.getElementById("#useri")
                $("#useri").css({"display":"flex"},)
            
                let show=document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"none"})

                let time =document.getElementById("#grupTupe")
                $("#grupTupe").css({"display":"none"})

                let out1 =document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"none"},)

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})
            },
        })
        return this.state.element.paragrap3
    }


    pimgDiv4 = () =>{
        this.state.element.pimgDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv",
        },this.createImg4(),this.paragrap4())
         return this.state.element.pimgDiv
    }


    createImg4 = () =>{
        this.state.element.createImg4 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/grid 1.svg"
        })
        return this.state.element.createImg4
    }

    paragrap4 = () =>{
        this.state.element.paragrap4 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"ჯგუფები",
            onclick: () =>{

                let out=document.getElementById("#grupTupe")
                $("#grupTupe").css({"display":"flex"},)
            
                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})

                let time =document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"none"})

                let fim =document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"none"})

                let fim1 =document.getElementById("#surveysid")
                $("#surveysid").css({"display":"none"})

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})
            }
        })
        return this.state.element.paragrap4
    }


    pimgDiv5 = () =>{
        this.state.element.pimgDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv",
        },this.createImg5(),this.paragrap5())
         return this.state.element.pimgDiv
    }

    createImg5 = () =>{
        this.state.element.createImg5 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/file.svg"
        })
        return this.state.element.createImg5
    }

    paragrap5 = () =>{
        this.state.element.paragrap5 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"მიღებული ფაილები",
            onclick: ()=>{

                let out=document.getElementById("#filenameDiv1")
                $("#filenameDiv1").css({"display":"flex"},)
            
                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})

                let time =document.getElementById("#timeDivi")
                $("#timeDivi").css({"display":"none"})

                let fim =document.getElementById("#grupTupe")
                $("#grupTupe").css({"display":"none"})

                let fim1 =document.getElementById("#createpostid")
                $("#createpostid").css({"display":"none"})

                let inic =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"})
            }
        })
        return this.state.element.paragrap5
    }


    frameDiv2 = () =>{
        this.state.element.frameDiv2 = this.CreateElement({
            element:"div",
            class:"div2",
        },this.pimgDiv6(),this.pimgDiv7(),this.pimgDiv8(),)
        return this.state.element.frameDiv2
    }

    pimgDiv6 = () =>{
        this.state.element.pimgDiv6 = this.CreateElement({
            element:"div",
            class:"pimgDiv1",
        },this.paragrap6(),this.createImg6(),this.paragrap7())
         return this.state.element.pimgDiv6
    }

    paragrap6 = () =>{
        this.state.element.paragrap6 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"ჯგუფები"
        })
        return this.state.element.paragrap6
    }

    createImg6 = () =>{
        this.state.element.createImg6 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/plus 1.svg",
            class:"plusi",
            onclick: () => {
                this.buildModal(null,{
                    width: "432px",
                    height: "272px",
                    content: this.operatorDiv2(),
                    buttons: {
                        save: {
                            name: "შენახვა",
                            access: "save",
                            onclick: () => {
                                document.getElementById("testid").style.display="flex";
                                this.append(this.state.element.opDiv,this.inputTest())
                            }
                        },
                    },
                })
            }
        })
        return this.state.element.createImg6
    }

    paragrap7 = () =>{
        this.state.element.paragrap7 = this.CreateElement({
            element:"p",
            class:"textii",
            text:"ყველა"
        })
        return this.state.element.paragrap7
    }

    
    pimgDiv7 = () =>{
        this.state.element.pimgDiv7 = this.CreateElement({
            element:"div",
            class:"imgDiv3",
        },this.opDiv(),this.whatDiv(),)
         return this.state.element.pimgDiv7
    }
    opDiv = () =>{
        this.state.element.opDiv = this.CreateElement({
            element:"div",
            class:"pimgDiv3",
        }, this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                'flex-direction': 'row',
                gap: '20px'
            }
    },this.createImg7(),this.paragrap8()),this.inputTest())
        return this.state.element.opDiv
    }

    createImg7 = () =>{
        this.state.element.createImg7 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/lock.svg",
            class:"loc"
        })
        return this.state.element.createImg7
    }

    paragrap8 = () =>{
        this.state.element.paragrap8 = this.CreateElement({
            element:"p",
            class:"texti",
            text:"ოპერატორები",
            onclick: () => {
                let out2 =document.getElementById("#createpostid")
                $("#createpostid").css({"display":"flex"},)

                let out3 =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"none"},)
            
                let out =document.getElementById("#surveysid")
                $("#surveysid").css({"display":"none"},)

                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})

                let time =document.getElementById("#timeDivi")    
                $("#timeDivi").css({"display":"none"})

                let time1 =document.getElementById("#filenameDiv1")    
                $("#filenameDiv1").css({"display":"none"})

                let fim =document.getElementById("#grupTupe")
                $("#grupTupe").css({"display":"none"})

                let fim1 =document.getElementById("#new1id")
                $("#new1id").css({"display":"none"})

                let inic =document.getElementById("#initiativeid")
                $("#initiativeid").css({"display":"none"})
            }
        })
        return this.state.element.paragrap8
    }
    inputTest = () =>{
        this.state.element.inputTest = this.CreateElement({
            element:"p",
            class:"inputtestclas",
            text:"ტესტი",
            id:"testid",
            onclick: () =>{
                let testtime =document.getElementById("#createpostid2")
                $("#createpostid2").css({"display":"flex"})

                let testdata =document.getElementById("#createpostid")
                $("#createpostid").css({"display":"none"})
            
                let out =document.getElementById("#surveysid")
                $("#surveysid").css({"display":"none"})

                let show=document.getElementById("#useri")
                $("#useri").css({"display":"none"})

                let time =document.getElementById("#timeDivi")    
                $("#timeDivi").css({"display":"none"})

                let time1 =document.getElementById("#filenameDiv1")    
                $("#filenameDiv1").css({"display":"none"})

                let fim =document.getElementById("#grupTupe")
                $("#grupTupe").css({"display":"none"})

                let fim1 =document.getElementById("#new1id")
                $("#new1id").css({"display":"none"})

                let inic =document.getElementById("#initiativeid")
                $("#initiativeid").css({"display":"none"})
            }
    })
    return this.state.element.inputTest
}

    whatDiv = () =>{
        this.state.element.whatDiv = this.CreateElement({
            element:"div",
            class:"whatDiv",
        },this.createImg8())
        return this.state.element.whatDiv
    }
    createImg8 = () =>{
        this.state.element.createImg8 = this.CreateElement({
            element:"p",
            text:"WhatsApp მომხამრებლები",
            class:"texti"
        })
        return this.state.element.createImg8
    }
    
    pimgDiv8 = () =>{
        this.state.element.pimgDiv8 = this.CreateElement({
            element:"div",
            class:"pimgDiv2",
        },this.paragrap9(),this.paragrap10())
         return this.state.element.pimgDiv8
    }

    paragrap9 = () =>{
        this.state.element.paragrap9 = this.CreateElement({
            element:"p",
            class:"texti1",
            text:"მარკეტინგი"
        })
        return this.state.element.paragrap9
    }

    paragrap10 = () =>{
        this.state.element.paragrap10 = this.CreateElement({
            element:"p",
            class:"texti1",
            text:"მენეჯმენტი"
        })
        return this.state.element.paragrap10
    }


    frameDiv3 = () =>{
        this.state.element.frameDiv3 = this.CreateElement({
            element:"div",
            class:"div3",
        },this.pimgDiv9(),this.pimgDiv10(),)
        return this.state.element.frameDiv3
    }

    pimgDiv9 = () =>{
        this.state.element.pimgDiv9 = this.CreateElement({
            element:"div",
            class:"pimgDiv4",
        },this.paragrap11(),this.createImg9())
         return this.state.element.pimgDiv9
    }

    createImg9 = () =>{
        this.state.element.createImg9 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/volume-2.svg",
            class:"vol"
        })
        return this.state.element.createImg9
    }

    paragrap11 = () =>{
        this.state.element.paragrap11 = this.CreateElement({
            element:"p",
            class:"texti1",
            text:"პირადი შეტყობინება ",
        })
        return this.state.element.paragrap11
    }

    pimgDiv10 = () =>{
        this.state.element.pimgDiv10 = this.CreateElement({
            element:"div",
            class:"pimgDiv10",
        },this.createInput(),this.createImg10(),)
         return this.state.element.pimgDiv10
    }

     createInput = () =>{
        this.state.element.createInput = this.CreateElement({
          element:"input",
          class:"input",
          placeholder:"თანამშრომლის ძიება",
        })
        return this.state.element.createInput
     }

     createImg10 = () =>{
        this.state.element.createImg10 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/search.svg",
            class:"voli"
        })
        return this.state.element.createImg10
    }


    frameDiv4 = () =>{
        this.state.element.frameDiv4 = this.CreateElement({
            element:"div",
            class:"div4",
        },this.imgp())
        return this.state.element.frameDiv4
    }

    imgp = () =>{
    let myobj = [{name:"ანი გაბუნია",img:"Frontend/Assets/images/icons/10.svg"},
    {name:"გიორგი გაბუნია", img:"Frontend/Assets/images/icons/1568.svg"},
     {name:"ნინო გაბუნია", img:"Frontend/Assets/images/icons/10.svg" }];
     this.state.element.frameDiv5 = this.CreateElement({ // მშობელი დივი
        element:"div",
        class:"div5",
    })
     myobj.forEach((value)=>{
        this.state.element.createImg5 = this.CreateElement({ // ფოტო
            element:"img",
            src: value.img
        })
        this.state.element.paragrap5 = this.CreateElement({ // სახელი
            element:"p",
            class:"texti",
            text: value.name
        })
        this.state.element.pimgDivItem = this.CreateElement({ // შვილი დივი
            element:"div",
            class:"pimgDiv", 
          },this.state.element.createImg5,this.state.element.paragrap5); // ყველ ციკლზე ემატება შვილი დივი მშობელში
          this.state.element.frameDiv5.appendChild(this.state.element.pimgDivItem) //შვილი ვარდება მშობელში
     })
     
     return this.state.element.frameDiv5 // ციკლის მერე ბრუნდება აწყობილი მშობელი
}

  
    userName = () =>{
        this.state.element.userName = this.CreateElement({
            element:"div",
            class:"user",
            id:"useri"
        },this.uzerforEach(),this.Feedback(),this.adminisTrator(),this.buttonImg())
         return this.state.element.userName
    }

    uzerforEach = () =>{

        let myobj = [{username:"User_Name",img:"Frontend/Assets/images/icons/eli.svg",hour:"11 hours",date:"15.07.2022 10:05",
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        surati:"Frontend/Assets/images/icons/cofe.svg",userimg:"Frontend/Assets/images/icons/png.svg",userparagrap:"50",
        userComent:"11"}]

        this.state.element.userName1 = this.CreateElement({
            element:"div",
            class:"divs",
        })
         myobj.forEach((value)=>{
            
            this.state.element.createImg13 = this.CreateElement({
                element:"img",
                src:value.img,
            })
            this.state.element.paragrap13 = this.CreateElement({
                element:"p",
                class:"User",
                text:value.username,
            })
            this.state.element.paragrap14 = this.CreateElement({
                element:"p",
                class:"haurs",
                text:value.hour
            })
            this.state.element.paragrap15 = this.CreateElement({
                element:"p",
                class:"time",
                text:value.date
            })

            this.state.element.text = this.CreateElement({
                element:"p",
                class:"paragText",
                text:value.text
            })

            this.state.element.createImg15 = this.CreateElement({
                element:"img",
                src:value.surati,
                class:"surati",
            })

            this.state.element.userimg = this.CreateElement({
                element:"img",
                src:value.userimg,
                class:"userimg",
            })

            this.state.element.userparagrap = this.CreateElement({
                element:"p",
                text:value.userparagrap,
                class:"userparagrap",
            })

            this.state.element.userComent = this.CreateElement({
                element:"p",
                text:value.userComent  + "comment",
                class:"userComent",
            })

            this.state.element.userName2 = this.CreateElement({ // შვილი დივი
                element:"div",
                class:"paragrap", 
              },this.CreateElement({
                element: "div",
                class:"eli",
              },this.state.element.createImg13, this.CreateElement({
                element: "div"
              },this.state.element.paragrap13,
              this.state.element.paragrap14)),this.state.element.paragrap15);

              this.state.element.twoDiv = this.CreateElement({
                element:"div",
                class:"twoDiv",
              })

            this.state.element.createDiv = this.CreateElement({
                element:"div",
                class:"userdiv1",
            },this.state.element.userimg,this.state.element.userparagrap,this.state.element.userComent,)

            this.state.element.suratDiv = this.CreateElement({
                element:"div",
                class:"suratDiv",
            },this.state.element.createImg15)

            this.state.element.shear = this.CreateElement({
                element:"div",
                class:"suratDiv",
            })
              this.state.element.userName1.appendChild(this.state.element.userName2)
              this.state.element.userName1.appendChild(this.state.element.text)
              this.state.element.userName1.appendChild(this.state.element.twoDiv)
              this.state.element.twoDiv.appendChild(this.state.element.suratDiv)
            this.state.element.twoDiv.appendChild(this.state.element.createDiv)

        })
         return this.state.element.userName1    
    }


    Feedback = () =>{
        this.state.element.Feedback =this.CreateElement({
            element:"div",
            class:"Feedback"
        },this.likeButton(),this.comentButton(),this.shearButton())
        return this.state.element.Feedback 
    }

    likeButton = () =>{
        this.state.element.likeButton =this.CreateElement({
            element:"div",
            class:"likeButton"
        },this.likeImg(),this.likePwaragrap(),)
        return this.state.element.likeButton
    }

    likeImg = () =>{
        this.state.element.likeButton =this.CreateElement({
            element:"img",
            class:"likeButon",
            src:"Frontend/Assets/images/icons/lik.svg"
        })
        return this.state.element.likeButton
    }


    likePwaragrap = () =>{
        this.state.element.likePwaragrap = this.CreateElement({
            element:"p",
            text:"მოწონება",
            class:"likePwaragrap",
        })
        return this.state.element.likePwaragrap
    }

    
    comentButton = () =>{
        this.state.element.comentButton =this.CreateElement({
            element:"div",
            class:"comentButton"
        },this.comenImg(),this.comentParagrap())
        return this.state.element.comentButton
    }


    comenImg = () =>{
        this.state.element.comenImg =this.CreateElement({
            element:"img",
            class:"comenImg",
            src:"Frontend/Assets/images/icons/coment.svg"
        })
        return this.state.element.comenImg
    }

    comentParagrap = () =>{
        this.state.element.comentParagrap = this.CreateElement({
            element:"p",
            text:"კომენტარი",
            class:"comentParagrap",
        })
        return this.state.element.comentParagrap
    }


    shearButton = () =>{
        this.state.element.shearButton =this.CreateElement({
            element:"div",
            class:"shearButton"
        },this.shearImg(),this.shearParagrap())
        return this.state.element.shearButton
    }

    shearParagrap = () =>{
        this.state.element.shearParagrap = this.CreateElement({
            element:"p",
            text:"გაზიარება",
            class:"shearParagrap",
        })
        return this.state.element.shearParagrap
    }

    shearImg = () =>{
        this.state.element.shearImg = this.CreateElement({
            element:"img",
            class:"shearImg",
            src:"Frontend/Assets/images/icons/share.svg"

        })
        return this.state.element.shearImg
    }



    adminisTrator = () =>{
        this.state.element.adminisTrator = this.CreateElement({
            element:"div",
            class:"administrator",
        },this.adminforEach(),)
        return this.state.element.adminisTrator
    }

    comment = (item) => {
        this.state.element.comment = this.CreateElement({
            element:"h1",
            text:item.usercomment,
            class:"comment"
        })

        this.state.element.username = this.CreateElement({
            element:"h1",
            text:item.usertext,
            class:"admintext"
        })

        this.state.element.userAvatar = this.CreateElement({
            element:"img",
            src:item.userAvatar,
        })

        this.state.element.userLike = this.CreateElement({
            element:"p",
            text:"კომენტარი",
            class:"userLike"
        })

        this.state.element.userCom = this.CreateElement({
            element:"p",
            text:"მოწონება",
            class:"userLike"
        })

        this.state.element.comenDiv = this.CreateElement({
            element:"div",
            class:"comenDiv",
        },this.state.element.userLike,this.state.element.userCom)

        
        this.state.element.imigDiv = this.CreateElement({
            element:"div",
            class:"imigDiv",
        },this.state.element.userAvatar)


        this.state.element.userAdmin = this.CreateElement({
            element:"div",
            class:"userAdmin",
        },this.state.element.username,this.state.element.comment) 

        this.state.element.divs = this.CreateElement({
            element:"div",
            class:"divs1",
        },this.state.element.imigDiv,this.state.element.userAdmin)

        this.state.element.userDiv = this.CreateElement({
            element:"div",
            class:"userDiv",
        })

        this.state.element.userDiv.appendChild(this.state.element.divs)
        this.state.element.userDiv.appendChild(this.state.element.comenDiv)

        return this.state.element.userDiv;
    }

    adminforEach = () =>{
    let myad = [
        {
            userAvatar:"Frontend/Assets/images/icons/eli.svg",
            usertext:"Administrator", 
            usercomment: "ტესტ კომენტარი",
            answers: [
                {
                    userAvatar:"Frontend/Assets/images/icons/eli.svg",
                    usertext:"ოპერატორი 1", 
                    usercomment: "ტესტ პასუხი 1",
                },
                {
                    userAvatar:"Frontend/Assets/images/icons/eli.svg",
                    usertext:"ოპერატორი 2", 
                    usercomment: "ტესტ პასუხი 2",
                },
            ],
        }, 
        {
            userAvatar:"Frontend/Assets/images/icons/eli.svg",
            usertext:"ოპერატორი 2", 
            usercomment: "ტესტ კომენტარი 2",
            answers: [], 
        }
    ]

    this.state.element.commentWrapper = this.CreateElement({
        element:"div",
        class:"comments"
    })

    myad.forEach((item)=>{ 
        
        const comment = this.comment(item);

        if(item.answers?.length > 0){ // თუ აქვს პასუხები
            this.state.element.answersWrapper = this.CreateElement({
                element:"div",
                class:"answers"
            })
            item.answers.forEach( (item) => {
                const answer = this.comment(item); 
                this.state.element.answersWrapper.appendChild(answer);
            })
            comment.appendChild(this.state.element.answersWrapper);
        }
        this.state.element.commentWrapper.appendChild(comment);

    })
   return this.state.element.commentWrapper
 }


 buttonImg = () =>{
    this.state.element.buttonImg = this.CreateElement({
        element:"div",
        class:"buttonImg",
    },this.comenProfil(),this.comentInput())
    return  this.state.element.buttonImg
 }

 comenProfil = () =>{
    this.state.element.comenProfil = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/eli.svg",
            class:"comenProfil"
    })
   return this.state.element.comenProfil
 }

 comentInput = () =>{
    this.state.element.comentInput = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    })
    return this.state.element.comentInput
 }



 grup = () =>{
    this.state.element.grup =this.CreateElement({
        element:"div",
        class:"grup",
    },this.grupforEch(this.getPersonalMessages()))
    return  this.state.element.grup
 } 

 grupforEch = (myobj) =>{
        this.state.element.timeDiv =this.CreateElement({
            element:"div",
            class:"timeDiv",
            id:"timeDivi"
        })
            this.state.element.timeDiv2 =this,this.CreateElement({
                element:"div",
                class:"timeDiv2"
            })

        myobj.forEach((grupvalue, index)=>{
            this.state.element.line =this.CreateElement({
                element:"div",
                class:"lineclas",
            }) 
            this.state.element.dateTime =this.CreateElement({
                element:"p",
                class:"dateTime",
                text:grupvalue.datetime
            })
            this.state.element.line1 =this.CreateElement({
                element:"div",
                class:"lineclas"
            })

            this.state.element.linesDiv =this.CreateElement({
                element:"div",
                class:"linesDiv"
            },this.state.element.line,this.state.element.dateTime,this.state.element.line1 ) 

                this.state.element.dialogi = this.CreateElement({
                    element:"div",
                    class:"dialogi",
                },
                this.state.element.suratDiv1,this.CreateElement({
                    element:"div",
                    class:"suratDiv1",
                },
                this.state.element.surati1,this.CreateElement({
                    element:"img",
                    class:"surati1",
                    src:grupvalue.surati1
                })),this.state.element.surnameDiv,this.CreateElement({
                    element:"div",
                    class:"surnameDiv"
                },this.CreateElement({
                    element: "div",
                    class: "surname-div"
                },
                this.state.element.surname,this.CreateElement({
                    element:"h1",
                    class:"surname",
                    text:grupvalue.surname
                }),this.state.element.surname1Div = this.CreateElement({
                    element:"div",
                    class:"surname1Div"
                },
                this.state.element.time,this.CreateElement({
                    element:"h1",
                    class:"time",
                    text:grupvalue.time
                }),this.state.element.imgpoitns,this.CreateElement({
                    element:"img",
                    class:"imgpoitns",
                    src:grupvalue.imgpoitns,
                }))),this.state.element.askDiv,this.CreateElement({
                    element:"div",
                    class:"askDiv"
                },this.state.element.ask,this.CreateElement({
                    element:"h1",
                    class:"ask",
                    text:grupvalue.ask
                }))))
                this.state.element.dialogDiv = this.CreateElement({
                    element: "div",
                    class: "dialog-div",
                }, this.state.element.dialogi)

                if(index == 0 || myobj[index-1].datetime !== grupvalue.datetime)
                    this.state.element.timeDiv.appendChild(this.state.element.linesDiv)
            this.state.element.timeDiv.appendChild(this.state.element.dialogDiv)
        })
        return this.state.element.timeDiv
    }
    grupTupe = () =>{
        this.state.element.grupTupe = this.CreateElement({
            element:"div",
            class:"tupe",
            id:"grupTupe",
        },this.nameDiv(),this.creategrup())
        return  this.state.element.grupTupe
    }

    nameDiv = () =>{
        this.state.element.nameDiv = this.CreateElement({
            element:"div",
            class:"nameDiv"
        },this.serch(),this.serchDiv(),this.page(),this.buttonFiltr())
        return   this.state.element.nameDiv
    }
    
    serch = () => {
        this.state.element.serch = new Input({
            type:"text",
            placeholderTitle: "ჯგუფის დასახელება",
            class:"oper1",
            style:{
                width: "22vw",
                 height:"37px",
                  padding: "5px",
                   position: "relative",
            }
        }).build()
        return this.state.element.serch
    }

    serchDiv = () =>{
        this.state.element.serchDiv = this.CreateElement({
            element:"div",
            class:"serchdiv"
        },this.xazi(),this.serchImg())
        return this.state.element.serchDiv
    }

    xazi = () =>{
        this.state.element.xazi =this.CreateElement({
           element:"div",
           class:"xazi" 
        })
        return this.state.element.xazi
    }

    serchImg = () =>{
        this.state.element.serchImg = this.CreateElement({
            element:"img",
            class:"serchImg",
            src:"Frontend/Assets/images/icons/search1.svg"
        })
        return this.state.element.serchImg 
    }


 page = () => {
    this.state.element.page = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "დახურული ჯგუფი",
        data:{
            route:"UserManager",
            act: "getDepartment",
        },
        style: {
            height: "37px",
             width: "216px",
        }
    })
    return this.state.element.page
 }

 buttonFiltr = () =>{
    this.state.element.buttonFiltr = this.CreateElement({
        element:"button",
        class:"filtr",
        text:"ფილტრი"
    })
    return this.state.element.buttonFiltr
 }

creategrup = () =>{
    this.state.element.creategrup = this.CreateElement({
        element:"div",
        class:"creategrup",
    },this.buttonTable(),this.createTable())
    return  this.state.element.creategrup
}

buttonTable = () =>{
    this.state.element.buttonTable = this.CreateElement({
        element:"button",
        class:"fil",
        text:"ჯგუფის შექმნა",
        onclick: () =>{
            this.buildModal(null,{
                width: "432px",
                height: "272px",
                content: this.operatorDiv(),
                buttons: {
                    save: {
                        name: "გაუქმება",
                        access: "save"
                    },
                },
                confirmOnCancel: false,
            })
        }
    })
    return this.state.element.buttonTable
 }

createTable = () => {
    this.state.element.createTable = this.CreateElement({
       element: "kendo",
       type: "table",
       class:"createTableclas",
       column: [
            {
                field: "id",
                hidden: true, 
            },
          {
             field: "მომხმარებელი",
             size: 100,
          },
          {
             field: "ექსთენშენი",
             size: 100,
          },
          {
             field: "მობილური",
             size: 100,
          },
          {
             field: "თანამდებობა",
             size: 100,
          },
          {
             field: "მისამართი",
             size: 100,
          },
       ],
       data: {
        route: 'UserManager',
        act: 'getList'
       },
    })
    return this.state.element.createTable
    
}






filenameDiv1 = () =>{
    this.state.element.filenameDiv1 = this.CreateElement({
        element:"div",
        class:"filenameDiv1",
        id:"filenameDiv1"
    },this.nameDiv1(),this.picchers())
    return  this.state.element.filenameDiv1
}

nameDiv1 = () =>{
    this.state.element.nameDiv1 = this.CreateElement({
        element:"div",
        class:"nameDiv2"
    },this.serch1(),this.serchDiv1(),this.page1(),this.startDateTime(),
    this.endDateTime(),this.page2(),this.buttonFiltr1(),)
    return   this.state.element.nameDiv1
}

serch1 = () => {
    this.state.element.serch1 = new Input({
        type:"text",
        placeholderTitle: "ფაილის დასახელება",
        class:"oper1",
        style:{
            width: "22vw",
             height:"37px",
              padding: "5px",
               position: "relative",
        }
    }).build()
    return this.state.element.serch1
}

serchDiv1 = () =>{
    this.state.element.serchDiv1 = this.CreateElement({
        element:"div",
        class:"serchdiv"
    },this.xazi1(),this.serchImg1())
    return this.state.element.serchDiv1
}

xazi1 = () =>{
    this.state.element.xazi =this.CreateElement({
       element:"div",
       class:"xazi" 
    })
    return this.state.element.xazi
}

serchImg1 = () =>{
    this.state.element.serchImg = this.CreateElement({
        element:"img",
        class:"serchImg",
        src:"Frontend/Assets/images/icons/search1.svg"
    })
    return this.state.element.serchImg 
}

page1 = () => {
    this.state.element.page1 = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "დახურული ჯგუფი",
        data:{
            route:"UserManager",
            act: "getDepartment",
        },
        style: {
            height: "37px",
             width: "216px",
        }
    })
    return this.state.element.page1
 }


 startDateTime = () => {
    this.state.element.startDateTime = this.CreateElement({
        element: "input",
        type: "datetime",
        class:"start",
        value: this.formatDate() + " 00:00:00"
    })
    return this.state.element.startDateTime
}

endDateTime = () => {

    this.state.element.endDateTime = this.CreateElement({
        element: "input",
        type: "datetime",
        class:"start",
        value: this.formatDate() + " 23:59:59"
    })
    return this.state.element.endDateTime
}

page2 = () => {
    this.state.element.page2 = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "ფაილის ტიპი",
        data:{
            route:"UserManager",
            act: "getDepartment",
        },
        style: {
            height: "37px",
             width: "216px",
        }
    })
    return this.state.element.page2
 }


 buttonFiltr1 = () =>{
    this.state.element.buttonFiltr1 = this.CreateElement({
        element:"button",
        class:"filt",
        text:"ფილტრი"
    })
    return this.state.element.buttonFiltr1
 }

 picchers = () =>{
    this.state.element.picchers = this.CreateElement({
        element:"div",
        class:"picchersclas",
    },this.createPicchers(),)
    return this.state.element.picchers
 }

createPicchers = () => {
    this.state.element.createPicchers = this.CreateElement({
       element: "kendo",
       type: "table",
       class:"createPicchersclas",
       column: [
            {
                field: "id",
                hidden: true, 
            },
          {
             field: "მომხმარებელი",
             size: 100,
          },
          {
             field: "ექსთენშენი",
             size: 100,
          },
          {
             field: "მობილური",
             size: 100,
          },
          {
             field: "თანამდებობა",
             size: 100,
          },
          {
             field: "მისამართი",
             size: 100,
          },
       ],
       data: {
        route: 'UserManager',
        act: 'getList'
       },
    })
    return this.state.element.createPicchers

}





operatorDiv = () =>{
    this.state.element.operatorDiv = this.CreateElement({
        element:"div",
        class:"operatorDiv"
    },this.paragrap19(),this.operatorDiv1(),this.checkDiv())
    return  this.state.element.operatorDiv
}

paragrap19 = () =>{
    this.state.element.paragrap19 = this.CreateElement({
       element:"p",
       class:"paragrap19",
       text:"ჯგუფის შექმნა ",
    })
    return this.state.element.paragrap19
 }

 operatorDiv1 = () =>{
    this.state.element.operatorDiv1 = this.CreateElement({
        element:"div",
        class:"operatorDiv1"
    },this.serch2(),this.serch3(),)
    return  this.state.element.operatorDiv1
}

serch2 = () => {
    this.state.element.serch1 = new Input({
        type:"text",
        placeholderTitle: "ჯგუფის დასახელება",
        class:"serch2",
        style:{
            width: "401px",
            height: "37px",
            padding: "5px",
        }
    }).build()
    return this.state.element.serch1
}

serch3 = () => {
    this.state.element.serch3 = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "წევრი",
        class: "serch3",
        data:{
            route:"UserManager",
            act: "getDepartment",
        },
         style: {
            height: "37px",
             width: "401px",
        }
    })
    return this.state.element.serch3
 }



 checkDiv = () =>{
    this.state.element.checkDiv = this.CreateElement({
        element:"div",
        class:"checkDiv",
    },this.inputCheck(),this.inputText())
    return  this.state.element.checkDiv
 }

 inputCheck = () =>{
    this.state.element.inputCheck = this.CreateElement({
        element:"input",
        class:"inputChec",
        type:"checkbox"
    },this.inputText())
    return this.state.element.inputCheck
 }

 inputText = () =>{
    this.state.element.inputText = this.CreateElement({
        element:"label",
        class:"inputText",
        text:"დახურული ჯგუფი"
    })
    return this.state.element.inputText
 }

//  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 operatorDiv2 = () =>{
    this.state.element.operatorDiv2 = this.CreateElement({
        element:"div",
        class:"operatorDiv"
    },this.paragrap20(),this.operatorDiv3(),this.checkDiv1())
    return  this.state.element.operatorDiv2
}

paragrap20 = () =>{
    this.state.element.paragrap20 = this.CreateElement({
       element:"p",
       class:"paragrap19",
       text:"ჯგუფის შექმნა ",
    })
    return this.state.element.paragrap20
 }

 operatorDiv3 = () =>{
    this.state.element.operatorDiv1 = this.CreateElement({
        element:"div",
        class:"operatorDiv1"
    },this.serch4(),this.serch5(),)
    return  this.state.element.operatorDiv1
}

serch4 = () => {
    this.state.element.serch4 = new Input({
        type:"text",
        placeholderTitle: "ჯგუფის დასახელება",
        class:"serch2",
        style:{
            width: "401px",
            height: "37px",
            padding: "5px",
        }
    }).build()
    return this.state.element.serch4
}

serch5 = () => {
    this.state.element.serch5 = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "წევრი",
        class: "serch3",
        data:{
            route:"UserManager",
            act: "getDepartment",
        },
         style: {
            height: "37px",
             width: "401px",
        }
    })
    return this.state.element.serch5
 }

 checkDiv1 = () =>{
    this.state.element.checkDiv1 = this.CreateElement({
        element:"div",
        class:"checkDiv",
    },this.inputCheck1(),this.inputText1())
    return  this.state.element.checkDiv1
 }

 inputCheck1 = () =>{
    this.state.element.inputCheck1 = this.CreateElement({
        element:"input",
        class:"inputChec",
        type:"checkbox"
    
    },this.inputText1())
    return this.state.element.inputCheck1
 }

 inputText1 = () =>{
    this.state.element.inputText1 = this.CreateElement({
        element:"label",
        class:"inputText",
        text:"დახურული ჯგუფი"
    })
    return this.state.element.inputText1
 }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CreatePost = () =>{
    this.state.element.CreatePost = this.CreateElement({
        element:"div",
        class:"createpostclass",
        id:"createpostid",

    },this.CreatepostDiv(),this.userAdmin2())
    return  this.state.element.CreatePost
}


CreatepostDiv = () =>{
    this.state.element.CreatepostDiv = this.CreateElement({
        element:"div",
        class:"creatediv",
        
    },this.createThink(),this.think(),this.initiatives())
    return  this.state.element.CreatepostDiv
}

createThink = () =>{
    this.state.element.createThink = this.CreateElement({
        element:"div",
        class:"createThink",
    },this.pliusImg(),this.postParagrap1())
    return this.state.element.createThink
}

pliusImg = () =>{
    this.state.element.pliusImg = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.pliusImg
}

postParagrap1 = () =>{
    this.state.element.postParagrap1 = this.CreateElement({
        element: "p",
        class: "postParagrap",
        text:"შექმენით პოსტი",
    })
    return  this.state.element.postParagrap1
}

think = () =>{
    this.state.element.think = this.CreateElement({
        element:"div",
        class:"think",

    },this.thinkDiv())
    return this.state.element.think
}

thinkDiv = () =>{
    this.state.element.thinkDiv = this.CreateElement({
        element:"div",
        class:"thinkDiv",

    },this.WhatThink())
    return this.state.element.thinkDiv
}

WhatThink = () =>{
    this.state.element.WhatThink = this.CreateElement({
        element:"div",
        class:"WhatThink",

    },this.divImg(),this.watParagrap())
    return this.state.element.WhatThink
}

divImg = () =>{
    this.state.element.divImg = this.CreateElement({
        element:"img",
        class:"divImg",
        src:"Frontend/Assets/images/icons/10.svg",
    })
    return this.state.element.divImg
}

watParagrap = () =>{
    this.state.element.watParagrap = this.CreateElement({
        element: "input",
        class: "watParagrap",
        placeholder:" დაწერეთ რას ფიქრობთ ?",
        onclick: () => {
            this.buildModal(null,{
                width: "763px",
                height: "262px",
                content: this.createOperator(),
                    buttons: {
                        save: {
                            name: "გამოქვეყნება",
                            access: "save"
                        },
                    },
                confirmOnCancel: false,
            })
      }
    })
    return  this.state.element.watParagrap
}

initiatives = () => {
    this.state.element.initiatives = this.CreateElement({
        element:"div",
        class:"initiatives",

    },this.plusPost(),this.newsPost(),this.surveysDiv(),this.initiativesDiv())
    return  this.state.element.initiatives
}

plusPost = () =>{
    this.state.element.plusPost = this.CreateElement({
       element:"div",
       class:"plusPost",
    },this.divImg1(),this.watParagrap1())
    return this.state.element.plusPost
}

divImg1 = () =>{
    this.state.element.divImg1 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.divImg1
}
watParagrap1 = () =>{
    this.state.element.watParagrap1 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" პოსტი",
    })
    return  this.state.element.watParagrap1
}
newsPost = () =>{
    this.state.element.newsPost = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.divImg2(),this.watParagrap2())
    return this.state.element.newsPost
}


divImg2 = () =>{
    this.state.element.divImg2 = this.CreateElement({
        element:"img",
        class:"divImg2",
        src:"Frontend/Assets/images/icons/Fram.svg",
    })
    return this.state.element.divImg2
}
watParagrap2 = () =>{
    this.state.element.watParagrap2 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" სიახლეები",
          onclick: () =>{

            let out =document.querySelector("#new1id")
            $("#new1id").css({"display":"flex"},)

            let out1 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"},)
        
            let show=document.querySelector("#useri")
            $("#useri").css({"display":"none"})

            let time =document.querySelector("#timeDivi")
            $("#timeDivi").css({"display":"none"})

            let fim =document.querySelector("#filenameDiv1")
            $("#filenameDiv1").css({"display":"none"})

            let fim1 =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})

            let fim2 =document.querySelector("#grupTupe")
            $("#grupTupe").css({"display":"none"})
            },
    })
    return  this.state.element.watParagrap2
}

surveysDiv = () =>{
    this.state.element.surveysDiv = this.CreateElement({
        element:"div",
        class:"plusPost",

    },this.divImg3(), this.watParagrap3())
    return  this.state.element.surveysDiv
}

divImg3 = () =>{
    this.state.element.divImg3 = this.CreateElement({
        element:"img",
        class:"divImg3",
        src:"Frontend/Assets/images/icons/Frame 1.svg",
    })
    return this.state.element.divImg3
}

watParagrap3 = () =>{
    this.state.element.watParagrap3 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" გამოკითხვები ",
    })
    return  this.state.element.watParagrap3
}


initiativesDiv = () =>{
    this.state.element.initiativesDiv = this.CreateElement({
        element:"div",
        class:"plusPost",
        
    },this.divImg4(), this.watParagrap4())
    return  this.state.element.initiativesDiv
}

divImg4 = () =>{
    this.state.element.divImg4 = this.CreateElement({
        element:"img",
        class:"divImg4",
        src:"Frontend/Assets/images/icons/Group 12.svg",
    })
    return this.state.element.divImg4
}

watParagrap4 = () =>{
    this.state.element.watParagrap4 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" ინიციატივები ",
    })
    return  this.state.element.watParagrap4

}



userAdmin2 = () =>{
    this.state.element.userAdmin2 =this.CreateElement({
        element:"div",
        class:"uesAdmin",
    },this.uzerforEach2(),this.Feedback2(),this.adminisTrator1(),this.buttonImg1())
    return this.state.element.userAdmin2
}
 uzerforEach2 = () =>{
    let uzerobj = [{username:"User_Name",img:"Frontend/Assets/images/icons/eli.svg",hour:"11 hours",date:"15.07.2022 10:05",
    text: "Any fool can Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    surati:"Frontend/Assets/images/icons/cofe.svg",userimg:"Frontend/Assets/images/icons/png.svg",userparagrap:"50",
    userComent:"11"}]

    this.state.element.userName1 = this.CreateElement({
        element:"div",
        class:"divs2",
        
    })
    uzerobj.forEach((value)=>{
        
        this.state.element.createImg13 = this.CreateElement({
            element:"img",
            src:value.img,
        })
        this.state.element.paragrap13 = this.CreateElement({
            element:"p",
            class:"User",
            text:value.username,
        })
        this.state.element.paragrap14 = this.CreateElement({
            element:"p",
            class:"haurs",
            text:value.hour
        })
        this.state.element.paragrap15 = this.CreateElement({
            element:"p",
            class:"time",
            text:value.date
        })

        this.state.element.text = this.CreateElement({
            element:"p",
            class:"paragText",
            text:value.text
        })

        this.state.element.createImg15 = this.CreateElement({
            element:"img",
            src:value.surati,
            class:"surati",
        })

        this.state.element.userimg = this.CreateElement({
            element:"img",
            src:value.userimg,
            class:"userimg",
        })

        this.state.element.userparagrap = this.CreateElement({
            element:"p",
            text:value.userparagrap,
            class:"userparagrap",
        })

        this.state.element.userComent = this.CreateElement({
            element:"p",
            text:value.userComent  + "comment",
            class:"userComent",
        })

        this.state.element.userName2 = this.CreateElement({ // შვილი დივი
            element:"div",
            class:"uzerp", 
          },this.CreateElement({
            element: "div",
            class:"eli",
          },this.state.element.createImg13, this.CreateElement({
            element: "div"
          },this.state.element.paragrap13,
          this.state.element.paragrap14)),this.state.element.paragrap15);

          this.state.element.twoDiv = this.CreateElement({
            element:"div",
            class:"twoDiv",
          })

        this.state.element.createDiv = this.CreateElement({
            element:"div",
            class:"userdiv1",
        },this.state.element.userimg,this.state.element.userparagrap,this.state.element.userComent,)

        this.state.element.suratDiv = this.CreateElement({
            element:"div",
            class:"suratDiv",
        },this.state.element.createImg15)

        this.state.element.shear = this.CreateElement({
            element:"div",
            class:"suratDiv",
        })

          this.state.element.userName1.appendChild(this.state.element.userName2)
          this.state.element.userName1.appendChild(this.state.element.text)
          this.state.element.userName1.appendChild(this.state.element.twoDiv)
          this.state.element.twoDiv.appendChild(this.state.element.suratDiv)
        this.state.element.twoDiv.appendChild(this.state.element.createDiv)

    })
     return this.state.element.userName1    
}
adminisTrator1  = () =>{
    this.state.element.adminisTrator1 = this.CreateElement({
        element:"div",
        class:"administrator",
    },this.adminforEach(),)
    return this.state.element.adminisTrator1
}

comment = (item) => {
    this.state.element.comment = this.CreateElement({
        element:"h1",
        text:item.usercomment,
        class:"comment"
    })

    this.state.element.username = this.CreateElement({
        element:"h1",
        text:item.usertext,
        class:"admintext"
    })

    this.state.element.userAvatar = this.CreateElement({
        element:"img",
        src:item.userAvatar,
    })

    this.state.element.userLike = this.CreateElement({
        element:"p",
        text:"კომენტარი",
        class:"userLike"
    })

    this.state.element.userCom = this.CreateElement({
        element:"p",
        text:"მოწონება",
        class:"userLike"
    })

    this.state.element.comenDiv = this.CreateElement({
        element:"div",
        class:"comenDiv",
    },this.state.element.userLike,this.state.element.userCom)

    
    this.state.element.imigDiv = this.CreateElement({
        element:"div",
        class:"imigDiv",
    },this.state.element.userAvatar)


    this.state.element.userAdmin = this.CreateElement({
        element:"div",
        class:"userAdmin",
    },this.state.element.username,this.state.element.comment) 

    this.state.element.divs = this.CreateElement({
        element:"div",
        class:"divs1",
    },this.state.element.imigDiv,this.state.element.userAdmin)

    this.state.element.userDiv = this.CreateElement({
        element:"div",
        class:"userDiv",
    })

    this.state.element.userDiv.appendChild(this.state.element.divs)
    this.state.element.userDiv.appendChild(this.state.element.comenDiv)

    return this.state.element.userDiv;
}

adminforEach = () =>{
let myad = [
    {
        userAvatar:"Frontend/Assets/images/icons/eli.svg",
        usertext:"Administrator", 
        usercomment: "ტესტ კომენტარი",
        answers: [
            {
                userAvatar:"Frontend/Assets/images/icons/eli.svg",
                usertext:"ოპერატორი 1", 
                usercomment: "ტესტ პასუხი 1",
            },
            {
                userAvatar:"Frontend/Assets/images/icons/eli.svg",
                usertext:"ოპერატორი 2", 
                usercomment: "ტესტ პასუხი 2",
            },
        ],
    }, 
    {
        userAvatar:"Frontend/Assets/images/icons/eli.svg",
        usertext:"ოპერატორი 2", 
        usercomment: "ტესტ კომენტარი 2",
        answers: [], 
    }
]

this.state.element.commentWrapper = this.CreateElement({
    element:"div",
    class:"comments"
})

myad.forEach((item)=>{ 
    
    const comment = this.comment(item);

    if(item.answers?.length > 0){ // თუ აქვს პასუხები
        this.state.element.answersWrapper = this.CreateElement({
            element:"div",
            class:"answers"
        })
        item.answers.forEach( (item) => {
            const answer = this.comment(item); 
            this.state.element.answersWrapper.appendChild(answer);
        })
        comment.appendChild(this.state.element.answersWrapper);
    }
    this.state.element.commentWrapper.appendChild(comment);

})
 return this.state.element.commentWrapper
}


 buttonImg1 = () =>{
    this.state.element.buttonImg1 = this.CreateElement({
        element:"div",
        class:"buttonImgclass",
    },this.comenProfil1(),this.comentInput1())
    return  this.state.element.buttonImg1
 }

 comenProfil1 = () =>{
    this.state.element.comenProfil1 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/eli.svg",
            class:"comenProfil"
    })
   return this.state.element.comenProfil1
 }

 comentInput1 = () =>{
    this.state.element.comentInput1 = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    })
    return this.state.element.comentInput1
 }

 createOperator = () =>{
    this.state.element.createOperator = this.CreateElement({
        element:"div",
        class:"operatorclas",
    },this.operatori(),this.inputBlockdiv(),this.potoDiv(),)
    return  this.state.element.createOperator
 }

 operatori = () =>{
    this.state.element.operatori = this.CreateElement({
        element:"div",
        class:"operatori",
    },this.operatorImgi(),this.blockDiv(),)
    return this.state.element.operatori
 }

 operatorImgi = () =>{
    this.state.element.operatorImgi = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/eli.svg",
    })
    return this.state.element.operatorImgi
 }

 blockDiv = () =>{
    this.state.element.blockDiv = this.CreateElement({
        element:"div",
        class:"blockDiv",
    },this.userBlovk(),this.blockDiv1())
    return this.state.element.blockDiv
 }

 userBlovk = () =>{
    this.state.element.userBlovk = this.CreateElement({
        element:"p",
        class:"userBlovk",
        text:"User_Name"
    })
    return this.state.element.userBlovk
 }

 blockDiv1 = () =>{
    this.state.element.blockDiv1 = this.CreateElement({
        element:"div",
        class:"blockDiv1",
    },this.blockImgi(),this.userBlock1())
    return this.state.element.blockDiv1
 }

 blockImgi = () =>{
    this.state.element.blockImgi = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/lock.svg",
    })
    return this.state.element.blockImgi
 }

 userBlock1 = () =>{
    this.state.element.userBlock1 = this.CreateElement({
        element:"p",
        class:"userBlock1",
        text:"ოპერატორები"
    })
    return this.state.element.userBlock1
 }

 inputBlockdiv = () =>{
    this.state.element.inputBlockdiv = this.CreateElement({
        element:"div",
        class:"inputBlockdiv",
    },this.inputBlock())
    return this.state.element.inputBlockdiv
 }

 inputBlock = () =>{
    this.state.element.inputBlock = this.CreateElement({
        element:"input",
        class:"inputBlock",
        placeholder:"დაწერეთ რას ფიქრობთ ?"
    })
    return this.state.element.inputBlock
 }

potoDiv = () =>{
    this.state.element.potoDiv = this.CreateElement({
        element:"div",
        class:"potoDiv",
    },this.camera(),this.smile(),this.mapPin())
    return this.state.element.potoDiv
}

camera = () =>{
    this.state.element.camera = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/camera 1.svg",
    })
    return   this.state.element.camera
}


smile = () =>{
    this.state.element.smile = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/smile 1.svg",
    })
    return   this.state.element.smile
}

mapPin = () =>{
    this.state.element.mapPin = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/map-pin 1.svg",
    })
    return   this.state.element.mapPin
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





news1 = () =>{
    this.state.element.news1 = this.CreateElement({
        element:"div",
        class:"newsclass",
        id:"new1id",

    },this.CreatepostDiv2(),this.userAdmin3())
    return  this.state.element.news1
}
CreatepostDiv2 = () =>{
    this.state.element.CreatepostDiv2 = this.CreateElement({
        element:"div",
        class:"creatediv",
        
    },this.createThink2(),this.whatThinck(),this.initiatives2())
    return  this.state.element.CreatepostDiv2
}

createThink2 = () =>{
    this.state.element.createThink2 = this.CreateElement({
        element:"div",
        class:"createThink",
    },this.pliusImg2(),this.postParagrap2())
    return this.state.element.createThink2
}

pliusImg2 = () =>{
    this.state.element.pliusImg2 = this.CreateElement({
        element:"img",
        class:"pliusImgi",
        src:"Frontend/Assets/images/icons/new 1.svg",
    })
    return this.state.element.pliusImg2
}

postParagrap2 = () =>{
    this.state.element.postParagrap2 = this.CreateElement({
        element: "p",
        class: "postParagrap",
        text:"შექმენით სიახლე",
    })
    return  this.state.element.postParagrap2
}


whatThinck = () =>{
    this.state.element.whatThinck = this.CreateElement({
        element:"div",
        class:"think",
    },this.thinkDiv2())
    return this.state.element.whatThinck
}

thinkDiv2 = () =>{
    this.state.element.thinkDiv2 = this.CreateElement({
        element:"div",
        class:"thinkDiv",
    },this.WhatThink2())
    return this.state.element.thinkDiv2
}

WhatThink2 = () =>{
    this.state.element.WhatThink2 = this.CreateElement({
        element:"div",
        class:"WhatThink",

    },this.divImg9(),this.watParagrap9())
    return this.state.element.WhatThink2
}

divImg9 = () =>{
    this.state.element.divImg9 = this.CreateElement({
        element:"img",
        class:"divImg",
        src:"Frontend/Assets/images/icons/10.svg",
    })
    return this.state.element.divImg9
}

watParagrap9 = () =>{
    this.state.element.watParagrap9 = this.CreateElement({
        element: "input",
        class: "watParagrap",
        placeholder:" დაწერეთ რას ფიქრობთ ?",
        onclick: () => {
            this.buildModal(null,{
                width: "763px",
                height: "262px",
                content: this.createOperator1(),
                    buttons: {
                        save: {
                            name: "გამოქვეყნება",
                            access: "save"
                        },
                    },
                 
                confirmOnCancel: false,
            })
      }
    })
    return  this.state.element.watParagrap9
}


initiatives2 = () => {
    this.state.element.initiatives2 = this.CreateElement({
        element:"div",
        class:"initiatives",

    },this.plusPost1(),this.newsPost1(),this.surveysDiv1(),this.initiativesDiv1())
    return  this.state.element.initiatives2
}

plusPost1 = () =>{
    this.state.element.plusPost1 = this.CreateElement({
       element:"div",
       class:"plusPost", 

    },this.divImg10(),this.watParagrap11())
    return this.state.element.plusPost1
}

divImg10 = () =>{
    this.state.element.divImg10 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.divImg10
}

watParagrap11 = () =>{
    this.state.element.watParagrap11 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" პოსტი",
        onclick: () =>{
         let fim1 =document.querySelector("#new1id")
         $("#new1id").css({"display":"none"})

         let fim3 =document.querySelector("#createpostid")
         $("#createpostid").css({"display":"flex"})
         
         let show=document.querySelector("#useri")
         $("#useri").css({"display":"none"})
 
         let time =document.querySelector("#timeDivi")
         $("#timeDivi").css({"display":"none"})
 
         let fim =document.querySelector("#grupTupe")
         $("#grupTupe").css({"display":"none"})
 
         let fim2 =document.querySelector("#surveysid")
         $("#surveysid").css({"display":"none"})
     }
    })
    return  this.state.element.watParagrap11
}


newsPost1 = () =>{
    this.state.element.newsPost1 = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.divImg12(),this.watParagrap12())
    return this.state.element.newsPost1
}

divImg12 = () =>{
    this.state.element.divImg12 = this.CreateElement({
        element:"img",
        class:"newsImg",
        src:"Frontend/Assets/images/icons/Fram 1.svg",
    })
    return this.state.element.divImg12
}

watParagrap12 = () =>{
    this.state.element.watParagrap12 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" სიახლეები",
    })
    return  this.state.element.watParagrap12
}



surveysDiv1 = () =>{
    this.state.element.surveysDiv1 = this.CreateElement({
        element:"div",
        class:"plusPost",

    },this.divImg13(), this.watParagrap13())
    return  this.state.element.surveysDiv1
}

divImg13 = () =>{
    this.state.element.divImg13 = this.CreateElement({
        element:"img",
        class:"divImg3",
        src:"Frontend/Assets/images/icons/check 1.svg",
    })
    return this.state.element.divImg13
}


watParagrap13 = () =>{
    this.state.element.watParagrap13 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" გამოკითხვები ",

        onclick: () =>{
            
        let fim1 =document.querySelector("#new1id")
        $("#new1id").css({"display":"none"})

        let fim2 =document.querySelector("#surveysid")
        $("#surveysid").css({"display":"flex"})

        let fim3 =document.querySelector("#createpostid")
        $("#createpostid").css({"display":"none"})
        
        let show=document.querySelector("#useri")
        $("#useri").css({"display":"none"})

        let time =document.querySelector("#timeDivi")
        $("#timeDivi").css({"display":"none"})

        let fim =document.querySelector("#grupTupe")
        $("#grupTupe").css({"display":"none"})

        let fim4 =document.querySelector("#filenameDiv1")
        $("#filenameDiv1").css({"display":"none"})
        },
    })
    return  this.state.element.watParagrap13
}

initiativesDiv1 = () =>{
    this.state.element.initiativesDiv1 = this.CreateElement({
        element:"div",
        class:"plusPost",
        
    },this.divImg14(), this.watParagrap14())
    return  this.state.element.initiativesDiv1
}

divImg14 = () =>{
    this.state.element.divImg14 = this.CreateElement({
        element:"img",
        class:"divImg4",
        src:"Frontend/Assets/images/icons/star 1.svg",
    })
    return this.state.element.divImg14
}

watParagrap14 = () =>{
    this.state.element.watParagrap14 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" ინიციატივები ",
    })
    return  this.state.element.watParagrap14
}

userAdmin3 = () =>{
    this.state.element.userAdmin3 =this.CreateElement({
        element:"div",
        class:"uesAdmin",

    },this.uzerforEach3(),this.Feedback2(),this.adminisTrator2(),this.buttonImg2())
    return this.state.element.userAdmin3
}

uzerforEach3 = () =>{
    let newobj = [{nameuser:"User_Name",nameimg:"Frontend/Assets/images/icons/eli.svg",namehour:"11 hours",namedate:"15.07.2022 10:05",
    text: "Any fool can Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    surati:"Frontend/Assets/images/icons/cofe.svg",userimg:"Frontend/Assets/images/icons/check 2.svg",userparagrap:"50",
    userComent:"11"}]

    this.state.element.userName1 = this.CreateElement({
        element:"div",
        class:"divs2",  
    })
    newobj.forEach((namevalue)=>{
        
        this.state.element.createImg13 = this.CreateElement({
            element:"img",
            src:namevalue.nameimg,
        })
        this.state.element.paragrap13 = this.CreateElement({
            element:"p",
            class:"User",
            text:namevalue.nameuser,
        })
        this.state.element.paragrap14 = this.CreateElement({
            element:"p",
            class:"haurs",
            text:namevalue.namehour
        })
        this.state.element.paragrap15 = this.CreateElement({
            element:"p",
            class:"time",
            text:namevalue.namedate
        })
        this.state.element.userName2 = this.CreateElement({ // შვილი დივი
            element:"div",
            class:"paragrap", 
          },this.CreateElement({
            element: "div",
            class:"eli",
          }),this.state.element.createImg13,
          this.CreateElement({
            element:"div",
          },this.state.element.paragrap13,this.state.element.paragrap14),
          this.state.element.paragrap15
          )

        this.state.element.text = this.CreateElement({
            element:"p",
            class:"paragText",
            text:namevalue.text
        })

        this.state.element.createImg15 = this.CreateElement({
            element:"img",
            src:namevalue.surati,
            class:"surati",
        })

        this.state.element.userimg = this.CreateElement({
            element:"img",
            src:namevalue.userimg,
            class:"userimg",
        })

        this.state.element.userparagrap1 = this.CreateElement({
            element:"p",
            text:namevalue.userparagrap,
            class:"userparagrap",
        })

        this.state.element.userComent = this.CreateElement({
            element:"p",
            text:namevalue.userComent  + "comment",
            class:"userComent",
        })
        this.state.element.twoDiv = this.CreateElement({
            element:"div",
            class:"twoDiv",
          })
          
        this.state.element.createDiv = this.CreateElement({
            element:"div",
            class:"userdiv1",
        },this.state.element.userimg,this.state.element.userparagrap1,this.state.element.userComent,)

        this.state.element.suratDiv = this.CreateElement({
            element:"div",
            class:"suratDiv",
        },this.state.element.createImg15)

        this.state.element.shear = this.CreateElement({
            element:"div",
            class:"suratDiv",
        })

          this.state.element.userName1.appendChild(this.state.element.userName2)
          this.state.element.userName1.appendChild(this.state.element.text)
          this.state.element.userName1.appendChild(this.state.element.twoDiv)
          this.state.element.twoDiv.appendChild(this.state.element.suratDiv)
        this.state.element.twoDiv.appendChild(this.state.element.createDiv)

    })
     return this.state.element.userName1    
}

Feedback2 = () =>{
    this.state.element.Feedback2 =this.CreateElement({
        element:"div",
        class:"Feedback"
    },this.chackButton(),this.comentButton1(),this.shearButton1())
    return this.state.element.Feedback2 
}

chackButton = () =>{
    this.state.element.chackButton =this.CreateElement({
        element:"div",
        class:"likeButton"
    },this.checkImg(),this.checkParagrap1(),)
    return this.state.element.chackButton
}

checkImg = () =>{
    this.state.element.checkImg =this.CreateElement({
        element:"img",
        class:"checkButon",
        src:"Frontend/Assets/images/icons/check 2.svg"
    })
    return this.state.element.checkImg
}

checkParagrap1 = () =>{
    this.state.element.checkParagrap1 = this.CreateElement({
        element:"p",
        text:"მოწონება",
        class:"checkButon",
    })
    return this.state.element.checkParagrap1
}


comentButton1 = () =>{
    this.state.element.comentButton1 =this.CreateElement({
        element:"div",
        class:"comentButton"
    },this.comenImg1(),this.comentParagrap1())
    return this.state.element.comentButton1
}

comenImg1 = () =>{
    this.state.element.comenImg1 =this.CreateElement({
        element:"img",
        class:"comenImg",
        src:"Frontend/Assets/images/icons/coment.svg"
    })
    return this.state.element.comenImg1
}

comentParagrap1 = () =>{
    this.state.element.comentParagrap1 = this.CreateElement({
        element:"p",
        text:"კომენტარი",
        class:"comentParagrap",
    })
    return this.state.element.comentParagrap1
}

shearButton1 = () =>{
    this.state.element.shearButton1 =this.CreateElement({
        element:"div",
        class:"shearButton"
    },this.shearImg1(),this.shearParagrap1())
    return this.state.element.shearButton1
}

shearParagrap1 = () =>{
    this.state.element.shearParagrap1 = this.CreateElement({
        element:"p",
        text:"გაზიარება",
        class:"shearParagrap",
    })
    return this.state.element.shearParagrap1
}

shearImg1 = () =>{
    this.state.element.shearImg1 = this.CreateElement({
        element:"p",
        class:"shearImg",
        src:"Frontend/Assets/images/icons/share.svg"

    })
    return this.state.element.shearImg1
}

adminisTrator2  = () =>{
    this.state.element.adminisTrator2 = this.CreateElement({
        element:"div",
        class:"administrator",
    },this.adminforEach2(),)
    return this.state.element.adminisTrator2
}

comment = (state) => {
    this.state.element.comment = this.CreateElement({
        element:"h1",
        text:state.usercomment,
        class:"comment"
    })
    this.state.element.username = this.CreateElement({
        element:"h1",
        text:state.usertext,
        class:"admintext"
    })

    this.state.element.userAvatar = this.CreateElement({
        element:"img",
        src:state.userAvatar,
    })

    this.state.element.userLike = this.CreateElement({
        element:"p",
        text:"კომენტარი",
        class:"userLike"
    })

    this.state.element.userCom = this.CreateElement({
        element:"p",
        text:"მოწონება",
        class:"userLike"
    })

    this.state.element.comenDiv = this.CreateElement({
        element:"div",
        class:"comenDiv",
    },this.state.element.userLike,this.state.element.userCom)

    
    this.state.element.imigDiv = this.CreateElement({
        element:"div",
        class:"imigDiv",
    },this.state.element.userAvatar)


    this.state.element.userAdmin = this.CreateElement({
        element:"div",
        class:"userAdmin",
    },this.state.element.username,this.state.element.comment) 

    this.state.element.divs = this.CreateElement({
        element:"div",
        class:"divs1",
    },this.state.element.imigDiv,this.state.element.userAdmin)

    this.state.element.userDiv = this.CreateElement({
        element:"div",
        class:"userDiv",
    })

    this.state.element.userDiv.appendChild(this.state.element.divs)
    this.state.element.userDiv.appendChild(this.state.element.comenDiv)

    return this.state.element.userDiv;
}


adminforEach2 = () =>{
let newid = [
    {
        userAvatar:"Frontend/Assets/images/icons/eli.svg",
        usertext:"Administrator", 
        usercomment: "ტესტ კომენტარი",
        answers: [
            {
                userAvatar:"Frontend/Assets/images/icons/eli.svg",
                usertext:"ოპერატორი", 
                usercomment: "ტესტ პასუხი",
            },
        ],
    }, 
    {
        userAvatar:"Frontend/Assets/images/icons/eli.svg",
        usertext:"ოპერატორი 2", 
        usercomment: "ტესტ კომენტარი 2",
        answers: [], 
    }
]

this.state.element.commentWrapper1 = this.CreateElement({
    element:"div",
    class:"comments"
})

newid.forEach((state)=>{ 
    
    const comment = this.comment(state);

    if(state.answers?.length > 0){ // თუ აქვს პასუხები
        this.state.element.answersWrapper = this.CreateElement({
            element:"div",
            class:"answers"
        })
        state.answers.forEach( (state) => {
            const answer = this.comment(state); 
            this.state.element.answersWrapper.appendChild(answer);
        })
        comment.appendChild(this.state.element.answersWrapper);
    }
    this.state.element.commentWrapper1.appendChild(comment);

})
 return this.state.element.commentWrapper1
}


buttonImg2 = () =>{
    this.state.element.buttonImg2 = this.CreateElement({
        element:"div",
        class:"buttonImgclass",
    },this.comenProfil2(),this.comentInput2())
    return  this.state.element.buttonImg2
 }

 comenProfil2 = () =>{
    this.state.element.comenProfil2 = this.CreateElement({
            element:"img",
            src:"Frontend/Assets/images/icons/eli.svg",
            class:"comenProfil"
    })
   return this.state.element.comenProfil2
 }

 comentInput2 = () =>{
    this.state.element.comentInput2 = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    })

    return this.state.element.comentInput2
 }


 createOperator1 = () =>{
    this.state.element.createOperator1 = this.CreateElement({
        element:"div",
        class:"operatorclas",
    },this.operatori1(),this.inputBlockdiv1(),this.potoDiv1(),)
    return  this.state.element.createOperator1
 }

 operatori1 = () =>{
    this.state.element.operatori1 = this.CreateElement({
        element:"div",
        class:"operatori",
    },this.operatorImgi1(),this.blockDiv2(),)
    return this.state.element.operatori1
 }

 operatorImgi1 = () =>{
    this.state.element.operatorImgi1 = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/eli.svg",
    })
    return this.state.element.operatorImgi1
 }

 blockDiv2 = () =>{
    this.state.element.blockDiv2 = this.CreateElement({
        element:"div",
        class:"blockDiv",
    },this.userBlovk1(),this.blockDiv3())
    return this.state.element.blockDiv2
 }

 userBlovk1 = () =>{
    this.state.element.userBlovk1 = this.CreateElement({
        element:"p",
        class:"userBlovk",
        text:"User_Name"
    })
    return this.state.element.userBlovk1
 }

 blockDiv3 = () =>{
    this.state.element.blockDiv3 = this.CreateElement({
        element:"div",
        class:"blockDiv1",
    },this.blockImgi2(),this.userBlock2())
    return this.state.element.blockDiv3
 }

 blockImgi2 = () =>{
    this.state.element.blockImgi2 = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/lock.svg",
    })
    return this.state.element.blockImgi2
 }

 userBlock2 = () =>{
    this.state.element.userBlock2 = this.CreateElement({
        element:"p",
        class:"userBlock1",
        text:"ოპერატორები"
    })
    return this.state.element.userBlock2
 }

 inputBlockdiv1 = () =>{
    this.state.element.inputBlockdiv1 = this.CreateElement({
        element:"div",
        class:"inputBlockdiv",
    },this.inputBlock1())
    return this.state.element.inputBlockdiv1
 }

 inputBlock1 = () =>{
    this.state.element.inputBlock1 = this.CreateElement({
        element:"input",
        class:"inputBlock",
        placeholder:"დაწერეთ რას ფიქრობთ ?"
    })
    return this.state.element.inputBlock1
 }

potoDiv1 = () =>{
    this.state.element.potoDiv1 = this.CreateElement({
        element:"div",
        class:"potoDiv",
    },this.camera1(),this.smile1(),this.mapPin1())
    return this.state.element.potoDiv1
}

camera1 = () =>{
    this.state.element.camera1 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/camera 1.svg",
    })
    return this.state.element.camera1
}

smile1 = () =>{
    this.state.element.smile1 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/smile 1.svg",
    })
    return   this.state.element.smile1
}

mapPin1 = () =>{
    this.state.element.smile1 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/map-pin 1.svg",
    })
    return   this.state.element.smile1
}



Surveys = () =>{
    this.state.element.Surveys = this.CreateElement({
        element:"div",
        class:"surveysclass",
        id:"surveysid",
    },this.SurveysDiv(),this.Update(),this.userRest())
    return  this.state.element.Surveys
}

SurveysDiv = () =>{
    this.state.element.SurveysDiv = this.CreateElement({
        element:"div",
        class:"creatediv",
        
    },this.SurveysThink(),this.Surthinck(),this.initiatives4())
    return  this.state.element.SurveysDiv
}

SurveysThink = () =>{
    this.state.element.SurveysThink = this.CreateElement({
        element:"div",
        class:"createThink",
    },this.SurveysImg(),this.SurveysParagrap())
    return this.state.element.SurveysThink
}

SurveysImg = () =>{
    this.state.element.SurveysImg = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/check 4.svg",
    })
    return this.state.element.SurveysImg
}

SurveysParagrap = () =>{
    this.state.element.SurveysParagrap = this.CreateElement({
        element: "p",
        class: "postParagrap",
        text:"შექმენით გამოკითხვა",
    })
    return  this.state.element.SurveysParagrap
}


Surthinck = () =>{
    this.state.element.Surthinck = this.CreateElement({
        element:"div",
        class:"think",

    },this.SurthinckDiv())
    return this.state.element.Surthinck
}

SurthinckDiv = () =>{
    this.state.element.SurthinckDiv = this.CreateElement({
        element:"div",
        class:"thinkDiv",

    },this.WhatThink3())
    return this.state.element.SurthinckDiv
}

WhatThink3 = () =>{
    this.state.element.WhatThink3 = this.CreateElement({
        element:"div",
        class:"WhatThink",

    },this.divImg8(),this.watParagrap5())
    return this.state.element.WhatThink3
}

divImg8 = () =>{
    this.state.element.divImg8 = this.CreateElement({
        element:"img",
        class:"divImg",
        src:"Frontend/Assets/images/icons/10.svg",
    })
    return this.state.element.divImg8
}

watParagrap5 = () =>{
    this.state.element.watParagrap5 = this.CreateElement({
        element: "input",
        class: "watParagrap",
        placeholder:"დაწერეთ რას ფიქრობთ ?",
        onclick: () => {
            this.buildModal(null,{
                width: "763px",
                height: "549px",
                backgroundcolor:"white",
                content: this.addAck(),
                    buttons: {
                        save: {
                            name: "გამოქვეყნება",
                            access: "save"
                        },
                    },
                confirmOnCancel: false,
            })
        }
        })
    return  this.state.element.watParagrap5
}

initiatives4 = () => {
    this.state.element.initiatives4 = this.CreateElement({
        element:"div",
        class:"initiatives",

    },this.plusPost3(),this.newsPost4(),this.surveysDiv4(),this.initiativesDiv4())
    return  this.state.element.initiatives4
}

plusPost3 = () =>{
    this.state.element.plusPost3 = this.CreateElement({
       element:"div",
       class:"plusPost", 

    },this.divImg15(),this.watParagrap15())
    return this.state.element.plusPost3
}

divImg15 = () =>{
    this.state.element.divImg15 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.divImg15
}

watParagrap15 = () =>{
    this.state.element.watParagrap15 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" პოსტი",
        onclick: () =>{
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"flex"})

            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"flex"})

            let fim2 =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})
        }
    })
    return  this.state.element.watParagrap15
}

newsPost4 = () =>{
    this.state.element.newsPost4 = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.divImg16(),this.watParagrap16())
    return this.state.element.newsPost4
}


divImg16 = () =>{
    this.state.element.divImg2 = this.CreateElement({
        element:"img",
        class:"divImg2",
        src:"Frontend/Assets/images/icons/Fram.svg",
    })
    return this.state.element.divImg2
}

watParagrap16 = () =>{
    this.state.element.watParagrap16 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" სიახლეები",
        onclick: () =>{
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"})
            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"flex"})
            let fim =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})
        }
    })
    return  this.state.element.watParagrap16
}

surveysDiv4 = () =>{
    this.state.element.surveysDiv4 = this.CreateElement({
        element:"div",
        class:"plusPost",

    },this.divImg17(), this.watParagrap17())
    return  this.state.element.surveysDiv4
}

divImg17 = () =>{
    this.state.element.divImg17 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/check 3.svg",
    })
    return this.state.element.divImg17
}

watParagrap17 = () =>{
    this.state.element.watParagrap17 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" გამოკითხვები ",
        })

    return  this.state.element.watParagrap17
}

initiativesDiv4 = () =>{
    this.state.element.initiativesDiv4 = this.CreateElement({
        element:"div",
        class:"plusPost",
        
    },this.divImg18(), this.watParagrap18())
    return  this.state.element.initiativesDiv4
}

divImg18 = () =>{
    this.state.element.divImg18 = this.CreateElement({
        element:"img",
        class:"divImg4",
        src:"Frontend/Assets/images/icons/star 1.svg",
    })
    return this.state.element.divImg18
}

watParagrap18 = () =>{
    this.state.element.watParagrap18 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" ინიციატივები ",
        onclick: () =>{
            let inic =document.querySelector("#initiativeid")
            $("#initiativeid").css({"display":"flex"})
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"})
            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"none"})
            let fim =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})
        }
        
    })
    return  this.state.element.watParagrap18
}


Update = () =>{
    this.state.element.Update =this.CreateElement({
        element:"div",
        class:"updatediv"
    },this.updateforEach())
    return   this.state.element.Update
}

updateforEach = () =>{

    let updateobj = [{username:"User_Name",img:"Frontend/Assets/images/icons/eli.svg",hour:"11 hours",date:"15.07.2022 10:05",
    updateparagrap:"რამდენად მოგწონთ ჩვენი ახალი Update?",updateimg:"Frontend/Assets/images/icons/png.svg",userparagrap:"50",
    userComent:"11"}]

    this.state.element.userName1 = this.CreateElement({
        element:"div",
        class:"divs",
    })
    updateobj.forEach((updatevalue)=>{
        
        this.state.element.grupDiv = this.CreateElement({
            element:"div",
            class:"grupDiv"
        },
        this.state.element.updateimg = this.CreateElement({
            element:"img",
            src:updatevalue.updateimg,
            class:"updateimg",
        }),  this.state.element.userparagrap = this.CreateElement({
            element:"p",
            text:updatevalue.userparagrap,
            class:"userparagrap",
        }),
        this.state.element.userComent = this.CreateElement({
            element:"p",
            text:updatevalue.userComent  + "comment",
            class:"userComent",
        }))
        this.state.element.updatecheck = this.CreateElement({
            element:"div",
            class:"updatecheck",     
        },this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"ძალიან"
        })),this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"კოშმარი"
        })),this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },  this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"საოცარი",
        })))
        this.state.element.updateparagrap = this.CreateElement({
            element:"p",
            class:"update",
            text:updatevalue.updateparagrap,
        }),
        this.state.element.updateAsk = this.CreateElement({
            element:"div",
            class:"updateAsk"

        },this.state.element.updateparagrap)

        this.state.element.likeButton2 =this.CreateElement({
            element:"div",
            class:"likeButton"
        },this.state.element.likeImg2 =this.CreateElement({
            element:"img",
            class:"likeButon",
            src:"Frontend/Assets/images/icons/lik.svg"
        }), this.state.element.likePwaragrap2 = this.CreateElement({
            element:"p",
            text:"მოწონება",
            class:"likePwaragrap",
        })),
        this.state.element.comentButton2 =this.CreateElement({
            element:"div",
            class:"comentButton"
        }, this.state.element.comenImg2 =this.CreateElement({
            element:"img",
            class:"comenImg",
            src:"Frontend/Assets/images/icons/coment.svg"
        }), this.state.element.comentParagrap2 = this.CreateElement({
            element:"p",
            text:"კომენტარი",
            class:"comentParagrap",
        })),
        this.state.element.shearButton2 =this.CreateElement({
            element:"div",
            class:"shearButton"
        }, this.state.element.shearParagrap2 = this.CreateElement({
            element:"img",
            class:"shearParagrap",
            src:"Frontend/Assets/images/icons/share.svg"

        }),  this.state.element.shearImg2 = this.CreateElement({
            element:"p",
            class:"shearImg",
            text:"გაზიარება",
            class:"shearParagrap",
        }))

        this.state.element.updateLIke =this.CreateElement({
            element:"div",
            class:"Feedback5"
        },this.state.element.likeButton2, this.state.element.comentButton2,this.state.element.shearButton2)
 
        this.state.element.userName4 = this.CreateElement({ // შვილი დივი
            element:"div",
            class:"paragrap", 
          },this.CreateElement({
            element: "div",
            class:"eli",
          },this.state.element.createImg13, this.CreateElement({
            element: "div"
          },this.state.element.paragrap13,
          this.state.element.paragrap14)),this.state.element.paragrap15);

          this.state.element.twoDiv = this.CreateElement({
            element:"div",
            class:"twoDiv",
          })

    this.state.element.buttonImg5 = this.CreateElement({
        element:"div",
        class:"buttonImg5",
    }, this.state.element.comenProfil = this.CreateElement({
        element:"img",
        src:"Frontend/Assets/images/icons/eli.svg",
        class:"comenProfil"
    }), this.state.element.comentInput = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    }))
        this.state.element.userName1.appendChild(this.state.element.userName4)
        this.state.element.userName1.appendChild(this.state.element.updateAsk)
        this.state.element.userName1.appendChild(this.state.element.updatecheck)
        this.state.element.userName1.appendChild(this.state.element.grupDiv)
        this.state.element.userName1.appendChild(this.state.element.updateLIke)
        this.state.element.userName1.appendChild(this.state.element.buttonImg5)
    })
     return this.state.element.userName1    
}



userRest = () =>{
    this.state.element.userRest =this.CreateElement({
        element:"div",
        class:"updatediv"
    },this.userestforEach())
    return   this.state.element.userRest
}
userestforEach = () =>{
    let resteobj = [{username1:"User_Name",img2:"Frontend/Assets/images/icons/eli.svg",hour2:"11 hours",date2:"15.07.2022 10:05",
    updateparagrap1:"ხვალ ვისვენებთ მეგობრებო?",updateimg:"Frontend/Assets/images/icons/png.svg",updateparagrap5:"50",
    userComent:"11"}]

    this.state.element.userName3 = this.CreateElement({
        element:"div",
        class:"divs",
    })
    resteobj.forEach((restvalue)=>{
        
        this.state.element.grupDiv2 = this.CreateElement({
            element:"div",
            class:"grupDiv"
        },
        this.state.element.updateimg = this.CreateElement({
            element:"img",
            src:restvalue.updateimg,
            class:"updateimg",
        }),this.state.element.userparagrap5 = this.CreateElement({
            element:"p",
            text:restvalue.updateparagrap5,
            class:"updateparagrap",
        }),
        this.state.element.userComent = this.CreateElement({
            element:"p",
            text:restvalue.userComent  + "comment",
            class:"userComent",
        })),
        
        this.state.element.restcheck = this.CreateElement({
            element:"div",
            class:"updatecheck",     
        },this.state.element.checkDiv6 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck6 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText6 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"კი"
        })),this.state.element.checkDiv6 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck6 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText6 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"არა"
        })),this.state.element.checkDiv6 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        })),
        this.state.element.yesasck = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.userparagrap = this.CreateElement({
            element:"p",
            text:restvalue.updateparagrap1,
            class:"userparagrapclas",
        })),

        this.state.element.resteAsk = this.CreateElement({
            element:"div",
            class:"term"
        },this.state.element.restsk = this.CreateElement({
            element:"div",
            class:"restsk"
        },   this.state.element.userparagrap = this.CreateElement({
            element:"img",
            src:restvalue.img2,
        }),this.state.element.resk = this.CreateElement({
            element:"div",
        },this.state.element.pragrap = this.CreateElement({
            element:"p",
            text:restvalue.username1,
            class:"User",
        }),this.state.element.hour2 = this.CreateElement({
            element:"p",
            text:restvalue.hour2,
            class:"hours",
        }))) ,this.state.element.date2 = this.CreateElement({
            element:"p",
            text:restvalue.date2,
            class:"time",
        }))

        this.state.element.likeButton3 =this.CreateElement({
            element:"div",
            class:"likeButton"
        },this.state.element.likeImg3 =this.CreateElement({
            element:"img",
            class:"likeButon",
            src:"Frontend/Assets/images/icons/lik.svg"
        }), this.state.element.likePwaragrap3 = this.CreateElement({
            element:"p",
            text:"მოწონება",
            class:"likePwaragrap",
        })),
        this.state.element.comentButton3 =this.CreateElement({
            element:"div",
            class:"comentButton"
        }, this.state.element.comenImg3 =this.CreateElement({
            element:"img",
            class:"comenImg",
            src:"Frontend/Assets/images/icons/coment.svg"
        }), this.state.element.comentParagrap3 = this.CreateElement({
            element:"p",
            text:"კომენტარი",
            class:"comentParagrap",
        })),
        this.state.element.shearButton3 =this.CreateElement({
            element:"div",
            class:"shearButton"
        }, this.state.element.shearParagrap3 = this.CreateElement({
            element:"img",
            class:"shearParagrap",
            src:"Frontend/Assets/images/icons/share.svg"

        }),  this.state.element.shearImg3 = this.CreateElement({
            element:"p",
            class:"shearImg",
            text:"გაზიარება",
            class:"shearParagrap",
        }))
        this.state.element.updateLIke1 =this.CreateElement({
            element:"div",
            class:"Feedback5"
        },this.state.element.likeButton3, this.state.element.comentButton3,this.state.element.shearButton3)
 

    this.state.element.buttonImg6 = this.CreateElement({
        element:"div",
        class:"buttonImg5",
    }, this.state.element.comenProfili = this.CreateElement({
        element:"img",
        src:"Frontend/Assets/images/icons/eli.svg",
        class:"comenProfil"
    }), this.state.element.comentInputi = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    }))
        this.state.element.userName3.appendChild(this.state.element.resteAsk)
        this.state.element.userName3.appendChild(this.state.element.yesasck)
        this.state.element.userName3.appendChild(this.state.element.restcheck)
        this.state.element.userName3.appendChild(this.state.element.grupDiv2)
        this.state.element.userName3.appendChild(this.state.element.updateLIke1)
        this.state.element.userName3.appendChild(this.state.element.buttonImg6)
    })
     return this.state.element.userName3    
}

addAck = ()=>{
    this.state.element.addAck = this.CreateElement({
        element:"div",
        class:"addackclass"
    },this.operatori2(),this.inputBlockdiv2(),this.potoDiv2(),
    this.updateAsk2(),this.addAnser(),this.result())
    return this.state.element.addAck
}


operatori2 = () =>{
    this.state.element.operatori2 = this.CreateElement({
        element:"div",
        class:"operatori2",
    },this.operatorImgi2(),this.blockDiv3(),)
    return this.state.element.operatori2
 }

 operatorImgi2 = () =>{
    this.state.element.operatorImgi2 = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/eli.svg",
    })
    return this.state.element.operatorImgi2
 }

 blockDiv3 = () =>{
    this.state.element.blockDiv3 = this.CreateElement({
        element:"div",
        class:"blockDiv",
    },this.userBlovk2(),this.blockDiv4())
    return this.state.element.blockDiv3
 }
 userBlovk2 = () =>{
    this.state.element.userBlovk2 = this.CreateElement({
        element:"p",
        class:"userBlovk",
        text:"User_Name"
    })
    return this.state.element.userBlovk2
 }

 blockDiv4 = () =>{
    this.state.element.blockDiv4 = this.CreateElement({
        element:"div",
        class:"blockDiv4",
    },this.blockImgi3(),this.userBlock3())
    return this.state.element.blockDiv4
 }

 blockImgi3 = () =>{
    this.state.element.blockImgi3 = this.CreateElement({
        element:"img",
        class:"operatorImgi",
        src:"Frontend/Assets/images/icons/lock.svg",
    })
    return this.state.element.blockImgi3
 }

 userBlock3 = () =>{
    this.state.element.userBlock3 = this.CreateElement({
        element:"p",
        class:"userBlock1",
        text:"ოპერატორები"
    })
    return this.state.element.userBlock3
 }

 inputBlockdiv2 = () =>{
    this.state.element.inputBlockdiv2 = this.CreateElement({
        element:"div",
        class:"inputBlockdiv",
    },this.inputBlock2())
    return this.state.element.inputBlockdiv2
 }

 inputBlock2 = () =>{
    this.state.element.inputBlock2 = this.CreateElement({
        element:"input",
        class:"inputBlock",
        placeholder:"დაწერეთ რას ფიქრობთ ?"
    })
    return this.state.element.inputBlock2
 }

potoDiv2 = () =>{
    this.state.element.potoDiv2 = this.CreateElement({
        element:"div",
        class:"potodiv2",
    },this.camera2(),this.smile2(),this.mapPin2())
    return this.state.element.potoDiv2
}
camera2 = () =>{
    this.state.element.camera2 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/camera 1.svg",
    })
    return this.state.element.camera2
}

smile2 = () =>{
    this.state.element.smile2 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/smile 1.svg",
    })
    return   this.state.element.smile2
}

mapPin2 = () =>{
    this.state.element.mapPin2 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/map-pin 1.svg",
    })
    return   this.state.element.mapPin2
}
updateAsk2 = () =>{
    this.state.element.updateAsk2 = this.CreateElement({
        element:"div",
        class:"updateaskclass"
    },this.likeupdate(),)
    return this.state.element.updateAsk2
}

likeupdate = () =>{
    this.state.element.likeupdate = this.CreateElement({
        element:"div",
        class:"likeupdateclas",
    },this.inputupdate(),this.inputupdateDiv())
    return  this.state.element.likeupdate
}
inputupdate = () =>{
    this.state.element.inputupdate =this.CreateElement({
        element:"input",
        class:"inputupdateclass",
    })
    return this.state.element.inputupdate
}

inputupdateDiv = () =>{
    this.state.element.inputupdateDiv = this.CreateElement({
        element:"div",
        class:"inputupdateDiv",
    },this.inputupdate3(),this.inputupdate1(),this.inputupdate2())
    return  this.state.element.inputupdateDiv
}

inputupdate1 = () =>{
    this.state.element.inputupdate1 =this.CreateElement({
        element:"input",
        class:"inputupdateclas",
    })
    return this.state.element.inputupdate1
}
inputupdate2 = () =>{
    this.state.element.inputupdate2 =this.CreateElement({
        element:"input",
        class:"inputupdateclas",
        id:"inputupdate2id",
    })
    return this.state.element.inputupdate2
}
inputupdate3 = () =>{
    this.state.element.inputupdate3 =this.CreateElement({
        element:"input",
        class:"inputupdateclas",
    })
    return this.state.element.inputupdate3
}


addAnser = () =>{
    this.state.element.addAnser =this.CreateElement({
        element:"div",
        class:"addAnserclas",
    },this.add2(),this.anserw())
    return this.state.element.addAnser
}
add2 = () =>{
    this.state.element.add2 = this.CreateElement({
        element:"img",
        class:"camera",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return   this.state.element.add2
}
anserw = () =>{
    this.state.element.anserw =this.CreateElement({
        element:"p",
        class:"anserwclas",
        text:"დაამატე პასუხი",
            onclick: () =>{
                this.state.element.inputadd = this.CreateElement({
                    element:"input",
                    class:"inputupdateclas",
                })
                this.append(this.state.element.inputupdateDiv,this.state.element.inputadd)
            },
    })
    return this.state.element.anserw 
}

result = () =>{
    this.state.element.result = this.CreateElement({
        element:"div",
        class:"resultclas"
    },this.inputCheck2(),this.inputText2())
    return this.state.element.result 
}

inputCheck2 = () =>{
    this.state.element.inputCheck = this.CreateElement({
        element:"input",
        class:"inputChec",
        type:"checkbox"
    },this.inputText())
    return this.state.element.inputCheck
 }

 inputText2 = () =>{
    this.state.element.inputText = this.CreateElement({
        element:"label",
        class:"inputText",
        text:" შედეგების ნახვა"
    })
    return this.state.element.inputText
 }







 initiative = () =>{
    this.state.element.initiative = this.CreateElement({
        element:"div",
        class:"initiativeclas",
        id:"initiativeid",
    },this.initiativeDiv(),this.initiativeUpdate(),)
    return  this.state.element.initiative
}

initiativeDiv = () =>{
    this.state.element.initiativeDiv = this.CreateElement({
        element:"div",
        class:"creatediv",
        
    },this.initiativeThink(),this.initiativethinck(),this.initiatives5())
    return  this.state.element.initiativeDiv
}

initiativeThink = () =>{
    this.state.element.initiativeThink = this.CreateElement({
        element:"div",
        class:"createThink",
    },this.initiativeImg(),this.initiativeParagrap())
    return this.state.element.initiativeThink
}

initiativeImg = () =>{
    this.state.element.initiativeImg = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/star 3.svg",
    })
    return this.state.element.initiativeImg
}

initiativeParagrap = () =>{
    this.state.element.initiativeParagrap = this.CreateElement({
        element: "p",
        class: "postParagrap",
        text:"შექმენით ინიციატივა",
    })
    return  this.state.element.initiativeParagrap
}


initiativethinck = () =>{
    this.state.element.initiativethinck = this.CreateElement({
        element:"div",
        class:"think",
    },this.initiativethinckDiv())
    return this.state.element.initiativethinck
}

initiativethinckDiv = () =>{
    this.state.element.initiativethinckDiv = this.CreateElement({
        element:"div",
        class:"thinkDiv",
    },this.WhatThink4())
    return this.state.element.initiativethinckDiv
}

WhatThink4 = () =>{
    this.state.element.WhatThink4 = this.CreateElement({
        element:"div",
        class:"WhatThink",

    },this.indivImg(),this.inwatParagrap())
    return this.state.element.WhatThink4
}

indivImg = () =>{
    this.state.element.indivImg = this.CreateElement({
        element:"img",
        class:"divImg",
        src:"Frontend/Assets/images/icons/10.svg",
    })
    return this.state.element.indivImg
}

inwatParagrap = () =>{
    this.state.element.inwatParagrap = this.CreateElement({
        element: "input",
        class: "watParagrap",
        placeholder:"დაწერეთ რას ფიქრობთ ?",
        })
    return  this.state.element.inwatParagrap
}

initiatives5 = () => {
    this.state.element.initiatives5 = this.CreateElement({
        element:"div",
        class:"initiatives",

    },this.inplusPost(),this.innewsPost(),this.inicsurveysDiv(),this.inciativesDiv())
    return  this.state.element.initiatives5
}
inplusPost = () =>{
    this.state.element.inplusPost = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.inicdivImg(),this.inicwatParagrap())
    return this.state.element.inplusPost
}
inicdivImg = () =>{
    this.state.element.inicdivImg = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.inicdivImg
}
inicwatParagrap = () =>{
    this.state.element.inicwatParagrap = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" პოსტი",
        onclick: () =>{
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"flex"})

            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"flex"})

            let fim2 =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})

            let inic =document.querySelector("#initiativeid")
            $("#initiativeid").css({"display":"none"})
            
        }
    })
    return  this.state.element.inicwatParagrap
}

innewsPost = () =>{
    this.state.element.innewsPost = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.inicdivImg1(),this.inicwatParagrap1())
    return this.state.element.innewsPost
}

inicdivImg1 = () =>{
    this.state.element.inicdivImg1 = this.CreateElement({
        element:"img",
        class:"divImg2",
        src:"Frontend/Assets/images/icons/Fram.svg",
    })
    return this.state.element.inicdivImg1
}

inicwatParagrap1 = () =>{
    this.state.element.inicwatParagrap1 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" სიახლეები",
        onclick: () =>{
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"flex"})
            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"none"})
            let fim =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})
            let inic =document.querySelector("#initiativeid")
            $("#initiativeid").css({"display":"none"})
            
        }
    })
    return  this.state.element.inicwatParagrap1
}


inicsurveysDiv = () =>{
    this.state.element.inicsurveysDiv = this.CreateElement({
        element:"div",
        class:"plusPost",

    },this.inicdivImg2(), this.inicwatParagrap2())
    return  this.state.element.inicsurveysDiv
}

inicdivImg2 = () =>{
    this.state.element.inicdivImg2 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/check 3.svg",
    })
    return this.state.element.inicdivImg2
}

inicwatParagrap2 = () =>{
    this.state.element.inicwatParagrap2 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" გამოკითხვები ",
        onclick: () =>{
            let fim2 =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"flex"})
            
            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"})

            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"none"})

            let inic =document.querySelector("#initiativeid")
            $("#initiativeid").css({"display":"none"})
        }
        })

    return  this.state.element.inicwatParagrap2
}

inciativesDiv = () =>{
    this.state.element.inciativesDiv = this.CreateElement({
        element:"div",
        class:"plusPost",
        
    },this.inicidivImg(), this.iniciwatParagrap())
    return  this.state.element.inciativesDiv
}

inicidivImg = () =>{
    this.state.element.inicidivImg = this.CreateElement({
        element:"img",
        class:"inicidivImgclas",
        src:"Frontend/Assets/images/icons/star 2.svg",
    })
    return this.state.element.inicidivImg
}

iniciwatParagrap = () =>{
    this.state.element.iniciwatParagrap = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" ინიციატივები ",
    })
    return  this.state.element.iniciwatParagrap
}


initiativeUpdate = () =>{
    this.state.element.initiativeUpdate =this.CreateElement({
        element:"div",
        class:"initiativeUpdatec"
    },this.inicforEach())
    return   this.state.element.initiativeUpdate
}

inicforEach = () =>{
    let updateobj = [{username:"User_Name",img:"Frontend/Assets/images/icons/eli.svg",hour:"11 hours",date:"15.07.2022 10:05",
    updateparagrap:"რამდენად მოგწონთ ჩვენი ახალი Update?",updateimg:"Frontend/Assets/images/icons/png.svg",userparagrap:"50",
    userComent:"11"}]

    this.state.element.userName1 = this.CreateElement({
        element:"div",
        class:"divs",
    })
    updateobj.forEach((updatevalue)=>{
        
        this.state.element.grupDiv = this.CreateElement({
            element:"div",
            class:"grupDiv"
        },
        this.state.element.updateimg = this.CreateElement({
            element:"img",
            src:updatevalue.updateimg,
            class:"updateimg",
        }),  this.state.element.userparagrap = this.CreateElement({
            element:"p",
            text:updatevalue.userparagrap,
            class:"userparagrap",
        }),
        this.state.element.userComent = this.CreateElement({
            element:"p",
            text:updatevalue.userComent  + "comment",
            class:"userComent",
        }))
        this.state.element.updatecheck = this.CreateElement({
            element:"div",
            class:"updatecheck",     
        },this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"ძალიან"
        })),this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"კოშმარი"
        })),this.state.element.checkDiv5 = this.CreateElement({
            element:"div",
            class:"checkDivclas",
        },  this.state.element.inputCheck5 = this.CreateElement({
            element:"input",
            class:"inputChec",
            type:"checkbox"
        }),this.state.element.inputText5 = this.CreateElement({
            element:"label",
            class:"inputText",
            text:"საოცარი",
        })))
        this.state.element.updateparagrap = this.CreateElement({
            element:"p",
            class:"update",
            text:updatevalue.updateparagrap,
        })
        this.state.element.updateAsk = this.CreateElement({
            element:"div",
            class:"updateAsk"

        },this.state.element.updateparagrap)

        this.state.element.likeButton2 =this.CreateElement({
            element:"div",
            class:"likeButton"
        },this.state.element.likeImg2 =this.CreateElement({
            element:"img",
            class:"likeButon",
            src:"Frontend/Assets/images/icons/lik.svg"
        }), this.state.element.likePwaragrap2 = this.CreateElement({
            element:"p",
            text:"მოწონება",
            class:"likePwaragrap",
        })),
        this.state.element.comentButton2 =this.CreateElement({
            element:"div",
            class:"comentButton"
        }, this.state.element.comenImg2 =this.CreateElement({
            element:"img",
            class:"comenImg",
            src:"Frontend/Assets/images/icons/coment.svg"
        }), this.state.element.comentParagrap2 = this.CreateElement({
            element:"p",
            text:"კომენტარი",
            class:"comentParagrap",
        })),
        this.state.element.shearButton2 =this.CreateElement({
            element:"div",
            class:"shearButton"
        }, this.state.element.shearParagrap2 = this.CreateElement({
            element:"img",
            class:"shearParagrap",
            src:"Frontend/Assets/images/icons/share.svg"

        }),  this.state.element.shearImg2 = this.CreateElement({
            element:"p",
            class:"shearImg",
            text:"გაზიარება",
            class:"shearParagrap",
        }))

        this.state.element.updateLIke =this.CreateElement({
            element:"div",
            class:"Feedback5"
        },this.state.element.likeButton2, this.state.element.comentButton2,this.state.element.shearButton2)
 
        this.state.element.userName4 = this.CreateElement({ // შვილი დივი
            element:"div",
            class:"paragrap", 
          },this.CreateElement({
            element: "div",
            class:"eli",
          },this.state.element.createImg13, this.CreateElement({
            element: "div"
          },this.state.element.paragrap13,
          this.state.element.paragrap14)),this.state.element.paragrap15);

          this.state.element.twoDiv = this.CreateElement({
            element:"div",
            class:"twoDiv",
          })

    this.state.element.buttonImg5 = this.CreateElement({
        element:"div",
        class:"buttonImg5",
    }, this.state.element.comenProfil = this.CreateElement({
        element:"img",
        src:"Frontend/Assets/images/icons/eli.svg",
        class:"comenProfil"
    }), this.state.element.comentInput = this.CreateElement({
        element:"input",
        class:"inputi",
        placeholder:"დაწერეთ კომენტარი .......",
    }))
        this.state.element.userName1.appendChild(this.state.element.userName4)
        this.state.element.userName1.appendChild(this.state.element.updateAsk)
        this.state.element.userName1.appendChild(this.state.element.updatecheck)
        this.state.element.userName1.appendChild(this.state.element.grupDiv)
        this.state.element.userName1.appendChild(this.state.element.updateLIke)
        this.state.element.userName1.appendChild(this.state.element.buttonImg5)
    })
     return this.state.element.userName1    
}



CreatePost2 = () =>{
    this.state.element.CreatePost2 = this.CreateElement({
        element:"div",
        class:"createpostc",
        id:"createpostid2",
    },this.CreatepostDiv3(),)
    return  this.state.element.CreatePost2
}

CreatepostDiv3 = () =>{
    this.state.element.CreatepostDiv3 = this.CreateElement({
        element:"div",
        class:"creatediv",
    },this.createThink1(),this.think5(),this.initiatives8())
    return  this.state.element.CreatepostDiv3
}

createThink1 = () =>{
    this.state.element.createThink1 = this.CreateElement({
        element:"div",
        class:"createThink",
    },this.pliusImg3(),this.postParagrap4())
    return this.state.element.createThink1
}

pliusImg3 = () =>{
    this.state.element.pliusImg3 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.pliusImg3
}

postParagrap4 = () =>{
    this.state.element.postParagrap4 = this.CreateElement({
        element: "p",
        class: "postParagrap",
        text:"შექმენით პოსტი",
    })
    return  this.state.element.postParagrap4
}

think5 = () =>{
    this.state.element.think5 = this.CreateElement({
        element:"div",
        class:"think",

    },this.thinkDiv5())
    return this.state.element.think5
}

thinkDiv5 = () =>{
    this.state.element.thinkDiv5 = this.CreateElement({
        element:"div",
        class:"thinkDiv",
    },this.WhatThink5())
    return this.state.element.thinkDiv5
}

WhatThink5 = () =>{
    this.state.element.WhatThink5 = this.CreateElement({
        element:"div",
        class:"WhatThink",

    },this.divImg19(),this.watParagrap19())
    return this.state.element.WhatThink5
}

divImg19 = () =>{
    this.state.element.divImg19 = this.CreateElement({
        element:"img",
        class:"divImg",
        src:"Frontend/Assets/images/icons/10.svg",
    })
    return this.state.element.divImg19
}

watParagrap19 = () =>{
    this.state.element.watParagrap19 = this.CreateElement({
        element: "input",
        class: "watParagrap",
        placeholder:" დაწერეთ რას ფიქრობთ ?",

        })
    return  this.state.element.watParagrap19
}

initiatives8 = () => {
    this.state.element.initiatives8 = this.CreateElement({
        element:"div",
        class:"initiatives",
    },this.plusPost5(),this.newsPost9(),this.surveysDiv2(),this.initiativesDiv2())
    return  this.state.element.initiatives8
}
plusPost5 = () =>{
    this.state.element.plusPost5 = this.CreateElement({
       element:"div",
       class:"plusPost",
    },this.divImg21(),this.watParagrap21())
    return this.state.element.plusPost5
}
divImg21 = () =>{
    this.state.element.divImg21 = this.CreateElement({
        element:"img",
        class:"pliusImg",
        src:"Frontend/Assets/images/icons/plus 2.svg",
    })
    return this.state.element.divImg21
}
watParagrap21 = () =>{
    this.state.element.watParagrap21 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" პოსტი",
    })
    return  this.state.element.watParagrap21
}
newsPost9 = () =>{
    this.state.element.newsPost9 = this.CreateElement({
       element:"div",
       class:"plusPost", 
    },this.divImg22(),this.watParagrap22())
    return this.state.element.newsPost9
}
divImg22 = () =>{
    this.state.element.divImg22 = this.CreateElement({
        element:"img",
        class:"divImg2",
        src:"Frontend/Assets/images/icons/Fram.svg",
    })
    return this.state.element.divImg22
}
watParagrap22 = () =>{
    this.state.element.watParagrap22 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" სიახლეები",
          onclick: () =>{

            let out =document.querySelector("#new1id")
            $("#new1id").css({"display":"flex"},)

            let out1 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"},)
        
            let show=document.querySelector("#useri")
            $("#useri").css({"display":"none"})

            let time =document.querySelector("#timeDivi")
            $("#timeDivi").css({"display":"none"})

            let fim =document.querySelector("#filenameDiv1")
            $("#filenameDiv1").css({"display":"none"})

            let fim1 =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})

            let fim2 =document.querySelector("#grupTupe")
            $("#grupTupe").css({"display":"none"})
            },
    })
    return  this.state.element.watParagrap22
}

surveysDiv2 = () =>{
    this.state.element.surveysDiv2 = this.CreateElement({
        element:"div",
        class:"plusPost",

    },this.divImg23(),this.watParagrap23())
    return  this.state.element.surveysDiv2
}

divImg23 = () =>{
    this.state.element.divImg23 = this.CreateElement({
        element:"img",
        class:"divImg3",
        src:"Frontend/Assets/images/icons/Frame 1.svg",
    })
    return this.state.element.divImg23
}

watParagrap23 = () =>{
    this.state.element.watParagrap23 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" გამოკითხვები ",
    })
    return  this.state.element.watParagrap23
}


initiativesDiv2 = () =>{
    this.state.element.initiativesDiv2 = this.CreateElement({
        element:"div",
        class:"plusPost",
        
    },this.divImg24(), this.watParagrap24())
    return  this.state.element.initiativesDiv2
}

divImg24 = () =>{
    this.state.element.divImg24 = this.CreateElement({
        element:"img",
        class:"divImg4",
        src:"Frontend/Assets/images/icons/Group 12.svg",
    })
    return this.state.element.divImg24
}

watParagrap24 = () =>{
    this.state.element.watParagrap24 = this.CreateElement({
        element: "p",
        class: "watParagrap1",
        text:" ინიციატივები ",

        onclick: () => {
            let inic =document.querySelector("#initiativeid")
            $("#initiativeid").css({"display":"fles"})

            let fim3 =document.querySelector("#createpostid")
            $("#createpostid").css({"display":"none"})
            
            let fim1 =document.querySelector("#new1id")
            $("#new1id").css({"display":"none"})
            let fim =document.querySelector("#surveysid")
            $("#surveysid").css({"display":"none"})
          

        }
    })
    return  this.state.element.watParagrap24

}







}