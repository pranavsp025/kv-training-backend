"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
/**
 * Custom error codes to be send to UI to display proper a response
 */
exports.ErrorCodes = {
    EMPLOYEE_WITH_ID_NOT_FOUND: {
        CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
        MESSAGE: "Emplpoyee with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Error while validation request body",
    },
    INCORRECT_PASSWORD: {
        CODE: "INCORRECT_PASSWORD",
        MESSAGE: "Incorrect password"
    },
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "You are not authorized to perform this action"
    }
};
//# sourceMappingURL=error.code.js.map