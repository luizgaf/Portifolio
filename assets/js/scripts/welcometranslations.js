const translations = [
    "</welcome>",   // Inglês
    "</bienvenido>",// Espanhol
    "</bem-vindo>", // Português
    "</willkommen>",// Alemão
    "</bienvenue>", // Francês
    "</benvenuto>"  // Italiano
];

let currentIndex = 0;
let currentText = '';
let letterIndex = 0;

function typeText() {
    const textElement = document.getElementById('greeting');
    if (letterIndex < translations[currentIndex].length) {
        currentText += translations[currentIndex].charAt(letterIndex);
        textElement.innerText = currentText;
        letterIndex++;
        setTimeout(typeText, 80); // Typing speed
    } else {
        setTimeout(updateGreeting, 3000); // Pause before changing language
    }
}

function updateGreeting() {
    currentText = '';
    letterIndex = 0;
    currentIndex = (currentIndex + 1) % translations.length;
    typeText(); // Start typing the new text
}

