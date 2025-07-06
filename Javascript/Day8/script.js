let sum = 0;

document.getElementById("addButton").onclick = function() {
    let number = parseFloat(document.getElementById("numbersTypebox").value);
    sum += number;
    document.getElementById("numbersTypebox").value = "";
}

document.getElementById("doneButton").onclick = function() {
    document.getElementById("displayTotal").innerHTML = `The summation is: ${sum}`
}
