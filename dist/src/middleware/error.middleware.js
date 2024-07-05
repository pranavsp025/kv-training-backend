"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof http_exceptions_1.default) {
            const status = error.status || 400;
            const message = "Validation Failed";
            // const errors: string[] = error.errors || []; 
            let respbody = {
                error: message,
                statusCode: status,
                errors: [error.message]
                // errors.length ? errors : ["address should not be empty", "name should not be empty", "email must be an email"]
            };
            res.status(status).json(respbody);
        }
        else {
            console.error(error.stack);
            res.status(500).send({
                error: "Something went wrong",
                statusCode: 500,
                errors: [error.message]
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map