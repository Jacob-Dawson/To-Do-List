// js goes here

let listText = document.getElementsByClassName("listText");
let checkboxElem = document.querySelectorAll("input[type='checkbox']");
let xButton = document.getElementsByClassName("xButton");
let listContent = document.getElementById("listContent");
let listContentUsed = document.getElementById("listContentUsed");
let dragElem = document.querySelectorAll(".dragElem");
let listItems = document.getElementsByClassName("listItem");
let listTextP = document.querySelectorAll(".listText > p");
let addListItem = document.querySelectorAll("#addListItem > p")[0]
let completedItemsDiv = document.querySelectorAll("#completedItemsDiv > p")[0]
let completedStatus = document.getElementById("completedStatus");
let completedStatusDiv = document.querySelectorAll("#completedStatus > div");
let pinIcon = document.getElementById("pinIcon");
let iconFlag = true;
let itemDragging = null;
let isDragging = false;
let startX;
let currentX = 0;
const levelArr = ["level-one","level-two","level-three"];

addListItem.addEventListener("click",addItem,false)

setEventListeners();
checkCompletedItems();

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

    listItems = document.getElementsByClassName("listItem");
    listText = document.getElementsByClassName("listText");
    listTextP = document.querySelectorAll(".listText > p");
    checkboxElem = document.querySelectorAll("input[type='checkbox']");
    dragElem = document.querySelectorAll(".dragElem");
    completedStatus.addEventListener("click",showCompletedItems,false)
    pinIcon.addEventListener("click",togglePin,false);

    completedStatusDiv[0].style.display = "block";
    completedStatusDiv[1].style.display = "none";
    listContentUsed.style.display = "block";

    for(let i=0; i<listText.length; i++){

        listTextP[i].addEventListener("click",selectItem,false)
        listItems[i].addEventListener("mouseover",hoverItemOver,false);
        listItems[i].addEventListener("mouseout",hoverItemOut,false);
        xButton[i].addEventListener("click",deleteItem,false);
        checkboxElem[i].addEventListener("change",toggleDone,false)

    }

    for(let i=0; i<dragElem.length; i++){

        dragElem[i].addEventListener("click",changeLevel,false);

    }

}

function togglePin(){

    if(iconFlag === false){

        this.style.color = `rgb(0,0,0)`;
        iconFlag = true;

    } else if(iconFlag === true){

        this.style.color = `rgb(220,220,220)`;
        iconFlag = false;

    }

}

function selectItem(e){

    for(let i=0; i<listText.length; i++){

        listText[i].parentElement.style.borderTop = `none`;
        listText[i].parentElement.style.borderBottom = `none`;
        listText[i].children[1].style.visibility = `hidden`;

    }

    let selectedElem = e.currentTarget.parentElement.parentElement;
    let selectedButton = selectedElem.children[2].children[1];

    selectedElem.style.borderTop = `2px solid rgb(220,220,220)`;
    selectedElem.style.borderBottom = `2px solid rgb(220,220,220)`;

    selectedButton.style.visibility = "visible";

}

function showCompletedItems(){

    let div1 = completedStatusDiv[0];
    let div2 = completedStatusDiv[1];
    checkCompletedItems();

    if(div1.style.display === "block"){

        div1.style.display = "none";
        div2.style.display = "block";
        listContentUsed.style.display = "none";

    } else if(div2.style.display === "block"){

        div2.style.display = "none";
        div1.style.display = "block";
        listContentUsed.style.display = "block";

    }

}

function checkCompletedItems(){

    let listAmount = listContentUsed.children.length;
    completedItemsDiv.innerHTML = `${listAmount} Completed item${listAmount > 1 ? 's' : ''}`;

}

function toggleDone(e){

    if(e.currentTarget.checked === true){

        e.currentTarget.parentElement.lastElementChild.firstElementChild.style.textDecoration = "line-through";
        e.currentTarget.parentElement.style.opacity = "0.5";

    } else if(e.currentTarget.checked === false){

        e.currentTarget.parentElement.lastElementChild.firstElementChild.style.textDecoration = "none";
        e.currentTarget.parentElement.style.opacity = "1";

    }

}

function hoverItemOver(e){

    e.currentTarget.lastElementChild.lastElementChild.style.visibility = "visible"

}

function hoverItemOut(e){

    e.currentTarget.lastElementChild.lastElementChild.style.visibility = "hidden"

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
    -   Contenteditable shouldnt expand vertically on pressing enter ✅
    -   Various UI improvements ✅

        https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
        https://www.geeksforgeeks.org/html/create-a-drag-and-drop-sortable-list-using-html-css-javascript/
        https://jsfiddle.net/VCQuN/1/

    - List structure:
        - Level 1 Item (class: "level-one")
            - Level 2 Item (class: "level-two")
                - Level 3 Item (class: "level-three")


    Checkbox:
    <i class="fa-solid fa-square-check"></i>


*/
