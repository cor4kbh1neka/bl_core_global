const routes = (handler) => ([

  {
    method: 'POST',
    path: '/memo',
    handler: handler.postMemo,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/memo',
    handler: handler.getMemo,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
]);

module.exports = routes;
