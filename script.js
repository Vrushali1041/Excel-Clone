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

const matrix = new Array(rows);

for(let i=0; i<rows; i++){
    matrix[i] = new Array(columns);
    for(let j=0; j<columns; j++){
        matrix[i][j] = {};
    }
}
console.log("matrix", matrix);


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
        td.addEventListener("focus", (event) => onFousFun(event));
        td.addEventListener("input", (event) => onInputFun(event));
        tr.appendChild(td);
    }
    
    //append the row into the body
    tbody.appendChild(tr);
}

function onInputFun(event){
    // console.log("on input", event.target);
    updateJson(event.target)
}

function onFousFun(event){
console.log("in focus", event.target);
currentCell = event.target;
document.getElementById("current-cell").innerText = event.target.id;
console.log(currentCell.style.cssText);
console.log(currentCell.innerText);
console.log(currentCell.id);
var id = currentCell.id.split("");
console.log(id[0]);
console.log(id[1]);
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
     updateJson(currentCell);
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
     updateJson(currentCell);
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
    updateJson(currentCell);
});

// color section
bgColor.addEventListener("input", () =>{
    currentCell.style.backgroundColor = bgColor.value;
    updateJson(currentCell);
});
textColor.addEventListener("input", () =>{
    currentCell.style.color = textColor.value;
    updateJson(currentCell);
});



leftAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "left";
    updateJson(currentCell);
});
centerAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "center";
    updateJson(currentCell);
});
rightAline.addEventListener("click", () =>{
    currentCell.style.textAlign = "right";
    updateJson(currentCell);
});

// font section
fontSize.addEventListener("change", () =>{
    currentCell.style.fontSize = fontSize.value;
    updateJson(currentCell);
});

// font-family section
fontFamily.addEventListener("change", () =>{
    currentCell.style.fontFamily = fontFamily.value;
    updateJson(currentCell);
});

// cut, copy, paste
cutBtn.addEventListener("click", () =>{
    // console.log("style", currentCell.style);
    // console.log("text", currentCell.innerText);
    cutValue = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    }
    updateJson(currentCell);
    currentCell.style = null;
    currentCell.innerText = null;
});

copyBtn.addEventListener("click", () =>{
    cutValue = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    };
    updateJson(currentCell);
});

pasteBtn.addEventListener("click", () =>{
    currentCell.style.cssText = cutValue.style;
    currentCell.innerText = cutValue.text;
    updateJson(currentCell);
});

// save all the element in a json
function updateJson(cell){
    var json = {
        style: cell.style.cssText,
        text: cell.innerText,
        id: cell.id,
    };

    //update this json in matrix
    // console.log("JSON", json);
    var id = cell.id.split("");
    
    var i = id[1] - 1;
    var j = id[0].charCodeAt(0) - 65;
    matrix[i][j] = json;
    
}

// define json data
function downloadJson(){

// convert json data to string
const jsonString = JSON.stringify(matrix);

 // Create a Blob with the JSON data and set its MIME type to application/json
 const blob = new Blob([jsonString], { type: "application/json" });

 // Create an anchor element and set its href attribute to the Blob URL
 const link = document.createElement("a");
 link.href = URL.createObjectURL(blob);
 link.download = "data.json"; // Set the desired file name

 // Append the link to the document, click it to start the download, and remove it afterward
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
}

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // {id,style,text}
      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}

// [
// {sheet1:matrix1,}
// {sheet2:matrix2,}
// ]

// var currentSheet = 2;