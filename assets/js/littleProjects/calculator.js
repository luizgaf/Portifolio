const mainInput = document.getElementById('calc-screen-input');
const prevInput = document.getElementById('previous-screen');
let firstValue = 0, operationType = 0, opConcluded = 0;

function actionButton(buttonValue) {
    if (opConcluded) clearInput();
    mainInput.value += buttonValue; 
    opConcluded = 0;
}

function operation(type) {
    if (opConcluded) opConcluded = 0;
    firstValue = parseFloat(mainInput.value) || 0;
    operationType = type;
    prevInput.value = `${firstValue} ${getOperationSymbol(type)}`;
    mainInput.value = '';
}

function equalButton() {
    const secondValue = parseFloat(mainInput.value) || 0;
    let finalResult;

    switch (operationType) {
        case 1: finalResult = firstValue + secondValue; break;
        case 2: finalResult = firstValue - secondValue; break;
        case 3: finalResult = firstValue * secondValue; break;
        case 4: finalResult = firstValue / secondValue; break;
        default: return;
    }

    opConcluded = 1;
    prevInput.value += secondValue;
    mainInput.value = Number.isInteger(finalResult) ? finalResult : parseFloat(finalResult.toFixed(4)).toString();;
}

function clearInput() {
    mainInput.value = '';
    prevInput.value = '';
    firstValue = 0;
    operationType = 0;
}

function dotInput() {
    if (!mainInput.value.includes('.')) {
        mainInput.value += '.';
    }
}

function getOperationSymbol(type) {
    switch (type) {
        case 1: return '+';
        case 2: return '-';
        case 3: return '×';
        case 4: return '÷';
        default: return '';
    }
}

function factorial() {
    let number = parseInt(mainInput.value);
    if (number < 0) {
        mainInput.value = 'Erro'; // Fatorial de números negativos não é permitido
        return;
    }
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    mainInput.value = result;
}

function percentage() {
    let value = parseFloat(mainInput.value);
    mainInput.value = (value / 100).toString();
}