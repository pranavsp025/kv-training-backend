import { Column, Entity, JoinColumn, OneToMany, Unique } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity{
    // @Column()
    // department_id:number;

    @Column({unique:true})
    department_name:string;

    
    @OneToMany(() => Employee, (employee) => employee.department,{
        
    })
    @JoinColumn()
    employee:Employee[];
    department_id: number;

    
}
export default Department;