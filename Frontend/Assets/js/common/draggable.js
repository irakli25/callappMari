
export default class draggable {
  constructor() {

    this.state = {};

    
  }

  initialDraggables = () => {

    this.state.draggables   = document.querySelectorAll('[draggable=true]');
    this.state.section      = document.querySelectorAll('component[dashboard]');
    
    let dragTo;

    this.state.draggables.forEach(draggable => {
     
        draggable.addEventListener('dragstart', () => {
         
            draggable.classList.add('dragging');
           
        })


        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
            
        })

        draggable.addEventListener('dragenter', (e) => {
          let checkBlockSet = $(e.toElement).parents("block-set");
          
          if(e.toElement.localName == 'block' && checkBlockSet.length == 0 || (e.toElement.localName == 'block-set' && checkBlockSet.length == 0)){
            dragTo = e.toElement;
            
          }
            
        })
    })

    this.state.section.forEach(sec => {
        sec.addEventListener('dragover', (e) => {
            e.preventDefault();
         
            const draggable = document.querySelector('.dragging');

            this.insertAfter(dragTo, draggable)
           
        })
    })

  }

  insertAfter = (referenceNode, newNode) => {
    if(referenceNode){
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  };

  insertBefore = (referenceNode, newNode) => {
    if(referenceNode){
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  };
}
