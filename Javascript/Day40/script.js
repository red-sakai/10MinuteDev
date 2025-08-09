/**
 * ========== REFACTORED BANKING & INVENTORY SYSTEM ==========
 * 
 * This file contains two main systems demonstrating OOP principles:
 * 1. Banking System - Account management with inheritance
 * 2. Inventory System - Item management with polymorphism
 * 
 * Key OOP Concepts Demonstrated:
 * - Inheritance and method overriding
 * - Encapsulation and data validation
 * - Polymorphism through method overriding
 * - Error handling and custom exceptions
 * - Static methods and constants
 */

// ========== UTILITY FUNCTIONS & CONSTANTS ==========

/**
 * Utility functions for common operations
 */
class Utils {
    /**
     * Formats currency values consistently
     * @param {number} amount - The amount to format
     * @returns {string} Formatted currency string
     */
    static formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    /**
     * Validates if a number is positive
     * @param {number} amount - The amount to validate
     * @param {string} fieldName - Name of the field for error messages
     * @throws {ValidationError} If amount is not positive
     */
    static validatePositiveAmount(amount, fieldName = 'Amount') {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new ValidationError(`${fieldName} must be a positive number`);
        }
    }

    /**
     * Generates a unique transaction ID
     * @returns {string} Unique transaction ID
     */
    static generateTransactionId() {
        return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

/**
 * Constants used throughout the application
 */
class Constants {
    // Banking system constants
    static SAVINGS_MAX_WITHDRAWALS = 6;
    static DEFAULT_OVERDRAFT_LIMIT = 0;
    static DEFAULT_INTEREST_RATE = 0.02;
    static DEFAULT_BUSINESS_FEE = 25;
    
    // Inventory system constants
    static DEFAULT_CATEGORY = 'General';
    static DEFAULT_WARRANTY_MONTHS = 12;
    
    // Transaction types
    static TRANSACTION_TYPES = {
        DEPOSIT: 'deposit',
        WITHDRAWAL: 'withdrawal',
        INTEREST: 'interest',
        FEE: 'monthly fee',
        TRANSFER: 'transfer'
    };
}

// ========== CUSTOM ERROR CLASSES ==========

/**
 * Base class for all application-specific errors
 */
class AppError extends Error {
    constructor(message, code = 'APP_ERROR') {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = new Date();
    }
}

/**
 * Error thrown for validation failures
 */
class ValidationError extends AppError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR');
    }
}

/**
 * Error thrown for insufficient funds
 */
class InsufficientFundsError extends AppError {
    constructor(available, requested) {
        super(`Insufficient funds. Available: ${Utils.formatCurrency(available)}, Requested: ${Utils.formatCurrency(requested)}`);
        this.available = available;
        this.requested = requested;
    }
}

/**
 * Error thrown when transaction limits are exceeded
 */
class TransactionLimitError extends AppError {
    constructor(limit, current) {
        super(`Transaction limit exceeded. Limit: ${limit}, Current: ${current}`);
        this.limit = limit;
        this.current = current;
    }
}

// ========== BANKING SYSTEM ==========

/**
 * Base class representing a bank account
 * Provides common functionality for all account types
 */
class Account {
    /**
     * Creates a new account
     * @param {string} accountNumber - Unique account identifier
     * @param {string} accountHolder - Name of the account holder
     * @param {number} initialBalance - Starting balance (default: 0)
     * @throws {ValidationError} If required parameters are invalid
     */
    constructor(accountNumber, accountHolder, initialBalance = 0) {
        this._validateConstructorParams(accountNumber, accountHolder, initialBalance);
        
        this._accountNumber = accountNumber;
        this._accountHolder = accountHolder;
        this._balance = initialBalance;
        this._transactions = [];
        this._createdAt = new Date();
    }

    /**
     * Validates constructor parameters
     * @private
     */
    _validateConstructorParams(accountNumber, accountHolder, initialBalance) {
        if (!accountNumber || typeof accountNumber !== 'string') {
            throw new ValidationError('Account number must be a non-empty string');
        }
        if (!accountHolder || typeof accountHolder !== 'string') {
            throw new ValidationError('Account holder must be a non-empty string');
        }
        if (typeof initialBalance !== 'number' || initialBalance < 0) {
            throw new ValidationError('Initial balance must be a non-negative number');
        }
    }

