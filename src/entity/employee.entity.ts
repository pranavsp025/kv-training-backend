import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity{
    
    @Column()
    name:string;
    
    @Column()
    email:string;

    @Column()
    age:number;

    @Column({nullable:true})
    status:string;

    @Column({nullable:true})
    experience:string;
    
    @OneToOne(() => Address, (address)=> address.employee, {
        cascade:true,
        onDelete:"CASCADE"
    })
    address:Address;

    @Column({nullable:true})
    password:string;

    @Column({nullable:true })
    role:Role;
    Department: any;

    @ManyToOne(()=> Department, (department)=> department.employee,{
        cascade:["insert", "update"]
    })
    department:Department;
}

export default Employee;

