const routes = (handler) => ([
  {
    method: 'POST',
    path: '/apks/settings',
    handler: handler.postApkHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/apks/settings/event',
    handler: handler.postApkEventHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/apks/settings/notice',
    handler: handler.postApkNoticeHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  //hanya pake auth
  {
    method: 'GET',
    path: '/apks/settings/{apkid}',
    handler: handler.getApkHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'POST',
    path: '/prx/data/de', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/deposit', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien

      }
    }
  },
  {
    method: 'POST',
    path: '/prx/data/wi', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/withdrawal', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/authlog', // Route dengan parameter dinamis
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/login', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    }
  },
  {
    method: 'POST',
    path: '/prx/history/log', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/historylog', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/register', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/register', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/get-recommend-matches', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/get-recommend-matches', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/cekuserreferral', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/cekuserreferral', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryDw', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/getHistoryDw', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/checkLastTransaction', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/checkLastTransaction', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/checkBalances', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/checkBalance', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryGame', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/getHistoryGame', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getHistoryGameById', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/getHistoryGameById', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  },
  {
    method: 'POST',
    path: '/prx/getDataOutstanding', // Route untuk proxy
    options: {
      auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: 'https://bostoni.pro/api/getDataOutstanding', // URL target proxy
        passThrough: true // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      }
    }
  }
]);

module.exports = routes;
