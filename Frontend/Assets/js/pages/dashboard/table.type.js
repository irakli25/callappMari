import Helper from "../../helpers/helper.class.js";


/**
* @description Create Table Element for Dashboard Blocks
* @param {Element} content 
* @param {Object} dataObj 
*/
export const TableObj = (content, dataObj) => {

  let row;
  let column;
  let noData;

  if(!dataObj.data) return console.error("data is not exist in Object")
  if(!dataObj.colors) return console.error("colors is not exist in Object")
  if(!dataObj.header) return console.error("header is not exist in Object")

  dataObj.data.forEach((data, dataCount) => {
   row = new Helper().CreateElement({
      element: "row",
      attributes: [],
    });

    if(data.length == 0){
      noData = new Helper().CreateElement({
        element: "noData",
        children: "ინფორმაცია არ არის"
      });
      content.append(noData)
    }
    if(data.length == 0) return false
    
    content.append(row);

    if(dataCount == 0 && dataObj.search){
        column = new Helper().CreateElement({
            element: "column",
            attributes: [
              {
                Search: ''
              },
            ]
          });
        row.append(column)

    } else if(dataCount == 0 && !dataObj.search){
        column = new Helper().CreateElement({
            element: "column",
            attributes: []
          });
          row.append(column)
    }

    if(!dataObj.header) return console.error("header is not exist in Object")

    dataObj.header.forEach((title, titleCount) => {

        if((titleCount == (dataCount - 1)) && (dataObj.type == 'table' || dataObj.type == 'rig' || dataObj.type == "table-icon")){

            if(dataObj.type == "table-icon"){
              column = new Helper().CreateElement({
                element: "column",
                attributes: [
                  {
                    style: dataCount != 0 ? (dataObj.type == "table" ? "background-color: " + dataObj.colors[dataCount - 1] : ' ') : '',
                  }, title
                ]
              });
            }else{
              column = new Helper().CreateElement({
                element: "column",
                attributes: [
                  {
                    style: dataCount != 0 ? (dataObj.type == "table" ? "background-color: " + dataObj.colors[dataCount - 1] : ' ') : '',
                  },
                ],
                children: title,
              });
            }
            

            row.append(column)
        }

    })

    

    if(!dataObj.colors) return console.error("colors is not exist in Object")
    if(!data) return console.error("data is not exist in Object")
    
    data.forEach((item, count) => {
      
      if(dataObj.type == 'table' || dataObj.type == "table-icon"){
        column = new Helper().CreateElement({
          element: "column",
          attributes: [
            {
              style:
                dataCount != 0 ? "background-color: " + dataObj.colors[dataCount - 1] + "1F" : "",
            },
          ],
          children: item,
        });

        row.append(column);
      }

      if(dataObj.type == 'rig'){
        
        let SourceNames = (dataCount == 0 ? item : ''); 

        column = new Helper().CreateElement({
          element: "column",
          attributes: [
            {
              style: "background-color: " + dataObj.colors[count] + "1F"
            },
            SourceNames
          ],
          children: (dataCount != 0 ? item : ''),
        });

        row.append(column);
      }
    
    });

  });
}