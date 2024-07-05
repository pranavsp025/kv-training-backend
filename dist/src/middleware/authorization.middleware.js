"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = getTokenFromRequestHeader(req);
        const payload = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
        req.name = payload.name;
        req.email = payload.email;
        req.role = payload.role;
        return next();
    }
    catch (error) {
        return next(error);
    }
});
const getTokenFromRequestHeader = (req) => {
    const bearerToken = req.header("Authorization");
    return bearerToken;
};
exports.default = authorize;
//# sourceMappingURL=authorization.middleware.js.map