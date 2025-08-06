// Base class
class Creature {
    constructor(name) {
        this.name = name;
    }
    
    introduce() {
        console.log(`Hi, I'm ${this.name}`);
    }
}

// Mixin for flying behavior
const FlyingMixin = {
    fly() {
        console.log(`${this.name} is flying through the sky!`);
    },
    
    land() {
        console.log(`${this.name} has landed safely.`);
    }
};

// Mixin for swimming behavior
const SwimmingMixin = {
    swim() {
        console.log(`${this.name} is swimming gracefully!`);
    },
    
    dive() {
        console.log(`${this.name} dives deep underwater.`);
    }
};

// Mixin for walking behavior
const WalkingMixin = {
    walk() {
        console.log(`${this.name} is walking on land.`);
    },
    
    run() {
        console.log(`${this.name} is running fast!`);
    }
};

// Mixin for magical abilities
const MagicalMixin = {
    castSpell(spell) {
        console.log(`${this.name} casts ${spell}!`);
    },
    
    teleport(location) {
        console.log(`${this.name} teleports to ${location}!`);
    }
};

// Helper function to apply mixins to a class
function applyMixins(targetClass, ...mixins) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(name => {
            if (name !== 'constructor') {
                targetClass.prototype[name] = mixin[name];
            }
        });
    });
}

// Create specialized classes by combining mixins
class Bird extends Creature {
    constructor(name, species) {
        super(name);
        this.species = species;
    }
}

class Fish extends Creature {
    constructor(name, species) {
        super(name);
        this.species = species;
    }
}

class Duck extends Creature {
    constructor(name) {
        super(name);
        this.species = 'Duck';
    }
}

class Dragon extends Creature {
    constructor(name) {
        super(name);
        this.species = 'Dragon';
    }
}

// Apply different combinations of mixins
applyMixins(Bird, FlyingMixin, WalkingMixin);
applyMixins(Fish, SwimmingMixin);
applyMixins(Duck, FlyingMixin, SwimmingMixin, WalkingMixin);
applyMixins(Dragon, FlyingMixin, WalkingMixin, MagicalMixin);

// Alternative approach using factory functions
function createCreatureWithMixins(name, ...mixins) {
    const creature = new Creature(name);
    
    mixins.forEach(mixin => {
        Object.assign(creature, mixin);
    });
    
    return creature;
}

// Demonstration
console.log('=== Mixin Composition Demo ===\n');

// Create instances
const eagle = new Bird('Eagle', 'Bald Eagle');
const salmon = new Fish('Salmon', 'Atlantic Salmon');
const mallard = new Duck('Mallard');
const smaug = new Dragon('Smaug');

// Demonstrate behaviors
eagle.introduce();
eagle.fly();
eagle.walk();
console.log();

salmon.introduce();
salmon.swim();
salmon.dive();
console.log();

mallard.introduce();
mallard.fly();
mallard.swim();
mallard.walk();
console.log();

smaug.introduce();
smaug.fly();
smaug.walk();
smaug.castSpell('Fire Breath');
smaug.teleport('Mountain Lair');
console.log();

// Factory function approach
const phoenix = createCreatureWithMixins('Phoenix', FlyingMixin, MagicalMixin);
phoenix.introduce();
phoenix.fly();
phoenix.castSpell('Rebirth');
console.log();

// Advanced mixin with state
const HealthMixin = {
    initHealth(maxHealth = 100) {
        this.health = maxHealth;
        this.maxHealth = maxHealth;
    },
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        console.log(`${this.name} takes ${amount} damage. Health: ${this.health}/${this.maxHealth}`);
    },
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        console.log(`${this.name} heals ${amount} HP. Health: ${this.health}/${this.maxHealth}`);
    }
};

// Create a warrior class with health
class Warrior extends Creature {
    constructor(name) {
        super(name);
        this.initHealth(150);
    }
}

applyMixins(Warrior, WalkingMixin, HealthMixin);

const knight = new Warrior('Sir Lancelot');
knight.introduce();
knight.walk();
knight.takeDamage(30);
knight.heal(20);
console.log();

console.log('=== Mixin Benefits ===');
console.log('1. More flexible than inheritance');
console.log('2. Avoid diamond problem');
console.log('3. Compose exactly the behavior you need');
console.log('4. Reusable across different class hierarchies');
