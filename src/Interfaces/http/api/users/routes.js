const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
]);

module.exports = routes;
