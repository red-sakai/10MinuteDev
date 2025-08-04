// 1. Utility class with static methods
class MathUtils {
    // Static methods - can be called without creating an instance
    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }

    static isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
}

// 2. Class with static properties
class Config {
    // Static properties - shared across all instances
    static API_URL = "https://api.example.com";
    static VERSION = "1.0.0";
    static MAX_USERS = 1000;
    static THEMES = ["light", "dark", "auto"];

    // Static method to get configuration
    static getConfig() {
        return {
            apiUrl: this.API_URL,
            version: this.VERSION,
            maxUsers: this.MAX_USERS,
            themes: this.THEMES
        };
    }

    // Static method to update configuration
    static updateApiUrl(newUrl) {
        this.API_URL = newUrl;
    }
}

// 3. Class combining static and instance methods
class User {
    // Static property to keep track of all users
    static totalUsers = 0;
    static users = [];

    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.id = ++User.totalUsers;
        
        // Add to static users array
        User.users.push(this);
    }

    // Instance method
    getInfo() {
        return `User ${this.id}: ${this.name} (${this.email})`;
    }

    // Static method to get total user count
    static getTotalUsers() {
        return this.totalUsers;
    }

    // Static method to find user by email
    static findByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    // Static method to get all users
    static getAllUsers() {
        return this.users;
    }

    // Static method to reset users
    static resetUsers() {
        this.totalUsers = 0;
        this.users = [];
    }
}

// 4. Class demonstrating static validation methods
class Validator {
    // Static email validation
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Static password validation
    static isStrongPassword(password) {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /\d/.test(password);
    }

    // Static phone number validation
    static isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
}

// 5. Demo and Examples
console.log("=== Static Methods and Properties Demo ===\n");

// Using static methods without creating instances
console.log("1. MathUtils (Static Methods):");
console.log(`Add: ${MathUtils.add(5, 3)}`);
console.log(`Multiply: ${MathUtils.multiply(4, 7)}`);
console.log(`Factorial of 5: ${MathUtils.factorial(5)}`);
console.log(`Is 17 prime? ${MathUtils.isPrime(17)}`);
console.log();

// Using static properties
console.log("2. Config (Static Properties):");
console.log(`API URL: ${Config.API_URL}`);
console.log(`Version: ${Config.VERSION}`);
console.log(`Max Users: ${Config.MAX_USERS}`);
console.log("Full config:", Config.getConfig());
console.log();

// Modifying static properties
Config.updateApiUrl("https://new-api.example.com");
console.log(`Updated API URL: ${Config.API_URL}`);
console.log();

// Using static methods with instance creation
console.log("3. User (Static + Instance Methods):");
const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");
const user3 = new User("Charlie", "charlie@example.com");

console.log(`Total users: ${User.getTotalUsers()}`);
console.log("All users:", User.getAllUsers().map(u => u.name));

// Find user using static method
const foundUser = User.findByEmail("bob@example.com");
console.log(`Found user: ${foundUser ? foundUser.getInfo() : "Not found"}`);
console.log();

// Using static validation methods
console.log("4. Validator (Static Validation Methods):");
const testEmail = "user@example.com";
const testPassword = "MyPass123";
const testPhone = "+1-555-123-4567";

console.log(`Is "${testEmail}" valid email? ${Validator.isValidEmail(testEmail)}`);
console.log(`Is "${testPassword}" strong password? ${Validator.isStrongPassword(testPassword)}`);
console.log(`Is "${testPhone}" valid phone? ${Validator.isValidPhone(testPhone)}`);
console.log();

// Demonstrating the difference between static and instance methods
console.log("5. Static vs Instance Methods:");
console.log("Static method (no instance needed):", User.getTotalUsers());
console.log("Instance method (needs instance):", user1.getInfo());

// This would cause an error - cannot call instance method on class
// console.log(User.getInfo()); // TypeError

// This would cause an error - cannot call static method on instance
// console.log(user1.getTotalUsers()); // TypeError

console.log();
console.log("=== Key Points ===");
console.log("• Static methods are called on the class itself, not instances");
console.log("• Static properties are shared across all instances");
console.log("• Use 'this' in static methods to refer to the class");
console.log("• Static methods cannot access instance properties");
console.log("• Perfect for utility functions and class-level data");
