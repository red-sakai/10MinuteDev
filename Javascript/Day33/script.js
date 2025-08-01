class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    // Getter for name - controls how name is accessed
    get name() {
        return this._name.charAt(0).toUpperCase() + this._name.slice(1);
    }

    // Setter for name - validates input
    set name(value) {
        if (typeof value !== 'string' || value.length < 2) {
            throw new Error('Name must be a string with at least 2 characters');
        }
        this._name = value.toLowerCase();
    }

    // Getter for age - controls how age is accessed
    get age() {
        return this._age;
    }

    // Setter for age - validates input
    set age(value) {
        if (typeof value !== 'number' || value < 0 || value > 150) {
            throw new Error('Age must be a number between 0 and 150');
        }
        this._age = value;
    }

    // Additional getter for read-only computed property
    get info() {
        return `${this.name} is ${this.age} years old`;
    }
}

// Example usage
const person = new Person('john', 25);

console.log('Initial state:');
console.log('Name:', person.name); // "John" (capitalized by getter)
console.log('Age:', person.age);   // 25
console.log('Info:', person.info); // "John is 25 years old"

// Using setters with validation
try {
    person.name = 'alice';
    person.age = 30;
    console.log('\nAfter valid updates:');
    console.log('Name:', person.name); // "Alice"
    console.log('Age:', person.age);   // 30
} catch (error) {
    console.error('Error:', error.message);
}

// Demonstrating validation errors
try {
    person.name = 'a'; // Too short
} catch (error) {
    console.error('\nValidation error:', error.message);
}

try {
    person.age = -5; // Invalid age
} catch (error) {
    console.error('Validation error:', error.message);
}
