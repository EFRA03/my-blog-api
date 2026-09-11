import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeVarchar1789158831944 implements MigrationInterface {
  // Nota: esta migración se hace de forma manual con SQL usando ALTER COLUMN.
  // TypeORM suele resolver cambios de tipo de columna con DROP COLUMN + ADD COLUMN
  // o con una recreación automática de la columna, por eso no se usa un cambio
  // automático y se hace la alteración directa con ALTER TABLE.

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "cover_image" TYPE character varying(900)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "cover_image" TYPE character varying(800)`);
    }

}
