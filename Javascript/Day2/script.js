let x = 100;
console.log(x);
// displays data type, in this case it is 'number'
console.log(typeof(x));

let name = "Jhered";
console.log(`My name is ${name}`);
// displays data type, in this case it is 'string'
console.log(typeof(name));

let price = 10.99;
console.log(price);
// displays data type, in this case it is still 'number'
console.log(typeof(price))

let jhered = true;
console.log(jhered)
// displays data type, in this case it is 'boolean'
console.log(typeof(jhered));

// we get the id from the html with the name p1 and replace whatever the p1
// type was with my variable name
// same goes with p2 and p3
document.getElementById("p1").textContent = name;
document.getElementById("p2").textContent = x;
document.getElementById("p3").textContent = price;

// modern best practice: use 'const' every time, 'let' when you need to reassign, and avoid 'var'.