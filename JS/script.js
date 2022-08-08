let boarder = document.querySelector('.boarder');
let colorCount = 1;


for (i = 1; i <= 64; i++){
    let div = document.createElement("div");
    // button.innerHTML = `Do Something ${i}`;
    div.setAttribute("class", `div ${i}`);

    if (colorCount % 2 === 1){
        div.style.background = '#FFEBCD';
        colorCount++;
        // console.log(colorCount);
    }
    else{
        div.style.background = '#CD853F';
        colorCount++;
    }

    boarder.appendChild(div);
}