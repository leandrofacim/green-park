import { MigrationInterface, QueryRunner } from 'typeorm'

export class Lote1589174610715 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS lotes (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255) NOT NULL
        );
      `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS lotes;
      `)
  }
}
