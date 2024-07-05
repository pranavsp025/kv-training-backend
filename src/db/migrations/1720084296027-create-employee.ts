import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1720084296027 implements MigrationInterface {
    name = 'CreateEmployee1720084296027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
