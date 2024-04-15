const routes = (handler) => ([
  {
    method: 'POST',
    path: '/banks',
    handler: handler.postBanksHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'POST',
    path: '/banks/group',
    handler: handler.postGroupHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/group',
    handler: handler.getGroupHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/group/{idgroup}',
    handler: handler.delGroupHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/{groupname}',
    handler: handler.getBanksHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
]);

module.exports = routes;
