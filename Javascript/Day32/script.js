class Person {
    // Constructor to initialize properties
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
        this._id = Math.floor(Math.random() * 10000); // private-like property
        this.hobbies = [];
    }

    // Getter methods
    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }

    getId() {
        return this._id;
    }

    // Setter methods
    setName(newName) {
        this.name = newName;
    }

    setAge(newAge) {
        if (newAge > 0) {
            this.age = newAge;
        } else {
            console.log("Age must be positive");
        }
    }

    setEmail(newEmail) {
        if (newEmail.includes('@')) {
            this.email = newEmail;
        } else {
            console.log("Invalid email format");
        }
    }

    // Methods that modify properties
    addHobby(hobby) {
        this.hobbies.push(hobby);
    }

    removeHobby(hobby) {
        const index = this.hobbies.indexOf(hobby);
        if (index > -1) {
            this.hobbies.splice(index, 1);
        }
    }

    celebrateBirthday() {
        this.age++;
        console.log(`Happy Birthday! ${this.name} is now ${this.age} years old.`);
    }

    // Display method
    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Email: ${this.email}`);
        console.log(`ID: ${this._id}`);
        console.log(`Hobbies: ${this.hobbies.join(', ') || 'None'}`);
    }
}

// Creating instances and practicing access/modification
console.log("=== Creating Person Objects ===");
const person1 = new Person("Alice", 25, "alice@email.com");
const person2 = new Person("Bob", 30, "bob@email.com");

// Accessing properties directly
console.log("\n=== Direct Property Access ===");
console.log("Person1 name:", person1.name);
console.log("Person1 age:", person1.age);

// Using getter methods
console.log("\n=== Using Getter Methods ===");
console.log("Person1 name:", person1.getName());
console.log("Person1 ID:", person1.getId());

// Modifying properties directly
console.log("\n=== Direct Property Modification ===");
person1.name = "Alice Smith";
person1.age = 26;
console.log("Updated name:", person1.name);
console.log("Updated age:", person1.age);

// Using setter methods
console.log("\n=== Using Setter Methods ===");
person2.setName("Robert");
person2.setAge(31);
person2.setEmail("robert@newdomain.com");

// Adding hobbies
console.log("\n=== Adding Hobbies ===");
person1.addHobby("Reading");
person1.addHobby("Swimming");
person1.addHobby("Coding");

person2.addHobby("Gaming");
person2.addHobby("Cooking");

// Using methods that modify properties
console.log("\n=== Birthday Celebration ===");
person1.celebrateBirthday();

// Removing a hobby
console.log("\n=== Removing Hobby ===");
person1.removeHobby("Swimming");

// Testing validation in setters
console.log("\n=== Testing Validation ===");
person1.setAge(-5); // Should show error
person1.setEmail("invalid-email"); // Should show error

// Final display
console.log("\n=== Final Information ===");
console.log("Person 1:");
person1.displayInfo();

console.log("\nPerson 2:");
person2.displayInfo();

// Demonstrating property enumeration
console.log("\n=== Property Enumeration ===");
console.log("Person1 properties:");
for (let prop in person1) {
    if (person1.hasOwnProperty(prop)) {
        console.log(`${prop}: ${person1[prop]}`);
    }
}
