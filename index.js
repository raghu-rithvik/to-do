const inputBox=document.getElementById("input-text");
const listContainer=document.getElementById("list-container");

function addTask(){
    if(inputBox.value===''){
        modalDisplay()
    }
    else{
        let div=document.createElement("div")
        div.classList.add("list-div")
        listContainer.appendChild(div)
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        div.setAttribute('draggable', true);
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        div.addEventListener('dragend', dragEnd);
        div.addEventListener('touchstart', touchStart);
        div.addEventListener('touchmove', touchMove);
        div.addEventListener('touchend', touchEnd);
        div.appendChild(li);
        let span1=document.createElement("span");
        span1.classList.add("span1")
        span1.innerHTML="\u00d7";
        li.appendChild(span1);
        let span2=document.createElement("span");
        span2.classList.add("material-symbols-outlined")
        span2.classList.add("span2")
        span2.innerHTML="drag_handle";
        // li.appendChild(span2);
        li.parentNode.insertBefore(span2, li);
        saveData();
    }
    inputBox.value='';
}
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
  })
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        let temp=e.target.parentElement
        temp.parentElement.remove();
        saveData();

    }
},false);
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function displayData(){
    listContainer.innerHTML=localStorage.getItem("data");
    const listItems = document.querySelectorAll('#list-container div');
    listItems.forEach(item => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
    item.addEventListener('dragend', dragEnd);
});
}
displayData();

var modal = document.getElementById("alertModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeBtn")[0];

// When the user clicks the button, open the modal
 function modalDisplay() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const listItems = document.querySelectorAll('#list-container li');
let draggedItem = null;

function dragStart(e) {
  draggedItem = this;
  setTimeout(() => {
    this.parentElement.classList.add('dragging');
    this.style.opacity = 0;
    this.style.cursor = "grab";
    // this.style.background-color = "grab";
  }, 0);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
    if (draggedItem && this !== draggedItem) {
      
  e.preventDefault();
  if (this !== draggedItem) {
    const items = Array.from(this.parentNode.children);
    const draggedIndex = items.indexOf(draggedItem);
    const targetIndex = items.indexOf(this);

    if (draggedIndex < targetIndex) {
      this.after(draggedItem);
    } else {
      this.before(draggedItem);
    }
  }
}}

function dragEnd(e) {
  this.parentElement.classList.remove('dragging');
  this.style.opacity = 100;
  draggedItem = null;
saveData()}
const container = document.querySelector('#list-container');

container.addEventListener('touchstart', (e) => {
  if (e.target.tagName === 'LI') {
    draggedItem = e.target;
    this.classList.add('dragging');
    e.preventDefault();
  }
});
function touchStart(e) {
  this.parentElement.classList.add('dragging');
  this.style.opacity = 0;
  this.style.cursor = "grab";
  e.preventDefault();
}

function touchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);
  if (element && element !== draggedItem && element.tagName === 'LI') {
    const items = Array.from(draggedItem.parentNode.children);
    const draggedIndex = items.indexOf(draggedItem);
    const targetIndex = items.indexOf(element);

    if (draggedIndex < targetIndex) {
      element.after(draggedItem);
    } else {
      element.before(draggedItem);
    }
  }
}

function touchEnd(e) {
  this.parentElement.classList.remove('dragging');
  this.style.opacity = 100;
  draggedItem = null;
saveData()
}