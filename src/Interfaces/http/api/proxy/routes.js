const routes = (handler) => ([
  {
    method: 'POST',
    path: '/prx/data/de', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/deposit', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien

      }
    }
  },
  {
    method: 'POST',
    path: '/prx/data/wi', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/withdrawal', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/winsprt', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/568WinSportsbook', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/csn', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/Casino', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/gms', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/Games', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/vrsprt', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/VirtualSports', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/slsgms', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/SeamlessGame', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog/Trdprty', // Route dengan parameter dinamis
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/login/ThirdPartySportsBook', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/history/log', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/historylog', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/register', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      }
      // auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/register', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/get-recommend-matches', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/get-recommend-matches', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/cekuserreferral', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      // auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/cekuserreferral', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/gtdapiref', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/getDataReferral', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/gthstry', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/gethistory', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryDw', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/getHistoryDw', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/checkLastTransaction', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/checkLastTransaction', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/checkBalance', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ['cache-control', 'x-requested-with', 'utilitiesgenerate']
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/checkBalance', // URL target proxy
        passThrough: true, // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryGame', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/getHistoryGame', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryGameById', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/getHistoryGameById', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getDataOutstanding', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/getDataOutstanding', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/chngpswd', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bur4chket.glbwgag.com/api/changePassword', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/gethstchngpswd', // Route untuk proxy
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://tv-ng9-al.glbwgag.com/api/getdatalogmember', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  }
]);

module.exports = routes;
