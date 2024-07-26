import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/users/models/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'role_id' })
  roleId: number;

  @Column({ length: 50, name: 'role_name' })
  roleName: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'permissionId',
    },
    joinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
  })
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
