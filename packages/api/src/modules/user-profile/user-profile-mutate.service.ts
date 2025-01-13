import { MutateService } from '@concepta/typeorm-common';
import { Injectable } from '@nestjs/common';
import { InjectDynamicRepository } from '@concepta/nestjs-typeorm-ext';
import {
  UserProfileInterface,
  UserProfileCreatableInterface,
  UserProfileUpdatableInterface,
  UserProfileCreateDto,
  UserProfileUpdateDto,
} from 'rockets-playground-common';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { USER_PROFILE_ENTITY_KEY } from './user-profile.constant';

@Injectable()
export class UserProfileMutateService extends MutateService<
  UserProfileInterface,
  UserProfileCreatableInterface,
  UserProfileUpdatableInterface
> {
  protected createDto = UserProfileCreateDto;
  protected updateDto = UserProfileUpdateDto;

  constructor(
    @InjectDynamicRepository(USER_PROFILE_ENTITY_KEY)
    repo: Repository<UserProfileEntity>,
  ) {
    super(repo);
  }
}
