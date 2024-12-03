let bombAmmount, flagAmmount, flaggedMarked, bombCoords, cells, lost, cellsClean, elapsedTime;

function boardBuilder(){
    let side = parseInt(document.getElementById("grid-side").value, 10);
    let freq = parseInt(document.getElementById("bomb-frequency").value, 10);

    bombAmmount = getBombFrequency(side, freq);
    bombCoords = bombCoord(side, bombAmmount);
    flagAmmount = 0;
    flaggedMarked = 0;

    lost = false;
    cellsClean = (side*side) - bombAmmount;
    
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

            cell.style.backgroundColor = "#b0b0b0";

            const buttonSize = 100 / side; 

            table.appendChild(cell);
        }
    }
    elapsedTime = Date.now();
    gameMineswapper();
    cells = document.querySelectorAll(".bombCell");
}

function gameMineswapper() {
    const cells = document.querySelectorAll(".bombCell");
    const bombQtyLabel = document.getElementById("bomb-qty");
    const flagQtyLabel = document.getElementById("flag-qty");
    bombQtyLabel.textContent = bombAmmount;
    flagQtyLabel.textContent = flagAmmount;

    cellActionListener(cells);
}

function getBombFrequency(side, freq){
    const bombAmmt = Math.pow(side, 2) * (freq/100);

    if((bombAmmt - Math.floor(bombAmmt)) >= 0.1){
        return (Math.floor(bombAmmt) + 1);
    }
    else{
        return Math.floor(bombAmmt);
    }
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

function getCellCord(cell){
    let x = cell.getAttribute("data-x");
    let y = cell.getAttribute("data-y");

    return `${x} ${y}`;
}

function cellActionListener(cells){
    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            let x = this.getAttribute("data-x");
            let y = this.getAttribute("data-y");

            const cellCord = `${x} ${y}`;
            const side = parseInt(document.getElementById("grid-side").value, 10);

            if (isFlagMode) {
                if (cell.classList.contains("revealed")) return; 
                if (cell.classList.contains("flagged")) {
                    cell.classList.remove("flagged");
                    if(cell.textContent == "🚩"){
                        flaggedMarked--;
                    }
                    cell.textContent = ""; // remove bandeira   
                    flagAmmount --;
                } else {
                    cell.classList.add("flagged");
                    if(flaggedMarked >= bombAmmount){
                        cell.textContent = "❔";
                    }
                    else{
                        cell.textContent = "🚩";
                        flaggedMarked++;
                    }
                    flagAmmount ++;
                }
                flagQtyLabel.textContent = flagAmmount;
                return;
            }

            // revela celulas
            if (isClickMode) {
                if (cell.classList.contains("flagged")) {
                    //remove bandeira e clica
                    cell.classList.remove("flagged");
                    cell.textContent = ""; 
                }

                if (bombCoords.includes(cellCord)) {
                    // Explodir bomba
                    cell.classList.add("bomb");
                    cell.textContent = "💣"; // Mostra bomba
                    cell.style.backgroundColor = "red";
                    alert("KABOOM! Você perdeu!");
                    lost = true;
                    showBombs(); 
                } else {
                    revealCell(this, x, y, side);
                    verifyWin();
                }
            }
        });
    });
}

function showBombs(){
    for(const cell of cells){
        let x = cell.getAttribute("data-x");
        let y = cell.getAttribute("data-y");
        const cellCord = `${x} ${y}`;

        if(bombCoords.includes(cellCord)){
            cell.classList.add("bomb");
            cell.textContent = "💣"; 
            cell.style.backgroundColor = "red";
        }
    }
}

function countAdjacentBombs(x, y, side) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = parseInt(x, 10) + i;
            const newY = parseInt(y, 10) + j;

            if (newX >= 0 && newX < side && newY >= 0 && newY < side) {
                const cellCord = `${newX} ${newY}`;
                if (bombCoords.includes(cellCord)) {
                    count++;
                }
            }
        }
    }
    return count;
}

function verifyWin(){
    let n = 0;
    if(lost == false){
        for(const cell of cells ){
            if(cell.classList.contains("revealed")){
                n++;
            }
        }
        if(n == cellsClean){
            alert(`You Win! :) Elapsed Time = ${formatTime(Date.now() - elapsedTime)}`);
        }
    }
}

let isFlagMode = false;
let isClickMode = true;

function revealCell(cell, x, y, side, isBomb) {

    if (cell.classList.contains("revealed")) return;

    if (isFlagMode) {
        if (cell.classList.contains("flagged")) {
            cell.classList.remove("flagged");
            cell.textContent = ""; 
        } else {
            cell.classList.add("flagged");
            cell.textContent = "🚩";
        }
        return;
    }

    if (isClickMode) {
        // Se a célula está marcada com uma bandeira, não revelar
        if (cell.classList.contains("flagged")) return;

        // Revelar a célula
        cell.classList.add("revealed");

        if (isBomb) {
            // Explodir bomba
            cell.textContent = "💣"; // Símbolo da bomba
            cell.style.backgroundColor = "red";
            alert("Você perdeu!"); // Alerta de explosão
        } else {
            // Contar bombas adjacentes
            const bombsNearby = countAdjacentBombs(x, y, side);
            if (bombsNearby > 0) {
                cell.textContent = bombsNearby;
                cell.classList.add("number");
                cell.style.backgroundColor = "lightgray";
            } else {
                // Propagar revelação para células adjacentes se não houver bombas próximas
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newX = parseInt(x, 10) + i;
                        const newY = parseInt(y, 10) + j;

                        if (newX >= 0 && newX < side && newY >= 0 && newY < side) {
                            const adjacentCell = document.querySelector(
                                `[data-x='${newX}'][data-y='${newY}']`
                                
                            );
                            cell.style.backgroundColor = "white";
                            if (adjacentCell) {
                                revealCell(adjacentCell, newX, newY, side, false); // Não revele bomba nas adjacências
                            }
                        }
                    }
                }
            }
        }
    }
}