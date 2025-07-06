// while loop
let username = prompt("What is your name?")

while(username === "" || username === null) {
    username = prompt("What is your name?")
}

document.getElementById("name").innerHTML = `Hello ${username}`
console.log(`Hello ${username}`)

// for loop
