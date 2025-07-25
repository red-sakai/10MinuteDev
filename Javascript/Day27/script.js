// Utility function to display output
function displayOutput(message, type = 'info') {
    const output = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    const className = type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : '';
    output.innerHTML += `<div class="${className}">[${timestamp}] ${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

// 1. JSON Parsing Error Handling
function handleJsonParsing() {
    const invalidJson = '{"name": "John", "age": }'; // Invalid JSON
    
    try {
        const parsed = JSON.parse(invalidJson);
        displayOutput(`Successfully parsed: ${JSON.stringify(parsed)}`, 'success');
    } catch (error) {
        displayOutput(`JSON Parse Error: ${error.message}`, 'error');
        displayOutput(`Fallback: Using default object instead`, 'warning');
        
        // Provide fallback data
        const defaultData = { name: 'Unknown', age: 0 };
        displayOutput(`Using fallback data: ${JSON.stringify(defaultData)}`, 'success');
    }
}

// 2. Division by Zero and Mathematical Errors
function handleDivisionByZero() {
    const numbers = [10, 0, 5, null, undefined, 'abc'];
    
    numbers.forEach(num => {
        try {
            if (num === null || num === undefined) {
                throw new Error(`Cannot divide by ${num}`);
            }
            
            if (typeof num !== 'number' || isNaN(num)) {
                throw new TypeError(`Invalid number: ${num}`);
            }
            
            if (num === 0) {
                throw new Error('Division by zero is not allowed');
            }
            
            const result = 100 / num;
            displayOutput(`100 / ${num} = ${result}`, 'success');
            
        } catch (error) {
            displayOutput(`Math Error: ${error.message}`, 'error');
            displayOutput(`Skipping calculation for: ${num}`, 'warning');
        }
    });
}

// 3. Array Access Error Handling
function handleArrayAccess() {
    const data = [
        { users: ['Alice', 'Bob', 'Charlie'] },
        { users: null },
        null,
        { users: [] }
    ];
    
    data.forEach((item, index) => {
        try {
            if (!item) {
                throw new Error('Data item is null or undefined');
            }
            
            if (!item.users) {
                throw new Error('Users array is missing');
            }
            
            if (!Array.isArray(item.users)) {
                throw new TypeError('Users is not an array');
            }
            
            if (item.users.length === 0) {
                throw new Error('Users array is empty');
            }
            
            displayOutput(`Dataset ${index}: Found ${item.users.length} users - ${item.users.join(', ')}`, 'success');
            
        } catch (error) {
            displayOutput(`Array Access Error (Dataset ${index}): ${error.message}`, 'error');
            displayOutput(`Using empty array as fallback`, 'warning');
        }
    });
}

// 4. Async Error Handling
async function handleAsyncError() {
    try {
        displayOutput('Starting async operation...', 'info');
        
        // Simulate an async operation that might fail
        const result = await simulateAsyncOperation();
        displayOutput(`Async operation successful: ${result}`, 'success');
        
    } catch (error) {
        displayOutput(`Async Error: ${error.message}`, 'error');
        
        // Retry mechanism
        try {
            displayOutput('Retrying async operation...', 'warning');
            const retryResult = await simulateAsyncOperation(true);
            displayOutput(`Retry successful: ${retryResult}`, 'success');
        } catch (retryError) {
            displayOutput(`Retry failed: ${retryError.message}`, 'error');
            displayOutput('Using cached data as final fallback', 'warning');
        }
    }
}

// Helper function for async simulation
function simulateAsyncOperation(forceSuccess = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (forceSuccess || Math.random() > 0.7) {
                resolve('Data loaded successfully');
            } else {
                reject(new Error('Network timeout'));
            }
        }, 1000);
    });
}

// 5. Custom Error Handling
function handleCustomError() {
    class ValidationError extends Error {
        constructor(message, field) {
            super(message);
            this.name = 'ValidationError';
            this.field = field;
        }
    }
    
    class NetworkError extends Error {
        constructor(message, statusCode) {
            super(message);
            this.name = 'NetworkError';
            this.statusCode = statusCode;
        }
    }
    
    const testCases = [
        { type: 'validation', email: 'invalid-email' },
        { type: 'network', status: 404 },
        { type: 'validation', age: -5 },
        { type: 'network', status: 500 }
    ];
    
    testCases.forEach((testCase, index) => {
        try {
            if (testCase.type === 'validation') {
                if (testCase.email && !testCase.email.includes('@')) {
                    throw new ValidationError('Invalid email format', 'email');
                }
                if (testCase.age !== undefined && testCase.age < 0) {
                    throw new ValidationError('Age cannot be negative', 'age');
                }
            } else if (testCase.type === 'network') {
                if (testCase.status >= 400) {
                    throw new NetworkError(`HTTP Error ${testCase.status}`, testCase.status);
                }
            }
            
            displayOutput(`Test case ${index + 1}: Validation passed`, 'success');
            
        } catch (error) {
            if (error instanceof ValidationError) {
                displayOutput(`Validation Error in field '${error.field}': ${error.message}`, 'error');
            } else if (error instanceof NetworkError) {
                displayOutput(`Network Error (${error.statusCode}): ${error.message}`, 'error');
            } else {
                displayOutput(`Unknown Error: ${error.message}`, 'error');
            }
        }
    });
}

// 6. Network Request Error Handling
async function handleNetworkRequest() {
    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://invalid-url-that-does-not-exist.com/api',
        'https://jsonplaceholder.typicode.com/users/999'
    ];
    
    for (const url of urls) {
        try {
            displayOutput(`Fetching: ${url}`, 'info');
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            displayOutput(`Success: Received data for ${data.name || 'unknown user'}`, 'success');
            
        } catch (error) {
            if (error instanceof TypeError) {
                displayOutput(`Network Error: ${error.message} (possibly CORS or connection issue)`, 'error');
            } else {
                displayOutput(`Request Error: ${error.message}`, 'error');
            }
            
            // Provide fallback
            displayOutput('Using cached data as fallback', 'warning');
        } finally {
            displayOutput(`Finished processing: ${url}`, 'info');
        }
    }
}

// Utility function to clear output
function clearOutput() {
    document.getElementById('output').innerHTML = '';
}

// Initialize with a welcome message
document.addEventListener('DOMContentLoaded', () => {
    displayOutput('Error Handling Demo loaded. Click buttons to see different error scenarios.', 'success');
});
