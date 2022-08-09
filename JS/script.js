
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
        div.style.background = '#CD853F'; //darker
        colorCount++;
    }
    boarder.appendChild(div);
}


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
        document.querySelector(`#${newLocation}`) // not sure what this is doing
    }

    //Check if it is a valid move for each piece 

    // checkIfMovePossible(){
    //     if (this.color === 'black' && getElementFromClick().style.background === '#CD853F'){

    //     }
    // }

    showPossibleMoves(){
        if (this.color === 'black'){
            if (gameArray[this.divLocation-7] === null && divList[this.divLocation-7].style.background === 'rgb(205, 133, 63)'){
               document.getElementById(this.divLocation-7).style.background = "yellow";
            }
            if (gameArray[this.divLocation-9] === null && divList[this.divLocation-9].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation-9).style.background = "yellow";
             }
        }
    }

    //renderPiece
    renderPiece(){
        const divEl = document.getElementById(this.divLocation);
        const newCircle = document.createElement("div");
        if (this.color === 'red'){
            newCircle.setAttribute("class", "piece");
            newCircle.setAttribute("id", this.divLocation);
            newCircle.style.background = "red";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        
        }
        else if (this.color === 'black'){
            newCircle.setAttribute("class", "piece");
            newCircle.setAttribute("id", this.divLocation);
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

let divList = document.querySelectorAll(".square");
let resetButton = document.querySelector("#reset");
let gameArray = [];
let playerTurn = 1;
let player1NumCaptured = 0;
let player2NumCaptured = 0;
let gameStatus = null; //no winner



////////////////////////////////////////////////////////////////////////////////////////////////////////////
//event listeners


boarder.addEventListener('click', function(cursor){
    htmlEl  = cursor.target;
   if (playerTurn === 1 && gameStatus === null && htmlEl.style.background === 'black'){
        let pieceID = parseInt(htmlEl.id);
        let desiredPiece = gameArray[pieceID];
        desiredPiece.showPossibleMoves();
   }

}); //return html element clicked on https://stackoverflow.com/questions/42372757/get-element-within-clicked-pixel
resetButton.addEventListener('click', init);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions

function getElementFromClick(cursor){
    htmlEl  = cursor.target;
    console.log(htmlEl);
    return htmlEl;
   
}



function init(){
    gameArray = [];
    let existingCheckers = document.querySelectorAll(".piece");
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
        if (j >= 24 && j <= 39){
            gameArray.push(null);
        }

        if (j > 39){

            if (divList[j].style.background === 'rgb(255, 235, 205)'){
                gameArray.push(null);
            }
            else if (divList[j].style.background === 'rgb(205, 133, 63)'){//darker
                let circle = new Piece ('black', j);
                circle.renderPiece();
                gameArray.push(circle);
            }
    
        }
    }
console.log(gameArray);

   
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rest of game logic 

















