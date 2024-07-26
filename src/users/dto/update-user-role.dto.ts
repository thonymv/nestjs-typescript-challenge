import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;
}
