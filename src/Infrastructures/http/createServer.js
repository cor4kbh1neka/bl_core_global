const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');


const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const apks = require('../../Interfaces/http/api/apks');
const banks = require('../../Interfaces/http/api/bnks');
const memo = require('../../Interfaces/http/api/memo');


const createServer = async (container) => {

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        additionalHeaders: ['Origin', 'Access-Control-Allow-Origin'],
        additionalExposedHeaders: ['Origin', 'Access-Control-Allow-Origin'],
        credentials: true,

      },
    },
  });


  await server.register([
    {
      plugin: Jwt,
    }
  ]);

  server.auth.strategy('dashbljwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.username,
      },
    }),
  });


  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: apks,
      options: { container },
    },
    {
      plugin: banks,
      options: { container },
    },
    {
      plugin: memo,
      options: { container },
    }

  ]);


  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      //Jika respons dari server adalah Boom (kesalahan HTTP), kami menambahkan header Access-Control-Allow-Origin ke respons dengan nilai Origin dari header permintaan. Ini memastikan bahwa bahkan jika permintaan berasal dari domain lain, header CORS akan disertakan dalam respons, sehingga browser tidak akan menolak respons karena kebijakan CORS.


      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Check if CORS header is present in the response
    const responseHeaders = response.headers || {};
    const hasCorsHeader = Object.keys(responseHeaders).some(header =>
      header.toLowerCase() === 'access-control-allow-origin'
    );

    if (!hasCorsHeader) {
      // If CORS header is not present, allow access from all origins
      corsHeaders['Access-Control-Allow-Origin'] = '*';
    }

    if (request.method === 'options') {
      // Handling preflight request
      return h.response().code(200).headers(corsHeaders);
    }

    // Apply CORS headers to response
    const responseWithCors = response.isBoom ? response.output : response;
    responseWithCors.headers = {
      ...responseWithCors.headers,
      ...corsHeaders,
    };

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
