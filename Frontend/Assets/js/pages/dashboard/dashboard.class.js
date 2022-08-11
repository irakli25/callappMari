`use strict`;

import Tdg from "../../tdg.class.js";
import { TableObj } from "./table.type.js";
import { ChartObj } from "./chart.type.js";
import { CountObj } from "./count.type.js";

import Selector from "../../components/selector/selector.class.js";

export default class Dashboard extends Tdg {
  constructor() {
    super();

    this.state = new Object();
    this.state.dashboard = new Array();
    this.state.dashboard.blocks = new Array();
    this.state.dashboard.blocks.loading = new Array();

    this.getBlocks();
    
    this.handleUpdate();
    this.handleFilter();

    this.row = [];
    this.index = [];


    document.title = "Dashboard"

  }


  /**
   * @description Create Search Element For every blocks Which one have Search Attribute
   */
  getSearch = (content = 'block') => {

    let Search = $(content).find("column[Search]");

    let SearchElement = this.CreateElement({
      element: "input",
      attributes: [{ type: "text" }, { class: "dashboard-search" }, {placeholder: "ძებნა"}],
    });

    $(Search).html(SearchElement);

    var $this = this;

    $(Search).children(SearchElement).on("keyup", function(){
      let searchBlock = $(this).parents("block");

      let searchText = this.value;

      searchBlock.find("row").map((rowIndex, row) => {
        $this.row.push(row);
          $(row).find("column").map((columnIndex, column) => {
            if(columnIndex != 0){
              $(column).addClass("hide-element");
              if($(column).text().includes(searchText)){
                $this.index.push(columnIndex)
              }
            }

          })
      });
      
      $this.index.forEach(x => {
        searchBlock.find("row").map((rowIndex, row) => {
            $(row).find("column").map((columnIndex, column) => {
              if(columnIndex === x){
                $(column).removeClass("hide-element")
              }
            })
        });
      })

      $this.row = [];
      $this.index = [];

    })

  };


  /**
   * @description Create Filter Click Event for Blocks
   * @returns Filter Element
   */
  getFilter = () => {
    
    return`<block-filter type="day">
                      <block-span day selected>დღე</block-span>
                      <block-span week>კვირა</block-span>
                      <block-span month>თვე</block-span>
                      <block-span year>წელი</block-span>
                  </block-filter>`;

  }

  

  blockToggle = (block = 'block') => {
    $(block).on('click', "toggle", function() {
    
      let toggleblock = $(this).parent().parent()
      
      if(toggleblock.attr('toggled') == undefined){
        toggleblock.attr({"toggled": '', "grid-row": 6});
        $(this).attr({"up": true});
        toggleblock.find('block-footer').css("position", "relative")
        toggleblock.find('content').css("height", "100%")

      }else{
        block.scrollTop = 0
        toggleblock.find('block-footer').css("position", "absolute")
        toggleblock.find('content').css("height", "unset")
        toggleblock.attr({"grid-row": 3});
        toggleblock.removeAttr("toggled");
        $(this).removeAttr("up");
      }
    })
  }

  /**
   * @description FILTER HANDLER
   */
  handleFilter = () => {

    let $thisClass = this;

    $(document).on('click', "block-span", function(){

      if(!this.hasAttribute("selected")){
        $(this).parent().children("block-span[selected]").removeAttr("selected")
      }
  
      $(this).attr("selected", true)

      let $this = $(this);
      let SelectedBlock = $this.parents("block");
      let id = SelectedBlock.data("id");
      let filter  = this.attributes[0].nodeName;
      $thisClass.updateContent(SelectedBlock, id, filter)
      
    })

  }


  /**
   * @description BLOCK UPDATE HANDLER
   */
  handleUpdate = () => {

    let $thisClass = this;

    $(document).on('click', "block-refresh", function(){

      let $this = $(this);
      let SelectedBlock = $this.parents("block");
      let id = SelectedBlock.data("id");
      let selectedFilter = $(SelectedBlock).find("block-span[selected]");
      let filter = '';
      
      if(selectedFilter.length == 1){
        filter = selectedFilter[0].attributes[0].nodeName;
      };

      $thisClass.updateContent(SelectedBlock, id, filter)

    })

  }

  /**
   * @description SEND AJAX AND UPDATE CONtENT
   * @param {Element} block 
   * @param {Number} id 
   * @param {String} filter 
   * @returns Response [UPDATE CONTENT]
   */
  updateContent = (block, id, filter) => {

    let $thisClass = this;

    $.ajax({
      data: {
        route: 'Dashboard',
        act: "getDashboardData",
        id: id,
        filter: filter
      },
      beforeSend: () => {
        $(block).find('block-refresh').addClass("refresh-360");
       
        // SAVE ID FOR CHECK (if box still Loading)
        $thisClass.state.dashboard.blocks.loading.push(id);
      },
      success: (data) => {
        $(block).find('block-refresh').removeClass("refresh-360");
          let dataObj = data[0];
          let content = $("section[dashboard] block[data-id="+dataObj.id+"]").children("content");
          $(content).html('');
          $thisClass.createBlockContentData(content, dataObj)
         
          // REMOVE ID AFTER COMPLETE
          $thisClass.state.dashboard.blocks.loading.shift();
         
      }
    })

  }

  /**
   * @description Update Block Content Data By Table Type
   * @param {Element} content 
   * @param {Object} dataObj 
   */
  createBlockContentData = (content, dataObj) => {
    
    // type TABLE
    if(dataObj.type == "table" || dataObj.type == "rig" || dataObj.type == "table-icon"){
      TableObj(content, dataObj);
    }

    // type CHART
    if(dataObj.type == 'bar' || dataObj.type == 'donut' || dataObj.type == 'list'){
      ChartObj(content, dataObj);
    }

    if(dataObj.type == 'count'){
      CountObj(content, dataObj);
    }

    if(dataObj.search) this.getSearch(content)

  }


