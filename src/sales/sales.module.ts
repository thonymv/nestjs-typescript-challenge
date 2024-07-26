import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../sales/models/agent.entity';
import { Customer } from '../sales/models/customer.entity';
import { Order } from '../sales/models/order.entity';
import { AgentController } from './controllers/agent/agent.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { OrderController } from './controllers/order/order.controller';
import { AgentService } from './services/agent/agent.service';
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';
import { User } from 'src/users/models/user.entity';
import { Role } from 'src/auth/models/role.entity';
import { Permission } from 'src/auth/models/permission.entity';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Resource } from 'src/auth/models/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agent,
      Customer,
      Order,
      User,
      Role,
      Permission,
      Action,
      Resource,
    ]),
  ],
  controllers: [AgentController, CustomerController, OrderController],
  providers: [AgentService, CustomerService, OrderService],
})
export class SalesModule {}
