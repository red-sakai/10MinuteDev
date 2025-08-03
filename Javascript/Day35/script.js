// Base class - Animal
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
        return `${this.name} spoke`;
    }

    eat(food) {
        this.energy += 10;
        console.log(`${this.name} eats ${food} and gains energy`);
        console.log(`Energy level: ${this.energy}`);
    }

    sleep() {
        this.energy += 20;
        console.log(`${this.name} is sleeping...`);
        console.log(`Energy restored to: ${this.energy}`);
    }

    getInfo() {
        return `${this.name} is a ${this.species}`;
    }
}

// Subclass - Dog extends Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog'); // Call parent constructor
        this.breed = breed;
        this.tricks = [];
    }

    // Override speak method - extends parent functionality
    speak() {
        super.speak(); // Call parent method first
        console.log(`${this.name} barks: Woof! Woof!`);
        return `${this.name} barked`;
    }

    // Override eat method - adds dog-specific behavior
    eat(food) {
        console.log(`${this.name} wags tail excitedly!`);
        super.eat(food); // Call parent method
        
        // Add dog-specific behavior
        if (food === 'bone') {
            this.energy += 5; // Extra energy for bones
            console.log(`Extra energy from bone! Total energy: ${this.energy}`);
        }
    }

    // Override sleep method - completely different behavior
    sleep() {
        console.log(`${this.name} finds a cozy spot...`);
        super.sleep(); // Call parent method
        console.log(`${this.name} dreams of chasing squirrels`);
    }

    // Override getInfo method - extends parent info
    getInfo() {
        const basicInfo = super.getInfo(); // Get parent info
        return `${basicInfo}, breed: ${this.breed}`;
    }

    // Dog-specific methods
    learnTrick(trick) {
        this.tricks.push(trick);
        console.log(`${this.name} learned: ${trick}`);
    }

    performTrick() {
        if (this.tricks.length > 0) {
            const trick = this.tricks[Math.floor(Math.random() * this.tricks.length)];
            console.log(`${this.name} performs: ${trick}`);
        } else {
            console.log(`${this.name} doesn't know any tricks yet`);
        }
    }
}

// Subclass - Cat extends Animal
class Cat extends Animal {
    constructor(name, indoor = true) {
        super(name, 'Cat');
        this.indoor = indoor;
        this.lives = 9;
    }

    // Override speak method - different implementation
    speak() {
        const result = super.speak(); // Call parent method
        console.log(`${this.name} meows: Meow! Purr...`);
        return result + ' and meowed';
    }

    // Override sleep method - cats sleep more
    sleep() {
        console.log(`${this.name} curls up in a sunny spot...`);
        super.sleep(); // Call parent method
        this.energy += 10; // Cats get extra energy from sleeping
        console.log(`Cats love sleeping! Final energy: ${this.energy}`);
    }

    // Override getInfo with cat-specific details
    getInfo() {
        const basicInfo = super.getInfo();
        return `${basicInfo}, ${this.indoor ? 'indoor' : 'outdoor'} cat with ${this.lives} lives`;
    }

    // Cat-specific method
    climb() {
        if (this.energy > 20) {
            this.energy -= 20;
            console.log(`${this.name} climbs gracefully. Energy: ${this.energy}`);
        } else {
            console.log(`${this.name} is too tired to climb`);
        }
    }
}

// Example usage
console.log('=== Creating Animals ===');
const genericAnimal = new Animal('Generic', 'Unknown');
const myDog = new Dog('Buddy', 'Golden Retriever');
const myCat = new Cat('Whiskers', true);

console.log('\n=== Animal Info ===');
console.log(genericAnimal.getInfo());
console.log(myDog.getInfo());
console.log(myCat.getInfo());

console.log('\n=== Testing Method Overriding ===');

console.log('\n--- Generic Animal ---');
genericAnimal.speak();
genericAnimal.eat('food');

console.log('\n--- Dog (Extended Behavior) ---');
myDog.speak(); // Calls super.speak() then adds barking
myDog.eat('bone'); // Calls super.eat() then adds bone bonus
myDog.learnTrick('sit');
myDog.learnTrick('roll over');
myDog.performTrick();

console.log('\n--- Cat (Modified Behavior) ---');
myCat.speak(); // Calls super.speak() then adds meowing
myCat.sleep(); // Calls super.sleep() then adds extra energy
myCat.climb();

console.log('\n=== Demonstrating super in Different Scenarios ===');

console.log('\n--- Before sleep (Dog) ---');
console.log(`${myDog.name} energy: ${myDog.energy}`);
myDog.sleep(); // Shows how super.sleep() is called within override

console.log('\n--- Before sleep (Cat) ---');
console.log(`${myCat.name} energy: ${myCat.energy}`);
myCat.sleep(); // Shows different override behavior