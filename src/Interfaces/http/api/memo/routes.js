const routes = (handler) => ([
  //cors
  {
    method: 'POST',
    path: '/memo',
    handler: handler.postMemo,
    options: {
      cors: {
        origin: ['https://syt3m4prod.situscepat.net'],
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
  //cors
  {
    method: 'DELETE',
    path: '/memo/{idmemo}',
    handler: handler.delMemo,
    options: {
      cors: {
        origin: ['https://syt3m4prod.situscepat.net'],
      },
    },
  },
]);

module.exports = routes;
