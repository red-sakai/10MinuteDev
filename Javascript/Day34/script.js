// Base class - Vehicle
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
        this.speed = 0;
    }

    start() {
        this.isRunning = true;
        console.log(`${this.make} ${this.model} is starting...`);
    }

    stop() {
        this.isRunning = false;
        this.speed = 0;
        console.log(`${this.make} ${this.model} has stopped.`);
    }

    accelerate(amount) {
        if (this.isRunning) {
            this.speed += amount;
            console.log(`Accelerating... Current speed: ${this.speed} mph`);
        } else {
            console.log('Cannot accelerate. Vehicle is not running.');
        }
    }

    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

// Subclass - Car extends Vehicle
class Car extends Vehicle {
    constructor(make, model, year, doors, fuelType) {
        super(make, model, year); // Call parent constructor
        this.doors = doors;
        this.fuelType = fuelType;
        this.gear = 'P'; // Park
        this.headlightsOn = false;
    }

    // Override the start method
    start() {
        if (this.gear === 'P') {
            super.start(); // Call parent method
            console.log('Car is ready to drive. Shift gear to move.');
        } else {
            console.log('Put car in Park before starting.');
        }
    }

    // Override the stop method
    stop() {
        this.gear = 'P';
        this.headlightsOn = false;
        super.stop(); // Call parent method
        console.log('Car is parked and headlights are off.');
    }

    // Car-specific methods
    shiftGear(newGear) {
        const validGears = ['P', 'R', 'N', 'D'];
        if (validGears.includes(newGear)) {
            this.gear = newGear;
            console.log(`Shifted to gear: ${newGear}`);
        } else {
            console.log('Invalid gear selection.');
        }
    }

    toggleHeadlights() {
        this.headlightsOn = !this.headlightsOn;
        console.log(`Headlights ${this.headlightsOn ? 'on' : 'off'}`);
    }

    honk() {
        console.log('Beep beep!');
    }

    // Override getInfo to include car-specific details
    getInfo() {
        return `${super.getInfo()} - ${this.doors} doors, ${this.fuelType} engine`;
    }

    // Additional method for fuel efficiency
    getFuelEfficiency() {
        const baseEfficiency = this.fuelType === 'electric' ? 100 : 25;
        return `${baseEfficiency} ${this.fuelType === 'electric' ? 'MPGe' : 'MPG'}`;
    }
}

// Example usage
console.log('=== Creating Vehicles ===');
const genericVehicle = new Vehicle('Generic', 'Vehicle', 2020);
const myCar = new Car('Toyota', 'Camry', 2023, 4, 'gasoline');

console.log('\n=== Vehicle Info ===');
console.log('Generic vehicle:', genericVehicle.getInfo());
console.log('My car:', myCar.getInfo());
console.log('Car fuel efficiency:', myCar.getFuelEfficiency());

console.log('\n=== Testing Generic Vehicle ===');
genericVehicle.start();
genericVehicle.accelerate(30);
genericVehicle.stop();

console.log('\n=== Testing Car (Extended Functionality) ===');
myCar.start();
myCar.shiftGear('D');
myCar.accelerate(25);
myCar.toggleHeadlights();
myCar.honk();
myCar.stop();

console.log('\n=== Inheritance Check ===');
console.log('myCar instanceof Car:', myCar instanceof Car);
console.log('myCar instanceof Vehicle:', myCar instanceof Vehicle);