    /**
     * Gets the current account balance
     * @returns {number} Current balance
     */
    get balance() {
        return this._balance;
    }

    /**
     * Gets the account number
     * @returns {string} Account number
     */
    get accountNumber() {
        return this._accountNumber;
    }

    /**
     * Gets the account holder name
     * @returns {string} Account holder name
     */
    get accountHolder() {
        return this._accountHolder;
    }

    /**
     * Deposits money into the account
     * @param {number} amount - Amount to deposit
     * @param {string} description - Optional transaction description
     * @returns {object} Transaction record
     * @throws {ValidationError} If amount is invalid
     */
    deposit(amount, description = '') {
        Utils.validatePositiveAmount(amount, 'Deposit amount');
        
        this._balance += amount;
        const transaction = this._addTransaction(
            Constants.TRANSACTION_TYPES.DEPOSIT, 
            amount, 
            description
        );
        
        console.log(`✅ Deposited ${Utils.formatCurrency(amount)}. New balance: ${Utils.formatCurrency(this._balance)}`);
        return transaction;
    }

    /**
     * Withdraws money from the account
     * @param {number} amount - Amount to withdraw
     * @param {string} description - Optional transaction description
     * @returns {object} Transaction record
     * @throws {ValidationError|InsufficientFundsError} If amount is invalid or insufficient funds
     */
    withdraw(amount, description = '') {
        Utils.validatePositiveAmount(amount, 'Withdrawal amount');
        
        if (amount > this._balance) {
            throw new InsufficientFundsError(this._balance, amount);
        }
        
        this._balance -= amount;
        const transaction = this._addTransaction(
            Constants.TRANSACTION_TYPES.WITHDRAWAL, 
            amount, 
            description
        );
        
        console.log(`💸 Withdrew ${Utils.formatCurrency(amount)}. New balance: ${Utils.formatCurrency(this._balance)}`);
        return transaction;
    }

    /**
     * Adds a transaction record
     * @private
     * @param {string} type - Transaction type
     * @param {number} amount - Transaction amount
     * @param {string} description - Transaction description
     * @returns {object} Transaction record
     */
    _addTransaction(type, amount, description = '') {
        const transaction = {
            id: Utils.generateTransactionId(),
            type,
            amount,
            description,
            date: new Date(),
            balanceAfter: this._balance
        };
        
        this._transactions.push(transaction);
        return transaction;
    }

    /**
     * Gets transaction history
     * @param {number} limit - Maximum number of transactions to return
     * @returns {Array} Array of transaction records
     */
    getTransactionHistory(limit = null) {
        const transactions = [...this._transactions].reverse(); // Most recent first
        return limit ? transactions.slice(0, limit) : transactions;
    }

    /**
     * Gets formatted account information
     * @returns {string} Formatted account info
     */
    getAccountInfo() {
        return `Account: ${this._accountNumber} | Holder: ${this._accountHolder} | Balance: ${Utils.formatCurrency(this._balance)}`;
    }

    /**
     * Gets detailed account summary
     * @returns {object} Account summary object
     */
    getAccountSummary() {
        return {
            accountNumber: this._accountNumber,
            accountHolder: this._accountHolder,
            balance: this._balance,
            createdAt: this._createdAt,
            totalTransactions: this._transactions.length,
            accountType: this.constructor.name
        };
    }
}

/**
 * Checking account with overdraft protection
 * Extends the base Account class with overdraft functionality
 */
class CheckingAccount extends Account {
    /**
     * Creates a new checking account
     * @param {string} accountNumber - Account number
     * @param {string} accountHolder - Account holder name
     * @param {number} initialBalance - Initial balance
     * @param {number} overdraftLimit - Overdraft protection limit
     */
    constructor(accountNumber, accountHolder, initialBalance = 0, overdraftLimit = Constants.DEFAULT_OVERDRAFT_LIMIT) {
        super(accountNumber, accountHolder, initialBalance);
        this._overdraftLimit = Math.max(0, overdraftLimit);
        this._accountType = 'Checking';
    }

