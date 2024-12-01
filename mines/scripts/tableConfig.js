let bombCoords;

function loadOptions(){
    const gridInput = document.getElementById("grid-side");

    for(let i = 2; i <= 30; i++){
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      gridInput.appendChild(option);
    }
}

function getBombFrequency(side, freq){
    const bombAmmount = Math.pow(side, 2) * (freq/100);

    if((bombAmmount - Math.floor(bombAmmount)) >= 0.1){
        return (Math.floor(bombAmmount) + 1);
    }
    else{
        return Math.floor(bombAmmount);
    }
}

function createMatrix(side){
    const matrix = [];
    for(let i = 0; i < side; i++){
        const row = [];
        for(let j = 0; j< side; j++){
            row.push(`${i} ${j}`);
        }
        matrix.push(row);
    }
    return matrix;
}

function bombCoord(side, freq){
    const coord = [];
    while(coord.length < freq){
        let x = Math.floor(Math.random() * side);
        let y = Math.floor(Math.random() * side);
        const newCord = `${x} ${y}`;
        
        if(!coord.includes(newCord)){
            coord.push(newCord);
        }   
    }

    return coord;
}

function boardBuilder(){
    let side = parseInt(document.getElementById("grid-side").value, 10);
    let freq = parseInt(document.getElementById("bomb-frequency").value, 10);

    let bombAmmount = getBombFrequency(side, freq);
    let gameBoard = createMatrix(side);
    bombCoords = bombCoord(side, bombAmmount);
    
    const table = document.getElementById("table-top");
    table.innerHTML = "";

    table.style.gridTemplateRows = `repeat(${side}, 1fr)`;
    table.style.gridTemplateColumns = `repeat(${side}, 1fr)`;

    for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
            const cell = document.createElement("button");
            cell.className = "bombCell";

            cell.setAttribute("data-x", i);
            cell.setAttribute("data-y", j);

            const buttonSize = 100 / side; 

            table.appendChild(cell);
        }
    }

    clickVerifier();
}

function clickVerifier(){
    const cells = document.querySelectorAll(".bombCell");

    cells.forEach(cell =>{
        cell.addEventListener("click", function(){
            let x = this.getAttribute("data-x");
            let y = this.getAttribute("data-y");

            const cellCord = `${x} ${y}`;
            if (bombCoords.includes(cellCord)) {
                console.log("Kaboom!");
                this.classList.add("bomb");
            } else {
                console.log("Safe!");
                this.classList.add("safe");
            }
        });
    });
}


loadOptions();
boardBuilder();