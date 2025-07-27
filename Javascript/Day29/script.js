// Utility function to display results on the page
function displayResult(message) {
    const output = document.getElementById('output');
    output.innerHTML += `<p>${message}</p>`;
}

// Basic debugging with console.log
function basicDebugging() {
    console.log('🔍 Starting basic debugging...');
    
    let name = 'John';
    let age = 25;
    let isStudent = true;
    
    // Set breakpoint here in dev tools
    debugger; // This will trigger a breakpoint when dev tools are open
    
    console.log('Variable values:', { name, age, isStudent });
    console.log('Name type:', typeof name);
    console.log('Age type:', typeof age);
    
    // Different console methods
    console.info('ℹ️ This is info message');
    console.warn('⚠️ This is a warning message');
    console.error('❌ This is an error message (not a real error)');
    
    displayResult('Basic debugging completed - check console!');
}

// Array debugging example
function arrayDebugging() {
    console.log('🔍 Starting array debugging...');
    
    const numbers = [1, 2, 3, 4, 5];
    const fruits = ['apple', 'banana', 'orange'];
    
    console.log('Original arrays:');
    console.table(numbers); // Table view is great for arrays
    console.table(fruits);
    
    // Debugging array operations
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        console.log(`Processing index ${i}, value: ${numbers[i]}`);
        sum += numbers[i];
        
        // Set breakpoint here to step through loop
        if (i === 2) {
            debugger; // Pause at specific iteration
        }
    }
    
    console.log('Final sum:', sum);
    
    // Advanced console grouping
    console.group('🍎 Fruit processing');
    fruits.forEach((fruit, index) => {
        console.log(`${index + 1}. ${fruit.toUpperCase()}`);
    });
    console.groupEnd();
    
    displayResult(`Array processing complete. Sum: ${sum}`);
}

// Object debugging example
function objectDebugging() {
    console.log('🔍 Starting object debugging...');
    
    const user = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            zip: '12345'
        }
    };
    
    // Different ways to inspect objects
    console.log('User object (basic):', user);
    console.dir(user); // Better for complex objects
    console.table(user); // Table view for object properties
    
    // Set breakpoint to inspect object properties
    debugger;
    
    // Debugging object modifications
    console.group('🔧 Modifying user object');
    user.lastLogin = new Date();
    console.log('After adding lastLogin:', user);
    
    user.address.country = 'USA';
    console.log('After adding country:', user.address);
    console.groupEnd();
    
    // Using console.assert for validation
    console.assert(user.name.length > 0, 'Name should not be empty');
    console.assert(user.email.includes('@'), 'Email should contain @');
    
    displayResult(`Object debugging complete. User: ${user.name}`);
}

// Error debugging example
function errorDebugging() {
    console.log('🔍 Starting error debugging...');
    
    try {
        // Intentional error for debugging
        let data = null;
        
        console.log('About to access property of null...');
        debugger; // Set breakpoint before error
        
        // This will throw an error
        let result = data.someProperty;
        
    } catch (error) {
        console.error('❌ Caught error:', error.message);
        console.error('Error stack trace:', error.stack);
        
        // Using console.trace to see call stack
        console.trace('Call stack at error point');
    }
    
    // Debugging with try-catch and validation
    function divideNumbers(a, b) {
        console.log(`Attempting to divide ${a} by ${b}`);
        
        if (b === 0) {
            console.warn('⚠️ Division by zero detected!');
            debugger; // Pause when potential issue occurs
            return 'Cannot divide by zero';
        }
        
        const result = a / b;
        console.log(`Result: ${result}`);
        return result;
    }
    
    console.group('🔢 Division tests');
    console.log(divideNumbers(10, 2));
    console.log(divideNumbers(10, 0)); // This will trigger warning
    console.groupEnd();
    
    displayResult('Error debugging completed - check console for details!');
}

// Performance debugging example
function performanceDebugging() {
    console.log('🔍 Starting performance debugging...');
    
    // Using console.time for performance measurement
    console.time('Array processing');
    
    const largeArray = Array.from({ length: 100000 }, (_, i) => i);
    
    console.time('Sum calculation');
    let sum = 0;
    for (let i = 0; i < largeArray.length; i++) {
        sum += largeArray[i];
        
        // Log progress at intervals
        if (i % 20000 === 0) {
            console.log(`Progress: ${(i / largeArray.length * 100).toFixed(1)}%`);
        }
    }
    console.timeEnd('Sum calculation');
    
    // Using console.count to count occurrences
    function countExample() {
        for (let i = 0; i < 5; i++) {
            console.count('Loop iteration');
        }
    }
    
    countExample();
    console.countReset('Loop iteration');
    
    console.timeEnd('Array processing');
    
    // Memory usage (if available)
    if (console.memory) {
        console.log('Memory usage:', console.memory);
    }
    
    displayResult(`Performance debugging complete. Sum: ${sum}`);
}

// Advanced debugging utility functions
function debugUtils() {
    // Custom logging function with timestamp
    window.logWithTime = function(message, data = null) {
        const timestamp = new Date().toISOString();
        if (data) {
            console.log(`[${timestamp}] ${message}`, data);
        } else {
            console.log(`[${timestamp}] ${message}`);
        }
    };
    
    // Function to log function calls
    window.traceFunction = function(fn, name) {
        return function(...args) {
            console.log(`🔧 Calling ${name} with args:`, args);
            const result = fn.apply(this, args);
            console.log(`🔧 ${name} returned:`, result);
            return result;
        };
    };
}

// Initialize debugging utilities when page loads
document.addEventListener('DOMContentLoaded', function() {
    debugUtils();
    console.log('🚀 Debugging demo loaded! Open dev tools and click buttons to see debugging in action.');
    console.log('💡 Tips:');
    console.log('  - Use F12 to open dev tools');
    console.log('  - Set breakpoints by clicking line numbers in Sources tab');
    console.log('  - Use debugger; statement to programmatically set breakpoints');
    console.log('  - Try different console methods: log, info, warn, error, table, group');
});
