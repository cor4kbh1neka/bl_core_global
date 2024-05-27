const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');
const Jwt = require('@hapi/jwt');



const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const apks = require('../../Interfaces/http/api/apks');
const banks = require('../../Interfaces/http/api/bnks');
const memo = require('../../Interfaces/http/api/memo');
const proxy = require('../../Interfaces/http/api/proxy');
const content = require('../../Interfaces/http/api/content');


const createServer = async (container) => {

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      security: {
        hsts: true, // Enable HTTP Strict Transport Security (HSTS)
        xss: true, // Enable protection against cross-site scripting (XSS)
        noOpen: true, // Enable protection against MIME sniffing attacks
        noSniff: true, // Enable protection against clickjacking attacks
        xframe: true, // Enable protection against cross-site request forgery (CSRF)
      },
    },
  });

  await server.register(H2o2);
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
    },
    {
      plugin: proxy,
      options: { container },
    },
    {
      plugin: content,
      options: { container },
    }

  ]);




  // server.ext('onPreAuth', (request, h) => {
  //   const customHeader = request.headers['x-customblhdrs']; // Replace 'x-custom-header' with your actual header name
  //   const origin = request.headers.origin;
  //   if (!customHeader || customHeader !== '09c90c1d6e1b82015737f88d5f5b827060a57c874babe97f965aaa68072585191ce0eab75404312f4f349ee70029404c2d8f66698b6a4da18990445d1437ff79') {
  //     return h.response({ message: 'Invalid custom header or missing' }).code(401); // Unauthorized
  //   }
  // if (origin !== 'https://bostoni.pro') {
  //   return h.response({ message: 'Origin not allowed' }).code(403); // Forbidden
  // }

  //   return h.continue;
  // });

  // Error handling (onPreResponse)
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    const customHeader = request.headers['x-customblhdrs']; // Replace 'x-custom-header' with your actual header name
    if (!customHeader || customHeader !== '09c90c1d6e1b82015737f88d5f5b827060a57c874babe97f965aaa68072585191ce0eab75404312f4f349ee70029404c2d8f66698b6a4da18990445d1437ff79') {
      return h.response({ message: 'Invalid custom header or missing' }).code(401); // Unauthorized
    }

    if (response instanceof Error) {
      // Handle errors based on their types
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if (!translatedError.isServer) {
        return h.continue; // Let Hapi handle native client errors
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // Continue with unmodified response if no error
    return h.continue;
  });

  return server;
};

module.exports = createServer;
