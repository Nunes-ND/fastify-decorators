import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1756763376307 implements MigrationInterface {
  name = 'CreateUser1756763376307';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "firstName" varchar(50) NOT NULL,
        "lastName" varchar(50) NOT NULL
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "users"
    `);
  }
}