    /**
     * Gets the overdraft limit
     * @returns {number} Overdraft limit
     */
    get overdraftLimit() {
        return this._overdraftLimit;
    }

    /**
     * Gets available balance including overdraft
     * @returns {number} Total available balance
     */
    get availableBalance() {
        return this._balance + this._overdraftLimit;
    }

    /**
     * Withdraws money with overdraft protection
     * @override
     * @param {number} amount - Amount to withdraw
     * @param {string} description - Transaction description
     * @returns {object} Transaction record
     */
    withdraw(amount, description = '') {
        Utils.validatePositiveAmount(amount, 'Withdrawal amount');
        
        if (amount > this.availableBalance) {
            throw new InsufficientFundsError(this.availableBalance, amount);
        }
        
        this._balance -= amount;
        const transaction = this._addTransaction(
            Constants.TRANSACTION_TYPES.WITHDRAWAL, 
            amount, 
            description
        );
        
        const isUsingOverdraft = this._balance < 0;
        const statusMessage = isUsingOverdraft ? ' (Using overdraft)' : '';
        
        console.log(`💸 Withdrew ${Utils.formatCurrency(amount)}. Balance: ${Utils.formatCurrency(this._balance)}${statusMessage}`);
        return transaction;
    }

    /**
     * @override
     */
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this._accountType} | Overdraft: ${Utils.formatCurrency(this._overdraftLimit)}`;
    }
}

/**
 * Savings account with interest and withdrawal limits
 * Extends Account with interest calculation and federal withdrawal limits
 */
class SavingsAccount extends Account {
    /**
     * Creates a new savings account
     * @param {string} accountNumber - Account number
     * @param {string} accountHolder - Account holder name
     * @param {number} initialBalance - Initial balance
     * @param {number} interestRate - Annual interest rate (default: 2%)
     */
    constructor(accountNumber, accountHolder, initialBalance = 0, interestRate = Constants.DEFAULT_INTEREST_RATE) {
        super(accountNumber, accountHolder, initialBalance);
        this._interestRate = Math.max(0, interestRate);
        this._accountType = 'Savings';
        this._withdrawalCount = 0;
        this._maxWithdrawals = Constants.SAVINGS_MAX_WITHDRAWALS;
        this._lastResetDate = new Date();
    }

    /**
     * Gets the interest rate
     * @returns {number} Annual interest rate
     */
    get interestRate() {
        return this._interestRate;
    }

    /**
     * Gets remaining withdrawals for the period
     * @returns {number} Remaining withdrawals
     */
    get remainingWithdrawals() {
        return Math.max(0, this._maxWithdrawals - this._withdrawalCount);
    }

    /**
     * Withdraws money with federal withdrawal limits
     * @override
     */
    withdraw(amount, description = '') {
        if (this._withdrawalCount >= this._maxWithdrawals) {
            throw new TransactionLimitError(this._maxWithdrawals, this._withdrawalCount);
        }
        
        const transaction = super.withdraw(amount, description);
        this._withdrawalCount++;
        
        console.log(`📊 Withdrawals remaining: ${this.remainingWithdrawals}`);
        return transaction;
    }

    /**
     * Adds interest to the account
     * @param {number} customRate - Optional custom interest rate
     * @returns {object} Transaction record
     */
    addInterest(customRate = null) {
        const rate = customRate || this._interestRate;
        const interest = this._balance * rate;
        
        if (interest > 0) {
            this._balance += interest;
            const transaction = this._addTransaction(
                Constants.TRANSACTION_TYPES.INTEREST, 
                interest, 
                `Interest at ${(rate * 100).toFixed(2)}% APR`
            );
            
            console.log(`💰 Interest added: ${Utils.formatCurrency(interest)}. New balance: ${Utils.formatCurrency(this._balance)}`);
            return transaction;
        }
        
        return null;
    }

    /**
     * Resets withdrawal count for new period
     */
    resetWithdrawalCount() {
        this._withdrawalCount = 0;
        this._lastResetDate = new Date();
        console.log('🔄 Withdrawal count reset for new period');
    }

    /**
     * @override
     */
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this._accountType} | Interest Rate: ${(this._interestRate * 100).toFixed(1)}% | Withdrawals: ${this._withdrawalCount}/${this._maxWithdrawals}`;
    }
}

