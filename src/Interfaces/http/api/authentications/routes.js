const routes = (handler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
    // },
    // {
    //   method: 'PUT',
    //   path: '/authentications',
    //   handler: handler.putAuthenticationHandler,
    // },
    // {
    //   method: 'DELETE',
    //   path: '/authentications',
    //   handler: handler.deleteAuthenticationHandler,
  },
]);

module.exports = routes;
