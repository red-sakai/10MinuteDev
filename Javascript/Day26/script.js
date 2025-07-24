// Different ways to import modules

// 1. Named imports
import { add, subtract, PI } from './mathUtils.js';

// 2. Import with aliases
import { sum, minus } from './mathUtils.js';

// 3. Import all named exports as an object
import * as math from './mathUtils.js';

// 4. Default import
import Calculator from './calculator.js';

// 5. Mixed imports (default + named)
import greet, { formatDate, capitalize, APP_NAME } from './utils.js';

// 6. Import for side effects only
// import './someModule.js';

// Examples of usage
console.log('=== Named Imports ===');
console.log('add(5, 3):', add(5, 3));
console.log('subtract(10, 4):', subtract(10, 4));
console.log('PI:', PI);

console.log('\n=== Aliased Imports ===');
console.log('sum(7, 2):', sum(7, 2));
console.log('minus(15, 8):', minus(15, 8));

console.log('\n=== Namespace Import ===');
console.log('math.multiply(6, 7):', math.multiply(6, 7));
console.log('math.PI:', math.PI);

console.log('\n=== Default Import ===');
const calc = new Calculator();
const result = calc.add(10).multiply(2).getResult();
console.log('Calculator result:', result);

console.log('\n=== Mixed Imports ===');
console.log(greet('JavaScript'));
console.log('Today is:', formatDate(new Date()));
console.log('Capitalized:', capitalize('javascript modules'));
console.log('App name:', APP_NAME);

// Dynamic imports (ES2020)
console.log('\n=== Dynamic Import ===');
async function loadMathModule() {
    try {
        const mathModule = await import('./mathUtils.js');
        console.log('Dynamic import - add(20, 5):', mathModule.add(20, 5));
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}

loadMathModule();
