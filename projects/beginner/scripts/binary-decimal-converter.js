let binaryBox = document.getElementById("binarybox");
let decimalBox = document.getElementById("decimalbox");

function divideNumberToDigits(number){
    return Array.from(number.toString()).map(Number);
}

function binaryToDecimal(binary){
    let binArr = divideNumberToDigits(binary);
    let sum = 0;

    for(let j = 0; j < binArr.length; j++){
        let i = binArr.length - 1 - j;
        sum += (Math.pow(2, i) * binArr[j]);
    }
    return sum;
}

function decimalToBinary(decimal){

}


