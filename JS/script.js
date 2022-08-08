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

class piece {
    constructor(color, kingStatus){
        this.color = color;
        this.kingStatus = false;
    }

    //getter

//     getPosition {

//     }

// }


// function returnClickPosition{



}

boarder.addEventListener('click', function(element) {
    // const position = element.getBoundingClientRect();
    const x1 = element.target;
    console.log(x1);
    
});



// let gameArray = [[null, ]];