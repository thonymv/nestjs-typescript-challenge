import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from 'src/sales/models/agent.entity';
import { Customer } from 'src/sales/models/customer.entity';
import { Order } from 'src/sales/models/order.entity';
import { Role } from 'src/auth/models/role.entity';
import { Permission } from 'src/auth/models/permission.entity';
import { Action } from 'src/auth/models/action.entity';
import { Resource } from 'src/auth/models/resource.entity';
import { UsersService } from './services/users.service';
import { Repository } from 'typeorm';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { User } from './models/user.entity';
import { AwsService } from 'src/aws/aws.service';

describe('UsersController', () => {
  let controller: UsersController;
  const entities = [Agent, Customer, Order, Role, Permission, Action, Resource];
  const userId = 1;
  const updateUserRole = {
    roleId: 1,
  } as UpdateUserRoleDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        ...entities.map((entity) => ({
          provide: getRepositoryToken(entity),
          useClass: Repository,
        })),
        {
          provide: getRepositoryToken(User),
          useValue: {
            update: jest.fn().mockImplementationOnce(() => {
              return Promise.resolve({
                userId,
                ...updateUserRole,
              });
            }),
          },
        },
        UsersService,
        AwsService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a roleId', async () => {
    expect(await controller.updateUserRole(userId, updateUserRole)).toEqual({
      userId,
      ...updateUserRole,
    });
  });
});
