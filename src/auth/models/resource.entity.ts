import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { ResourceName } from '../enums/resource.enum';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'resource_id' })
  resourceId: number;

  @Column({ type: 'enum', enum: ResourceName, name: 'resource_name' })
  resourceName: ResourceName;

  @OneToMany(() => Permission, (permission) => permission.resource)
  permissions: Permission[];
}
