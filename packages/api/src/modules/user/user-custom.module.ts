import { Global, Module } from '@nestjs/common';
import { UserCustomLookupService } from './user-custom-lookup.service';
import { UserCustomMutateService } from './user-custom-mutate.service';

@Global()
@Module({
  providers: [UserCustomLookupService, UserCustomMutateService],
  exports: [UserCustomLookupService, UserCustomMutateService],
})
export class UserCustomModule {}
