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
const class_validator_1 = require("class-validator");
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const role_enum_1 = require("../utils/role.enum");
const department_dto_1 = require("../dto/department.dto");
class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
        this.getAllDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentService.getAllDepartments();
            res.status(200).send(departments);
        });
        this.getDepartmentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield this.departmentService.getDepartmentById(Number(req.params.id));
                if (!departments) {
                    const error = new http_exceptions_1.default(404, `No department with ID: ${req.params.id}`);
                    throw error;
                }
                res.status(200).send(departments);
            }
            catch (err) {
                next(err);
            }
        });
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create Department");
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
                }
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const department = yield this.departmentService.createDepartment(req.body);
                res.status(201).send(department);
            }
            catch (err) {
                next(err);
            }
        });
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create Department");
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
                }
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const departments = yield this.departmentService.updateDepartment(Number(req.params.id), req.body);
                res.status(200).send(departments);
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create Department");
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
                }
                if (!req.params.id) {
                    const error = new http_exceptions_1.default(404, `No Department with ID: ${req.params.id}`);
                    throw error;
                }
                const departments = yield this.departmentService.delete(Number(req.params.id));
                res.status(204).send(departments);
            }
            catch (err) {
                next(err);
            }
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllDepartments);
        this.router.get("/:id", this.getDepartmentById);
        this.router.post("/", authorization_middleware_1.default, this.createDepartment);
        this.router.put("/:id", authorization_middleware_1.default, this.updateDepartment);
        this.router.delete("/:id", authorization_middleware_1.default, this.deleteDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map