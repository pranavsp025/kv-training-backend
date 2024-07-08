import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository{
    static find: any;
    constructor(private repository: Repository<Department>) {

        
    }


    async find() {
        return this.repository.find({
            relations:["employee"]
        });
    }

    async findOneBy(filter: Partial<Department>) {
        const result = await this.repository.findOne({
            where: filter,
            relations: ["employee"]
        });
        return result;
    }

    async save(newDepartment:Department){
        return this.repository.save(newDepartment);
    }

    async softDelete(id:number):Promise<void>{
        await this.repository.softDelete(id);
    }

    async softRemove(department:Department):Promise<void>{
        await this.repository.softRemove(department);
    }

    async update(updateDepartment: Partial<Department>) {
        return this.repository.save(updateDepartment);

    }
}
export default DepartmentRepository