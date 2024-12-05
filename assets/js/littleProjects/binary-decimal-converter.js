function binaryToDecimal(){
    let binaryBox = document.getElementById("binarybox");
    let decimalBox = document.getElementById("decimalbox");
    if(binaryBox.value === ""){
        decimalBox.value = "Insert Binary Num";
    }
    else{
        decimalBox.value = parseInt(binaryBox.value, 2);    
    }
}