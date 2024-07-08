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
const department_entity_1 = __importDefault(require("../entity/department.entity"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.find();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findOneBy({ id });
        });
    }
    createDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.department_name = department.department_name;
            return this.departmentRepository.save(newDepartment);
        });
    }
    updateDepartment(id, updateDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy({ id });
            department.department_name = updateDepartment.department_name;
            return this.departmentRepository.save(department);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy({ id });
            yield this.departmentRepository.softRemove(department);
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.services.js.map