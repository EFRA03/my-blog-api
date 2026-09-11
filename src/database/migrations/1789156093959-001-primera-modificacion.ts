import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeraModificacion1789156093959 implements MigrationInterface {
    name = '001PrimeraModificacion1789156093959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(800)`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "cover_imager" character varying(800)`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "cover_image" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "cover_image" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "cover_imager"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

}
