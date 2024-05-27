const routes = (handler) => ([
  {
    method: 'POST',
    path: '/content/dtmttag/{iddtmeta}',
    handler: handler.putcontentMtTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/dtmttag/gtdt',
    handler: handler.getcontentMtTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/content/stmp',
    handler: handler.postcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/content/stmp/{urpage}',
    handler: handler.putcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/stmp',
    handler: handler.getcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/content/stmp',
    handler: handler.delcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/content/ctgeneral/{idnmwebst}',
    handler: handler.putctGeneralTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctgeneral',
    handler: handler.getctGeneralTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/content/ctslider/{idctsldr}',
    handler: handler.putctSliderTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctslider',
    handler: handler.getctSliderTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/content/ctlink/{idctlnk}',
    handler: handler.putctLinkTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctlink',
    handler: handler.getctLinkTagHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
]);

module.exports = routes;
