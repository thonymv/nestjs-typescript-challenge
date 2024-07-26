import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { ActionName } from '../enums/action.enum';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'action_id' })
  actionId: number;

  @Column({ type: 'enum', enum: ActionName, name: 'action_name' })
  actionName: ActionName;

  @OneToMany(() => Permission, (permission) => permission.action)
  permissions: Permission[];
}
