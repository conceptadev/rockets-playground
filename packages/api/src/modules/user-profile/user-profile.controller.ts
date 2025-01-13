import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  AccessControlCreateOne,
  AccessControlQuery,
  AccessControlReadMany,
  AccessControlReadOne,
  AccessControlUpdateOne,
} from '@concepta/nestjs-access-control';
import {
  CrudBody,
  CrudController,
  CrudCreateOne,
  CrudReadMany,
  CrudReadOne,
  CrudRequest,
  CrudRequestInterface,
  CrudUpdateOne,
} from '@concepta/nestjs-crud';
import {
  UserProfileCreateDto,
  UserProfileDto,
  UserProfilePaginatedDto,
  UserProfileUpdateDto,
} from 'rockets-playground-common';
import { UserProfileResource } from './user-profile.types';
import { UserProfileCrudService } from './user-profile-crud.service';
import { UserProfileAccessQueryService } from './user-profile-access-query.service';

@ApiBearerAuth()
@ApiTags(UserProfileResource.One)
@CrudController({
  path: UserProfileResource.One,
  model: {
    type: UserProfileDto,
    paginatedType: UserProfilePaginatedDto,
  },
  join: {
    user: {
      eager: true,
      alias: 'user',
    },
    'user.userRoles': {
      eager: true,
      alias: 'userRoles',
    },
    'user.userRoles.role': {
      eager: true,
      alias: 'role',
    },
  },
})
@AccessControlQuery({ service: UserProfileAccessQueryService })
export class UserProfileController {
  constructor(
    private readonly userProfileCrudService: UserProfileCrudService,
  ) {}

  @CrudReadMany()
  @AccessControlReadMany(UserProfileResource.Many)
  async getMany(@CrudRequest() crudRequest: CrudRequestInterface) {
    return this.userProfileCrudService.getMany(crudRequest);
  }

  @CrudReadOne()
  @AccessControlReadOne(UserProfileResource.One)
  async getOne(@CrudRequest() crudRequest: CrudRequestInterface) {
    return this.userProfileCrudService.getOne(crudRequest);
  }

  @CrudCreateOne()
  @AccessControlCreateOne(UserProfileResource.One)
  async createOne(
    @CrudRequest() crudRequest: CrudRequestInterface,
    @CrudBody() userProfileCreateDto: UserProfileCreateDto,
  ) {
    return this.userProfileCrudService.createOne(
      crudRequest,
      userProfileCreateDto,
    );
  }

  @CrudUpdateOne()
  @AccessControlUpdateOne(UserProfileResource.One)
  async updateOne(
    @CrudRequest() crudRequest: CrudRequestInterface,
    @CrudBody() userProfileUpdateDto: UserProfileUpdateDto,
  ) {
    return this.userProfileCrudService.updateOne(
      crudRequest,
      userProfileUpdateDto,
    );
  }
}
