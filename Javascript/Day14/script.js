document.getElementById("submit").onclick = function() {
    let words = document.getElementById("source").value;
    let arrayedWord = words.split(" ")
    let wordCount = arrayedWord.length;

    document.getElementById("result").innerHTML = `The total words are: ${wordCount}`
}