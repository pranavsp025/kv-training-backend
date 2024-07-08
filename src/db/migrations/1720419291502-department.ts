import { MigrationInterface, QueryRunner } from "typeorm";

export class Department1720419291502 implements MigrationInterface {
    name = 'Department1720419291502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "department_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "department_id"`);
    }

}
