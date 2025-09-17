import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1758084949415 implements MigrationInterface {
  name = 'CreatePaymentsTable1758084949415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "amount" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL, "scheduled_date" date NOT NULL, "recipient" character varying(255) NOT NULL, "status" character varying(50) NOT NULL DEFAULT 'pending', CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
  }
}
