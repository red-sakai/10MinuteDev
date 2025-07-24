// Default export
export default function greet(name) {
    return `Hello, ${name}!`;
}

// Named exports
export function formatDate(date) {
    return date.toLocaleDateString();
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const APP_NAME = "Module Demo";
