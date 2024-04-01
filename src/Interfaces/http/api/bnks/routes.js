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
