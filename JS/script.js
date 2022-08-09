///////////////////////////////////////////////////////////////////
//Board set-up 

let boarder = document.querySelector('.boarder'); //graph boarder of board
let colorCount = 0; //counter for the color of the div


for (let i = 0; i < 64; i++){ //add 64 divs of alternating color
    let div = document.createElement("div");
    div.setAttribute("id", `${i}`);
    div.setAttribute("class", "square");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";

    if (colorCount % 9 === 0){
        colorCount++;
         
    }

    if (colorCount % 2 === 1){
        div.style.background = '#FFEBCD';
        colorCount++;
    
    }
    else{
        div.style.background = '#CD853F';
        colorCount++;
 
    }
   

    boarder.appendChild(div);
}


// const element = document.getElementById('47');
// const position = element.getBoundingClientRect();
// const x1 = position.left;
// const x2 = position.right;
// const y1 = position.top;
// const y2 = position.bottom;

// console.log(x1, x2, y1, y2);



////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating the Piece Class

class Piece {
    constructor(color, divLocation){
        this.color = color;
        this.divLocation = divLocation;
        this.kingStatus = false;
        
      
    }

    //getters

    getDivLocation() {
        return this.divLocation;
    }

    //setters

    setDivLocation(newLocation) {
        this.divLocation = newLocation;
        document.querySelector(`#${newLocation}`)
    }

    //renderPiece
    renderPiece(){
        const divEl = document.getElementById(this.divLocation);
        const newCircle = document.createElement("div");
        if (this.color === 'red'){
            newCircle.setAttribute("class", "piece");
            newCircle.style.background = "red";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        
        }
        else if (this.color === 'black'){
            newCircle.setAttribute("class", "piece");
            newCircle.style.background = "black";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        }
        if (this.kingStatus === true){
            newCircle.setAttribute("class", "piece");
            newCircle.style.background = "gold";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        }
        divEl.append(newCircle);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Global variables
let thePiece = new Piece('red', 28);
thePiece.renderPiece();

let divList = document.querySelectorAll(".square");
let existingCheckers = document.querySelectorAll(".piece");
let gameArray = [];


////////////////////////////////////////////////////////////////////////////////////////////////////////////



boarder.addEventListener('click', getElementFromClick); //return html element clicked on https://stackoverflow.com/questions/42372757/get-element-within-clicked-pixel
    

function getElementFromClick(cursor){
    htmlEl  = cursor.target;
    console.log(htmlEl);
    return htmlEl;
   
}



function init(){
    gameArray = [];
    existingCheckers.forEach(element => {
         element.remove();
     });
   for (let j = 0; j < 64; j++) {
        if (j < 24){

            if (divList[j].style.background === 'rgb(255, 235, 205)'){
                gameArray.push(null);
            }
            else if (divList[j].style.background === 'rgb(205, 133, 63)'){
                let circle = new Piece ('red', j);
                circle.renderPiece();
                gameArray.push(circle);
            }

        }

        if (j > 39){

            if (divList[j].style.background === 'rgb(255, 235, 205)'){
                gameArray.push(null);
            }
            else if (divList[j].style.background === 'rgb(205, 133, 63)'){
                let circle = new Piece ('black', j);
                circle.renderPiece();
                gameArray.push(circle);
            }
    
        }
    }
}


init();
console.log(gameArray);

// console.log(gameArray);













