
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
        this.hasMoves = false;
        
      
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
    showDoubleJumpPosition(){//will show the positions available for a double jump
        this.hasMoves = false;
        if (this.color === 'black'){
            console.log("FIRST" + gameArray[this.divLocation-7]);
            console.log("SECOND" + ((this.divLocation-7) > 0));
            console.log("THIRD" + gameArray[this.divLocation-7].color);
            console.log("FOURTH" + gameArray[this.divLocation-14]);
            console.log("FIFTH" + divList[this.divLocation-14].style.background);

            if (gameArray[this.divLocation-7] !== null && ((this.divLocation-7) > 0) && gameArray[this.divLocation-7].color !== 'black' && gameArray[this.divLocation-14] === null && divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'){ //jump over
                document.getElementById(this.divLocation-14).style.background = 'rgb(255, 255, 0)';//yellow
                console.log("this should be yellow:" + document.getElementById(this.divLocation-14).style.background);
                console.log("im here1");
                this.hasMoves = true;
             }
            if (gameArray[this.divLocation-9] !== null && ((this.divLocation-9) > 0) && gameArray[this.divLocation-9].color !== 'black' && gameArray[this.divLocation-18] === null && divList[this.divLocation-18].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation-18).style.background = 'rgb(255, 255, 0)';
                this.hasMoves = true;
                console.log("im here2");
             }
        }
        else if (this.color === 'red'){
            //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
            if (gameArray[this.divLocation+7] !== null && gameArray[this.divLocation+7].color !== 'red' && gameArray[this.divLocation+14] === null && divList[this.divLocation+14].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+14).style.background = 'rgb(255, 255, 0)';
                this.hasMoves = true;
             }
             if (gameArray[this.divLocation+9] !== null && gameArray[this.divLocation+9].color !== 'red' && gameArray[this.divLocation+18] === null && divList[this.divLocation+18].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+18).style.background = 'rgb(255, 255, 0)';
                this.hasMoves = true;
             }
        }
        return this.hasMoves;
    }


    showPossibleMoves(){ //both changes certain divs to yellow that would be possible moves as well as returns true or false if there are possible moves
        this.hasMoves = false;
        if (this.color === 'black'){
            if (gameArray[this.divLocation-7] === null && divList[this.divLocation-7].style.background === 'rgb(205, 133, 63)'){
               document.getElementById(this.divLocation-7).style.background = 'rgb(255, 255, 0)';
               console.log("first");
               this.hasMoves = true;
            }
    
            if (gameArray[this.divLocation-7] !== null && gameArray[this.divLocation-7].color !== 'black' && gameArray[this.divLocation-14] === null && divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'){ //jump over

                document.getElementById(this.divLocation-14).style.background = 'rgb(255, 255, 0)';
                console.log("second");
                this.hasMoves = true;
             }
            if (gameArray[this.divLocation-9] === null && divList[this.divLocation-9].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation-9).style.background = 'rgb(255, 255, 0)';
                console.log("third");
                this.hasMoves = true;
             }
            if (gameArray[this.divLocation-9] !== null && gameArray[this.divLocation-9].color !== 'black' && gameArray[this.divLocation-18] === null && divList[this.divLocation-18].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation-18).style.background = 'rgb(255, 255, 0)';
                console.log("fourth");
                this. hasMoves = true;
             }
        }
        else if (this.color === 'red'){
            if (gameArray[this.divLocation+7] === null && divList[this.divLocation+7].style.background === 'rgb(205, 133, 63)'){
               document.getElementById(this.divLocation+7).style.background = 'rgb(255, 255, 0)';
               console.log("fifth");
               this.hasMoves = true;
            }
            //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
            if (gameArray[this.divLocation+7] !== null && gameArray[this.divLocation+7].color !== 'red' && gameArray[this.divLocation+14] === null && divList[this.divLocation+14].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+14).style.background = 'rgb(255, 255, 0)';
                console.log("sixth");
                this.hasMoves = true;
             }
            if (gameArray[this.divLocation+9] === null && divList[this.divLocation+9].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+9).style.background = 'rgb(255, 255, 0)';
                console.log("seventh");
                this.hasMoves = true;
             }
             if (gameArray[this.divLocation+9] !== null && gameArray[this.divLocation+9].color !== 'red' && gameArray[this.divLocation+18] === null && divList[this.divLocation+18].style.background === 'rgb(205, 133, 63)'){
                document.getElementById(this.divLocation+18).style.background = 'rgb(255, 255, 0)';
                console.log("eighth" + gameArray[this.divlocation+9]);
                console.log("eighth");
                this.hasMoves = true;
             }
        }
        return this.hasMoves;
    }

    removePossibleMoves(){
        divList.forEach(element => {
            if (element.style.background === 'rgb(255, 255, 0)'){
                element.style.background = 'rgb(205, 133, 63)';
            }
        })
    }

    movePiece(idOfSquare){
      
        let difference = Math.abs(idOfSquare - this.divLocation);
        console.log(difference)
        if (difference >= 14 && this.color === 'black'){
            let pieceJumpedOver = divList[this.divLocation-(difference/2)];
            pieceJumpedOver.firstChild.remove();
            let oldSpotOfPieceJumping = this.divLocation-(difference/2);
            gameArray[oldSpotOfPieceJumping] = null;
            console.log(gameArray);
            player1NumCaptured++;
            console.log("player 1 captured: " + player1NumCaptured);
        }
        else if (difference >= 14 && this.color === 'red'){
            let pieceJumpedOver = divList[this.divLocation+(difference/2)];
            pieceJumpedOver.firstChild.remove();
            let oldSpotOfPieceJumping = this.divLocation+(difference/2);
            gameArray[oldSpotOfPieceJumping] = null;
            player2NumCaptured++;
            console.log("player 2 captured: " + player2NumCaptured);
        }
        
        gameArray[this.divLocation] = null; //removes the piece from the current div in the game array and replaces it with null
        let oldCircle = divList[this.divLocation];
        oldCircle.firstChild.remove(); //actually removes the piece from the old div
        
        this.divLocation = idOfSquare;//change the location of the div for this object to the id of the div passed 
        gameArray[this.divLocation] = new Piece(this.color, this.divLocation); //in the new position in the game array, add a new Piece object with the same color and new div location
        this.renderPiece(); //renders a piece in the new div with the new div location 
        this.removePossibleMoves(); //removes the yellow squares
        
        return difference;


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
let doubleJumpCount = 0;
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
            else {
                console.log("Pleae select a piece which has possible moves available")
            }
         }
         else{
            console.log(`please chose a black piece111111`);
         }
       
    }
    if (playerTurn === 1.5 && gameStatus === null && htmlEl.style.background === 'rgb(255, 255, 0)'){
        let desiredSquare = divList[iD]; 
        let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to 
        let numberMoved = desiredPiece.movePiece(idOfSquare); //actually moving the piece 
        desiredPiece.removePossibleMoves();
        console.log('num of moves:' + numberMoved);
        if (numberMoved >= 14){
            playerTurn = 1.6;
        }
        else {
            playerTurn = 2;
            console.log("Tennis");
        }
    }
    if (playerTurn === 1.6){
        let desiredSquare = divList[iD]; 
        console.log("look here");
        let idOfSquare = parseInt(desiredSquare.id);
        desiredPiece.showDoubleJumpPosition();
        playerTurn = 1.7;
        console.log("look here2");
    }
    if (playerTurn === 1.7 & gameStatus === null && htmlEl.style.background === 'rgb(255, 255, 0)'){
        let desiredSquare = divList[iD]; 
        let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to 
        let numberMoved = desiredPiece.movePiece(idOfSquare); //actually moving the piece 
        desiredPiece.removePossibleMoves();
    }
      
    
        


    // } && desiredPiece.color === 'black' && desiredPiece.showDoubleJumpPosition() === true){
   
    
    
    
    
    
    
    
    
    
        //     // console.log( desiredPiece.showDoubleJumpPosition() + "this is the boolean");
    //     let desiredSquare = divList[iD]; 
    //     let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to
    //     let numberMoved = desiredPiece.movePiece(idOfSquare); //actually moving the piece 
    //     desiredPiece.removePossibleMoves();
    //     if (numberMoved >= 14){
    //         playerTurn = 1.6;
    //     }
    //     else {
    //         playerTurn = 2;
    //     }

    //     // console.log(desiredPiece.showDoubleJumpPosition());
    // }
    // if (playerTurn === 1.6 && desiredPiece.color === 'black' && desiredPiece.showDoubleJumpPosition() === false){
    //     playerTurn = 2;
    //     console.log("cheese");
    // }







    // if (playerTurn === 1.6 && desiredPiece.color === 'black' && desiredPiece.showPossibleMoves() === true){
    //     let desiredSquare = divList[iD]; 
    //     let idOfSquare = parseInt(desiredSquare.id);
    //     // console.log("NUMBER 1" + gameArray[idOfSquare-7]);
    //     // console.log("NUMBER 1" + gameArray[idOfSquare-7].color);
    //     // console.log("NUMBER 1" + gameArray[idOfSquare-14]);
    //     // console.log(divList[idOfSquare-14].style.background);
    //     console.log
    //     if (gameArray[idOfSquare-7] !== null && gameArray[idOfSquare-7].color === 'red' && gameArray[idOfSquare-14] === null && divList[idOfSquare-14].style.background === 'rgb(205, 133, 63)'){
    //         document.getElementById(idOfSquare-14).style.background = "yellow";
    //         doubleJumpCount++;
    //         console.log("would you like to double jump?1")
    //         desiredPiece.movePiece(idOfSquare);
    //     }
    //     if (gameArray[idOfSquare-9] !== null && gameArray[idOfSquare-9].color === 'red' && gameArray[idOfSquare-18] === null && divList[idOfSquare-18].style.background === 'rgb(205, 133, 63)'){
    //         document.getElementById(idOfSquare-18).style.background = "yellow";
    //         doubleJumpCount++;
    //         console.log("would you like to double jump?2")
    //         desiredPiece.movePiece(idOfSquare);
    //     }
    //     // if (doubleJumpCount>0){ //if there is a possible double jump move
    //     //     desiredPiece.movePiece(idOfSquare);
    //     // }
    //     else if (doubleJumpCount === 0){
    //         playerTurn = 2;
    //     }
    
    // }

    if (playerTurn === 1.5 && gameStatus === null && (htmlEl.style.background === 'red' || divClass === 'square')){
        console.log("Please chose a yellow square");
    }
    if (playerTurn === 1.5 && gameStatus === null && divClass === 'circle'){//if they are choosing another black it should switch to that piece 
        if(htmlEl.style.background === 'black'){
            console.log("yo bozo im here")
            desiredPiece = gameArray[iD];
            if (desiredPiece.showPossibleMoves() === true){
                desiredPiece.removePossibleMoves();
                desiredPiece.showPossibleMoves();
            } 
            else {
                console.log("Pleae select a piece which has possible moves available")
            }
         }
         else if (htmlEl.style.backgroun === 'red'){
            console.log(`please chose a black piece33333`);
         }

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
    if (playerTurn === 2.5 && gameStatus === null && htmlEl.style.background === 'rgb(255, 255, 0)'){
        console.log("why hello there")
        let desiredSquare = divList[iD]; 
        let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to 
        let numberMoved = desiredPiece.movePiece(idOfSquare);
        if (numberMoved >= 14 && desiredPiece.color === 'red' && desiredPiece.showPossibleMoves() === true){
            playerTurn = 2;
        }
        else{
            desiredPiece.movePiece(idOfSquare);
            playerTurn = 1; 
        }
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

















