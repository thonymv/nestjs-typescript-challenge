const view = {
  actionId: '1',
  actionName: 'view',
};

const create = {
  actionId: '2',
  actionName: 'create',
};

const update = {
  actionId: '3',
  actionName: 'update',
};

const actionDelete = {
  actionId: '4',
  actionName: 'delete',
};

const customer = {
  resourceId: '2',
  resourceName: 'customers',
};

const order = {
  resourceId: '3',
  resourceName: 'orders',
};

const user = {
  resourceId: '4',
  resourceName: 'users',
};

const agent = {
  resourceId: '1',
  resourceName: 'agents',
};

export const userCustomer = {
  id: '1',
  firstName: 'anthony',
  lastName: 'martinez',
  email: 'anthony@demo.com',
  password: '$2a$10$Veq05YqqfFDb1qQ034Sx4uSalLFo8uynTIpJsRm7LASa4dWFkFOOW',
  createAt: '2024-07-27T03:41:54.210Z',
  updateAt: '2024-07-28T17:18:41.695Z',
  deletedAt: null,
  roleId: '3',
  role: {
    roleId: '3',
    roleName: 'customer',
    permissions: [
      {
        permissionId: '2',
        action: view,
        resource: customer,
      },
      {
        permissionId: '3',
        action: view,
        resource: order,
      },
      {
        permissionId: '6',
        action: create,
        resource: customer,
      },
      {
        permissionId: '7',
        action: create,
        resource: order,
      },
      {
        permissionId: '10',
        action: update,
        resource: customer,
      },
      {
        permissionId: '11',
        action: update,
        resource: order,
      },
      {
        permissionId: '14',
        action: actionDelete,
        resource: customer,
      },
      {
        permissionId: '15',
        action: actionDelete,
        resource: order,
      },
    ],
  },
};

export const userAdmin = {
  id: '1',
  firstName: 'anthony',
  lastName: 'martinez',
  email: 'anthony@demo.com',
  password: '$2a$10$Veq05YqqfFDb1qQ034Sx4uSalLFo8uynTIpJsRm7LASa4dWFkFOOW',
  createAt: '2024-07-27T03:41:54.210Z',
  updateAt: '2024-07-28T17:27:44.043Z',
  deletedAt: null,
  roleId: '1',
  role: {
    roleId: '1',
    roleName: 'admin',
    permissions: [
      {
        permissionId: '1',
        action: view,
        resource: agent,
      },
      {
        permissionId: '2',
        action: view,
        resource: customer,
      },
      {
        permissionId: '3',
        action: view,
        resource: order,
      },
      {
        permissionId: '4',
        action: view,
        resource: user,
      },
      {
        permissionId: '5',
        action: create,
        resource: agent,
      },
      {
        permissionId: '6',
        action: create,
        resource: customer,
      },
      {
        permissionId: '7',
        action: create,
        resource: order,
      },
      {
        permissionId: '8',
        action: create,
        resource: user,
      },
      {
        permissionId: '9',
        action: update,
        resource: agent,
      },
      {
        permissionId: '10',
        action: update,
        resource: customer,
      },
      {
        permissionId: '11',
        action: update,
        resource: order,
      },
      {
        permissionId: '12',
        action: update,
        resource: user,
      },
      {
        permissionId: '13',
        action: actionDelete,
        resource: agent,
      },
      {
        permissionId: '14',
        action: actionDelete,
        resource: customer,
      },
      {
        permissionId: '15',
        action: actionDelete,
        resource: order,
      },
      {
        permissionId: '16',
        action: actionDelete,
        resource: user,
      },
    ],
  },
};

export const userAgent = {
  id: '1',
  firstName: 'anthony',
  lastName: 'martinez',
  email: 'anthony@demo.com',
  password: '$2a$10$Veq05YqqfFDb1qQ034Sx4uSalLFo8uynTIpJsRm7LASa4dWFkFOOW',
  createAt: '2024-07-27T03:41:54.210Z',
  updateAt: '2024-07-29T01:20:24.341Z',
  deletedAt: null,
  roleId: '2',
  role: {
    roleId: '2',
    roleName: 'agent',
    permissions: [
      {
        permissionId: '1',
        action: view,
        resource: agent,
      },
      {
        permissionId: '3',
        action: view,
        resource: order,
      },
      {
        permissionId: '5',
        action: create,
        resource: agent,
      },
      {
        permissionId: '7',
        action: create,
        resource: order,
      },
      {
        permissionId: '9',
        action: update,
        resource: agent,
      },
      {
        permissionId: '11',
        action: update,
        resource: order,
      },
      {
        permissionId: '13',
        action: actionDelete,
        resource: agent,
      },
      {
        permissionId: '15',
        action: actionDelete,
        resource: order,
      },
    ],
  },
};
