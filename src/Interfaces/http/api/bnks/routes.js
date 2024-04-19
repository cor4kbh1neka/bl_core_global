const routes = (handler) => ([

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
    method: 'POST',
    path: '/banks/master',
    handler: handler.postMasterHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/master/{mstrbnks}',
    handler: handler.putMasterHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

  {
    method: 'GET',
    path: '/banks/master',
    handler: handler.getMasterHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/master/{idbnkmaster}',
    handler: handler.delMasterHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'POST',
    path: '/banks/v2',
    handler: handler.postBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/v2/{idbank}',
    handler: handler.putBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/v2/{groupname}',
    handler: handler.getBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/exc/{groupname}',
    handler: handler.getBanknwexHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  }
  // ,
  // {
  //   method: 'POST',
  //   path: '/banks',
  //   handler: handler.postBanksHandler,
  //   options: {
  //     cors: {
  //       origin: ['*'],
  //     },
  //   },
  // },
  // {
  //   method: 'GET',
  //   path: '/banks/{groupname}',
  //   handler: handler.getBanksHandler,
  //   options: {
  //     cors: {
  //       origin: ['*'],
  //     },
  //   },
  // },
]);

module.exports = routes;
