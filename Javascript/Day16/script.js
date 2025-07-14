// 'this' refers to an object, there are many ways where 'this' keyword can be used
// object method, alone, in a function, strict mode, in an event

const person = {
    firstName: "Jhered",
    lastName: "Republica",
    age: 19,
    fullName: function() {
        console.log(`${this.firstName +" " + this.lastName}`);
    }
};

person.fullName()