import Helpers from '../../helpers/helper.class.js'
import Tdg from '../../tdg.class.js'
import Input from '../../components/input/input.class.js';

export const lpHead = (source, columns, prop) => {

  let head = new Helpers().CreateElement({
    element: 'thead'
  })

  // let searchComponent = new Helpers().CreateElement({
  //   element: 'thead'
  // })



  // მასივის დაკორექტირება პარამეტრებიდან გამომდინარე
  for (let c = 0; c < columns.length; c++) {

    if (columns[c].hide) {
      delete columns[c]
    }
  }



  // ITERATION
  columns.forEach((x, i) => {
    let filt 
    if(x.filter){
          filt  = new Helpers().CreateElement({
            element: "span",
            class: "k-icon k-i-filter",
            onclickEl: async (element, e) =>  {
                await generateFilter(element, x, prop, source)
              
            }
          })
        }else{
          filt = ''
        }
        
    let th = new Helpers().CreateElement({
      element: "th",
      children: new Helpers().CreateElement({
        element: "div",
        children: new Helpers().CreateElement({
          element: "a",
          class: 'k-link',
          text: x.name
        })
      }, filt
      ),
      dataset: {
        sortBy: 0
      },
      onclickEl: (element, event) => {
        
        if(event.target.nodeName.toLowerCase() == 'a')
        new Tdg().sortBy(element, x, i, prop, source)
      }
    })

    new Tdg().append(head, th)



    // let searchField = new Helpers().CreateElement({
    //   element: "th",
    //   children: x.filter ? () => {
    //     return buildSearchComponent(x.field, source)
    //   } : '',
    //   style: {
    //     padding: !x.filter ? '0' : '',
    //   }
    // })
    // new Tdg().append(searchComponent, searchField)

  })


  return { head: head }

}

const generateFilter = async (element, column, prop, source) => {
  let status = element.getAttribute("actived");
  let filterEl = $(element).next()

  
  let customData;
  if(column.callback && typeof customData == 'undefined'){
    customData = await column.callback();
  }

 

  let div;


  // CREATE ELEMENT
  if(status == null){
    // CREATE FILTER-BLOCK
    let filterBlock = new Helpers().CreateElement({
      element: "filter-block"
    })
    
    $(filterBlock).insertAfter(element)
    element.setAttribute("actived", true)

    div = new Helpers().CreateElement({
      element: "div"
    })

    // CREATE FILTER-INPUT
    let filterInput = new Input({
      type: "text",
      placeholder: "ძებნა",
      oninput: (event) => {
        $(div).find("input").map((i, x) => {
          if(x.value.includes(event.target.value)){
            $(x).parent().show()
          }else{
            $(x).parent().hide()

          }
        })
      }
    })
    // INSERT INPUT
    $(filterBlock).append(filterInput.build())


    if(column.field == 'astNumber'){
      prop.tableData[source] = customData
      column.field = "astNumber"
      
    }

    if(column.field == 'queue'){
      prop.tableData[source] = customData
      column.field = "queue"
      
    }


    // CREATE FILTER LIST
    prop.tableData[source] != null && prop.tableData[source].forEach(async (x) => {
      let span = new Helpers().CreateElement({
        element: "span"
      })

     

        let labelText = new Tdg().getDescendantProp(x, column.field);
        let labelName = new Helpers().getSequence("ee-eee-ee");

        if(labelText != '' ){
          if(labelText != self.Flashpanel.state.labelText){
            let checkbox = new Helpers().CreateElement({
              element: "input",
              type: "checkbox",
              name: labelName,
              id: labelName,
              value: labelText
            })


            let label = new Helpers().CreateElement({
              element: "label",
              text: labelText,
              for: labelName
            }) ;

            self.Flashpanel.state.labelText = labelText

            new Tdg().append(span, checkbox)
            new Tdg().append(span, label)
            new Tdg().append(div, span)
          }
        }


    })



    

    // CREATE FILTER-BUTTON
    let filterButton = new Helpers().CreateElement({
      element: "button",
      text: "ძებნა",
      class: "btn btn-primary",
      style: {
        margin: "10px",
        float: "right"
      },
      onclick: () => {
       
        self.Flashpanel.state.filter[source] = {
          value: $(div).find("input:checked"),
          field: column.field
        }
       
      }
    });

  let filterCount = div.querySelectorAll("input").length

  if(filterCount > 0){
    new Tdg().append(filterBlock, div)
    new Tdg().append(filterBlock, filterButton)
  }else{
    new Tdg().append(filterBlock, new Helpers().CreateElement({
      element: "div",
      text: "მონაცემი ვერ მოიძებნა",
      class: "alert alert-danger",
      style: {
        textAlign: "center",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "5px",
        width: "100%",
        display: "block",
        position: "relative",
        boxSizing: "border-box"
      }
    }))

  }

  }



  if(status == "true"){
      $(filterEl).hide()
      element.setAttribute("actived", false)

  }else{
      element.setAttribute("actived", true)
      $(filterEl).show()
  }




}