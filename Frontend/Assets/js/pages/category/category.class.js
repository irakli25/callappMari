import Tdg from "../../tdg.class.js";

export default class Category extends Tdg{
    constructor(){
        super();
        self.Category = this;
        this.state = {
            sectionName: document.querySelector("section[Category]"),
            element: []
        }
        this.removeLoading();
        this.init();

       
    }

    init = () => {
        
        this.append(this.state.sectionName,this.buildIframe())

    }

    buildIframe = () =>{
        this.state.iframe = this.CreateElement({
            element: "iframe",
            src:"tecallapp_OLD/index.php?id=21",
            style:{
                width: '100%',
                height: '1100px',
                border: '0px',
                overflow: 'hidden',
            }
        });

        return this.state.iframe;
    }

}




// import Tdg from "../../tdg.class.js"
// import Button from "../../components/button/button.class.js";
// import Input from "../../components/input/input.class.js";

// export default class Category extends Tdg {
//     constructor() {
//         super();

//         this.state = {
//             sectionName: document.querySelector("section[Category]"),
//             element: []
//         }
        
//         this.removeLoading();
//         this.initialize();
//     }

//     initialize = () => {
//         this.append(this.state.sectionName, this.CategoryBlock());
//         this.append(this.state.element.categoryblock, this.CreateElement({
//             element: "div",
//             className: ["category-page"]
//         }, this.createSubject(),  this.createSubject2(), this.createSubject3(), this.subjectSelector(), this.communicationSelector(), this.saveButton()));
        
//         this.append(this.state.element.categoryblock, this.CreateElement({
//             element: "div",
//             className: ["category-content"]
//         }, this.createCategoryContent()));
//     }
  
//     data = [
//         {
//             title: "Backup",
//             title2: "Backup - ხელშეკრულების პირობები",
//             dataType: "პრეტენზია",
//             background: "#FD0A50"
//         },
//         {
//             title: "ბანკის პოლისები",
//             title2: "BOG - პოლისის განახლება",
//             title3: "BOG - პოლისის გაუქმება",
//             dataType: "სხვა",
//             background: "#FEB019"
//         },
//         {
//             title: "ავტო-ასისტანსი/ევაკუატორი",
//             title2: "ევაკუატორის გამოძახება ავტო საგზაო შემთხვევის დროს",
//             dataType: "მოთხოვნა",
//             background: "#7B61FF"
//         }
//     ]

//     CategoryBlock = () => {
//         this.state.element.categoryblock = this.CreateElement({
//             element: "categoryblock",
//         })
//         return this.state.element.categoryblock;
//     }
  

//     subjectSelector = () => {
//         this.state.element.subjectSelector = this.CreateElement({
//             element: "kendo",
//             type: "multiselector",
//             className: ['subject-selector'],
//             title: "საბჯექთის შინაარსი",
//             style: {
//                 width: '272px',
//             }
//         });
//         return this.state.element.subjectSelector;
//     }

//     communicationSelector = () => {
//         this.state.element.communicationSelector = this.CreateElement({
//             element: "kendo",
//             type: "multiselector",
//             title: "კომუნიკაციის არხი",
//             style: {
//                 width: '272px',
//             }
//         });
//         return this.state.element.communicationSelector;
//     }


//     createSubject = () => {
//         this.state.element.createSubject = new Input({
//             type: "text",
//             placeholderTitle: "საბჯექთი",
//             className: ["subject"]
//         }).build();
//         return this.state.element.createSubject;
//     }
    
//     createSubject2 = () => {
//         this.state.element.createSubject2 = new Input({
//             type: "text",
//             placeholderTitle: "ქვე-საბჯექთი",
//             className: ["subject"]
//         }).build();
//         return this.state.element.createSubject2;
//     }

//     createSubject3 = () => {
//         this.state.element.createSubject3 = new Input({
//             type: "text",
//             placeholderTitle: "ქვე-საბჯექთი_1",
//             className: ["subject"]
//         }).build();
//         return this.state.element.createSubject3;
//     }

