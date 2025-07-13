const person = {
    name: "Jhered",
    age: 19,
    aStudent: true,
    greeting: function(){console.log(`Hello my name is ${this.name}`)}
}

console.log(person.name);
console.log(person.age);
console.log(person.aStudent);
person.greeting();