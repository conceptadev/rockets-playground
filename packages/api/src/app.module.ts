import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthJwtModule } from '@concepta/nestjs-auth-jwt';
import { AuthLocalModule } from '@concepta/nestjs-auth-local';
import { AuthRefreshModule } from '@concepta/nestjs-auth-refresh';
import { AuthenticationModule } from '@concepta/nestjs-authentication';
import { AccessControlModule } from '@concepta/nestjs-access-control';
import { CrudModule } from '@concepta/nestjs-crud';
import { JwtModule } from '@concepta/nestjs-jwt';
import { PasswordModule } from '@concepta/nestjs-password';
import { SwaggerUiModule } from '@concepta/nestjs-swagger-ui';
import {
  TypeOrmExtModule,
  TypeOrmExtOptions,
} from '@concepta/nestjs-typeorm-ext';
import {
  UserAccessQueryService,
  UserLookupService,
  UserModule,
  UserMutateService,
} from '@concepta/nestjs-user';
import { RoleModule } from '@concepta/nestjs-role';
import { AuthRecoveryModule } from '@concepta/nestjs-auth-recovery';
import { OtpModule, OtpService } from '@concepta/nestjs-otp';
import { EmailModule, EmailService } from '@concepta/nestjs-email';
import {
  LoggerSentryModule,
  LoggerSentryTransport,
} from '@concepta/nestjs-logger-sentry';
import { LoggerModule } from '@concepta/nestjs-logger';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

import { serverConfig } from './config/server.config';
import { ormConfig } from './config/typeorm.config';
import { RoleEntity } from './entities/role.entity';
import { UserOtpEntity } from './entities/user-otp.entity';
import { UserEntity } from './modules/user/user.entity';
import { UserRoleEntity } from './modules/user-role/user-role.entity';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { acRules } from './app.acl';
import { UserCustomLookupService } from './modules/user/user-custom-lookup.service';
import { UserCustomModule } from './modules/user/user-custom.module';
import { StoreModule } from './modules/store/store.module';
import { mailerConfig } from './config/mailer.config';
import {
  USER_ROLE_ASSIGNMENT_KEY,
  USER_ROLE_ENTITY_KEY,
} from './modules/user-role/user-role.constants';
import { UserProfileAccessQueryService } from './modules/user-profile/user-profile-access-query.service';
import { MeModule } from './modules/me/me.module';
import { envValidator } from './common/utils/env-validator.util';
import { DatabaseConfigSchema } from './common/schema/database-config.schema';
import { AuthConfigSchema } from './common/schema/auth-config.schema';
import { SentryConfigSchema } from './common/schema/sentry-config.schema';
import { authRecoveryConfig } from './config/auth-recovery.config';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, ormConfig, mailerConfig, authRecoveryConfig],
      validate: envValidator(
        DatabaseConfigSchema,
        SentryConfigSchema,
        AuthConfigSchema,
      ),
    }),
    SwaggerUiModule.register({}),
    TypeOrmExtModule.forRootAsync({
      inject: [ormConfig.KEY],
      useFactory: (config: TypeOrmExtOptions) => config,
    }),
    JwtModule.forRoot({}),
    AuthenticationModule.forRoot({}),
    AuthLocalModule.registerAsync({ ...createUserOpts() }),
    AuthJwtModule.forRootAsync({ ...createUserOpts() }),
    AuthRefreshModule.registerAsync({ ...createUserOpts() }),
    PasswordModule.forRoot({
      settings: {
        requireCurrentToUpdate: true,
      },
    }),
    CrudModule.forRoot({}),
    RoleModule.forRoot({
      settings: {
        assignments: {
          [USER_ROLE_ASSIGNMENT_KEY]: { entityKey: USER_ROLE_ENTITY_KEY },
        },
      },
      entities: {
        role: {
          entity: RoleEntity,
        },
        userRole: {
          entity: UserRoleEntity,
        },
      },
    }),
    MailerModule.forRootAsync({
      inject: [mailerConfig.KEY],
      useFactory: async (config: ConfigType<typeof mailerConfig>) => config,
    }),
    EmailModule.forRootAsync({
      inject: [MailerService],
      useFactory: (mailerService: MailerService) => ({ mailerService }),
    }),
    OtpModule.forRoot({
      entities: {
        userOtp: {
          entity: UserOtpEntity,
        },
      },
    }),
    AuthRecoveryModule.registerAsync({
      inject: [
        UserLookupService,
        UserMutateService,
        OtpService,
        EmailService,
        authRecoveryConfig.KEY,
      ],
      useFactory: (
        userLookupService,
        userMutateService,
        otpService,
        emailService,
        settings: ConfigType<typeof authRecoveryConfig>,
      ) => ({
        settings,
        userLookupService,
        userMutateService,
        otpService,
        emailService,
      }),
    }),
    UserModule.forRootAsync({
      imports: [UserCustomModule],
      inject: [UserCustomLookupService],
      useFactory: (userLookupService: UserCustomLookupService) => ({
        userLookupService,
      }),
      entities: {
        user: { entity: UserEntity },
      },
    }),
    AccessControlModule.forRoot({
      settings: { rules: acRules },
      imports: [UserProfileModule],
      queryServices: [UserAccessQueryService, UserProfileAccessQueryService],
    }),
    LoggerSentryModule.forRoot({}),
    LoggerModule.forRootAsync({
      inject: [LoggerSentryTransport],
      useFactory: (loggerSentryTransport: LoggerSentryTransport) => {
        return {
          transports: [loggerSentryTransport],
        };
      },
    }),
    UserProfileModule,
    StoreModule,
    ProductModule,
    MeModule,
  ],
})
export class AppModule {}

function createUserOpts() {
  return {
    inject: [UserLookupService],
    useFactory: (userLookupService: UserLookupService) => ({
      userLookupService,
    }),
  };
}
