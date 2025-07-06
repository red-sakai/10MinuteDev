let number = 0;
let numbers = 0;
let sum = numbers + number

document.getElementById("addButton").onclick = function() {
    let numbers = parseFloat(document.getElementById("numbersTypebox").value);
    let sum = numbers + number
}

document.getElementById("doneButton").onclick = function() {
    document.getElementById("displayTotal").innerHTML = `The summation is: ${sum}`
}
