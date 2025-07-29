// Person class definition
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Method to introduce the person
    introduce() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    // Method to get age
    getAge() {
        return this.age;
    }

    // Method to celebrate birthday
    celebrateBirthday() {
        this.age++;
        return `Happy birthday! ${this.name} is now ${this.age} years old.`;
    }

    // Method to check if person is adult
    isAdult() {
        return this.age >= 18;
    }
}

// Instantiate objects
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 17);
const person3 = new Person("Charlie", 30);

// Demonstrate methods
console.log(person1.introduce());
console.log(person2.introduce());
console.log(person3.introduce());

console.log(`${person1.name} is ${person1.isAdult() ? 'an adult' : 'a minor'}`);
console.log(`${person2.name} is ${person2.isAdult() ? 'an adult' : 'a minor'}`);

console.log(person2.celebrateBirthday());
console.log(`${person2.name} is now ${person2.isAdult() ? 'an adult' : 'a minor'}`);

console.log(`Ages: ${person1.getAge()}, ${person2.getAge()}, ${person3.getAge()}`);
