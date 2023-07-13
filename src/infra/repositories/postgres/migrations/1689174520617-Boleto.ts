import { MigrationInterface, QueryRunner } from 'typeorm'

export class Boleto1689174520617 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS boletos (
          id SERIAL PRIMARY KEY,
          nome_sacado VARCHAR(255) NOT NULL,
          lote SERIAL NOT NULL,
          valor numeric(10,2) NOT NULL,
          linha_digitavel VARCHAR(255) NOT NULL,
          ativo boolean NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT fk_boleto_lote FOREIGN KEY (lote) REFERENCES lotes(id)
        );
      `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS boletos;
      `)
  }
}
