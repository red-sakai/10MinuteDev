let cars = ["honda civic", "lamborghini", "ferrari"]

cars.push("mustang") // push adds a new element at the end of the array automatically
cars.pop() // pop removes the last element from the array
cars.shift() // shift removes the first element of an array, if the array is empty then it returns undefined
cars.unshift("L300") // unshift inserts an element at the start of an array, it's just like push but it adds it at the start

let upperCaseCars = cars.map(function(car) {
    return car.toUpperCase();
});
// map lets you modify an entire array by giving it it's own function and lets you do it in one step, in this case
// i wanted to make every element in the array into uppercase

let fastCars = cars.filter(function(fastcar) {
    return fastcar !== "L300";
});
// filter is used to create a new array containing only the elements that pass your condition, in this case
// i only want to print fast cars, and since i noticed that in my list only the L300 is not considered a sports car

console.log(cars)
console.log(upperCaseCars)
console.log(fastCars)