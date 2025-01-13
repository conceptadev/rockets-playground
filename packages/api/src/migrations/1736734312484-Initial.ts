import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1736734312484 implements MigrationInterface {
  name = 'Initial1736734312484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_otp" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "type" character varying, "passcode" character varying NOT NULL, "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "assigneeId" uuid NOT NULL, CONSTRAINT "PK_494c022ed33e6ee19a2bbb11b22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_51cb79b5555effaf7d69ba1cff" UNIQUE ("userId"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid NOT NULL, "assigneeId" uuid NOT NULL, CONSTRAINT "UQ_0aba75700a541379ebff645c8da" UNIQUE ("roleId", "assigneeId"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "passwordHash" text, "passwordSalt" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "imageUrl" character varying, "active" boolean NOT NULL DEFAULT true, "price" numeric NOT NULL, "stock" integer NOT NULL, "storeId" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "address" character varying NOT NULL, "description" character varying, "city" character varying, "state" character varying, "zipCode" character varying, "openingTime" TIME, "closingTime" TIME, "active" boolean, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_otp" ADD CONSTRAINT "FK_beffb5a47aeba564f383d642ea9" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_5de24d2b69d7e7cc8cbb731f053" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_5de24d2b69d7e7cc8cbb731f053"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_otp" DROP CONSTRAINT "FK_beffb5a47aeba564f383d642ea9"`,
    );
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user_profile"`);
    await queryRunner.query(`DROP TABLE "user_otp"`);
  }
}
