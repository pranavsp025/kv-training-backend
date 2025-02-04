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
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const address_entity_1 = __importDefault(require("../entity/address.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const department_entity_1 = __importDefault(require("../entity/department.entity"));
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const department_services_1 = __importDefault(require("./department.services"));
const data_source_db_1 = __importDefault(require("../db/data-source.db"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.loginEmployee = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneBy({ email });
            if (!employee) {
                throw new Error;
                // throw new EntityNotFoundError(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
            }
            const result = yield bcrypt_1.default.compare(password, employee.password);
            if (result) {
                throw new Error;
                // throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
            }
            const payload = {
                name: employee.name,
                email: employee.email,
                role: employee.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, { expiresIn: constants_1.JWT_VALIDITY });
            return { token };
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.find();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneBy({ id });
        });
    }
    createEmployee(employee, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.email = employee.email;
            newEmployee.name = employee.name;
            newEmployee.role = employee.role;
            newEmployee.age = employee.age;
            newEmployee.status = employee.status;
            newEmployee.experience = employee.experience;
            newEmployee.password = employee.password ? yield bcrypt_1.default.hash(employee.password, 10) : "";
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.address = newAddress;
            const departmentService = yield new department_services_1.default(new department_repository_1.default(data_source_db_1.default.getRepository(department_entity_1.default)));
            const department = yield departmentService.getDepartmentById(employee.department.department_id);
            if (employee.department.id !== department.id) {
                console.log("error");
            }
            newEmployee.department = department;
            console.log(newEmployee);
            return this.employeeRepository.save(newEmployee);
        });
    }
    updateEmployee(id, updateEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const employee = yield this.employeeRepository.findOneBy({ id });
            employee.name = updateEmployee.name;
            employee.email = updateEmployee.email;
            employee.role = updateEmployee.role;
            employee.age = updateEmployee.age;
            employee.status = updateEmployee.status;
            employee.experience = updateEmployee.experience;
            employee.password = updateEmployee.password ? yield bcrypt_1.default.hash(updateEmployee.password, 10) : "";
            employee.address.line1 = (_a = updateEmployee.address) === null || _a === void 0 ? void 0 : _a.line1;
            employee.address.pincode = (_b = updateEmployee.address) === null || _b === void 0 ? void 0 : _b.pincode;
            employee.department = updateEmployee.department;
            return this.employeeRepository.save(employee);
        });
    }
    patchEmployee(id, patchEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const employee = yield this.employeeRepository.findOneBy({ id });
            employee.name = patchEmployee.name;
            employee.email = patchEmployee.email;
            employee.role = patchEmployee.role;
            employee.age = patchEmployee.age;
            employee.status = patchEmployee.status;
            employee.experience = patchEmployee.experience;
            employee.password = patchEmployee.password ? yield bcrypt_1.default.hash(patchEmployee.password, 10) : "";
            employee.address.line1 = (_a = patchEmployee.address) === null || _a === void 0 ? void 0 : _a.line1;
            employee.address.pincode = (_b = patchEmployee.address) === null || _b === void 0 ? void 0 : _b.pincode;
            employee.department = patchEmployee.department;
            return this.employeeRepository.save(employee);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneBy({ id });
            yield this.employeeRepository.softRemove(employee);
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map