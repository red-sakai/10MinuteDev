// ========== BANKING SYSTEM ==========

// Base Account class
class Account {
    constructor(accountNumber, accountHolder, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.transactions = [];
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        this.balance += amount;
        this.addTransaction('deposit', amount);
        console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        this.addTransaction('withdrawal', amount);
        console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    }
    
    getBalance() {
        return this.balance;
    }
    
    addTransaction(type, amount) {
        this.transactions.push({
            type,
            amount,
            date: new Date(),
            balance: this.balance
        });
    }
    
    getAccountInfo() {
        return `Account: ${this.accountNumber} | Holder: ${this.accountHolder} | Balance: $${this.balance}`;
    }
}

// Checking Account - inherits from Account
class CheckingAccount extends Account {
    constructor(accountNumber, accountHolder, initialBalance = 0, overdraftLimit = 0) {
        super(accountNumber, accountHolder, initialBalance);
        this.overdraftLimit = overdraftLimit;
        this.accountType = 'Checking';
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        const availableBalance = this.balance + this.overdraftLimit;
        if (amount > availableBalance) {
            throw new Error(`Insufficient funds. Available: $${availableBalance}`);
        }
        
        this.balance -= amount;
        this.addTransaction('withdrawal', amount);
        
        if (this.balance < 0) {
            console.log(`Withdrew $${amount}. Balance: $${this.balance} (Using overdraft)`);
        } else {
            console.log(`Withdrew $${amount}. Balance: $${this.balance}`);
        }
    }
    
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this.accountType} | Overdraft: $${this.overdraftLimit}`;
    }
}

// Savings Account - inherits from Account
class SavingsAccount extends Account {
    constructor(accountNumber, accountHolder, initialBalance = 0, interestRate = 0.02) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = interestRate;
        this.accountType = 'Savings';
        this.withdrawalCount = 0;
        this.maxWithdrawals = 6; // Federal regulation limit
    }
    
    withdraw(amount) {
        if (this.withdrawalCount >= this.maxWithdrawals) {
            throw new Error(`Maximum withdrawals (${this.maxWithdrawals}) exceeded for this period`);
        }
        
        super.withdraw(amount);
        this.withdrawalCount++;
        console.log(`Withdrawals remaining: ${this.maxWithdrawals - this.withdrawalCount}`);
    }
    
    addInterest() {
        const interest = this.balance * this.interestRate;
        this.balance += interest;
        this.addTransaction('interest', interest);
        console.log(`Interest added: $${interest.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
    }
    
    resetWithdrawals() {
        this.withdrawalCount = 0;
        console.log('Withdrawal count reset for new period');
    }
    
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this.accountType} | Interest Rate: ${(this.interestRate * 100).toFixed(1)}%`;
    }
}

// Business Account - inherits from Account
class BusinessAccount extends Account {
    constructor(accountNumber, accountHolder, initialBalance = 0, monthlyFee = 25) {
        super(accountNumber, accountHolder, initialBalance);
        this.monthlyFee = monthlyFee;
        this.accountType = 'Business';
        this.transactionLimit = 100; // Higher transaction limit
    }
    
    chargeMonthlyFee() {
        if (this.balance >= this.monthlyFee) {
            this.balance -= this.monthlyFee;
            this.addTransaction('monthly fee', this.monthlyFee);
            console.log(`Monthly fee charged: $${this.monthlyFee}. New balance: $${this.balance}`);
        } else {
            console.log('Insufficient funds for monthly fee');
        }
    }
    
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this.accountType} | Monthly Fee: $${this.monthlyFee}`;
    }
}

// ========== INVENTORY SYSTEM ==========

// Base Item class
class Item {
    constructor(id, name, price, quantity = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = 'General';
    }
    
    getTotalValue() {
        return this.price * this.quantity;
    }
    
    updateQuantity(newQuantity) {
        if (newQuantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        this.quantity = newQuantity;
    }
    
    getItemInfo() {
        return `${this.name} (ID: ${this.id}) - $${this.price} x ${this.quantity} = $${this.getTotalValue()}`;
    }
}

// Perishable Item - inherits from Item
class PerishableItem extends Item {
    constructor(id, name, price, quantity = 0, expirationDate) {
        super(id, name, price, quantity);
        this.expirationDate = new Date(expirationDate);
        this.category = 'Perishable';
    }
    
    isExpired() {
        return new Date() > this.expirationDate;
    }
    
    getDaysUntilExpiration() {
        const today = new Date();
        const timeDiff = this.expirationDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    
    getItemInfo() {
        const status = this.isExpired() ? 'EXPIRED' : `Expires in ${this.getDaysUntilExpiration()} days`;
        return `${super.getItemInfo()} | ${status}`;
    }
}

// Electronic Item - inherits from Item
class ElectronicItem extends Item {
    constructor(id, name, price, quantity = 0, warrantyPeriod = 12) {
        super(id, name, price, quantity);
        this.warrantyPeriod = warrantyPeriod; // in months
        this.category = 'Electronics';
    }
    
