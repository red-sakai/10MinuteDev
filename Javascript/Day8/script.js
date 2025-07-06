// while loop

// in this scenario it is better to use a do-while loop since a do will always run once until the while condition isn't satisfied,
// the do is like a finally block in exception handling, regardless of the result, it will always run once

// let username;

// while(username === "" || username === null) {
//     username = prompt("What is your name?")
// }

// document.getElementById("name").innerHTML = `Hello ${username}`
// console.log(`Hello ${username}`)

// do-while loop
do{
    username = prompt("What is your name?")
} while(username === "" || username === null)

document.getElementById("name").innerHTML = `Hello ${username}`
console.log(`Hello ${username}`)

// for loop
// for(declaration; condition; increment/decrement) {
//
//}
for(let i = 0; i <= 10; i++){
    console.log(i)
}