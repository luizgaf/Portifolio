
    var mainInput = document.getElementById('calc-screen-input');
    var prevInput = document.getElementById('previous-screen');
    var firstValue, operationtype, opconcluded, canDot;


    function actionButton(buttonValue) {
        if(opconcluded == 1)clearInput();
        mainInput.value += buttonValue; 
        opconcluded = 0;
    }

    function operation(type){
        if(opconcluded = 1)opconcluded = 0;
        operationtype = type;
        firstValue = parseFloat(mainInput.value);
        if(mainInput.value == ''){firstValue = 0; mainInput.value = 0;}
        prevInput.value = mainInput.value;
        mainInput.value = '';
        if(operationtype == 1){prevInput.value += ' + '; }
        if(operationtype == 4){prevInput.value += ' ÷ '; }
        if(operationtype == 3){prevInput.value += ' × '; }
        if(operationtype == 2){prevInput.value += ' - ';} 
    }


    function equalButton(){
        value = parseFloat(mainInput.value);
        if(operationtype == 1){prevInput.value += value; final = firstValue + value;}
        if(operationtype == 2){prevInput.value += value; final = firstValue - value;}
        if(operationtype == 3){prevInput.value += value; final = firstValue * value;}
        if(operationtype == 4){prevInput.value += value; final = firstValue / value;}
        opconcluded = 1;

        if(Number.isInteger(final))mainInput.value = final;
        else  mainInput.value = parseFloat(final.toFixed(4)).toString();
    }

    function clearInput(){
        mainInput.value = '';
        prevInput.value = '';
        firstValue = 0;
        operationtype = 0;
    }

    function dotInput(){
        if(!mainInput.value.includes('.')){
            mainInput.value += '.';
        }
    }

    

