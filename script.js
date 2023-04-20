const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");

const columns = 26;
const rows = 100;
let currentCell;
let cutValue = {};
// button section
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");

// Color section
const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const leftAline = document.getElementById("left-aline");
const centerAline = document.getElementById("center-aline");
const rightAline = document.getElementById("right-aline");

// font section
const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");



// this for loop for colums A to Z
for(let column = 0; column < columns; column++){
    let th = document.createElement("th");
    th.innerText = String.fromCharCode(column + 65);
    thead.appendChild(th);
}

//  this for loop for roes 1 to 100
for(let row = 0; row < rows; row++){
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = row + 1;
    tr.appendChild(th);

    //  this for loop for editable colums
    for(let col = 0; col < columns; col++){
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("spellckeck", "false");      //this line for speling ckevking
        td.setAttribute("id", `${String.fromCharCode(col + 65)}${row + 1}`);
        td.addEventListener("focus", (event) => onFousFun(event))
        tr.appendChild(td);
    }
    
    //append the row into the body
    tbody.appendChild(tr);
}

function onFousFun(event){
console.log("in focus", event.target);
currentCell = event.target;
document.getElementById("current-cell").innerText = event.target.id;
}

// button section
// Bold
boldBtn.addEventListener("click", () =>{
    // console.log(currentCell);
    if(currentCell.style.fontWeight == "bold")
    {
        currentCell.style.fontWeight = "normal";
    }
    else{
        currentCell.style.fontWeight = "bold";
    }
     console.log("bold",currentCell);
});

// Italic
italicBtn.addEventListener("click", () =>{
    if(currentCell.style.fontStyle == "italic")
    {
        currentCell.style.fontStyle = "normal";
    }
    else{
        currentCell.style.fontStyle = "italic";
    }
     console.log("ltalic",currentCell);
});

// Underline
underlineBtn.addEventListener("click", () =>{
  
    if(currentCell.style.textDecoration == "underline")
    {
        currentCell.style.textDecoration = null;
    }
    else{
        currentCell.style.textDecoration = "underline";
    }
    console.log("Underline",currentCell);
});

// color section
bgColor.addEventListener("change", () =>{
    currentCell.style.backgroundColor = bgColor.value;
});
textColor.addEventListener("change", () =>{
    currentCell.style.color = textColor.value;
});



leftAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "left";
});
centerAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "center";
});
rightAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "right";
});

// font section
fontSize.addEventListener("change", () =>{
    currentCell.style.fontSize = fontSize.value;
});

// font-family section
fontFamily.addEventListener("change", () =>{
    currentCell.style.fontFamily = fontFamily.value;
});

// cut, copy, paste
cutBtn.addEventListener("click", () =>{
    // console.log("style", currentCell.style);
    // console.log("text", currentCell.innerText);
    cutValue = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    }
    currentCell.style = null;
    currentCell.innerText = null;
});

copyBtn.addEventListener("click", () =>{
    cutValue = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    };
});

pasteBtn.addEventListener("click", () =>{
    currentCell.style.cssText = cutValue.style;
    currentCell.innerText = cutValue.text;
});