//     saveButton = () => {
//         this.state.element.saveButton = new Button({
//             text: "შენახვა",
//             onclick: function () {
//                 alert(123)
//             }
//         })
//         return this.state.element.saveButton;
//     } 
       


//     createCategoryContent = () => {
//         this.state.createCategory = this.CreateElement({
//             element: "div",
//             class: "createCategory"
//         })
        
//         this.state.element.categorycontent = this.CreateElement({
//             element: "div",
//             class: "categorycontent",
//         }, this.state.createCategory)

//         if(this.data) {
//             this.data.forEach(data => {

//                 this.state.categoryTitle = this.CreateElement({
//                     children: `${data.title}`,
//                     element: "h1",
//                     id: "data-title",
//                     className: ["data-title"]
//                 })

//                 this.state.categoryTitle2 = this.CreateElement({
//                     element: "h1",
//                     children: `${data.title2}`,
//                     id: "data-title2",
//                     class: "data-title2"
//                 })
                
//                 this.state.categoryTitle3 = this.CreateElement({
//                     element: "h1",
//                     children: `${data.title3}`,
//                     id: "data-title3",
//                     class: "data-title3"
//                 })


//                 this.state.categoryType = this.CreateElement({
//                     element: "div",
//                     style: {
//                         alignSelf: "center"
//                     }
//                 })

//                 this.state.categoryOne = this.CreateElement({
//                     element: "tr"
//                 })

//                 this.state.categoryTwo = this.CreateElement({
//                     element: "tr",
//                 })
                
//                 this.state.categoryThree = this.CreateElement({
//                     element: "tr"
//                 })


//                 this.append(this.state.createCategory, this.CreateElement({
//                     element: "div",
//                     className: ["category-div"],
//                     id: "category-div",
//                 }, this.CreateElement({
//                     element: "table"
//                 }, this.state.categoryOne, this.state.categoryTwo, this.state.categoryThree)))


//                 if(data.title) {
//                         this.append(this.state.categoryOne,this.CreateElement({
//                             element: "td",
//                             id: "item-1",
//                         }, this.CreateElement({
//                             element: "div",
//                             class: "category1" 
//                         }, this.showMoreBtn(), this.state.categoryTitle, this.state.categoryType), this.CreateElement({
//                             element: "div",
//                             class: "category2"
//                         }, this.createCategoryRadioInputs(), this.createCategoryButtons()))
//                     )
//                 }

//                 if(data.title2) {
//                     this.append(this.state.categoryTwo, this.CreateElement({
//                         element: "td",
//                         id: "item-1-more",
//                         style: {
//                             display: "none"
//                         }
//                     }, 
//                     // this.createBorder(),
//                     this.CreateElement({
//                         element: "div",
//                         class: "category1"
//                     },this.showMoreBtn(), this.state.categoryTitle2, this.state.categoryType), this.CreateElement({
//                         element: "div",
//                         class: "category2"
//                     },this.createCategoryRadioInputs(), this.createCategoryButtons())))
//                 }

//                 if(data.title3) {
//                     this.append(this.state.categoryThree, this.CreateElement({
//                         element: "td",
//                         id: "item-2-more",
//                         style: {
//                             display: "none"
//                         }
//                     },
//                     // this.createBorder2(),
//                     this.CreateElement({
//                         element: "div",
//                         class: "category1"}, this.showMoreBtn(), this.state.categoryTitle3, this.state.categoryType), this.CreateElement({
//                         element: "div",
//                         class: "category2"
//                     }, this.createCategoryRadioInputs(), this.createCategoryButtons())))
//                 }

                
//                 if(data.dataType) {
//                     this.append(this.state.categoryType, this.CreateElement({
//                         element: "p",
//                         children: `${data.dataType}`,
//                         style: {
//                             background: `${data.background}`,
//                             color: "#fff",
//                             fontFamily: "BPG",
//                             fontSize: "12px",
//                             padding: "4px 8px 4px 8px",
//                             borderRadius: "3px"
//                         }    
//                     })) 
//                 }
//             })
            
