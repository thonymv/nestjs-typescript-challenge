import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { UsersModule } from '../../src/users/users.module';
import { SalesModule } from '../../src/sales/sales.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agent } from '../../src/sales/models/agent.entity';
import { Customer } from '../../src/sales/models/customer.entity';
import { Order } from '../../src/sales/models/order.entity';
import { User } from '../../src/users/models/user.entity';
import { Role } from 'src/auth/models/role.entity';
import { Permission } from 'src/auth/models/permission.entity';
import { Action } from 'src/auth/models/action.entity';
import { Resource } from 'src/auth/models/resource.entity';
import * as helper from '../helper';

jest.mock('bcryptjs', () => {
  return {
    compare: jest.fn().mockImplementation(() => Promise.resolve(true)),
  };
});

describe('RBAC SalesController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModuleBuilder;

  const mockUserRepository = (user) => ({
    findOne: jest.fn().mockImplementation(() => {
      return Promise.resolve(user);
    }),
  });

  beforeEach(() => {
    moduleFixture = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        SalesModule,
      ],
    })
      .overrideProvider(getRepositoryToken(Agent))
      .useValue({})
      .overrideProvider(getRepositoryToken(Customer))
      .useValue({})
      .overrideProvider(getRepositoryToken(Order))
      .useValue({})
      .overrideProvider(getRepositoryToken(Role))
      .useValue({})
      .overrideProvider(getRepositoryToken(Permission))
      .useValue({})
      .overrideProvider(getRepositoryToken(Action))
      .useValue({})
      .overrideProvider(getRepositoryToken(Resource))
      .useValue({});
  });

  async function getValidToken() {
    const {
      body: { access_token },
    } = await request(app.getHttpServer()).post('/api/auth/login').send({
      email: 'demo@demo.com',
      password: 'demo',
    });
    return access_token;
  }

  it('/api/agents (GET) should fail because the customer role does not have access', async () => {
    moduleFixture
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository(helper.userCustomer));
    app = (await moduleFixture.compile()).createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .get('/api/agents')
      .auth(await getValidToken(), {
        type: 'bearer',
      })
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/customers (GET) should fail because the agent role does not have access', async () => {
    moduleFixture
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository(helper.userAgent));
    app = (await moduleFixture.compile()).createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .get('/api/customers')
      .auth(await getValidToken(), {
        type: 'bearer',
      })
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/orders/total-amount-by-customer (GET) should fail because the agent role does not have access', async () => {
    moduleFixture
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository(helper.userAgent));
    app = (await moduleFixture.compile()).createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .get('/api/orders/total-amount-by-customer')
      .auth(await getValidToken(), {
        type: 'bearer',
      })
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  it('/api/orders/total-amount-by-agent (GET) should fail because the customer role does not have access', async () => {
    moduleFixture
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository(helper.userCustomer));
    app = (await moduleFixture.compile()).createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .get('/api/orders/total-amount-by-agent')
      .auth(await getValidToken(), {
        type: 'bearer',
      })
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  afterEach(async () => {
    await app.close();
  });
});
