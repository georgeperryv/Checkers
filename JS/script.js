
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

    // hasPossibleMoves(){

    // }

    showPossibleMoves(){
        let hasMoves = false;
        if (this.color === 'black'){
            if (gameArray[this.divLocation-7] === null && divList[this.divLocation-7].style.background === 'rgb(205, 133, 63)'){
               document.getElementById(this.divLocation-7).style.background = "yellow";
               hasMoves = true;
            }
            if (gameArray[this.divLocation-9] === null && divList[this.divLocation-9].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation-9).style.background = "yellow";
                hasMoves = true;
             }
        }
        else if (this.color === 'red'){
            if (gameArray[this.divLocation+7] === null && divList[this.divLocation+7].style.background === 'rgb(205, 133, 63)'){
               document.getElementById(this.divLocation+7).style.background = "yellow";
               hasMoves = true;
            }
            if (gameArray[this.divLocation+9] === null && divList[this.divLocation+9].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+9).style.background = "yellow";
                console.log("this is happening")
                hasMoves = true;
             }
        }
        else{
            hasMoves = false;
        }
        return hasMoves;
    }

    removePossibleMoves(){
        divList.forEach(element => {
            if (element.style.background === "yellow"){
                element.style.background = 'rgb(205, 133, 63)';
            }
        })
    }

    movePiece(idOfSquare){

        
        gameArray[this.divLocation] = null; //removes the piece from the current div in the game array and replaces it with null
        let oldCircle = divList[this.divLocation];
        oldCircle.firstChild.remove(); //actually removes the piece from the old div
        
        this.divLocation = idOfSquare;//change the location of the div for this object to the id of the div passed 
        gameArray[this.divLocation] = new Piece(this.color, this.divLocation); //in the new position in the game array, add a new Piece object with the same color and new div location
        this.renderPiece(); //renders a piece in the new div with the new div location 
        this.removePossibleMoves(); //removes the yellow squares


    }

    //renderPiece
    renderPiece(){
        const divEl = document.getElementById(this.divLocation);
        const newCircle = document.createElement("div");
        if (this.color === 'red'){
            newCircle.setAttribute("class", "circle");
            newCircle.setAttribute("id", this.divLocation);
            newCircle.style.background = "red";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        
        }
        else if (this.color === 'black'){
            newCircle.setAttribute("class", "circle");
            newCircle.setAttribute("id", this.divLocation);
            newCircle.style.background = "black";
            newCircle.style.width = "56px";
            newCircle.style.height = "56px";
            newCircle.style.borderRadius = "50%";
        }
        if (this.kingStatus === true){
            newCircle.setAttribute("class", "circle");
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
let existingCheckers = document.querySelectorAll(".circle");
let resetButton = document.querySelector("#reset");
let gameArray = [];
let playerTurn = 1;
let player1NumCaptured = 0;
let player2NumCaptured = 0;
let gameStatus = null; //no winner



////////////////////////////////////////////////////////////////////////////////////////////////////////////
//event listeners

let desiredPiece = 0;


boarder.addEventListener('click', function(cursor){
    htmlEl  = cursor.target; //entire element clicked on 
    let iD = parseInt(htmlEl.id); //id of the element clicked on 
    let divClass = htmlEl.className; //class of the element clicked on 
   
    if(playerTurn === (1 || 2) && gameStatus === null && divClass === 'square'){
        console.log("1please choose the piece you would like to move")
    }
    if (playerTurn === 1 && gameStatus === null && divClass === 'circle'){
        if(htmlEl.style.background === 'black'){
            desiredPiece = gameArray[iD];
            if (desiredPiece.showPossibleMoves() === true){
                desiredPiece.showPossibleMoves();
                playerTurn = 1.5;
            } 
         }
         else{
            console.log(`please chose a black piece`);
         }
       
    }
    if (playerTurn === 1.5 && gameStatus === null && htmlEl.style.background === 'yellow'){
        let desiredSquare = divList[iD]; 
        let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to 
        desiredPiece.movePiece(idOfSquare);
        playerTurn = 2;
    }
    if (playerTurn === 2 && gameStatus === null && divClass === 'circle'){
        if(htmlEl.style.background === 'red'){
            desiredPiece = gameArray[iD];
            if (desiredPiece.showPossibleMoves() === true){
                desiredPiece.showPossibleMoves();
                playerTurn = 2.5;
            } 
         }
         else{
            console.log(`please chose a red piece`);
         }
    }
    if (playerTurn === 2.5 && gameStatus === null && htmlEl.style.background === 'yellow'){
        let desiredSquare = divList[iD]; 
        let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to 
        desiredPiece.movePiece(idOfSquare);
        playerTurn = 1;
    }

}); 
//return html element clicked on https://stackoverflow.com/questions/42372757/get-element-within-clicked-pixel
resetButton.addEventListener('click', init);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions

function getElementFromClick(cursor){
    htmlEl  = cursor.target;
    // console.log(htmlEl);
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


   
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rest of game logic 

















