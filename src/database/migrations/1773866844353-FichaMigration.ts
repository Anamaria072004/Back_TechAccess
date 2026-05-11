import { MigrationInterface, QueryRunner } from "typeorm";

export class FichaMigration1773866844353 implements MigrationInterface {
    name = 'FichaMigration1773866844353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ficha" ("id" SERIAL NOT NULL, "numficha" character varying(10) NOT NULL, "programa" character varying(100) NOT NULL, "nivelFormacion" character varying(20) NOT NULL, "jornada" character varying(20) NOT NULL, "estado" character varying(20) NOT NULL, "fechaInicio" date NOT NULL, "fechaFin" date NOT NULL, CONSTRAINT "PK_00e85ebf7b3b91cebebcef6906c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ficha"`);
    }

}
