// Default export - only one per module
class Calculator {
    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
        return this;
    }

    multiply(num) {
        this.result *= num;
        return this;
    }

    getResult() {
        return this.result;
    }

    reset() {
        this.result = 0;
        return this;
    }
}

export default Calculator;
