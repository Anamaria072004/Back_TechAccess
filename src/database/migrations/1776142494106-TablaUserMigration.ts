import { MigrationInterface, QueryRunner } from "typeorm";

export class TablaUserMigration1776142494106 implements MigrationInterface {
    name = 'TablaUserMigration1776142494106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
