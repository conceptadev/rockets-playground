import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LookupService } from '@concepta/typeorm-common';
import { InjectDynamicRepository } from '@concepta/nestjs-typeorm-ext';
import { UserProfileInterface } from 'rockets-playground-common';
import { USER_PROFILE_ENTITY_KEY } from './user-profile.constant';

@Injectable()
export class UserProfileLookupService extends LookupService<UserProfileInterface> {
  constructor(
    @InjectDynamicRepository(USER_PROFILE_ENTITY_KEY)
    repo: Repository<UserProfileInterface>,
  ) {
    super(repo);
  }
}
