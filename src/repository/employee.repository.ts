import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class EmployeeRepository{
    static find: any;
    constructor(private repository: Repository<Employee>) {

        
    }

    async find() {
        return this.repository.find({
            relations:["address","department"]
        });
    }

    async findOneBy(filter: Partial<Employee>) {
        return this.repository.findOne({
            where: filter,
            relations: ["address","department"]
        });
    }

    async save(newEmployee:Employee){
        return this.repository.save(newEmployee);
    }

    async softDelete(id:number):Promise<void>{
        await this.repository.softDelete(id);
    }

    async softRemove(employee:Employee):Promise<void>{
        await this.repository.softRemove(employee);
    }

    async update(updateEmployee: Partial<Employee>) {
        return this.repository.save(updateEmployee);

    }
    
    async patch(patchEmployee: Partial<Employee>) {
        return this.repository.save(patchEmployee);

    }
}

export default EmployeeRepository;