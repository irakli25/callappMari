
export default (state = {}, action) => {
  // console.log(state)
  
  switch (action.type) {
    case 'ACTION':
        action.payload.event.target.innerText = action.payload.text
        action.payload.event.target.style.backgroundColor = action.payload.bgColor
        action.payload.event.target.style.color = action.payload.color
    break;
    case "ADD_TODO":
        
        return {a: 'cc'}
    default:
      return {a: "b"}
  }
    
}