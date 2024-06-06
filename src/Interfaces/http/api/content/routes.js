const routes = (handler) => ([
  /**
 * metatag
 */
  {
    method: 'POST',
    path: '/content/dtmttag/{iddtmeta}',
    handler: handler.putcontentMtTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/dtmttag/gtdt',
    handler: handler.getcontentMtTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
 * sitemap
 */
  {
    method: 'POST',
    path: '/content/stmp',
    handler: handler.postcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'POST',
    path: '/content/stmp/{urpage}',
    handler: handler.putcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/stmp',
    handler: handler.getcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/content/stmp',
    handler: handler.delcontentSiteMapTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
 * general content
 */
  {
    method: 'PUT',
    path: '/content/ctgeneral/{idnmwebst}',
    handler: handler.putctGeneralTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctgeneral',
    handler: handler.getctGeneralTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
 * slider
 */
  {
    method: 'PUT',
    path: '/content/ctslider/{idctsldr}',
    handler: handler.putctSliderTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctslider',
    handler: handler.getctSliderTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
 * social link
 */
  {
    method: 'PUT',
    path: '/content/ctlink/{idctlnk}',
    handler: handler.putctLinkTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/ctlink',
    handler: handler.getctLinkTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
   * social media
   */
  {
    method: 'PUT',
    path: '/content/socmed/{idctscmed}',
    handler: handler.putctSocmedTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/socmed',
    handler: handler.socmedctSocmedTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
   * promo
   */
  {
    method: 'POST',
    path: '/content/prm',
    handler: handler.postcontentPromoTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/content/prm/{idctprm}',
    handler: handler.putcontentPromoTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/prm',
    handler: handler.getcontentPromoTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/content/prm/{idctprm}',
    handler: handler.delcontentPromoTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  /**
 * status maintenace
 */
  {
    method: 'PUT',
    path: '/content/sts/{idctmtncnc}',
    handler: handler.putctMTTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
  {
    method: 'GET',
    path: '/content/sts',
    handler: handler.getctMTTagHandler,
    options: {
      cors: {
        origin: ['https://bur4chket.glbwgag.com'],
      },
    },
  },
]);

module.exports = routes;
