import Helper from "../../helpers/helper.class.js";

export const CountObj = (content, dataObj) => {

  if(!dataObj.data) return console.error("data is not exist in Object")
  if(!dataObj.colors) return console.error("colors is not exist in Object")
  if(!dataObj.header) return console.error("header is not exist in Object")

  dataObj.data.map((x, i) => {
   
    let labelEl = new Helper().CreateElement({
      element: "label",
      attributes: [
              { 
                name: dataObj.header[i]
              },
              {
                style: `color: ${dataObj.colors[i]}`
              }
            ],
      children: x
    })

    content.append(labelEl);

  })
}