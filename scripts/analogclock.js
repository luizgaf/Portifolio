function handAnimaOff(a, hour, minute, sec) {
    if (a == 0 && hour == false) {
        if (minute == true) {
            const elements = document.getElementsByClassName('minute-hand');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.transition = 'none'; 
            }
        } else {
            const elements = document.getElementsByClassName('second-hand');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.transition = 'none';
            }
        }
    }
    if (hour == true && a <= 23) {
        const elements = document.getElementsByClassName('hour-hand');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transition = 'none';
        }
    } else {
        if (a < 59 && a > 0 && hour == false) {
            if (minute == true) {
                const elements = document.getElementsByClassName('minute-hand');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.transition = 'transform 0.4s ease-in-out';  
                }
            } else {
                const elements = document.getElementsByClassName('second-hand');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.transition = 'transform 0.4s ease-in-out';  
                }
            }
        } else {
            if ( a > 0 && hour == true && a < 23 ) {
                const elements = document.getElementsByClassName('hour-hand');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.transition = 'transform 0.4s ease-in-out';  
                }
            }
        }
    }
}


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


    handAnimaOff(seconds, false, false, true);
    handAnimaOff(hours, true, false, false);
    handAnimaOff(minutes, false, true, false);
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




