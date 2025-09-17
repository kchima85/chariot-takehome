import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1751678681959 implements MigrationInterface {
  name = 'CreateUsersTable1751678681959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstName" character varying(255), "lastName" character varying(255), "bio" text, "avatar" character varying(255), "isVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
