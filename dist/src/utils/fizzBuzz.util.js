"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FizzBuzz {
    fizzBuzz(num) {
        if (this.divisiblebyThree(num) && num % 5 == 0) {
            return 'FizzBuzz';
        }
        if (this.divisiblebyThree(num)) {
            return 'Fizz';
        }
        if (num % 5 == 0) {
            return 'Buzz';
        }
        return num;
    }
    divisiblebyThree(num) {
        return num % 3 == 0;
    }
}
const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 20; i++) {
    console.log(fizzBuzz.fizzBuzz(i));
}
exports.default = FizzBuzz;
//# sourceMappingURL=fizzBuzz.util.js.map