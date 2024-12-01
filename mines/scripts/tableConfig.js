let bombCoords;

function loadOptions(){
    const gridInput = document.getElementById("grid-side");

    for(let i = 2; i <= 30; i++){
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      gridInput.appendChild(option);
      if(i == 7){
        option.selected = true;
      }
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

function clickVerifier() {
    const cells = document.querySelectorAll(".bombCell");

    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            let x = this.getAttribute("data-x");
            let y = this.getAttribute("data-y");

            const cellCord = `${x} ${y}`;
            const side = parseInt(document.getElementById("grid-side").value, 10);

            // Modo "Flag" - Adiciona ou remove bandeiras
            if (isFlagMode) {
                if (cell.classList.contains("revealed")) return; // Não marca células já reveladas
                if (cell.classList.contains("flagged")) {
                    cell.classList.remove("flagged");
                    cell.textContent = ""; // Remove bandeira
                } else {
                    cell.classList.add("flagged");
                    cell.textContent = "🚩"; // Adiciona bandeira
                }
                return;
            }

            // Modo "Click" - Revela células
            if (isClickMode) {
                if (cell.classList.contains("flagged")) {
                    // Remove a bandeira e continua com a revelação
                    cell.classList.remove("flagged");
                    cell.textContent = ""; // Remove bandeira visualmente
                }

                if (bombCoords.includes(cellCord)) {
                    // Explodir bomba
                    cell.classList.add("bomb");
                    cell.textContent = "💣"; // Mostra bomba
                    cell.style.backgroundColor = "red";
                    alert("Você perdeu!"); // Mensagem de explosão
                } else {
                    // Revela célula segura
                    revealCell(this, x, y, side);
                }
            }
        });
    });
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

let isFlagMode = false;
let isClickMode = true;

function revealCell(cell, x, y, side, isBomb) {
    // Se já foi revelada, ignore
    if (cell.classList.contains("revealed")) return;

    // Modo "bandeira"
    if (isFlagMode) {
        if (cell.classList.contains("flagged")) {
            cell.classList.remove("flagged");
            cell.textContent = ""; // Remove símbolo da bandeira
        } else {
            cell.classList.add("flagged");
            cell.textContent = "🚩"; // Adiciona símbolo da bandeira
        }
        return; // Não revela a célula
    }

    // Modo "click"
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

function toggleButtonMode(activeId, inactiveId) {
    const activeButton = document.getElementById(activeId);
    const inactiveButton = document.getElementById(inactiveId);

    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');

    if (activeId === "flag-button") {
        isFlagMode = true;
        isClickMode = false;
    } else {
        isFlagMode = false;
        isClickMode = true;
    }

    activeButton.style.backgroundColor = "gray"; 
    inactiveButton.style.backgroundColor = "#ccc";
}


loadOptions();
boardBuilder();