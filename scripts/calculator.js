
var mainInput = document.getElementById('calc-screen-input');
var prevInput = document.getElementById('previous-screen');
var firstValue, secondValue, operationType, opConcluded;


    function actionButton(buttonValue) {
        if(opConcluded == 1)clearInput();
        mainInput.value += buttonValue; 
        opConcluded = 0;
    }

    function operation(type){
        if(opConcluded = 1)opConcluded = 0;
        operationType = type;
    
        firstValue = parseFloat(mainInput.value);
    
        if(mainInput.value == ''){
            firstValue = 0;
            mainInput.value = 0;
        }
    
        prevInput.value = mainInput.value;
        mainInput.value = '';
    
        switch(operationType){
            case 1:prevInput.value += ' + ';
                break;
            case 4:prevInput.value += ' ÷ ';
                break;
            case 3:prevInput.value += ' × ';
                break;
            case 2:{prevInput.value += ' - ';
                break;
            }
        }
    }


    function equalButton(){
        if(mainInput.value == '')secondValue = 0;
        else secondValue = parseFloat(mainInput.value);

        switch(operationType){
            case 1:{
                prevInput.value += secondValue; 
                final = firstValue + secondValue;}
                break;
            case 2:{
                prevInput.value += secondValue; 
                final = firstValue - secondValue;}
                break;
            case 3:{
                prevInput.value += secondValue; 
                final = firstValue * secondValue;}
                break;
            case 4:{
                prevInput.value += secondValue; 
                final = firstValue / secondValue;}
                break;
        }
        opConcluded = 1;

        if(Number.isInteger(final))mainInput.value = final;

        else
          mainInput.value = parseFloat(final.toFixed(4)).toString();
    }

    function clearInput(){
        mainInput.value = '';
        prevInput.value = '';
        firstValue = 0;
        operationType = 0;
    }

    function dotInput(){
        if(!mainInput.value.includes('.')){
            mainInput.value += '.';
        }
    }

    function factorial(value){
        var factorial;
        for(var i = value; i > 0; i--){
            factorial *= i;
        }
        return factorial;
    }

    function percent(value){
        return value/100;
    }

    

