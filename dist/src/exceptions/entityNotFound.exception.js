"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exceptions_1 = __importDefault(require("./http.exceptions"));
class EntityNotFoundException extends http_exceptions_1.default {
    constructor(error) {
        super(404, error.MESSAGE);
    }
}
exports.default = EntityNotFoundException;
//# sourceMappingURL=entityNotFound.exception.js.map