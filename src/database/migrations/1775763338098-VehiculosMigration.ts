import { MigrationInterface, QueryRunner } from "typeorm";

export class VehiculosMigration1775763338098 implements MigrationInterface {
    name = 'VehiculosMigration1775763338098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Solo creamos la tabla nueva
        await queryRunner.query(`
            CREATE TABLE "vehiculo" (
                "id" SERIAL NOT NULL, 
                "placa" character varying(20) NOT NULL, 
                "tipoVehiculo" character varying(100) NOT NULL, 
                "marca" character varying(100) NOT NULL, 
                "color" character varying(50) NOT NULL, 
                "modelo" character varying(100) NOT NULL, 
                "usuarioId" integer, 
                CONSTRAINT "UQ_c552e0abe606891face75e9c115" UNIQUE ("placa"), 
                CONSTRAINT "PK_79ad0f38366031fd4f2c1efdc62" PRIMARY KEY ("id")
            )
        `);

        // Solo añadimos el Constraint que relaciona vehiculo con user
        await queryRunner.query(`
            ALTER TABLE "vehiculo" 
            ADD CONSTRAINT "FK_d034a0412b1677f5584c6e696b5" 
            FOREIGN KEY ("usuarioId") REFERENCES "user"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Deshacemos solo lo que hicimos arriba
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_d034a0412b1677f5584c6e696b5"`);
        await queryRunner.query(`DROP TABLE "vehiculo"`);
    }
}