/**
 * Business account with monthly fees and higher transaction limits
 * Extends Account with business-specific features
 */
class BusinessAccount extends Account {
    /**
     * Creates a new business account
     * @param {string} accountNumber - Account number
     * @param {string} accountHolder - Business name
     * @param {number} initialBalance - Initial balance
     * @param {number} monthlyFee - Monthly maintenance fee
     */
    constructor(accountNumber, accountHolder, initialBalance = 0, monthlyFee = Constants.DEFAULT_BUSINESS_FEE) {
        super(accountNumber, accountHolder, initialBalance);
        this._monthlyFee = Math.max(0, monthlyFee);
        this._accountType = 'Business';
        this._lastFeeDate = new Date();
    }

    /**
     * Gets the monthly fee
     * @returns {number} Monthly fee amount
     */
    get monthlyFee() {
        return this._monthlyFee;
    }

    /**
     * Charges the monthly maintenance fee
     * @returns {object|null} Transaction record or null if insufficient funds
     */
    chargeMonthlyFee() {
        if (this._balance >= this._monthlyFee) {
            this._balance -= this._monthlyFee;
            const transaction = this._addTransaction(
                Constants.TRANSACTION_TYPES.FEE, 
                this._monthlyFee, 
                'Monthly maintenance fee'
            );
            
            this._lastFeeDate = new Date();
            console.log(`💳 Monthly fee charged: ${Utils.formatCurrency(this._monthlyFee)}. New balance: ${Utils.formatCurrency(this._balance)}`);
            return transaction;
        } else {
            console.log('⚠️ Insufficient funds for monthly fee');
            return null;
        }
    }

    /**
     * @override
     */
    getAccountInfo() {
        return `${super.getAccountInfo()} | Type: ${this._accountType} | Monthly Fee: ${Utils.formatCurrency(this._monthlyFee)}`;
    }
}

// ========== INVENTORY SYSTEM ==========

/**
 * Base class for inventory items
 * Provides common functionality for all item types
 */
class Item {
    /**
     * Creates a new inventory item
     * @param {string} id - Unique item identifier
     * @param {string} name - Item name
     * @param {number} price - Item price
     * @param {number} quantity - Initial quantity
     */
    constructor(id, name, price, quantity = 0) {
        this._validateConstructorParams(id, name, price, quantity);
        
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._category = Constants.DEFAULT_CATEGORY;
        this._createdAt = new Date();
        this._lastUpdated = new Date();
    }

    /**
     * Validates constructor parameters
     * @private
     */
    _validateConstructorParams(id, name, price, quantity) {
        if (!id || typeof id !== 'string') {
            throw new ValidationError('Item ID must be a non-empty string');
        }
        if (!name || typeof name !== 'string') {
            throw new ValidationError('Item name must be a non-empty string');
        }
        if (typeof price !== 'number' || price < 0) {
            throw new ValidationError('Price must be a non-negative number');
        }
        if (typeof quantity !== 'number' || quantity < 0) {
            throw new ValidationError('Quantity must be a non-negative number');
        }
    }

    // Getters for encapsulation
    get id() { return this._id; }
    get name() { return this._name; }
    get price() { return this._price; }
    get quantity() { return this._quantity; }
    get category() { return this._category; }

    /**
     * Calculates total value of this item in inventory
     * @returns {number} Total value (price × quantity)
     */
    getTotalValue() {
        return this._price * this._quantity;
    }

    /**
     * Updates the quantity of this item
     * @param {number} newQuantity - New quantity value
     * @throws {ValidationError} If quantity is negative
     */
    updateQuantity(newQuantity) {
        if (typeof newQuantity !== 'number' || newQuantity < 0) {
            throw new ValidationError('Quantity must be a non-negative number');
        }
        
        this._quantity = newQuantity;
        this._lastUpdated = new Date();
    }

