/* eslint-disable @darraghor/nestjs-typed/api-method-should-specify-api-response */
import {
  CrudAction,
  CrudController,
  CrudJoin,
  CrudRequest,
  CrudRequestInterface,
  CrudSerialize,
  CrudValidate,
} from '@concepta/nestjs-crud';
import { CrudApiResponse } from '@concepta/nestjs-crud/dist/decorators/openapi/crud-api-response.decorator';
import { UserCrudService } from '@concepta/nestjs-user';
import {
  AccessControlGuard,
  AccessControlReadOne,
} from '@concepta/nestjs-access-control';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@concepta/nestjs-auth-jwt';
import { AuthUser } from '@concepta/nestjs-authentication';
import { CrudActions } from '@concepta/nestjs-crud/dist/crud.enums';
import { UserLocalDto, UserLocalInterface } from 'rockets-playground-common';
import { MeResource } from './me.types';

@ApiBearerAuth()
@ApiTags(MeResource.One)
@CrudController({
  path: MeResource.One,
  model: {
    type: UserLocalDto,
  },
})
@UseGuards(JwtAuthGuard, AccessControlGuard)
export class MeController {
  constructor(private userCrudService: UserCrudService) {}

  @Get()
  @CrudAction(CrudActions.ReadOne)
  @CrudJoin({
    userRoles: {
      eager: true,
      alias: 'userRoles',
    },
    'userProfile.role': {
      eager: true,
      alias: 'role',
    },
    userProfile: {
      eager: true,
    },
  })
  @CrudValidate()
  @CrudSerialize()
  @CrudApiResponse(CrudActions.ReadOne)
  @AccessControlReadOne(MeResource.One)
  async getOne(
    @CrudRequest() crudRequest: CrudRequestInterface,
    @AuthUser() user: UserLocalInterface,
  ) {
    return this.userCrudService.getOne(crudRequest, {
      filter: { id: user.id },
    });
  }
}