//         }

//         return this.state.element.categorycontent;
//     }

//     showMoreBtn = () => {
//         this.state.element.showmore = this.CreateElement({
//             element: "div",
//             id: "showmore1",
//             children: `<img show="false" src="Frontend/Assets/images/icons/plus-circle.svg" />`,
//             onClick: this.showMoreClick
//         })
//         return this.state.element.showmore
//     }

//     showMoreClick = (e) => {
//         var index = e.target.parentNode.parentNode.parentNode.parentNode;
        
//         var table = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children).indexOf(index);

//         var data = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[table+1];

//         var tmpData = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes
     
//         var show = e.target.getAttribute('show');

//         if(show == "false") {
//             e.target.setAttribute('src', "Frontend/Assets/images/icons/circle123.svg");
//             e.target.setAttribute('show', "true");
//         } else {
//             e.target.setAttribute('src', "Frontend/Assets/images/icons/plus-circle.svg");
//             e.target.setAttribute('show', "false");
//         }

//         if(data) {
//             if(data.children.length) {
//                 if(data.children[0].style.display == "none") {
//                     data.children[0].style.display = "flex"
//                 } else {
//                     data.children[0].style.display = "none"
//                 }    
    
//             }
//         }

//         if(table == 0 && show == "true") {
//             var index2 = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children);
//             tmpData.forEach(element => {
//                 if(element) {
//                     if(element.children.length) {
//                         if(index2.indexOf(element) !== 0) {
//                             element.children[0].style.display = "none";
//                             element.children[0].children[0].children[0].children[0].setAttribute('src', "Frontend/Assets/images/icons/plus-circle.svg");
//                             element.children[0].children[0].children[0].children[0].setAttribute('show', "false");
//                         }        
//                     }
//                 }
//             })
//         }
//     }

//     createIcons = () => {
//          let iconData = [
//             {
//                 img: "Frontend/Assets/images/icons/category1.svg",
//                 imgInfo: "1"
//             },
//             {
//                 img: "Frontend/Assets/images/icons/category2.svg",
//                 imgInfo: "2"
//             },
//             {
//                 img: "Frontend/Assets/images/icons/category3.svg",
//                 imgInfo: "4"
//             },
//             {
//                 img: "Frontend/Assets/images/icons/category4.svg",
//                 imgInfo: "1"
//             },
//             {
//                 img: "Frontend/Assets/images/icons/category5.svg",
//                 imgInfo: "1"
//             },
//             {
//                 img: "Frontend/Assets/images/icons/category6.svg",
//                 imgInfo: "2"
//             }
//         ]

//         this.state.dataIcons = this.CreateElement({
//             element: "div",
//             className: ["createCategoryIcons"],
//             id: "category-icons",
//         })

//         this.state.createCategoryIcons = this.state.dataIcons;
        
//         iconData.forEach(iconData => {
//             this.append(this.state.dataIcons,this.CreateElement({
//                 element: "div",
//             }, this.CreateElement({
//                 element: "img",
//                 src: `${iconData.img}`,
//                 onClick: () => this.categoryIconBtn()
//             }), this.CreateElement({
//                 element: "div",
//                 children: `${iconData.imgInfo}`,
//                 className: ["imgInfo"]
//             })));
//         })

//         return this.state.createCategoryIcons

//     }

//     createBorder = () => {
//         this.state.element.border = this.CreateElement({
//             element: "div",
//             class: "border",
//         })
//         return this.state.element.border
//     }

//     createBorder2 = () => {
//         this.state.element.border = this.CreateElement({
//             element: "div",
//             class: "border",
//         })
//         return this.state.element.border
//     }


//     categoryIconBtn = () => {
//         alert(1)
//     }

//     createRadioInput = () => {
//         this.state.element.radioninput = this.CreateElement({
//             element: "input",
//             type: "radio",
//             name: "showicons",
//             id: "radio-input",
//             className: ["radio-input"],
//         })
//         return this.state.element.radioninput
//     }

