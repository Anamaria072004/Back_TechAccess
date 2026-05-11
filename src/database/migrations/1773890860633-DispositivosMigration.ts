import { MigrationInterface, QueryRunner } from "typeorm";

export class DispositivosMigration1773890860633 implements MigrationInterface {
    name = 'DispositivosMigration1773890860633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ficha" RENAME COLUMN "fechaFin" TO "fechafin"`);
        await queryRunner.query(`CREATE TABLE "dispositivo" ("id" SERIAL NOT NULL, "tipoDispositivo" character varying(255) NOT NULL, "marca" character varying(255) NOT NULL, "color" character varying(100) NOT NULL, "usuarioId" integer, CONSTRAINT "PK_86bfbecafb42ad256f14c64e38c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fichasId" integer`);
        await queryRunner.query(`ALTER TABLE "dispositivo" ADD CONSTRAINT "FK_39577616142293bed3af5602584" FOREIGN KEY ("usuarioId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_481f49bfbe49cdeea5bfd643b3a" FOREIGN KEY ("fichasId") REFERENCES "ficha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_481f49bfbe49cdeea5bfd643b3a"`);
        await queryRunner.query(`ALTER TABLE "dispositivo" DROP CONSTRAINT "FK_39577616142293bed3af5602584"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fichasId"`);
        await queryRunner.query(`DROP TABLE "dispositivo"`);
        await queryRunner.query(`ALTER TABLE "ficha" RENAME COLUMN "fechafin" TO "fechaFin"`);
    }

}
