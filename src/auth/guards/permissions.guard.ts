import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { Permission } from '../models/permission.entity';
import { PERMISSIONS_KEY } from 'src/constants/rbac.constants';
import { ActionName } from '../enums/action.enum';
import { ResourceName } from '../enums/resource.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const methodPermissions =
      this.reflector.get<
        {
          actionName: ActionName;
          resourceName: ResourceName;
        }[]
      >(PERMISSIONS_KEY, context.getHandler()) || [];

    if (!methodPermissions.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userEntity = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: [
        'role',
        'role.permissions',
        'role.permissions.action',
        'role.permissions.resource',
      ],
    });
    if (!userEntity?.role) return false;
    const allPermissions = await Promise.all(
      methodPermissions.map(async ({ actionName, resourceName }) => {
        return await this.permissionsRepository.find({
          where: {
            action: { actionName },
            resource: { resourceName },
            roles: { roleId: userEntity.role.roleId },
          },
        });
      }),
    );

    return allPermissions.every((permissions) => permissions.length > 0); // the user must have all endpoint permissions
  }
}
