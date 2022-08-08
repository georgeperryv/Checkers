///////////////////////////////////////////////////////////////////
//Board set-up 

let boarder = document.querySelector('.boarder'); //graph boarder of board
let colorCount = 1; //counter for the color of the div


for (i = 1; i <= 64; i++){ //add 64 divs of alternating color
    let div = document.createElement("div");
    div.setAttribute("class", `div ${i}`);

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

///////////////////////////////////////////////////////////////////

     
    