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
const class_transformer_1 = require("class-transformer");
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const express_1 = __importDefault(require("express"));
const employee_dto_1 = require("../dto/employee.dto");
const class_validator_1 = require("class-validator");
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const role_enum_1 = require("../utils/role.enum");
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getEmployeeById(Number(req.params.id));
                if (!employees) {
                    const error = new http_exceptions_1.default(404, `No employee with ID: ${req.params.id}`);
                    throw error;
                }
                res.status(200).send(employees);
            }
            catch (err) {
                next(err);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.body.role;
                if (role !== role_enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create Employee");
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
                }
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employee = yield this.employeeService.createEmployee(req.body, req.body.address);
                res.status(201).send(employee);
            }
            catch (err) {
                next(err);
            }
        });
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employees = yield this.employeeService.updateEmployee(Number(req.params.id), req.body);
                res.status(200).send(employees);
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    const error = new http_exceptions_1.default(404, `No employee with ID: ${req.params.id}`);
                    throw error;
                }
                const employees = yield this.employeeService.delete(Number(req.params.id));
                res.status(204).send(employees);
            }
            catch (err) {
                next(err);
            }
        });
        this.loginEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield this.employeeService.loginEmployee(email, password);
                res.status(200).send({ data: token });
            }
            catch (err) {
                next(err);
            }
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", authorization_middleware_1.default, this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
        this.router.post("/login", this.loginEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map