    /**
     * Updates the price of this item
     * @param {number} newPrice - New price value
     * @throws {ValidationError} If price is negative
     */
    updatePrice(newPrice) {
        if (typeof newPrice !== 'number' || newPrice < 0) {
            throw new ValidationError('Price must be a non-negative number');
        }
        
        this._price = newPrice;
        this._lastUpdated = new Date();
    }

    /**
     * Gets formatted item information
     * @returns {string} Formatted item info
     */
    getItemInfo() {
        return `${this._name} (ID: ${this._id}) - ${Utils.formatCurrency(this._price)} × ${this._quantity} = ${Utils.formatCurrency(this.getTotalValue())}`;
    }

    /**
     * Gets detailed item summary
     * @returns {object} Item summary object
     */
    getItemSummary() {
        return {
            id: this._id,
            name: this._name,
            price: this._price,
            quantity: this._quantity,
            category: this._category,
            totalValue: this.getTotalValue(),
            createdAt: this._createdAt,
            lastUpdated: this._lastUpdated
        };
    }
}

/**
 * Perishable item with expiration date tracking
 * Extends Item with expiration functionality
 */
class PerishableItem extends Item {
    /**
     * Creates a new perishable item
     * @param {string} id - Item ID
     * @param {string} name - Item name
     * @param {number} price - Item price
     * @param {number} quantity - Initial quantity
     * @param {string|Date} expirationDate - Expiration date
     */
    constructor(id, name, price, quantity = 0, expirationDate) {
        super(id, name, price, quantity);
        this._expirationDate = new Date(expirationDate);
        this._category = 'Perishable';
        
        if (isNaN(this._expirationDate.getTime())) {
            throw new ValidationError('Invalid expiration date');
        }
    }

    /**
     * Gets the expiration date
     * @returns {Date} Expiration date
     */
    get expirationDate() {
        return new Date(this._expirationDate);
    }

    /**
     * Checks if the item is expired
     * @returns {boolean} True if expired
     */
    isExpired() {
        return new Date() > this._expirationDate;
    }

    /**
     * Gets days until expiration (negative if expired)
     * @returns {number} Days until expiration
     */
    getDaysUntilExpiration() {
        const today = new Date();
        const timeDiff = this._expirationDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    /**
     * Gets expiration status
     * @returns {string} Expiration status description
     */
    getExpirationStatus() {
        if (this.isExpired()) {
            return `EXPIRED ${Math.abs(this.getDaysUntilExpiration())} days ago`;
        }
        
        const days = this.getDaysUntilExpiration();
        if (days <= 3) {
            return `⚠️ EXPIRES SOON (${days} days)`;
        }
        
        return `Expires in ${days} days`;
    }

    /**
     * @override
     */
    getItemInfo() {
        return `${super.getItemInfo()} | ${this.getExpirationStatus()}`;
    }
}

/**
 * Electronic item with warranty tracking
 * Extends Item with warranty functionality
 */
class ElectronicItem extends Item {
    /**
     * Creates a new electronic item
     * @param {string} id - Item ID
     * @param {string} name - Item name
     * @param {number} price - Item price
     * @param {number} quantity - Initial quantity
     * @param {number} warrantyPeriod - Warranty period in months
     */
    constructor(id, name, price, quantity = 0, warrantyPeriod = Constants.DEFAULT_WARRANTY_MONTHS) {
        super(id, name, price, quantity);
        this._warrantyPeriod = Math.max(0, warrantyPeriod);
        this._category = 'Electronics';
    }

    /**
     * Gets warranty period
     * @returns {number} Warranty period in months
     */
    get warrantyPeriod() {
        return this._warrantyPeriod;
    }

    /**
     * Extends warranty by additional months
     * @param {number} additionalMonths - Months to add to warranty
     * @throws {ValidationError} If additionalMonths is invalid
     */
    extendWarranty(additionalMonths) {
        if (typeof additionalMonths !== 'number' || additionalMonths < 0) {
            throw new ValidationError('Additional months must be a non-negative number');
        }
        
        this._warrantyPeriod += additionalMonths;
        this._lastUpdated = new Date();
        console.log(`🔧 Warranty extended by ${additionalMonths} months. Total: ${this._warrantyPeriod} months`);
    }

