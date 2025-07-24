// Named exports - can export multiple functions/variables
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14159;

// Alternative way to export multiple items at once
export { add as sum, subtract as minus };
