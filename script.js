const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");

const columns = 26;
const rows = 100;
let currentCell;
// button section
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");



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