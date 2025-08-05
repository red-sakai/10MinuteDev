// Method 1: Using Symbols for private-like properties
console.log("=== Using Symbols for Private Properties ===");

const _name = Symbol('name');
const _balance = Symbol('balance');

class BankAccountSymbol {
    constructor(name, initialBalance) {
        this[_name] = name;
        this[_balance] = initialBalance;
    }
    
    deposit(amount) {
        this[_balance] += amount;
        console.log(`Deposited $${amount}. New balance: $${this[_balance]}`);
    }
    
    withdraw(amount) {
        if (amount <= this[_balance]) {
            this[_balance] -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this[_balance]}`);
        } else {
            console.log("Insufficient funds!");
        }
    }
    
    getBalance() {
        return this[_balance];
    }
    
    getAccountInfo() {
        return `Account holder: ${this[_name]}, Balance: $${this[_balance]}`;
    }
}

const account1 = new BankAccountSymbol("John Doe", 1000);
account1.deposit(500);
account1.withdraw(200);
console.log(account1.getAccountInfo());

// Symbol properties are not easily accessible but can be found
console.log("Symbol keys:", Object.getOwnPropertySymbols(account1));

console.log("\n=== Using WeakMap for True Private Properties ===");

// Method 2: Using WeakMap for truly private properties
const privateData = new WeakMap();

class BankAccountWeakMap {
    constructor(name, initialBalance) {
        privateData.set(this, {
            name: name,
            balance: initialBalance
        });
    }
    
    deposit(amount) {
        const data = privateData.get(this);
        data.balance += amount;
        console.log(`Deposited $${amount}. New balance: $${data.balance}`);
    }
    
    withdraw(amount) {
        const data = privateData.get(this);
        if (amount <= data.balance) {
            data.balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${data.balance}`);
        } else {
            console.log("Insufficient funds!");
        }
    }
    
    getBalance() {
        return privateData.get(this).balance;
    }
    
    getAccountInfo() {
        const data = privateData.get(this);
        return `Account holder: ${data.name}, Balance: $${data.balance}`;
    }
}

const account2 = new BankAccountWeakMap("Jane Smith", 1500);
account2.deposit(300);
account2.withdraw(100);
console.log(account2.getAccountInfo());

// WeakMap properties are completely inaccessible from outside
console.log("Object keys:", Object.keys(account2));
console.log("Object symbols:", Object.getOwnPropertySymbols(account2));

console.log("\n=== Multiple WeakMaps for Different Properties ===");

// Method 3: Using separate WeakMaps for different private properties
const names = new WeakMap();
const balances = new WeakMap();
const transactions = new WeakMap();

class AdvancedBankAccount {
    constructor(name, initialBalance) {
        names.set(this, name);
        balances.set(this, initialBalance);
        transactions.set(this, []);
    }
    
    deposit(amount) {
        const currentBalance = balances.get(this);
        const newBalance = currentBalance + amount;
        balances.set(this, newBalance);
        
        const transactionList = transactions.get(this);
        transactionList.push({ type: 'deposit', amount, balance: newBalance, date: new Date() });
        
        console.log(`Deposited $${amount}. New balance: $${newBalance}`);
    }
    
    withdraw(amount) {
        const currentBalance = balances.get(this);
        if (amount <= currentBalance) {
            const newBalance = currentBalance - amount;
            balances.set(this, newBalance);
            
            const transactionList = transactions.get(this);
            transactionList.push({ type: 'withdrawal', amount, balance: newBalance, date: new Date() });
            
            console.log(`Withdrew $${amount}. New balance: $${newBalance}`);
        } else {
            console.log("Insufficient funds!");
        }
    }
    
    getBalance() {
        return balances.get(this);
    }
    
    getAccountHolder() {
        return names.get(this);
    }
    
    getTransactionHistory() {
        return transactions.get(this).slice(); // Return a copy
    }
    
    getAccountInfo() {
        return `Account holder: ${names.get(this)}, Balance: $${balances.get(this)}`;
    }
}

const account3 = new AdvancedBankAccount("Bob Johnson", 2000);
account3.deposit(750);
account3.withdraw(250);
account3.deposit(100);
console.log(account3.getAccountInfo());
console.log("Transaction history:", account3.getTransactionHistory());

console.log("\n=== Comparison Summary ===");
console.log("Symbols: Semi-private, discoverable via Object.getOwnPropertySymbols()");
console.log("WeakMaps: Truly private, completely inaccessible from outside the class");
console.log("WeakMaps also provide automatic garbage collection when objects are destroyed");