    /**
     * @override
     */
    getItemInfo() {
        return `${super.getItemInfo()} | 🛡️ Warranty: ${this._warrantyPeriod} months`;
    }
}

/**
 * Clothing item with size and material tracking
 * Extends Item with clothing-specific properties
 */
class ClothingItem extends Item {
    /**
     * Creates a new clothing item
     * @param {string} id - Item ID
     * @param {string} name - Item name
     * @param {number} price - Item price
     * @param {number} quantity - Initial quantity
     * @param {string} size - Clothing size
     * @param {string} material - Material composition
     */
    constructor(id, name, price, quantity = 0, size, material) {
        super(id, name, price, quantity);
        this._size = size || 'Unknown';
        this._material = material || 'Unknown';
        this._category = 'Clothing';
    }

    /**
     * Gets the size
     * @returns {string} Clothing size
     */
    get size() {
        return this._size;
    }

    /**
     * Gets the material
     * @returns {string} Material composition
     */
    get material() {
        return this._material;
    }

    /**
     * @override
     */
    getItemInfo() {
        return `${super.getItemInfo()} | 👕 Size: ${this._size} | Material: ${this._material}`;
    }
}

/**
 * Inventory management system
 * Manages collection of items with various operations
 */
class InventoryManager {
    /**
     * Creates a new inventory manager
     */
    constructor() {
        this._items = new Map();
        this._createdAt = new Date();
    }

    /**
     * Gets the number of unique items
     * @returns {number} Number of unique items
     */
    get itemCount() {
        return this._items.size;
    }

