import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { PERMISSIONS_KEY } from 'src/constants/rbac.constants';
import { ActionName } from '../enums/action.enum';
import { ResourceName } from '../enums/resource.enum';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private awsService: AwsService,
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

    const { user, url } = context.switchToHttp().getRequest();
    const userEntity = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: [
        'role',
        'role.permissions',
        'role.permissions.action',
        'role.permissions.resource',
      ],
    });
    if (!userEntity?.role?.permissions) return false;

    const { permissions } = userEntity.role;

    const canAccess = methodPermissions.every(({ actionName, resourceName }) =>
      permissions.some(
        ({ action, resource }) =>
          action.actionName === actionName &&
          resource.resourceName === resourceName,
      ),
    );

    this.awsService.recordUserAccess({
      userType: userEntity.role.roleName,
      endpoint: url,
      ableToAccess: `${canAccess}`,
    });

    return canAccess;
  }
}
