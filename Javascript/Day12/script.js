let username = "Jhered";

// toUpperCase just makes your string capitalized
console.log(username.toUpperCase());

// substring splits the string based on the index, it's default end is till the end of the string if empty
console.log(username.substring(3))

// includes returns a true value if the string includes the condition, and false if not
console.log(username.includes("e"))

// split breaks a string into an array depending on the set condition, if the set condition is a specific letter,
// split will start from there and split the string into singular characters, if it is an empty string,
// split will return the string in all singular characters forming into an array
console.log(username.split())