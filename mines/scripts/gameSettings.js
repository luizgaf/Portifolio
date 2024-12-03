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

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10); // Centésimos de segundo

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}

loadOptions();
boardBuilder();