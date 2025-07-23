// Sample data
let products = [
    { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
    { id: 2, name: "Phone", price: 500, category: "Electronics" },
    { id: 3, name: "Book", price: 20, category: "Education" },
    { id: 4, name: "Tablet", price: 300, category: "Electronics" },
    { id: 5, name: "Pen", price: 5, category: "Stationery" }
];

// .filter() - Create new array with elements that pass a test
let expensiveProducts = products.filter(function(product) {
    return product.price > 100;
});
console.log("Expensive products:", expensiveProducts);

// Using arrow function syntax
let electronics = products.filter(product => product.category === "Electronics");
console.log("Electronics:", electronics);

// .find() - Returns the FIRST element that matches the condition
let specificProduct = products.find(product => product.id === 3);
console.log("Product with ID 3:", specificProduct);

let cheapProduct = products.find(product => product.price < 10);
console.log("First cheap product:", cheapProduct);

// .reduce() - Reduces array to a single value
let totalPrice = products.reduce(function(total, product) {
    return total + product.price;
}, 0); // 0 is the initial value
console.log("Total price of all products:", totalPrice);

// Count products by category
let categoryCount = products.reduce((count, product) => {
    count[product.category] = (count[product.category] || 0) + 1;
    return count;
}, {});
console.log("Products by category:", categoryCount);

// Chaining methods together
let expensiveElectronicsTotal = products
    .filter(product => product.category === "Electronics")
    .filter(product => product.price > 400)
    .reduce((total, product) => total + product.price, 0);
console.log("Total price of expensive electronics:", expensiveElectronicsTotal);