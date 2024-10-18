function setClock(i, customHourHand) {
    // Seleciona os ponteiros
    const hourHand = document.querySelector(customHourHand);
    const minuteHand = document.querySelector(customHourHand).parentElement.querySelector('.minute-hand');
    const secondHand = document.querySelector(customHourHand).parentElement.querySelector('.second-hand');
 
    // Obtém a hora atual
    let now = new Date();
    
    // Calcula o horário GMT
    let gmtTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    
    // Ajusta o horário conforme o valor de 'i' (para fuso horário diferente)
    gmtTime.setHours(gmtTime.getHours() + i);

    // Extrai horas, minutos e segundos
    let hours = gmtTime.getHours();
    let minutes = gmtTime.getMinutes();
    let seconds = gmtTime.getSeconds();

    // Calcula o ângulo de rotação para cada ponteiro
    const secondsDeg = ((seconds / 60) * 360) + 90;
    const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    ifDayNight(hours, customHourHand.slice(1)); 

    // Aplica a rotação nos ponteiros
    secondHand.style.transform = `rotate(${secondsDeg}deg)`;
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

function loopClock(i, customHourHand) {
    setClock(i, customHourHand);
    // Atualiza o relógio a cada 10 milissegundos
    setInterval(() => setClock(i, customHourHand), 10);
}

function ifDayNight(i, chhand) {
    if (i >= 18 || i < 6) {
        document.getElementById(chhand).style.backgroundColor = 'blue'; 
    } else {
        document.getElementById(chhand).style.backgroundColor = 'orange'; 
    }
}




