import { MigrationInterface, QueryRunner } from 'typeorm';
import { PasswordStorageService } from '@concepta/nestjs-password';
import { UserEntityInterface } from '@concepta/nestjs-user';
import { PasswordPlainInterface } from '@concepta/nestjs-common';

export class AddUserAdminContributorRole1736734870130
  implements MigrationInterface
{
  name = 'AddUserAdminContributorRole1736734870130';

  passwordStorageService = new PasswordStorageService();

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "role" ("name", "description", "version") VALUES
        ($1, $2, 1), 
        ($3, $4, 1)`,
      [
        'User',
        'User role',
        'SuperAdmin',
        'A super admin role with all permissions',
      ],
    );

    const superAdminUserObject: Partial<UserEntityInterface> &
      PasswordPlainInterface = {
      email: 'admin@conceptatech.com',
      password: 'Test1234',
      username: 'admin@conceptatech.com',
    };

    // Use password storage service to hash and delete password property
    const superAdminUserHashed = await this.passwordStorageService.hashObject(
      superAdminUserObject,
    );

    // Create super admin user
    const [superAdminUser] = await queryRunner.query(
      `INSERT INTO "user" ("email", "passwordHash", "passwordSalt", "username", "version") VALUES ($1, $2, $3, $4, 1) RETURNING "id"`,
      [
        superAdminUserHashed.email,
        superAdminUserHashed.passwordHash,
        superAdminUserHashed.passwordSalt,
        superAdminUserHashed.email,
      ],
    );

    const [superAdminRole] = await queryRunner.query(
      `SELECT id FROM "role" WHERE name = 'SuperAdmin'`,
    );

    // Create admin role assignment
    await queryRunner.query(
      `INSERT INTO "user_role" ("roleId", "assigneeId", "version") VALUES ($1, $2, 1)`,
      [superAdminRole.id, superAdminUser.id],
    );

    // Create super admin user profile
    await queryRunner.query(
      `INSERT INTO "user_profile" ("id", "fullName", "userId", "dateCreated", "dateUpdated", "version") VALUES ($1, $2, $3, now(), now(), 1)`,
      [superAdminUser.id, 'Super Admin', superAdminUser.id],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user_profile" WHERE "userId" = (SELECT "id" FROM "user" WHERE "email" = 'admin@conceptatech.com')`,
    );
    await queryRunner.query(
      `DELETE FROM "user_role" WHERE "assigneeId" = (SELECT "id" FROM "user" WHERE "email" = 'admin@conceptatech.com')`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'admin@conceptatech.com'`,
    );
    await queryRunner.query(
      `DELETE FROM "role" WHERE name IN ('Contributor', 'SuperAdmin')`,
    );
  }
}
