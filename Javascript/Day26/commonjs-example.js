// CommonJS (Node.js traditional way)
// This file demonstrates the older CommonJS syntax

// Exporting (equivalent to export)
function oldAdd(a, b) {
    return a + b;
}

function oldSubtract(a, b) {
    return a - b;
}

module.exports = {
    add: oldAdd,
    subtract: oldSubtract,
    PI: 3.14159
};

// Alternative single export
// module.exports = oldAdd;

// Importing (equivalent to import)
// const { add, subtract } = require('./commonjs-example.js');
// const math = require('./commonjs-example.js');
