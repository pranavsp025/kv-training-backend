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
const jest_when_1 = require("jest-when");
const employee_entity_1 = __importDefault(require("../../src/entity/employee.entity"));
const employee_repository_1 = __importDefault(require("../../src/repository/employee.repository"));
const employee_service_1 = __importDefault(require("../../src/service/employee.service"));
const http_exceptions_1 = __importDefault(require("../../src/exceptions/http.exceptions"));
describe('Employee Service', () => {
    let employeeRepository;
    let employeeService;
    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new employee_repository_1.default(dataSource.getRepository(employee_entity_1.default));
        employeeService = new employee_service_1.default(employeeRepository);
    });
    it('should return allEmploees', () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;
        const users = yield employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    }));
    it('should return employee by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = jest.fn();
        (0, jest_when_1.when)(mock).calledWith({ id: 1 }).mockResolvedValue({ id: 1, "name": "sample" });
        employeeRepository.findOneBy = mock;
        const users = yield employeeService.getEmployeeById(1);
        expect(users.name).toEqual("sample");
        expect(mock).toHaveBeenCalledTimes(1);
    }));
    it('should throw exception', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedFunction = jest.fn();
        (0, jest_when_1.when)(mockedFunction).mockResolvedValue(null);
        employeeRepository.findOneBy = mockedFunction;
        yield expect(employeeService.loginEmployee('nonexistent@example.com', 'password'))
            .rejects
            .toThrow(http_exceptions_1.default);
    }));
});
//# sourceMappingURL=employee.service.test.js.map