    extendWarranty(additionalMonths) {
        this.warrantyPeriod += additionalMonths;
        console.log(`Warranty extended by ${additionalMonths} months. Total: ${this.warrantyPeriod} months`);
    }
    
    getItemInfo() {
        return `${super.getItemInfo()} | Warranty: ${this.warrantyPeriod} months`;
    }
}

// Clothing Item - inherits from Item
class ClothingItem extends Item {
    constructor(id, name, price, quantity = 0, size, material) {
        super(id, name, price, quantity);
        this.size = size;
        this.material = material;
        this.category = 'Clothing';
    }
    
    getItemInfo() {
        return `${super.getItemInfo()} | Size: ${this.size} | Material: ${this.material}`;
    }
}

// Inventory Manager
class Inventory {
    constructor() {
        this.items = new Map();
    }
    
    addItem(item) {
        if (this.items.has(item.id)) {
            // Update quantity if item already exists
            const existingItem = this.items.get(item.id);
            existingItem.quantity += item.quantity;
        } else {
            this.items.set(item.id, item);
        }
        console.log(`Added ${item.name} to inventory`);
    }
    
    removeItem(itemId, quantity = null) {
        const item = this.items.get(itemId);
        if (!item) {
            throw new Error('Item not found');
        }
        
        if (quantity === null) {
            this.items.delete(itemId);
            console.log(`Removed ${item.name} from inventory`);
        } else {
            if (quantity > item.quantity) {
                throw new Error('Not enough items in inventory');
            }
            item.quantity -= quantity;
            if (item.quantity === 0) {
                this.items.delete(itemId);
            }
            console.log(`Removed ${quantity} ${item.name}(s) from inventory`);
        }
    }
    
    getTotalValue() {
        let total = 0;
        for (let item of this.items.values()) {
            total += item.getTotalValue();
        }
        return total;
    }
    
    getItemsByCategory(category) {
        return Array.from(this.items.values()).filter(item => item.category === category);
    }
    
    displayInventory() {
        console.log('\n=== INVENTORY REPORT ===');
        if (this.items.size === 0) {
            console.log('No items in inventory');
            return;
        }
        
        for (let item of this.items.values()) {
            console.log(item.getItemInfo());
        }
        console.log(`\nTotal Inventory Value: $${this.getTotalValue()}`);
    }
}

// ========== DEMONSTRATION ==========

console.log('=== BANKING SYSTEM DEMO ===\n');

// Create different types of accounts
const checking = new CheckingAccount('CHK001', 'John Doe', 1000, 500);
const savings = new SavingsAccount('SAV001', 'Jane Smith', 5000, 0.03);
const business = new BusinessAccount('BUS001', 'ABC Corp', 10000, 50);

// Demonstrate account operations
console.log('Account Information:');
console.log(checking.getAccountInfo());
console.log(savings.getAccountInfo());
console.log(business.getAccountInfo());
console.log();

// Test checking account overdraft
checking.withdraw(1200); // Uses overdraft
checking.deposit(500);
console.log();

// Test savings account withdrawal limits
savings.withdraw(100);
savings.addInterest();
console.log();

// Test business account
business.chargeMonthlyFee();
console.log();

console.log('\n=== INVENTORY SYSTEM DEMO ===\n');

// Create inventory
const inventory = new Inventory();

// Create different types of items
const laptop = new ElectronicItem('E001', 'Gaming Laptop', 1200, 5, 24);
const milk = new PerishableItem('P001', 'Organic Milk', 4.99, 20, '2024-01-15');
const tshirt = new ClothingItem('C001', 'Cotton T-Shirt', 19.99, 15, 'L', 'Cotton');
const phone = new ElectronicItem('E002', 'Smartphone', 899, 3, 12);

// Add items to inventory
inventory.addItem(laptop);
inventory.addItem(milk);
inventory.addItem(tshirt);
inventory.addItem(phone);

// Display inventory
inventory.displayInventory();

// Test item operations
console.log('\n=== ITEM OPERATIONS ===');
laptop.extendWarranty(6);
console.log(`Milk expiration status: ${milk.isExpired() ? 'Expired' : 'Fresh'}`);

// Remove some items
inventory.removeItem('P001', 5); // Remove 5 milk cartons
inventory.displayInventory();

// Show items by category
console.log('\n=== ELECTRONICS CATEGORY ===');
const electronics = inventory.getItemsByCategory('Electronics');
electronics.forEach(item => console.log(item.getItemInfo()));
