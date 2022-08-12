window.onload = function () {
  init()
}

///////////////////////////////////////////////////////////////////
//Board set-up

let boarder = document.querySelector('.boarder') //graph boarder of board
let colorCount = 0 //counter for the color of the div

for (let i = 0; i < 64; i++) {
  //add 64 divs of alternating color
  let div = document.createElement('div')
  div.setAttribute('id', `${i}`)
  div.setAttribute('class', 'square')
  div.style.display = 'flex'
  div.style.justifyContent = 'center'
  div.style.alignItems = 'center'

  if (colorCount % 9 === 0) {
    colorCount++
  }
  if (colorCount % 2 === 1) {
    div.style.background = '#FFEBCD'
    colorCount++
  } else {
    div.style.background = '#CD853F' //darker
    colorCount++
  }
  boarder.appendChild(div)
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating the Piece Class

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

  setDivLocation (newLocation) {
    this.divLocation = newLocation
    document.querySelector(`#${newLocation}`) // not sure what this is doing
  }

  setKingStatus (boolean) {
    this.kingStatus = boolean
  }

  //Check if it is a valid move for each piece

  // checkIfMovePossible(){
  //     if (this.color === 'black' && getElementFromClick().style.background === '#CD853F'){

  //     }
  // }

  // hasPossibleMoves(){

  // }
  showDoubleJumpPosition () {
    //will show the positions available for a double jump
    this.hasMoves = false
    let countBlackPiece = 0
    let countRedPiece = 0
    if (this.kingStatus === false) {
      if (this.color === 'black') {
        // console.log("FIRST" + gameArray[this.divLocation-7]);
        // console.log("SECOND" + ((this.divLocation-7) > 0));

        // // console.log("this is z" + z);
        // // console.log(gameArray);
        // console.log("THIRD" + (gameArray[this.divLocation-7]?.color));

        // console.log("FOURTH" + (gameArray[this.divLocation-14] === null));
        // console.log("FIFTH" + divList[this.divLocation-14]?.style?.background);

        // console.log("SIXTH" + gameArray[this.divLocation-9]);
        // console.log("SEVENTH" + ((this.divLocation-9) > 0));
        // console.log("EIGHT" + (gameArray[this.divLocation-9].color));
        // console.log("NINTH" + (gameArray[this.divLocation-18]));
        // console.log("TENTH" + divList[this.divLocation-18].style.background);

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
            //jump over
            console.log('setting hasMove true case 1')
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)' //yellow
            console.log(
              'this should be yellow:' +
                document.getElementById(this.divLocation - 14).style.background
            )
            console.log('im here1')
            this.hasMoves = true
            countBlackPiece++
            // return true;
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
            console.log('setting hasMove true case 2')
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
            // return true;
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
          //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
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
            // return true;
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
            // return true;
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
            //jump over
            console.log('setting hasMove true case 1')
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)' //yellow
            console.log(
              'this should be yellow:' +
                document.getElementById(this.divLocation - 14).style.background
            )
            console.log('im here1')
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
            console.log('setting hasMove true case 2')
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countBlackPiece++
          }
        }

        if (this.divLocation + 7 < 64) {
          //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
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
            // return true;
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
            // return true;
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
            //jump over
            console.log('setting hasMove true case 1')
            document.getElementById(this.divLocation - 14).style.background =
              'rgb(255, 255, 0)' //yellow
            console.log(
              'this should be yellow:' +
                document.getElementById(this.divLocation - 14).style.background
            )
            console.log('im here1')
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
            console.log('setting hasMove true case 2')
            document.getElementById(this.divLocation - 18).style.background =
              'rgb(255, 255, 0)'
            this.hasMoves = true
            countRedPiece++
          }
        }

        if (this.divLocation + 7 < 64) {
          //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
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
            // return true;
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
            // return true;
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

  showPossibleMoves () {
    //both changes certain divs to yellow that would be possible moves as well as returns true or false if there are possible moves
    this.hasMoves = false
    let countBlackPiece = 0
    let countRedPiece = 0
    console.log(this.kingStatus)
    if (this.kingStatus === false) {
      if (this.color === 'black') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] === null &&
            divList[this.divLocation - 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 7).style.background =
              'rgb(255, 255, 0)'
            console.log('first')
            this.hasMoves = true
            countBlackPiece++
            // return true;
          }

          // debugger;
          //gameArray[this.divLocation-7] !== null && ((gameArray[this.divLocation-7].color !== 'black') || (gameArray[this.divLocation-7].color === undefined)) && gameArray[this.divLocation-14] === null && divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'){ //jump over

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
            console.log('second')
            this.hasMoves = true
            // return true;
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
            console.log('third')
            this.hasMoves = true
            countBlackPiece++
            // return true;
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
            console.log('fourth')
            this.hasMoves = true
            countBlackPiece++
            // return true;
          }
        }
        console.log(countBlackPiece, 'black piece count')
        if (countBlackPiece > 0) {
          return true
        } else {
          this.hasMoves = false
          return false
        }
      }

      if (this.color === 'red') {
        if (this.divLocation + 7 < 64) {
          if (
            gameArray[this.divLocation + 7] === null &&
            divList[this.divLocation + 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 7).style.background =
              'rgb(255, 255, 0)'
            console.log('fifth')
            this.hasMoves = true
            countRedPiece++
          }
          //in case it starts putting yellows on light colored squares add an and with this "&& divList[this.divLocation-14].style.background === 'rgb(205, 133, 63)'""
          if (
            gameArray[this.divLocation + 7] !== null &&
            gameArray[this.divLocation + 7].color !== 'red' &&
            gameArray[this.divLocation + 14] === null &&
            divList[this.divLocation + 14].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation + 14).style.background =
              'rgb(255, 255, 0)'
            console.log('sixth')
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
            console.log('seventh')
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
            console.log('eighth' + gameArray[this.divlocation + 9])
            console.log('eighth')
            this.hasMoves = true
            countRedPiece++
          }
        }
        console.log(countRedPiece, 'red piece count')
        if (countRedPiece > 0) {
          return true
        } else {
          this.hasMoves = false
          return false
        }
      } else {
        console.log('I should never be getting here')
        this.hasMoves = false
        return false
      }
    }
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
            console.log('first')
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
            console.log('second')
            this.hasMoves = true
            // return true;
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
            console.log('third')
            this.hasMoves = true
            countBlackPiece++
            // return true;
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
            console.log('fourth')
            this.hasMoves = true
            countBlackPiece++
            // return true;
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
      /////THIS IS WHERE THE RED KING GOES
      if (this.color === 'red') {
        if (this.divLocation - 7 >= 0) {
          if (
            gameArray[this.divLocation - 7] === null &&
            divList[this.divLocation - 7].style.background ===
              'rgb(205, 133, 63)'
          ) {
            document.getElementById(this.divLocation - 7).style.background =
              'rgb(255, 255, 0)'
            console.log('first')
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
            console.log('second')
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

  removePossibleMoves () {
    divList.forEach(element => {
      if (element.style.background === 'rgb(255, 255, 0)') {
        element.style.background = 'rgb(205, 133, 63)'
      }
    })
  }

  movePiece (idOfSquare) {
    let difference = Math.abs(idOfSquare - this.divLocation)
    console.log('difference, ' + difference)
    if (difference >= 14 && this.color === 'black') {
      if (this.kingStatus === false) {
        let pieceJumpedOver = divList[this.divLocation - difference / 2]
        pieceJumpedOver.firstChild.remove()
        let oldSpotOfPieceJumping = this.divLocation - difference / 2
        gameArray[oldSpotOfPieceJumping] = null
        console.log(gameArray)
        player1NumCaptured++
        addCapturedPiece(1)
        console.log('player 1 captured: ' + player1NumCaptured)
        checkWinner()
      }
      if (this.kingStatus === true) {
        if (idOfSquare - this.divLocation > 0) {
          let pieceJumpedOver = divList[this.divLocation + difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation + difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player1NumCaptured++
          addCapturedPiece(1)
          console.log('player 1 captured: ' + player1NumCaptured)
          checkWinner()
        }
        if (idOfSquare - this.divLocation < 0) {
          let pieceJumpedOver = divList[this.divLocation - difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation - difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player1NumCaptured++
          addCapturedPiece(1)
          console.log('player 1 captured: ' + player1NumCaptured)
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
        console.log('player 2 captured: ' + player2NumCaptured)
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
          console.log('player 2 captured: ' + player2NumCaptured)
          checkWinner()
        }
        if (idOfSquare - this.divLocation < 0) {
          let pieceJumpedOver = divList[this.divLocation - difference / 2]
          pieceJumpedOver.firstChild.remove()
          let oldSpotOfPieceJumping = this.divLocation - difference / 2
          gameArray[oldSpotOfPieceJumping] = null
          player2NumCaptured++
          addCapturedPiece(2)
          console.log('player 2 captured: ' + player2NumCaptured)
          checkWinner()
        }
      }
    }

    gameArray[this.divLocation] = null //removes the piece from the current div in the game array and replaces it with null
    let oldCircle = divList[this.divLocation]
    oldCircle.firstChild.remove() //actually removes the piece from the old div
    console.log('This is the this.color color: ' + this.color)
    this.divLocation = idOfSquare //change the location of the div for this object to the id of the div passed
    gameArray[this.divLocation] = new Piece(this.color, this.divLocation) //in the new position in the game array, add a new Piece object with the same color and new div location
    gameArray[this.divLocation].setKingStatus(this.kingStatus)
    this.renderPiece() //renders a piece in the new div with the new div location
    this.removePossibleMoves() //removes the yellow squares

    if (this.color === 'black' && this.divLocation <= 7) {
      this.kingStatus = true
      gameArray[this.divLocation].setKingStatus(true)
      console.log('we have changed the king status to true - black')
    }
    if (this.color === 'red' && this.divLocation >= 56) {
      this.kingStatus = true
      gameArray[this.divLocation].setKingStatus(true)
      console.log('we have changed the king status to true - red ')
    }

    return difference
  }

  //renderPiece
  renderPiece () {
    const divEl = document.getElementById(this.divLocation)
    const newCircle = document.createElement('div')
    if (this.color === 'red') {
      newCircle.setAttribute('class', 'circle')
      newCircle.setAttribute('id', this.divLocation)
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
    divEl.append(newCircle)
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
let gameArray = []
let playerTurn = 1
let player1NumCaptured = 0
let player2NumCaptured = 0
let doubleJumpCount = 0
let gameStatus = null //no winner
let starPosition = 1

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//event listeners

let desiredPiece = 0

boarder.addEventListener('click', function (cursor) {
  htmlEl = cursor.target //entire element clicked on
  let iD = parseInt(htmlEl.id) //id of the element clicked on
  let divClass = htmlEl.className //class of the element clicked on

  // if( playerTurn === 1.7 && htmlEl.style.background === 'rgb(255, 255, 0)'){
  //     console.log("in playerTurn = 1.7 click on yello...")

  //     let desiredSquare = divList[iD];
  //     let idOfSquare = parseInt(desiredSquare.id); //gives the id number of the square we want to move to
  //     desiredPiece.movePiece(idOfSquare);
  // }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //1 turn
  if (gameStatus === null) {
    if (playerTurn === 1 && gameStatus === null && divClass === 'square') {
      messageBoard.innerHTML = 'Please select the piece you would like to move'
    }
    if (playerTurn === 1 && gameStatus === null && divClass === 'circle') {
      if (htmlEl.style.background === 'black') {
        desiredPiece = gameArray[iD]
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.showPossibleMoves()
          playerTurn = 1.5
          //   messageBoard.innerHTML = ''
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else {
        messageBoard.innerHTML = 'Please select a black piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //1.5 turn

    if (
      playerTurn === 1.5 &&
      gameStatus === null &&
      htmlEl.style.background === 'rgb(255, 255, 0)'
    ) {
      let desiredSquare = divList[iD]
      let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
      let numberMoved = desiredPiece.movePiece(idOfSquare) //actually moving the piece
      //desiredPiece.removePossibleMoves();
      if (numberMoved >= 14) {
        playerTurn = 1.6
        // messageBoard.innerHTML = ''
      } else {
        playerTurn = 2
        changeStarPosition(2)
        // messageBoard.innerHTML = ''
      }
    }

    if (
      playerTurn === 1.5 &&
      gameStatus === null &&
      (htmlEl.style.background === 'red' || divClass === 'square')
    ) {
      messageBoard.innerHTML = 'Please select a yellow square'
    }
    if (playerTurn === 1.5 && gameStatus === null && divClass === 'circle') {
      //if they are choosing another black it should switch to that piece
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
    //1.6 Turn

    if (playerTurn === 1.6) {
      if (desiredPiece.showDoubleJumpPosition() === true) {
        playerTurn = 1.7
        // messageBoard.innerHTML = ''
      } else {
        playerTurn = 2
        changeStarPosition(2)
        // messageBoard.innerHTML = ''
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //1.7 Turn

    if (playerTurn === 1.7) {
      if (htmlEl.style.background !== 'rgb(255, 255, 0)') {
        messageBoard.innerHTML = 'Please select a yellow square'
        return
      }
      if (htmlEl.style.background === 'rgb(255, 255, 0)') {
        console.log('in playerTurn = 1.7, got click on yellow...')

        let desiredSquare = divList[iD]
        let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
        desiredPiece.movePiece(idOfSquare)
        desiredPiece.showDoubleJumpPosition()
        if (desiredPiece.getHasMoves() === true) {
          playerTurn = 1.6
          //   messageBoard.innerHTML = ''
        } else {
          playerTurn = 2
          changeStarPosition(2)
          //   messageBoard.innerHTML = ''
        }
      } else if (
        htmlEl.style.background !== 'rgb(255, 255, 0)' &&
        desiredPiece.getHasMoves() === true
      ) {
        messageBoard.innerHTML = 'Please select a yellow square'
      } else {
        playerTurn = 2
        changeStarPosition(2)
        // messageBoard.innerHTML = ''
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Turn 2

    if (
      playerTurn === 2 &&
      gameStatus === null &&
      divClass === 'square' &&
      (htmlEl.style.background === 'rgb(205, 133, 63)' ||
        htmlEl.style.background === 'rgb(255, 235, 205)')
    ) {
      console.log(htmlEl.style.background)
      messageBoard.innerHTML = 'Please select the piece you would like to move'
    }

    if (playerTurn === 2 && gameStatus === null && divClass === 'circle') {
      if (htmlEl.style.background === 'red') {
        desiredPiece = gameArray[iD]
        if (desiredPiece.showPossibleMoves() === true) {
          desiredPiece.showPossibleMoves()
          playerTurn = 2.5
          //   messageBoard.innerHTML = ''
        } else {
          messageBoard.innerHTML =
            'Please select a piece with possible moves available (possible moves will appear yellow)'
        }
      } else {
        messageBoard.innerHTML = 'Please select a red piece'
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //2.5 turn

    if (
      playerTurn === 2.5 &&
      gameStatus === null &&
      htmlEl.style.background === 'rgb(255, 255, 0)'
    ) {
      let desiredSquare = divList[iD]
      let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
      let numberMoved = desiredPiece.movePiece(idOfSquare)
      if (numberMoved >= 14) {
        playerTurn = 2.6
        // messageBoard.innerHTML = ''
      } else {
        playerTurn = 1
        changeStarPosition(1)
        messageBoard.innerHTML =
          'Please select the piece you would like to move'
      }
    }

    if (
      playerTurn === 2.5 &&
      gameStatus === null &&
      (htmlEl.style.background === 'black' || divClass === 'square')
    ) {
      messageBoard.innerHTML = 'Please select a yellow square'
    }
    if (playerTurn === 2.5 && gameStatus === null && divClass === 'circle') {
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
    //2.6 Turn

    if (playerTurn === 2.6) {
      // console.log(gameArray);
      // let George = gameArray[desiredPiece.divLocation];
      // console.log(George);
      // console.log(George.showDoubleJumpPosition());
      // console.log("get has move: ", desiredPiece.getHasMoves());
      if (desiredPiece.showDoubleJumpPosition() === true) {
        console.log('setting player turn to 2.7...')
        playerTurn = 2.7
        // messageBoard.innerHTML = ''
      } else {
        playerTurn = 1
        changeStarPosition(1)
        console.log('on to the next person! ')
        // messageBoard.innerHTML = ''
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //2.7 Turn
    if (playerTurn === 2.7) {
      if (htmlEl.style.background !== 'rgb(255, 255, 0)') {
        messageBoard.innerHTML = 'Please select a yellow square'
        return
      }
      if (htmlEl.style.background === 'rgb(255, 255, 0)') {
        console.log('in playerTurn = 1.7, got click on yellow...')

        let desiredSquare = divList[iD]
        let idOfSquare = parseInt(desiredSquare.id) //gives the id number of the square we want to move to
        desiredPiece.movePiece(idOfSquare)
        desiredPiece.showDoubleJumpPosition()
        if (desiredPiece.getHasMoves() === true) {
          console.log('setting player turn to 2.6, before 2.7...')
          playerTurn = 2.6
          //   messageBoard.innerHTML = ''
        } else {
          console.log('setting player turn to 1, before 2.7...')

          playerTurn = 1
          changeStarPosition(1)
          //   messageBoard.innerHTML = ''
        }
      } else if (
        htmlEl.style.background !== 'rgb(255, 255, 0)' &&
        desiredPiece.getHasMoves() === true
      ) {
        messageBoard.innerHTML = 'Please select a yellow square'
      } else {
        playerTurn = 1
        changeStarPosition(1)
        // messageBoard.innerHTML = ''
      }
    }
  }
})

//return html element clicked on https://stackoverflow.com/questions/42372757/get-element-within-clicked-pixel
resetButton.addEventListener('click', init)

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

function getElementFromClick (cursor) {
  htmlEl = cursor.target
  // console.log(htmlEl);
  return htmlEl
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

  console.log(divList[39].style.background)

  divList.forEach(element => {
    if (element.style.background === 'rgb(255, 255, 0)') {
      console.log('there is at least one yellow')
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
  //   gameArray.forEach(element => {
  //     if (element.style.color === 'black') {
  //       element.showPossibleMoves()
  //       if (element.hasMoves === true) {
  //         blackPiecesWithMovesLeft++
  //       }
  //     }
  //   })
  //   gameArray.forEach(element => {
  //     if (element.style.color === 'red') {
  //       element.showPossibleMoves()
  //       if (element.hasMoves === true) {
  //         redPiecesWithMovesLeft++
  //       }
  //     }
  //   })
  //   if (blackPiecesWithMovesLeft === 0) {
  //     messageBoard.innerHTML = "Congratulations Player 2 - You've Won!"
  //     messageBoard.style.fontSize = '30px'
  //     messageBoard.style.color = 'green'
  //   }
  //   if (redPiecesWithMovesLeft === 0) {
  //     messageBoard.innerHTML = "Congratulations Player 1 - You've Won!"
  //     messageBoard.style.fontSize = '30px'
  //     messageBoard.style.color = 'green'
  //   }
  // }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rest of game logic
