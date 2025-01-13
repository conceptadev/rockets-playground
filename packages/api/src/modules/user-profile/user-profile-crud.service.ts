import { DeepPartial, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@concepta/nestjs-crud';
import { InjectDynamicRepository } from '@concepta/nestjs-typeorm-ext';
import { CrudQueryOptionsInterface } from '@concepta/nestjs-crud/dist/interfaces/crud-query-options.interface';
import { CrudRequest } from '@nestjsx/crud';
import { HttpStatus } from '@nestjs/common';
import { RoleService, RoleLookupService } from '@concepta/nestjs-role';
import { UserMutateService } from '@concepta/nestjs-user';
import { UserProfileCreatableInterface } from 'rockets-playground-common';
import { UserProfileEntity } from './user-profile.entity';
import { USER_ROLE_ASSIGNMENT_KEY } from '../user-role/user-role.constants';
import { UserProfileException } from './user-profile.exception';
import { USER_PROFILE_ENTITY_KEY } from './user-profile.constant';

export class UserProfileCrudService extends TypeOrmCrudService<UserProfileEntity> {
  constructor(
    @InjectDynamicRepository(USER_PROFILE_ENTITY_KEY)
    public repo: Repository<UserProfileEntity>,
    private readonly roleService: RoleService,
    private readonly userMutateService: UserMutateService,
    private readonly roleLookupService: RoleLookupService,
  ) {
    super(repo);
  }

  override createOne(
    req: CrudRequest,
    dto: DeepPartial<UserProfileCreatableInterface>,
    queryOptions?: CrudQueryOptionsInterface,
  ): Promise<UserProfileEntity> {
    return this.transaction().commit(async (_transaction) => {
      const { email, roleId, ...userProfileDto } = dto;

      const role = await this.roleLookupService.byId(roleId);

      if (!role) {
        throw new UserProfileException({
          httpStatus: HttpStatus.BAD_REQUEST,
          message: 'Role not found.',
        });
      }

      const user = await this.userMutateService.create({
        email,
        username: email,
      });

      await this.roleService.assignRole(USER_ROLE_ASSIGNMENT_KEY, role, user);

      const userProfile = await super.createOne(
        req,
        {
          ...userProfileDto,
          userId: user.id,
        },
        queryOptions,
      );

      return userProfile;
    });
  }
}
