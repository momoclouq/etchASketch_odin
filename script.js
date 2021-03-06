//create the main elements
let container = document.createElement("div");
container.classList.add("container");

//prepare the title
let title = document.createElement("h1");
title.textContent = "Etch anything!";

//prepare the grid and its elements
let grid = document.createElement("div");
grid.classList.add("grid-container");
//initialize the first grid - 16 default
initializeGrid(16);

//prepare the reset button
let resetBtn = document.createElement("button");
resetBtn.textContent = "reset";
resetBtn.classList.add("resetBtn");
resetBtn.addEventListener('click', function(){
    resetGrid();
    
    let size = prompt("What is your desired size?");
    //check if input is actually number
    while(isNaN(size)){
        size = prompt("wrong input silly, enter a number");
    }

    initializeGrid(size);
});

//prepare select form
let option = "black";
let currentBlackValue = 0;
let colorOptions = document.querySelector("#colors");
colorOptions.addEventListener('change', function(){
    option = colorOptions.value;
});

//adding all the elements to html
let body = document.querySelector('body');
container.appendChild(title);
container.appendChild(grid);
container.appendChild(resetBtn);
body.appendChild(container);

//functions
function changeColor(e){
    if (option == "black") e.target.style.backgroundColor = "black";
    if (option == "random") e.target.style.backgroundColor = generateRandomColor();
    if (option == "blackGradient") e.target.style.backgroundColor = createBlackGradient();
}

function generateRandomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function resetGrid(){
    let allGridChildren = grid.childNodes;
    for (let i = 0; i < allGridChildren.length; i++){
        allGridChildren[i].style.backgroundColor = "white";
    }
}

function initializeGrid(size){
    grid.textContent = '';
    size = Math.round(size);

    grid.style.gridTemplateColumns = (function(){
        let cssGridColumns = "";
        for (let i = 0; i < size; i++){
            cssGridColumns += "auto ";
        }
        return cssGridColumns;
    })();

    for (let i = 0; i < (size*size); i++){
        let gridElement = document.createElement("div");
    
        gridElement.addEventListener('mouseover',(e) => changeColor(e));
        gridElement.classList.add("grid-item");
    
        grid.appendChild(gridElement);
    }
}

function createBlackGradient(){
    let newBlackValue = currentBlackValue + 8;
    if (newBlackValue > 255) newBlackValue = 0;
    currentBlackValue = newBlackValue;
    return "rgb(" + newBlackValue + "," + newBlackValue + "," + newBlackValue + ")";
}