///////////////////////////////////////////////////////////////////
//Window display

window.onload = function () {
  //initializes board when window is reloaded
  init()
}

///////////////////////////////////////////////////////////////////
//Board set-up

let boarder = document.querySelector('.boarder') //graph boarder of board
let colorCount = 0 //counter to help alternate the color of the div

for (let i = 0; i < 64; i++) {
  //add 64 divs of alternating color
  let div = document.createElement('div')
  div.setAttribute('id', `${i}`) //every square will have an id 1-64 starting at the top left going to the bottom right
  div.setAttribute('class', 'square') //all will have the class square
  div.style.display = 'flex'
  div.style.justifyContent = 'center'
  div.style.alignItems = 'center'

  if (colorCount % 9 === 0) {
    //this allows div 8 and 9 to both be the darker color and 15 and 16 to be the lighter color
    colorCount++
  }
  if (colorCount % 2 === 1) {
    div.style.background = '#FFEBCD' //lighter brown
    colorCount++
  } else {
    div.style.background = '#CD853F' //darker brown
    colorCount++
  }
  boarder.appendChild(div)
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//Piece Class

class Piece {
  constructor (color, divLocation) {
    this.color = color
    this.divLocation = divLocation
    this.kingStatus = false
    this.hasMoves = false
  }

  //getters

  getDivLocation () {
    return this.divLocation
  }

  getHasMoves () {
    return this.hasMoves
  }

  //setters

  setKingStatus (boolean) {
    this.kingStatus = boolean
  }

  showPossibleMoves () {
    //Method to show possible moves at Turns 1 and 2 (aka a player's first move on their turn as opposed to possible moves after already completing a jump)
    //Changes open adjacent diagonal squares or open diagonal jump squares to yellow if conditions are met
    this.hasMoves = false
    let countBlackPiece = 0
    let countRedPiece = 0
    if (this.kingStatus === false) {
      //If King status is false, black and red pieces can only move one way
      if (this.color === 'black') {
        if (this.divLocation - 7 >= 0) {
          //Div location represents the location of this current piece. Subtracting 7 or 9 for black will provide the div location of the two diagonal adjacent options for that piece
          if (
            gameArray[this.divLocation - 7] === null &&
            divList[this.divLocation - 7].style.background ===
              'rgb(205, 133, 63)' //Darker shade of browk - aka there is no piece (as seen by the null in the game arrary) and the div is not yellow, it is the right color brow
          ) {
            document.getElementById(this.divLocation - 7).style.background =
              'rgb(255, 255, 0)' //If these conditions are met, set the color of the square to yellow to represent a possible move
            this.hasMoves = true // Change the hasMoves variable for the piece to true
            countBlackPiece++
          }

          //Similar logic for the following code. -14 and -18 would be the diagonal behind the adjacent diagonal
          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'black' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] === null &&
            divList[this.divLocation - 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'black' &&
            gameArray[this.divLocation - 18] === null &&
            divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        //If any of the above statements were true, then this black piece has an initial possible move available and the function will return true
        if (countBlackPiece > 0) {
          return true
        } else {
          this.hasMoves = false
          return false
        }
      }

      //The same process is done for red except in the opposite direction. They will be moving forward on the div numbers
      if (this.color === 'red') {
        if (this.divLocation + 7 < 64) {
          // Ensures the if statement won't check for possible moves if it is on the far border
          if (
            gameArray[this.divLocation + 7] === null &&
            divList[this.divLocation + 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 7).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'red' &&
            gameArray[this.divLocation + 14] === null &&
            divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }

        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] === null &&
            divList[this.divLocation + 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'red' &&
            gameArray[this.divLocation + 18] === null &&
            divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'

            countRedPiece++
          }
        }

        if (countRedPiece > 0) {
          this.hasMoves = true
          return true
        } else {
          this.hasMoves = false
          return false
        }
      } else {
        this.hasMoves = false
        return false
      }
    }
    //If a piece has kingStatus set to true, it will basically have all of the above moves, being able to move both forward and backwards. It keeps it's this.color consistent, however, since it still acts like that team's piece capturing the other color
    if (this.kingStatus === true) {
      if (this.color === 'black') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] === null &&
            divList[this.divLocation - 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 7).style.background =
              'rgb(255, 255, 0)'

            this.hasMoves = true
            countBlackPiece++
          }

          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'black' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] === null &&
            divList[this.divLocation - 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'black' &&
            gameArray[this.divLocation - 18] === null &&
            divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] === null &&
            divList[this.divLocation + 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 7).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'black' &&
            gameArray[this.divLocation + 14] === null &&
            divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] === null &&
            divList[this.divLocation + 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'black' &&
            gameArray[this.divLocation + 18] === null &&
            divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (countBlackPiece > 0) {
          this.hasMoves = true
          return true
        } else {
          this.hasMoves = false
          return false
        }
      }
      if (this.color === 'red') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] === null &&
            divList[this.divLocation - 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 7).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }

          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'red' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] === null &&
            divList[this.divLocation - 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'red' &&
            gameArray[this.divLocation - 18] === null &&
            divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] === null &&
            divList[this.divLocation + 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 7).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'red' &&
            gameArray[this.divLocation + 14] === null &&
            divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] === null &&
            divList[this.divLocation + 9].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 9).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'red' &&
            gameArray[this.divLocation + 18] === null &&
            divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (countRedPiece > 0) {
          this.hasMoves = true
          return true
        } else {
          this.hasMoves = false
          return false
        }
      }
    }
  }

  showDoubleJumpPosition () {
    //Method to show possible moves at Turns 1.2 and 2.2 (aka a player's second move on their turn after already completing thier first jump)
    //Changes open diagonal jump squares to yellow if conditions are met (not adjacent diagonal squares since a double, triple, quadruple jump require another jump following the first)
    //This is similar to the showPossibleMoves() method except adjacent diagonal squares will not appear as possible moves, only those 14-18 away will appear yellow if conditions are met
    this.hasMoves = false
    let countBlackPiece = 0
    let countRedPiece = 0
    if (this.kingStatus === false) {
      if (this.color === 'black') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'black' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
            //-14 represents a div two squares away (aka over another piece)
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)' //Yellow
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'black' &&
            gameArray[this.divLocation - 18] === null &&
            (divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (countBlackPiece > 0) {
          return true
        } else {
          return false
        }
      }

      if (this.color === 'red') {
        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'red' &&
            gameArray[this.divLocation + 14] === null &&
            (divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'red' &&
            gameArray[this.divLocation + 18] === null &&
            (divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (countRedPiece > 0) {
          return true
        } else {
          return false
        }
      }
    }
    if (this.kingStatus === true) {
      if (this.color === 'black') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'black' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'black' &&
            gameArray[this.divLocation - 18] === null &&
            (divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }

        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'black' &&
            gameArray[this.divLocation + 14] === null &&
            (divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'black' &&
            gameArray[this.divLocation + 18] === null &&
            (divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }
        if (countBlackPiece > 0) {
          return true
        } else {
          return false
        }
      }
      if (this.color === 'red') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] !== null &&
            gameArray[this.divLocation - 7].color !== 'red' &&
            gameArray[this.divLocation - 14] === null &&
            (divList[this.divLocation - 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)'

            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation - 9 >= 0) {
          if (
            gameArray[this.divLocation - 9] !== null &&
            gameArray[this.divLocation - 9].color !== 'red' &&
            gameArray[this.divLocation - 18] === null &&
            (divList[this.divLocation - 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation - 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }

        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'red' &&
            gameArray[this.divLocation + 14] === null &&
            (divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 14].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (this.divLocation + 9 < 64) {
          if (
            gameArray[this.divLocation + 9] !== null &&
            gameArray[this.divLocation + 9].color !== 'red' &&
            gameArray[this.divLocation + 18] === null &&
            (divList[this.divLocation + 18].style.background ===
              'rgb(205, 133, 63)' ||
              divList[this.divLocation + 18].style.background ===
                'rgb(255, 255, 0)')
          ) {
            document.getElementById(this.divLocation + 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }
        if (countRedPiece > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }

  removePossibleMoves () {
    //This will remove all yellow squares from the board
    divList.forEach(element => {
      if (element.style.background === 'rgb(255, 255, 0)') {
        element.style.background = 'rgb(205, 133, 63)'
      }
    })
  }

  movePiece (idOfSquare) {
    //Once a player clicks a yellow square, the movePiece(location of the new square) will be called
    let difference = Math.abs(idOfSquare - this.divLocation) //This represents how many divs the piece moved since it knows both its previous divLocation and its new one - take the absolute value to compare magnitude of move
    //The following if statements only apply to capturing a piece
    if (difference >= 14 && this.color === 'black') {
      if (this.kingStatus === false) {
        let pieceJumpedOver = divList[this.divLocation - difference / 2] //Takes the piece in between where the piece currently is and where it is jumping to and removes it on the next line
        pieceJumpedOver.firstChild.remove() //Removes piece jumped over
        let oldSpotOfPieceJumping = this.divLocation - difference / 2 //sets the divLocation of the piece jumped over to a variable
        gameArray[oldSpotOfPieceJumping] = null //The gameArray position that represents the divLocation of the piece jumped over will be set to null to indicate there is no longer a piece in that spot
        player1NumCaptured++ //The total tally of pieces for player one will increase
        addCapturedPiece(1) //The screen will add a red piece to player 1's stash on the left side of the board to represent a captured piece
        checkWinner() //Since a piece was just taken, the game will check for a winner
      }
      if (this.kingStatus === true) {
        //Same logic as above but have to account for both directions since a king can move both ways (there are -'s and +'s)
        if (idOfSquare - this.divLocation > 0) {
          let pieceJumpedOver = divList[this.divLocation + difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation + difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player1NumCaptured++
          addCapturedPiece(1)

          checkWinner()
        }
        if (idOfSquare - this.divLocation < 0) {
          let pieceJumpedOver = divList[this.divLocation - difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation - difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player1NumCaptured++
          addCapturedPiece(1)

          checkWinner()
        }
      }
    }
    if (difference >= 14 && this.color === 'red') {
      if (this.kingStatus === false) {
        let pieceJumpedOver = divList[this.divLocation + difference / 2]
        pieceJumpedOver.firstChild.remove()
        let oldSpotOfPieceJumping = this.divLocation + difference / 2
        gameArray[oldSpotOfPieceJumping] = null
        player2NumCaptured++
        addCapturedPiece(2)

        checkWinner()
      }
      if (this.kingStatus === true) {
        if (idOfSquare - this.divLocation > 0) {
          let pieceJumpedOver = divList[this.divLocation + difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation + difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player2NumCaptured++
          addCapturedPiece(2)
          checkWinner()
        }
        if (idOfSquare - this.divLocation < 0) {
          let pieceJumpedOver = divList[this.divLocation - difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation - difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player2NumCaptured++
          addCapturedPiece(2)
          checkWinner()
        }
      }
    }
    //The following code will run for all scenarios of a move (whether moving one square or jumping)
    gameArray[this.divLocation] = null //Removes the piece from the current div in the game array and replaces it with null
    let oldCircle = divList[this.divLocation] //Finds the node in the nodeList of all squares based on the location of the current div before it is changed
    oldCircle.firstChild.remove() //Removes the piece from the old div - thereby removing it from the board
    this.divLocation = idOfSquare //Changes the location of the div for this object to the id of the div passed (aka where the piece is moving to)
    gameArray[this.divLocation] = new Piece(this.color, this.divLocation) //In the new position in the game array, add a new Piece object with the same color and new div location passed in
    gameArray[this.divLocation].setKingStatus(this.kingStatus) //Sets king status of the new piece to whatever this king status currently is
    this.renderPiece() //Renders a piece in the new div with the new div location
    this.removePossibleMoves() //Removes the yellow squares from the board

    if (this.color === 'black' && this.divLocation <= 7) {
      //If a black piece has made it to the other side (divs 0-7), change its king status to true
      this.kingStatus = true
      gameArray[this.divLocation].setKingStatus(true) //updated the status of the object in the game array
    }
    if (this.color === 'red' && this.divLocation >= 56) {
      this.kingStatus = true
      gameArray[this.divLocation].setKingStatus(true)
    }

    return difference //returns the number of spots a piece moved
  }

  renderPiece () {
    //Creates a piece
    const divEl = document.getElementById(this.divLocation)
    const newCircle = document.createElement('div')
    if (this.color === 'red') {
      newCircle.setAttribute('class', 'circle')
      newCircle.setAttribute('id', this.divLocation) //sets the id of the new piece to be the same as the div it will be located
      newCircle.style.background = 'red'
      newCircle.style.width = '56px'
      newCircle.style.height = '56px'
      newCircle.style.borderRadius = '50%'
    }
    if (this.color === 'black') {
      newCircle.setAttribute('class', 'circle')
      newCircle.setAttribute('id', this.divLocation)
      newCircle.style.background = 'black'
      newCircle.style.width = '56px'
      newCircle.style.height = '56px'
      newCircle.style.borderRadius = '50%'
    }
    if (this.kingStatus === true) {
      newCircle.style.border = '3px solid gold'
    }
    divEl.append(newCircle) //adds the new circle to the square that is obtained by doing getElementById of the new div Location
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Global variables

let divList = document.querySelectorAll('.square')
let existingCheckers = document.querySelectorAll('.circle')
let resetButton = document.querySelector('#reset')
let messageBoard = document.querySelector('#message-board')
let divOfStarPlayer1 = document.querySelector('#star-player-1')
let divOfStarPlayer2 = document.querySelector('#star-player-2')
let divOfPiecesCapturedPlayer1 = document.querySelector(
  '#pictures-of-black-pieces'
)
let divOfPiecesCapturedPlayer2 = document.querySelector(
  '#pictures-of-red-pieces'
)
let gameArray = [] //will hold piece objects at the index that corresponds to their current div location
let playerTurn = 1 //will change between stages of a turn
let desiredPiece = 0
let player1NumCaptured = 0
let player2NumCaptured = 0
let doubleJumpCount = 0
let gameStatus = null //no winner
let starPosition = 1 // at player 1

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//event listeners

resetButton.addEventListener('click', init) //Event listener on the entire board that will perform one of the following if statements matching the conditions of that click

boarder.addEventListener('click', function (cursor) {
  htmlEl = cursor.target //Returns the entire HTML element clicked on
  let iD = parseInt(htmlEl.id) //Id of the element clicked on - respresents the id of the square it is currently located
  let divClass = htmlEl.className //Class name of the element clicked on

  ////////////////////////////////////////////////////////////
  //Turn 1
  //Represents player 1 having to choose a valid black piece - once they choose a black piece with possible moves, they will progress to the next stage of their turn
  if (gameStatus === null) {
    if (playerTurn === 1 && gameStatus === null && divClass === 'square') {
      messageBoard.innerHTML = 'Please select the piece you would like to move'
    }
    if (playerTurn === 1 && gameStatus === null && divClass === 'circle') {
      if (htmlEl.style.background === 'black') {
        desiredPiece = gameArray[iD]
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.showPossibleMoves()
          playerTurn = 1.1
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else {
        messageBoard.innerHTML = 'Please select a black piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 1.1

    //At this point, yellow squares with possible moves will be shown and the turn will either progress to the start of player 2's turn or if a piece was jumped (aka numberMoved (return value of difference moved) is greater than or equal to 14)
    if (
      playerTurn === 1.1 &&
      gameStatus === null &&
      htmlEl.style.background === 'rgb(255, 255, 0)'
    ) {
      let desiredSquare = divList[iD]
      let idOfSquare = parseInt(desiredSquare.id) //Gives the id number of the square the player has clicked on
      let numberMoved = desiredPiece.movePiece(idOfSquare) //Moves the piece to that desired square
      if (numberMoved >= 14) {
        //If jumped, progress to the third stage of the first turn to see if there are double and triple jumps available
        playerTurn = 1.2
      } else {
        playerTurn = 2 //progress to player 2's turn
        changeStarPosition(2) //change the position of the star to player 2
      }
    }

    if (
      playerTurn === 1.1 &&
      gameStatus === null &&
      (htmlEl.style.background === 'red' || divClass === 'square')
    ) {
      messageBoard.innerHTML = 'Please select a yellow square'
    }
    if (playerTurn === 1.1 && gameStatus === null && divClass === 'circle') {
      //This allows the player to chose a different piece if they change their mind on what they would like to move
      if (htmlEl.style.background === 'black') {
        desiredPiece = gameArray[iD]
        desiredPiece.removePossibleMoves()
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.removePossibleMoves()
          desiredPiece.showPossibleMoves()
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else if (htmlEl.style.backgroun === 'red') {
        messageBoard.innerHTML = 'Please choose a black piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 1.2

    if (playerTurn === 1.2) {
      //Checks if there is a doubleJumpPosition available (or triple or quadruple jump if called again) and will show yellow squares
      if (desiredPiece.showDoubleJumpPosition() === true) {
        playerTurn = 1.3
      } else {
        playerTurn = 2
        changeStarPosition(2)
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 1.3

    if (playerTurn === 1.3) {
      //Makes the player chose a yellow square and then moves the piece - if there are still moves available after that jump it will return to turn 1.2 or else it will progress to turn 2
      if (htmlEl.style.background !== 'rgb(255, 255, 0)') {
        messageBoard.innerHTML = 'Please select a yellow square'
        return
      }
      if (htmlEl.style.background === 'rgb(255, 255, 0)') {
        let desiredSquare = divList[iD]
        let idOfSquare = parseInt(desiredSquare.id)
        desiredPiece.movePiece(idOfSquare)
        desiredPiece.showDoubleJumpPosition()
        if (desiredPiece.getHasMoves() === true) {
          playerTurn = 1.2
        } else {
          playerTurn = 2
          changeStarPosition(2)
        }
      } else if (
        htmlEl.style.background !== 'rgb(255, 255, 0)' &&
        desiredPiece.getHasMoves() === true
      ) {
        messageBoard.innerHTML = 'Please select a yellow square'
      } else {
        playerTurn = 2
        changeStarPosition(2)
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 2
    //Same logic as player 1

    if (
      playerTurn === 2 &&
      gameStatus === null &&
      divClass === 'square' &&
      (htmlEl.style.background === 'rgb(205, 133, 63)' ||
        htmlEl.style.background === 'rgb(255, 235, 205)')
    ) {
      messageBoard.innerHTML = 'Please select the piece you would like to move'
    }

    if (playerTurn === 2 && gameStatus === null && divClass === 'circle') {
      if (htmlEl.style.background === 'red') {
        desiredPiece = gameArray[iD]
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.showPossibleMoves()
          playerTurn = 2.1
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else {
        messageBoard.innerHTML = 'Please select a red piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 2.1

    if (
      playerTurn === 2.1 &&
      gameStatus === null &&
      htmlEl.style.background === 'rgb(255, 255, 0)'
    ) {
      let desiredSquare = divList[iD]
      let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
      let numberMoved = desiredPiece.movePiece(idOfSquare)
      if (numberMoved >= 14) {
        playerTurn = 2.2
      } else {
        playerTurn = 1
        changeStarPosition(1)
        messageBoard.innerHTML =
          'Please select the piece you would like to move'
      }
    }

    if (
      playerTurn === 2.1 &&
      gameStatus === null &&
      (htmlEl.style.background === 'black' || divClass === 'square')
    ) {
      messageBoard.innerHTML = 'Please select a yellow square'
    }
    if (playerTurn === 2.1 && gameStatus === null && divClass === 'circle') {
      //if they are choosing another black it should switch to that piece
      if (htmlEl.style.background === 'red') {
        desiredPiece = gameArray[iD]
        desiredPiece.removePossibleMoves()
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.removePossibleMoves()
          desiredPiece.showPossibleMoves()
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else if (htmlEl.style.backgroun === 'black') {
        messageBoard.innerHTML = 'Please choose a red piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 2.2

    if (playerTurn === 2.2) {
      if (desiredPiece.showDoubleJumpPosition() === true) {
        playerTurn = 2.3
      } else {
        playerTurn = 1
        changeStarPosition(1)
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 2.3
    if (playerTurn === 2.3) {
      if (htmlEl.style.background !== 'rgb(255, 255, 0)') {
        messageBoard.innerHTML = 'Please select a yellow square'
        return
      }
      if (htmlEl.style.background === 'rgb(255, 255, 0)') {
        let desiredSquare = divList[iD]
        let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
        desiredPiece.movePiece(idOfSquare)
        desiredPiece.showDoubleJumpPosition()
        if (desiredPiece.getHasMoves() === true) {
          playerTurn = 2.2
        } else {
          playerTurn = 1
          changeStarPosition(1)
        }
      } else if (
        htmlEl.style.background !== 'rgb(255, 255, 0)' &&
        desiredPiece.getHasMoves() === true
      ) {
        messageBoard.innerHTML = 'Please select a yellow square'
      } else {
        playerTurn = 1
        changeStarPosition(1)
      }
    }
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions

function addCapturedPiece (playerStash) {
  let capturedPiece = document.createElement('div')
  if (playerStash === 1) {
    capturedPiece.style.background = 'red'
    capturedPiece.setAttribute('id', 'red-captured-piece')
    capturedPiece.style.width = '56px'
    capturedPiece.style.height = '56px'
    capturedPiece.style.borderRadius = '50%'
    capturedPiece.style.margin = '5px'
    divOfPiecesCapturedPlayer1.appendChild(capturedPiece)
  } else if (playerStash === 2) {
    capturedPiece.style.background = 'black'
    capturedPiece.setAttribute('id', 'black-captured-piece')
    capturedPiece.style.width = '56px'
    capturedPiece.style.height = '56px'
    capturedPiece.style.borderRadius = '50%'
    capturedPiece.style.margin = '5px'
    divOfPiecesCapturedPlayer2.appendChild(capturedPiece)
  }
}

function resetCapturedPieces () {
  let allCapturedBlackPieces = document.querySelectorAll(
    '#black-captured-piece'
  )
  let allCapturedRedPieces = document.querySelectorAll('#red-captured-piece')
  allCapturedBlackPieces.forEach(element => {
    element.remove()
  })
  allCapturedRedPieces.forEach(element => {
    element.remove()
  })
}

function changeStarPosition (numPlayerTurn) {
  let star = document.createElement('img')
  star.setAttribute(
    'src',
    'images/star-with-no-background-11549726739dvobjtcde5-removebg-preview.png'
  )
  star.setAttribute('class', 'star')
  if (numPlayerTurn === 1) {
    divOfStarPlayer2.innerHTML = ''
    divOfStarPlayer1.appendChild(star)
    starPosition = 1
  } else if (numPlayerTurn === 2) {
    divOfStarPlayer1.innerHTML = ''
    divOfStarPlayer2.appendChild(star)
    starPosition = 2
  }
}

function init () {
  gameArray = []
  playerTurn = 1
  player1NumCaptured = 0
  player2NumCaptured = 0
  doubleJumpCount = 0
  gameStatus = null //no winner
  existingCheckers = document.querySelectorAll('.circle')
  divList = document.querySelectorAll('.square')

  if (starPosition === 2) {
    changeStarPosition(1)
  }
  resetCapturedPieces()

  existingCheckers.forEach(element => {
    element.remove()
  })

  divList.forEach(element => {
    if (element.style.background === 'rgb(255, 255, 0)') {
      element.style.background = 'rgb(205, 133, 63)'
    }
  })

  for (let j = 0; j < 64; j++) {
    if (j < 24) {
      if (divList[j].style.background === 'rgb(255, 235, 205)') {
        gameArray.push(null)
      } else if (divList[j].style.background === 'rgb(205, 133, 63)') {
        let circle = new Piece('red', j)
        circle.renderPiece()
        gameArray.push(circle)
      }
    }
    if (j >= 24 && j <= 39) {
      gameArray.push(null)
    }

    if (j > 39) {
      if (divList[j].style.background === 'rgb(255, 235, 205)') {
        gameArray.push(null)
      } else if (divList[j].style.background === 'rgb(205, 133, 63)') {
        //darker
        let circle = new Piece('black', j)
        circle.renderPiece()
        gameArray.push(circle)
      }
    }
  }

  playerTurn = 1
  messageBoard.innerHTML = ''
  messageBoard.style.fontSize = '16px'
  messageBoard.style.color = 'black'
  messageBoard.innerHTML =
    "<p><span>Player 1</span> will move <span>black</span> pieces and <span class='red-word'>player 2</span> will move <span class='red-word'>red</span> pieces. Your turn first <span>Player 1!</span></p>"
}

function checkWinner () {
  if (player1NumCaptured === 12) {
    gameStatus = 1
    messageBoard.innerHTML = "Congratulations Player 1 - You've Won!"
    messageBoard.style.fontSize = '30px'
    messageBoard.style.color = 'green'
  }
  if (player2NumCaptured === 12) {
    gameStatus = 2
    messageBoard.innerHTML = "Congratulations Player 2 - You've Won!"
    messageBoard.style.fontSize = '30px'
    messageBoard.style.color = 'green'
  }
}