  /**
   * 
   * @param {Object} dataObj 
   * @description Create block Element For dashboard 
   * @returns Block Element in this.state.blocks
   * @version 1.1.1
   */
  createBlocks = (dataObj) => {

    let blockPlace = '';
    

    if(Array.isArray(dataObj)){

      blockPlace = this.CreateElement({
          element: "block-set",
          attributes: [{draggable: true}, {"grid-row": 3}]
      })

      dataObj.forEach(x => {
        blockPlace.append(this.createBlockContent(x));
      })
    }else{
      blockPlace = this.createBlockContent(dataObj)
    }

    this.state.dashboard.blocks.push(blockPlace)

  }


  /**
   * 
   * @param {Object} dataObj 
   * @returns block
   */
createBlockContent = (dataObj) => {

  let $thisClass = this 

  let block = this.CreateElement({
    element: "block",
    attributes: [
      { "name": dataObj.type },
      { "data-id": dataObj.id},
      { "grid-row": dataObj.boxSize },
      { "draggable": (dataObj.draggable ? true : false) },
    ],
  });

  let content = this.CreateElement({
    element: "content",
    attributes: (dataObj.type == 'table' || dataObj.type == "rig" || dataObj.type == "table-icon" ? [{ table: "" }] : [])
  });


  let header = this.CreateElement({
    element: "block-head",
  })

  if(dataObj.label){
   
    let blockLabel = this.CreateElement({
      element: "block-label",
      attributes: [{style: `background-color: ${dataObj.label.color}1F; color: ${dataObj.label.color}; ` } ],
      children: dataObj.label.text
    })

    header.append(blockLabel)
  }

  let blockTitle = this.CreateElement({
    element: "block-title",
    children: dataObj.title
  })

  header.append(blockTitle)

  if(dataObj.live){
    let liveEl = this.CreateElement({
      element: "live-circle",
      attributes: [{ actived: true }]
    })
  
    header.append(liveEl)
  }

  
  let blockRefresh = this.CreateElement({
    element: "block-refresh"
  })

  header.append(blockRefresh)
  
  block.append(header)

  // if(dataObj.title == "საუბრის ხანგრძლივობა / ოპერატორები" || dataObj.title == "ოპერატორები") {
  //   let dashboardInput = this.CreateElement({
  //     element: "div",
  //     style: {
  //       display: 'flex',
  //       alignItems: 'center'
  //     }
  //    }, this.CreateElement({
  //     element: "input",
  //     className: ["dashboard-input"],
  //     placeholder: "ოპერატორი",
  //     children: `<img class="input-img" src="Frontend/Assets/images/icons/search.svg">`
  //    }), this.CreateElement({
  //     element: "img",
  //     src: "Frontend/Assets/images/icons/search.svg",
  //     className: ["input-img"]
  //    }))
    
  //    block.append(dashboardInput)
  //  }
   
  
  //  let dashboardInput = this.CreateElement({
  //   element: "div",
  //   style: {
  //     display: 'flex',
  //     alignItems: 'center'
  //   }
  //  }, this.CreateElement({
  //   element: "input",
  //   className: ["dashboard-input"],
  //   placeholder: "ოპერატორი",
  //   children: `<img class="input-img" src="Frontend/Assets/images/icons/search.svg">`
  //  }), this.CreateElement({
  //   element: "img",
  //   src: "Frontend/Assets/images/icons/search.svg",
  //   className: ["input-img"]
  //  }))
  
  //  block.append(dashboardInput)
  

  if(dataObj.filter){
    $(this.getFilter()).appendTo(block);
  }
  block.append(content);

 let footer = this.CreateElement({
   element: "block-footer"
 })







// if(dataObj.data){
//   $(this.getFilter()).appendTo(content);
// }







 if(dataObj.type != 'count'){
    block.append(footer);
 }

 this.createBlockContentData(content, dataObj)


  if(dataObj.footer){
    if(dataObj.footer.show){

        (typeof dataObj.footer.stack != "object" ? console.warn("Stack is not a Object") : '');

        let stackLabel;
        if(dataObj.footer.stack.percent != undefined && dataObj.footer.stack.label != undefined){
          stackLabel = this.CreateElement({
            element: "stack",
            attributes: [dataObj.footer.stack.label],
            children: dataObj.footer.stack.percent
          })
        }else{
          stackLabel = this.CreateElement({
            element: "stack"
          })
        } 
        footer.append(stackLabel);

        if(dataObj.footer.toggle){
          let stackToggle = this.CreateElement({
            element: "toggle"
          })
          footer.append(stackToggle);
          $thisClass.blockToggle(block);
        }
      }

    }

    if(dataObj.live){
      setInterval(() => {
       
        if($thisClass.state.dashboard.blocks.loading.find(id => id == dataObj.id) != undefined) return false;
        $(blockRefresh).trigger("click");

      }, 2000)
      
    }

 return block

}


  getBlocks = () => {

    let $this = this;

    $.ajax({
      data: {
          route: 'Dashboard',
          act: "getDashboardData"
      },
      success: function(data) {

        data.forEach((x, i) => {

          if(x == null) return false;

          $this.createBlocks(x);

          $($this.state.dashboard.blocks[i]).hide(0).appendTo("section[dashboard]").fadeIn(500)

          $this.removeLoading()
          
        })
        
      }
    });

  };

  

}
