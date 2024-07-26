import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsersService } from './services/users.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ActionName } from 'src/auth/enums/action.enum';
import { ResourceName } from 'src/auth/enums/resource.enum';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Patch('assign-role/:userId')
  @Permissions([ActionName.Update, ResourceName.Users])
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 200,
    description: 'User role successfully updated',
    schema: {
      example: {
        generatedMaps: [],
        raw: [],
        affected: 1,
      },
    },
  })
  async update(
    @Param('userId') userId: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UpdateResult> {
    return this.userService.update(userId, updateUserRoleDto);
  }
}
