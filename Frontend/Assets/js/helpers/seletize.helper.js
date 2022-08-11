import Tdg from "../tdg.class.js";


 export const selectize_SelectedValue = (Element) => {
  if(typeof Element === 'undefined') return false; 

  var $select = $(Element.children[0]).selectize({
    persist: false,
    createOnBlur: true,
    create: true,
  });

  Element = $select[0].selectize;
  return Element.getValue();
}

