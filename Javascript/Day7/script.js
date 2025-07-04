document.getElementById("add").onclick = function (){
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);
    // isNaN keyword checks if the variable is not a number
    // || is the logical OR operator in conditional statements
    if (isNaN(number1) || isNaN(number2)) {
        console.log("Please input integers or floats only!")
    } else {
        console.log(`The answer is: ${number1 + number2}`)
    }
}

document.getElementById("subtract").onclick = function (){
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);
    if (isNaN(number1) || isNaN(number2)) {
        console.log("Please input integers or floats only!")
    } else {
        console.log(`The answer is: ${number1 - number2}`)
    }
}

document.getElementById("multiply").onclick = function (){
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);
    if (isNaN(number1) || isNaN(number2)) {
        console.log("Please input integers or floats only!")
    } else {
        console.log(`The answer is: ${number1 * number2}`)
    }
}

document.getElementById("divide").onclick = function (){
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);
    if (isNaN(number1) || isNaN(number2)) {
        console.log("Please input integers or floats only!")
    } else if (number2 == 0){
        console.log("ZeroDivisionError!")
    } else {
        console.log(`The answer is: ${number1 / number2}`)
    }
}
