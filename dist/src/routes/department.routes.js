"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const department_controller_1 = __importDefault(require("../controller/department.controller"));
const data_source_db_1 = __importDefault(require("../db/data-source.db"));
const department_entity_1 = __importDefault(require("../entity/department.entity"));
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const department_services_1 = __importDefault(require("../service/department.services"));
const departmentController = new department_controller_1.default(new department_services_1.default(new department_repository_1.default(data_source_db_1.default.getRepository(department_entity_1.default))));
const departmentRouter = departmentController.router;
exports.default = departmentRouter;
//# sourceMappingURL=department.routes.js.map