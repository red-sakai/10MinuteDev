// prompt way: this way works but isn't ideal since it stops all js execution until user responds
// also it is old-fashioned

// let number = prompt("Give me a number: ")

// if (number < 0) {
//     console.log("That is a negative number!")
// } else if (number > 0) {
//     console.log("That is a positive number!")
// } else {
//     console.log("NaN")
// }

// professional way
document.getElementById("submit").onclick = function(){
    let number = document.getElementById("number").value;
    if (number < 0) {
        console.log("That is a negative number!")
    } else if (number > 0) {
        console.log("That is a positive number")
    } else if (number == 0) {
        console.log("That number is zero!")
    } else {
        console.log("NaN")
    }
}