//     createCategoryButtons = () => {
//         this.state.element.btns = this.CreateElement({
//             element: "div",
//             class: "categoryBtn"
//         }, this.createEditBtn(), this.createSaveBtn(), this.createDeleteBtn())
//         return this.state.element.btns
//     }

//     createCategoryRadioInputs = () => {
//         this.state.element.radio = this.CreateElement({
//             element: "div",
//             class: "radioinput"
//         }, this.createRadioInput(),this.createIcons())
//         return this.state.element.radio
//     }


//     createEditBtn = () => {
//         this.state.element.editBtn = this.CreateElement({
//             element: "img",
//             id: "edit-btn",
//             src: "Frontend/Assets/images/icons/editbtn.svg",
//             onClick: (e) => this.editBtnClick(e)
//         });
//         return this.state.element.editBtn;
//     }

//     createSaveBtn = () => {
//         this.state.element.saveBtn = this.CreateElement({
//             element: "img",
//             id: "save-btn",
//             src: "Frontend/Assets/images/icons/check.svg",
//             style: {
//                 display: "none",
//                 filter: "invert(80%)"
//             },
//             onClick: (e) => this.saveBtnClick(e)
//         });
//         return this.state.element.saveBtn;
//     }


//     createDeleteBtn = () => {
//         this.state.element.deleteBtn = this.CreateElement({
//             element: "img",
//             src: "Frontend/Assets/images/icons/trash.svg",
//             onClick: (e) => this.deleteBtnClick(e)
//         });
//         return this.state.element.deleteBtn;
//     }

//     editBtnClick = (e) => {
//         var dataInput = e.target.parentNode.parentNode.parentNode.children[0].children[1];
//         var dataImg = e.target.parentNode;
//         dataInput.style.border = "1px solid #1E88E5";
//         dataInput.style.padding = "2px";
//         dataInput.style.height = "23px";
//         dataInput.style.borderRadius = "4px";
//         dataInput.contentEditable = "true";
//         dataImg.children[0].style.display="none";
//         dataImg.children[1].style.display="block";
//     }

//     saveBtnClick = (e) => {
//         var dataInput = e.target.parentNode.parentNode.parentNode.children[0].children[1];
//         var dataImg = e.target.parentNode;
//         dataInput.style.border = "none";
//         dataInput.contentEditable = "false";
//         dataImg.children[0].style.display="block";
//         dataImg.children[1].style.display="none";
//     }

//     deleteBtnClick = (e) => {
//         // var index = e.target.parentNode.parentNode.parentNode.parentNode;

//         // var tmpData = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes
//         // var table = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children).indexOf(index);

//         // var index2 = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children);
//         //     tmpData.forEach((element, index) => {
//         //         if(element) {
//         //             console.log(element,index)
//         //             if(element.children.length) {
//         //                 if(index > 0 && table > 0) {
//         //                     element.children[0].style.display = "none";
//         //                 } else if(index > 1 && table > 0) {
//         //                     element.children[0].style.display = "none";
//         //                 } else {
//         //                     element.children[0].style.display = "none";
//         //                 }
//         //             }
//         //         }
//         // })

//         var index = e.target.parentNode.parentNode.parentNode.parentNode;
        
//         var table = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children).indexOf(index);

//         var data = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[table+1];

//         var tmpData = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes
     

//         if(data) {
//             if(data.children.length) {
//                 if(data.children[0].style.display == "none") {
//                     data.children[0].style.display = "flex"
//                 } else {
//                     data.children[0].style.display = "none"
//                 }    
//             }
//         }

//         var index2 = Array.prototype.slice.call(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children);
//             tmpData.forEach(element => {
//                 if(element) {
//                     if(element.children.length) {
//                         if(index2.indexOf(element) > 0) {
//                             element.children[0].style.display = "none";
//                         } 
//                         // else if(index2.indexOf(element) == 0){
//                         //     element.children[0].style.display = "none";
//                         // }    
//                     }
//                 }
//             }
//         )

//     }

// }