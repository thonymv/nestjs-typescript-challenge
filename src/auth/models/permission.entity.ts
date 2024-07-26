import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Resource } from './resource.entity';
import { Action } from './action.entity';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'permission_id' })
  permissionId: number;

  @ManyToOne(() => Resource, (resource) => resource.permissions)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ManyToOne(() => Action, (action) => action.permissions)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'permissionId',
    },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
  })
  roles: Role[];
}
