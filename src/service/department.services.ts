import bcrypt from "bcrypt";
import { EntityNotFoundError } from "typeorm";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
// import IncorrectPasswordException from "../exceptions/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";



class DepartmentService {
    
    constructor(private departmentRepository:DepartmentRepository) {

    }

    async getAllDepartments():Promise<Department[]> {
        return this.departmentRepository.find();
    }
    async getDepartmentById(id: number): Promise<Department | null> {
        return this.departmentRepository.findOneBy({id});
    }
    
    async createDepartment(department:Department): Promise<Department | null>  {
        const newDepartment = new Department();
        newDepartment.department_name = department.department_name;


        return this.departmentRepository.save(newDepartment);
    }

    async updateDepartment(id:number,updateDepartment:Department): Promise<Department | null>  {
        const department = await this.departmentRepository.findOneBy({id});
        
        department.department_name = updateDepartment.department_name;


        return this.departmentRepository.save(department);
    }

    async delete(id:number){
        const department = await this.departmentRepository.findOneBy({id});
        await this.departmentRepository.softRemove(department);
        
    }
    
    
}
export default DepartmentService;