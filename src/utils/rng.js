"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RandomNumberGenerator {
    getRandomNumber(min = 0, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
exports.default = RandomNumberGenerator;
