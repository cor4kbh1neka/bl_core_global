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
]);

module.exports = routes;
