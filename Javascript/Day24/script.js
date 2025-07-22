// Object to JSON string
let person = {
    name: "Alice",
    age: 25,
    hobbies: ["reading", "gaming"]
};
let jsonString = JSON.stringify(person);
console.log(jsonString); // '{"name":"Alice","age":25,"hobbies":["reading","gaming"]}'