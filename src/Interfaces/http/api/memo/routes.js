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
  {
    method: 'GET',
    path: '/memo/{statustype}',
    handler: handler.getMemostts,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/memo/{idmemo}',
    handler: handler.delMemo,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
]);

module.exports = routes;
