import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

class AbstractEntity {
    @PrimaryGeneratedColumn()
    id:number;
    
    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
}
export default AbstractEntity;