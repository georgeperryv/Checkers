///////////////////////////////////////////////////////////////////
//Board set-up 

let boarder = document.querySelector('.boarder'); //graph boarder of board
let colorCount = 1; //counter for the color of the div


for (i = 1; i <= 64; i++){ //add 64 divs of alternating color
    let div = document.createElement("div");
    div.setAttribute("id", `${i}`);

    if (colorCount % 9 === 0){
        console.log("mod 8 " + colorCount);
        colorCount++;
         
    }

    if (colorCount % 2 === 1){
        div.style.background = '#FFEBCD';
        console.log("mod 2 " + colorCount);
        colorCount++;
    
    }
    else{
        div.style.background = '#CD853F';
        console.log("nothing " + colorCount);
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



///////////////////////////////////////////////////////////////////

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
            newCircle.setAttribute("class", "red-piece");
            newCircle.style.background = "red";
            newCircle.style.width = "50px";
            newCircle.style.height = "50px";
            newCircle.style.borderRadius = "50%";
        }
        else if (this.color === 'black'){
            newCircle.setAttribute("class", "black-piece");
            newCircle.style.background = "black";
            newCircle.style.width = "50px";
            newCircle.style.height = "50px";
            newCircle.style.borderRadius = "50%";
        }
        if (this.kingStatus === true){
            newCircle.setAttribute("class", "king-piece");
            newCircle.style.background = "gold";
            newCircle.style.width = "50px";
            newCircle.style.height = "50px";
            newCircle.style.borderRadius = "50%";
        }
        divEl.append(newCircle);
    }



// function returnClickPosition{

}




boarder.addEventListener('click', getElementFromClick); //return html element clicked on https://stackoverflow.com/questions/42372757/get-element-within-clicked-pixel
    

function getElementFromClick(cursor){
    htmlEl  = cursor.target;
    console.log(htmlEl);
    return htmlEl;
   
}

let newPiece = new Piece('red', 5);
newPiece.renderPiece();
console.log(newPiece);




// let gameArray = [[null, ]];