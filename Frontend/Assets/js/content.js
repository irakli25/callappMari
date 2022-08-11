$(document).ready(function(){
    const draggables = document.querySelectorAll('[draggable=true]');
    const section = document.querySelectorAll('component[dashboard]');
    
    let dragTo;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })


        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })

        draggable.addEventListener('dragenter', (e) => {
            if(e.toElement.localName == 'block'){
                dragTo = e.toElement;
            }
        })
    })

    section.forEach(sec => {
        sec.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            
            insertAfter(dragTo, draggable)
           
        })
    })

})


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(referenceNode, newNode) {
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

