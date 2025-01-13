/**
 * !!!!! You MUST run build for changes in this   !!!!!!
 * !!!!! file to take effect for all CLI commands !!!!!!
 */

import { registerAs } from '@nestjs/config';
import { UserEntity } from '../modules/user/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRoleEntity } from '../modules/user-role/user-role.entity';
import { UserOtpEntity } from '../entities/user-otp.entity';
import { DataSourceOptions } from 'typeorm';
import { UserProfileEntity } from '../modules/user-profile/user-profile.entity';
import { StoreEntity } from '../modules/store/store.entity';
import { ProductEntity } from '../modules/product/product.entity';

export const ormConfigFactory = (): DataSourceOptions => {
  return {
    type: 'postgres',
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@rockets-starter-postgres:5432/rockets-starter',
    migrationsRun:
      'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
        ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
        : false,
    synchronize: false,
    entities: [
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      UserOtpEntity,
      UserProfileEntity,
      StoreEntity,
      ProductEntity,
    ],
    subscribers: [__dirname + '/../**/*.subscriber.js'],
    migrations: [__dirname + '/../migrations/*.js'],
    extra: {
      ssl:
        process.env?.DATABASE_SSL === 'true'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    },
  };
};

export const ormConfig = registerAs('TYPEORM_MODULE_CONFIG', ormConfigFactory);