    /**
     * Gets the total quantity of all items
     * @returns {number} Total quantity
     */
    get totalQuantity() {
        return Array.from(this._items.values())
            .reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Adds an item to inventory
     * @param {Item} item - Item to add
     * @throws {ValidationError} If item is invalid
     */
    addItem(item) {
        if (!(item instanceof Item)) {
            throw new ValidationError('Item must be an instance of Item class');
        }
        
        if (this._items.has(item.id)) {
            // Update quantity if item already exists
            const existingItem = this._items.get(item.id);
            existingItem.updateQuantity(existingItem.quantity + item.quantity);
            console.log(`📦 Updated ${item.name} quantity in inventory (Total: ${existingItem.quantity})`);
        } else {
            this._items.set(item.id, item);
            console.log(`✅ Added ${item.name} to inventory`);
        }
    }

    /**
     * Removes an item or quantity from inventory
     * @param {string} itemId - ID of item to remove
     * @param {number|null} quantity - Quantity to remove (null = remove all)
     * @throws {ValidationError} If item not found or invalid quantity
     */
    removeItem(itemId, quantity = null) {
        const item = this._items.get(itemId);
        if (!item) {
            throw new ValidationError(`Item with ID '${itemId}' not found`);
        }
        
        if (quantity === null) {
            // Remove entire item
            this._items.delete(itemId);
            console.log(`🗑️ Removed ${item.name} completely from inventory`);
        } else {
            // Remove specific quantity
            Utils.validatePositiveAmount(quantity, 'Remove quantity');
            
            if (quantity > item.quantity) {
                throw new ValidationError(`Not enough items in inventory. Available: ${item.quantity}, Requested: ${quantity}`);
            }
            
            const newQuantity = item.quantity - quantity;
            if (newQuantity === 0) {
                this._items.delete(itemId);
                console.log(`🗑️ Removed last ${quantity} ${item.name}(s) from inventory`);
            } else {
                item.updateQuantity(newQuantity);
                console.log(`📦 Removed ${quantity} ${item.name}(s) from inventory (Remaining: ${newQuantity})`);
            }
        }
    }

    /**
     * Gets an item by ID
     * @param {string} itemId - Item ID to find
     * @returns {Item|null} Found item or null
     */
    getItem(itemId) {
        return this._items.get(itemId) || null;
    }

    /**
     * Gets all items in a specific category
     * @param {string} category - Category to filter by
     * @returns {Array<Item>} Array of items in category
     */
    getItemsByCategory(category) {
        return Array.from(this._items.values())
            .filter(item => item.category === category);
    }

    /**
     * Gets all expired perishable items
     * @returns {Array<PerishableItem>} Array of expired items
     */
    getExpiredItems() {
        return Array.from(this._items.values())
            .filter(item => item instanceof PerishableItem && item.isExpired());
    }

    /**
     * Gets items expiring soon (within specified days)
     * @param {number} days - Days threshold (default: 7)
     * @returns {Array<PerishableItem>} Array of items expiring soon
     */
    getItemsExpiringSoon(days = 7) {
        return Array.from(this._items.values())
            .filter(item => {
                if (!(item instanceof PerishableItem)) return false;
                const daysUntilExpiration = item.getDaysUntilExpiration();
                return daysUntilExpiration > 0 && daysUntilExpiration <= days;
            });
    }

    /**
     * Calculates total inventory value
     * @returns {number} Total value of all items
     */
    getTotalValue() {
        return Array.from(this._items.values())
            .reduce((total, item) => total + item.getTotalValue(), 0);
    }

    /**
     * Gets inventory statistics
     * @returns {object} Inventory statistics
     */
    getStatistics() {
        const items = Array.from(this._items.values());
        const categories = [...new Set(items.map(item => item.category))];
        
        return {
            totalItems: this.itemCount,
            totalQuantity: this.totalQuantity,
            totalValue: this.getTotalValue(),
            categories: categories.length,
            categoryBreakdown: categories.map(category => ({
                category,
                count: this.getItemsByCategory(category).length
            }))
        };
    }

    /**
     * Displays complete inventory report
     */
    displayInventory() {
        console.log('\n📊 ===== INVENTORY REPORT =====');
        
        if (this._items.size === 0) {
            console.log('📭 No items in inventory');
            return;
        }
        
        // Display items by category
        const categories = [...new Set(Array.from(this._items.values()).map(item => item.category))];
        
        categories.forEach(category => {
            console.log(`\n📂 ${category.toUpperCase()} ITEMS:`);
            const categoryItems = this.getItemsByCategory(category);
            categoryItems.forEach(item => console.log(`  ${item.getItemInfo()}`));
        });
        
        // Display summary
        const stats = this.getStatistics();
        console.log(`\n💰 INVENTORY SUMMARY:`);
        console.log(`  Total Items: ${stats.totalItems} types`);
        console.log(`  Total Quantity: ${stats.totalQuantity} units`);
        console.log(`  Total Value: ${Utils.formatCurrency(stats.totalValue)}`);
        console.log(`  Categories: ${stats.categories}`);
        
        // Show alerts for expired/expiring items
        const expired = this.getExpiredItems();
        const expiringSoon = this.getItemsExpiringSoon(7);
        
        if (expired.length > 0) {
            console.log(`\n⚠️ EXPIRED ITEMS (${expired.length}):`);
            expired.forEach(item => console.log(`  🔴 ${item.name} - ${item.getExpirationStatus()}`));
        }
        
        if (expiringSoon.length > 0) {
            console.log(`\n⚡ EXPIRING SOON (${expiringSoon.length}):`);
            expiringSoon.forEach(item => console.log(`  🟡 ${item.name} - ${item.getExpirationStatus()}`));
        }
    }
}

// ========== ENHANCED DEMONSTRATION ==========

/**
 * Comprehensive demonstration of both systems
 */
function runSystemDemo() {
    console.log('🚀 ===== ENHANCED OOP SYSTEMS DEMONSTRATION =====\n');
    
    try {
        // Banking System Demo
        console.log('🏦 ===== BANKING SYSTEM DEMO =====\n');
        
        // Create different account types
        const checking = new CheckingAccount('CHK001', 'John Doe', 1000, 500);
        const savings = new SavingsAccount('SAV001', 'Jane Smith', 5000, 0.03);
        const business = new BusinessAccount('BUS001', 'ABC Corporation', 10000, 50);
        
        // Display account information
        console.log('📋 Account Information:');
        console.log(`  ${checking.getAccountInfo()}`);
        console.log(`  ${savings.getAccountInfo()}`);
        console.log(`  ${business.getAccountInfo()}\n`);
        
        // Demonstrate account operations
        console.log('💳 Account Operations:');
        checking.deposit(250, 'Salary deposit');
        checking.withdraw(1400, 'Rent payment'); // Uses overdraft
        console.log();
        
        savings.withdraw(200, 'ATM withdrawal');
        savings.addInterest();
        console.log();
        
        business.deposit(5000, 'Client payment');
        business.chargeMonthlyFee();
        console.log();
        
        // Show transaction history
        console.log('📊 Recent Transactions (Checking):');
        const recentTransactions = checking.getTransactionHistory(3);
        recentTransactions.forEach(txn => {
            console.log(`  ${txn.date.toLocaleString()} | ${txn.type.toUpperCase()} | ${Utils.formatCurrency(txn.amount)} | Balance: ${Utils.formatCurrency(txn.balanceAfter)}`);
        });
        
        console.log('\n🏪 ===== INVENTORY SYSTEM DEMO =====\n');
        
        // Create inventory manager
        const inventory = new InventoryManager();
        
        // Create diverse items
        const laptop = new ElectronicItem('E001', 'Gaming Laptop', 1299.99, 8, 24);
        const milk = new PerishableItem('P001', 'Organic Milk', 4.99, 25, '2024-01-15');
        const expiredYogurt = new PerishableItem('P002', 'Greek Yogurt', 3.49, 10, '2023-12-20');
        const tshirt = new ClothingItem('C001', 'Cotton T-Shirt', 19.99, 30, 'L', 'Cotton');
        const smartphone = new ElectronicItem('E002', 'Smartphone Pro', 899.99, 5, 12);
        const jeans = new ClothingItem('C002', 'Denim Jeans', 49.99, 15, '32W/34L', 'Denim');
        
        // Add items to inventory
        console.log('📦 Adding Items to Inventory:');
        [laptop, milk, expiredYogurt, tshirt, smartphone, jeans].forEach(item => {
            inventory.addItem(item);
        });
        console.log();
        
        // Demonstrate inventory operations
        console.log('🔧 Inventory Operations:');
        laptop.extendWarranty(12); // Extend warranty
        smartphone.updatePrice(799.99); // Price reduction
        inventory.removeItem('P001', 5); // Remove some milk
        console.log();
        
        // Display complete inventory
        inventory.displayInventory();
        
        // Show category-specific items
        console.log('\n🔍 Electronics Category:');
        const electronics = inventory.getItemsByCategory('Electronics');
        electronics.forEach(item => console.log(`  ${item.getItemInfo()}`));
        
        console.log('\n📈 Inventory Statistics:');
        const stats = inventory.getStatistics();
        console.log(`  Unique Items: ${stats.totalItems}`);
        console.log(`  Total Quantity: ${stats.totalQuantity}`);
        console.log(`  Total Value: ${Utils.formatCurrency(stats.totalValue)}`);
        console.log(`  Categories: ${stats.categories}`);
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        if (error instanceof AppError) {
            console.error(`   Code: ${error.code}`);
            console.error(`   Time: ${error.timestamp}`);
        }
    }
    
    console.log('\n✅ ===== DEMONSTRATION COMPLETE =====');
    console.log('\n🎯 Key OOP Concepts Demonstrated:');
    console.log('   ✓ Inheritance (Account → CheckingAccount, SavingsAccount, BusinessAccount)');
    console.log('   ✓ Polymorphism (Method overriding in withdraw methods)');
    console.log('   ✓ Encapsulation (Private properties with getters)');
    console.log('   ✓ Error Handling (Custom error classes)');
    console.log('   ✓ Static Methods (Utility functions)');
    console.log('   ✓ Abstraction (Complex operations simplified into methods)');
    console.log('   ✓ Composition (InventoryManager contains Items)');
}

// Run the demonstration
runSystemDemo();
