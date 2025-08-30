// js goes here

let listText = document.getElementsByClassName("listText");
let checkboxElem = document.querySelectorAll("input[type='checkbox']");
let xButton = document.getElementsByClassName("xButton");
let listContent = document.getElementById("listContent");
let dragElem = document.querySelectorAll(".dragElem");
let listItems = document.getElementsByClassName("listItem");
let addListItem = document.querySelectorAll("#addListItem > p")[0]
let itemDragging = null;
let isDragging = false;
let startX;
let currentX = 0;
const levelArr = ["level-one","level-two","level-three"];

addListItem.addEventListener("click",addItem,false)

setEventListeners();

function changeLevel(){

    // when clicked, it moves the element from one level to the next level: 1 -> 2 -> 3 -> 1 -> ...

    const currLevel = (this.parentElement.className).slice(9);

    if(currLevel == "level-one"){

        this.parentElement.className = "";
        this.parentElement.className = "listItem level-two";

    } else if(currLevel == "level-two"){

        this.parentElement.className = "";
        this.parentElement.className = "listItem level-three";

    } else if(currLevel == "level-three"){

        this.parentElement.className = "";
        this.parentElement.className = "listItem level-one";

    }

}

function setEventListeners(){

    listText = document.getElementsByClassName("listText");
    checkboxElem = document.querySelectorAll("input[type='checkbox']");
    dragElem = document.querySelectorAll(".dragElem");

    for(let i=0; i<listText.length; i++){

        listText[i].addEventListener("mouseover",hoverItemOver,false);
        listText[i].addEventListener("mouseout",hoverItemOut,false);
        xButton[i].addEventListener("click",deleteItem,false);
        
        checkboxElem[i].addEventListener("change",toggleDone,false)

    }

    for(let i=0; i<dragElem.length; i++){

        dragElem[i].addEventListener("click",changeLevel,false);

    }

}

function toggleDone(e){

    if(e.currentTarget.checked === true){

        e.currentTarget.parentElement.style.textDecoration = "line-through";
        e.currentTarget.parentElement.style.opacity = "0.5";

    } else if(e.currentTarget.checked === false){

        e.currentTarget.parentElement.style.textDecoration = "none";
        e.currentTarget.parentElement.style.opacity = "1";

    }

}

function hoverItemOver(e){

    e.currentTarget.lastElementChild.style.visibility = "visible"
    //e.currentTarget.firstElementChild.contentEditable = "true";

}

function hoverItemOut(e){

    e.currentTarget.lastElementChild.style.visibility = "hidden"
    //e.currentTarget.firstElementChild.contentEditable = "false";

}

function addItem(){

    listContent.innerHTML += 
        `<div class="listItem level-one" draggable="true">
            <div class="dragElem">
                <i class="fa-solid fa-grip-vertical"></i>
            </div>
            <input type="checkbox"></input>
            <div class="listText">
                <p contenteditable="true"></p>
                <button class="xButton">x</button>
            </div>
        </div>`

    setEventListeners();

}

function deleteItem(e){

    e.currentTarget.parentElement.parentElement.remove();

}

function getNodeIndex(elem){

    return (Array.from(elem.parentNode.children).indexOf(elem))

}

/* 

    Goals:
    --------

    -   include contenteditable ✅
    -   add items ✅
    -   remove items ✅
    -   crossout items using the checkboxes ✅
    -   be able to drag items to reposition them in the list (up / down)
    -   change the position / level of each item (3 levels, left to right)✅
    -   when ticked off, whole item goes blank and moved to the bottom, below "+ list item"
    -   Contenteditable shouldnt expand vertically on pressing enter
    -   Various UI improvements

        https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
        https://www.geeksforgeeks.org/html/create-a-drag-and-drop-sortable-list-using-html-css-javascript/
        https://jsfiddle.net/VCQuN/1/

    - List structure:
        - Level 1 Item (class: "level-one")
            - Level 2 Item (class: "level-two")
                - Level 3 Item (class: "level-three")


*/
