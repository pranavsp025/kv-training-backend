"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exceptions_1 = __importDefault(require("./http.exceptions"));
class IncorrectPasswordException extends http_exceptions_1.default {
    constructor(error) {
        super(401, error.MESSAGE);
    }
}
exports.default = IncorrectPasswordException;
//# sourceMappingURL=incorrectPassword.exception.js.map