import { Module } from '@nestjs/common';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { UserProfileEntity } from './user-profile.entity';
import { UserProfileController } from './user-profile.controller';
import { UserProfileCrudService } from './user-profile-crud.service';
import { UserProfileLookupService } from './user-profile-lookup.service';
import { UserProfileAccessQueryService } from './user-profile-access-query.service';
import { USER_PROFILE_ENTITY_KEY } from './user-profile.constant';
import { UserProfileMutateService } from './user-profile-mutate.service';

@Module({
  imports: [
    TypeOrmExtModule.forFeature({
      [USER_PROFILE_ENTITY_KEY]: { entity: UserProfileEntity },
    }),
  ],
  controllers: [UserProfileController],
  providers: [
    UserProfileCrudService,
    UserProfileAccessQueryService,
    UserProfileLookupService,
    UserProfileMutateService,
  ],
  exports: [UserProfileLookupService, UserProfileMutateService],
})
export class UserProfileModule {}
