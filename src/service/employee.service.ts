import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import bcrypt from "bcrypt";
import { EntityNotFoundError, getRepository } from "typeorm";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";
// import IncorrectPasswordException from "../exceptions/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "./department.services";
import dataSource from "../db/data-source.db";



class EmployeeService {
    
    constructor(private employeeRepository:EmployeeRepository) {

    }

    async getAllEmployees():Promise<Employee[]> {
        return this.employeeRepository.find();
    }
    async getEmployeeById(id: number): Promise<Employee | null> {
        return this.employeeRepository.findOneBy({id});
    }
    async createEmployee(employee:any,address:Address): Promise<Employee | null>  {
        const newEmployee = new Employee();
        newEmployee.email=employee.email;
        newEmployee.name=employee.name;
        newEmployee.age=employee.age;
        newEmployee.password=employee.password ? await bcrypt.hash(employee.password,10):"";
        newEmployee.role=employee.role;
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        newEmployee.address=newAddress;
        const departmentService = await new DepartmentService(new DepartmentRepository(dataSource.getRepository(Department)) )
        const department=await departmentService.getDepartmentById(employee.department.department_id);
        if(employee.department.id!==department.id){
            console.log("error")
        }
        newEmployee.department = department;

        console.log(newEmployee);

        return this.employeeRepository.save(newEmployee);
    }

    async updateEmployee(id:number,updateEmployee:Employee): Promise<Employee | null>  {
        const employee = await this.employeeRepository.findOneBy({id});
        employee.name = updateEmployee.name;
        employee.email = updateEmployee.email;
        employee.age = updateEmployee.age;
        employee.password = updateEmployee.password ? await bcrypt.hash(updateEmployee.password,10):"";
        employee.role = updateEmployee.role;
        employee.address.line1 = updateEmployee.address?.line1;
        employee.address.pincode = updateEmployee.address?.pincode;
        employee.department = updateEmployee.department;
        return this.employeeRepository.save(employee);
    }

    async patchEmployee(id:number,patchEmployee:Employee): Promise<Employee | null>  {
        const employee = await this.employeeRepository.findOneBy({id});
        employee.name = patchEmployee.name;
        employee.email = patchEmployee.email;
        employee.age = patchEmployee.age;
        employee.password = patchEmployee.password ? await bcrypt.hash(patchEmployee.password,10):"";
        employee.role = patchEmployee.role;
        employee.address.line1 = patchEmployee.address?.line1;
        employee.address.pincode = patchEmployee.address?.pincode;
        employee.department = patchEmployee.department;
        return this.employeeRepository.save(employee);
    }

    async delete(id:number){
        const employee = await this.employeeRepository.findOneBy({id});
        await this.employeeRepository.softRemove(employee);
    }

    loginEmployee = async(email:string,password:string)=>{
        const employee = await this.employeeRepository.findOneBy({email});
        if(!employee){
            throw new Error;
            // throw new EntityNotFoundError(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        const result = await bcrypt.compare(password, employee.password);
        if(!result){
            throw new Error;
            // throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        
        }

        const payload:jwtPayload = {
            name:employee.name,
            email:employee.email,
            role:employee.role,
        };
        const token = jsonwebtoken.sign(payload, JWT_SECRET,{expiresIn:JWT_VALIDITY});
        return{token};
    }
}
export default EmployeeService;