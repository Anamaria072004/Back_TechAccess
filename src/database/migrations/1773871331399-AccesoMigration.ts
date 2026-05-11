import { MigrationInterface, QueryRunner } from "typeorm";

export class AccesoMigration1773871331399 implements MigrationInterface {
    name = 'AccesoMigration1773871331399'

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`CREATE TABLE "accesos" (
            "id" SERIAL NOT NULL, 
            "usuarioId" integer NOT NULL, 
            "horaIngreso" TIMESTAMP NOT NULL DEFAULT now(), 
            "horaSalida" TIMESTAMP, 
            "fecha" DATE NOT NULL DEFAULT now(), 
            "observacion" character varying, 
            CONSTRAINT "PK_75b1bfc93410af04429a40bb30f" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`ALTER TABLE "accesos" 
            ADD CONSTRAINT "FK_accesos_usuario" 
            FOREIGN KEY ("usuarioId") 
            REFERENCES "user"("id") 
            ON DELETE CASCADE
        `);

        await queryRunner.query(`CREATE INDEX "IDX_accesos_usuarioId" ON "accesos"("usuarioId")`);
       
        await queryRunner.query(`CREATE INDEX "IDX_accesos_fecha" ON "accesos"("fecha")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`DROP INDEX "IDX_accesos_fecha"`);
        await queryRunner.query(`DROP INDEX "IDX_accesos_usuarioId"`);
        await queryRunner.query(`ALTER TABLE "accesos" DROP CONSTRAINT "FK_accesos_usuario"`);
        await queryRunner.query(`DROP TABLE "accesos"`);
    }
}