import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusAdd1721207468786 implements MigrationInterface {
    name = 'StatusAdd1721207468786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
    }

}
