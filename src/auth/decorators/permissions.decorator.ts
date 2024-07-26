import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from 'src/constants/rbac.constants';
import { ActionName } from '../enums/action.enum';
import { ResourceName } from '../enums/resource.enum';

export const Permissions = (...permissions: [ActionName, ResourceName][]) =>
  SetMetadata(
    PERMISSIONS_KEY,
    permissions.map(([actionName, resourceName]) => ({
      actionName,
      resourceName,
    })),
  );
