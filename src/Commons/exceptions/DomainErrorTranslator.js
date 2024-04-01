const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');
const AuthenticationError = require('./AuthenticationError');
const AuthorizationError = require('./AuthorizationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register fail, check your input !'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register fail, type data not match !'),
  'REGISTER_USER.USERNAME_MORE_LIMIT_CHAR': new InvariantError('register fail, username too long !'),
  'REGISTER_USER.USERNAME_LESS_LIMIT_CHAR': new InvariantError('register fail , username too short !'),
  'REGISTER_USER.BANKUSER_LIMIT_CHAR': new InvariantError('register fail, bank owner too short !'),
  'REGISTER_USER.BANKNUMBER_MORE_LIMIT_CHAR': new InvariantError('register fail , bank number too long !'),
  'REGISTER_USER.BANKNUMBER_LESS_LIMIT_CHAR': new InvariantError('register fail , bank number too short !'),
  'REGISTER_USER.PHONENUMBER_MORE_LIMIT_CHAR': new InvariantError('register fail , phone number too long !'),
  'REGISTER_USER.PHONENUMBER_LESS_LIMIT_CHAR': new InvariantError('register fail , phone number too short !'),
  'REGISTER_USER.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('register fail , input restricted !'),


  'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register fail in the moment processing some data missing !'),
  'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register fail in the moment processing some data restricted !'),

  'REGISTER_USER_LOG.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register loging fail while syncing input data !'),
  'REGISTER_USER_LOG.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register loging fail type data not match !'),
  'REGISTER_USER_LOG.USERNAME_MORE_LIMIT_CHAR': new InvariantError('register loging fail username too long !'),
  'REGISTER_USER_LOG.USERNAME_LESS_LIMIT_CHAR': new InvariantError('register loging fail username too short !'),
  'REGISTER_USER_LOG.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('register loging fail input restricted !'),

  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('username or password need to be input !'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username or password must be string !'),

  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),

  'ADD_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('field settings must be fill , fail !'),
  'ADD_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('type data apk settings not match'),
  'ADD_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('restricted input apk settings , watch your input !'),
  'ADD_EVENT_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('event field must be fill , fail'),
  'ADD_EVENT_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('event type data not match'),
  'ADD_EVENT_APK.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('event restricted input watch your input !'),

  'ADD_PEMBERITAHUAN_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('field notice must be fill , fail !'),
  'ADD_PEMBERITAHUAN_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('notice type data not match'),
  'ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_TITLE_LIMIT_CHAR': new InvariantError('title notice too short'),
  'ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_CONTENT_LIMIT_CHAR': new InvariantError('content notice too long'),

  'GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('data not found'),

  'ADD_DP_BANK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('data bank tidak boleh kosong'),
  'ADD_DP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('type data input salah, cek lagi !'),
  'ADD_DP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('masukkan character yang sesuai !'),





  // 'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('bad payload not meet data type'),
  // 'ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_ID_ADDEDTHREAD': new InvariantError('title not found in addedthread'),
  // 'ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_TITLE_ADDEDTHREAD': new AuthenticationError('body not found in addedthread'),
  // 'ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER': new AuthenticationError('Missing authentication'),
  // 'THREAD.NO_HAVE_OWNER_FOR_AUTHENTICATION_IN_ADDTHREAD': new AuthenticationError('Missing authentication'),

  // 'COMMMENTTHREAD.NOT_CONTAIN_THREADID_PROPERT': new InvariantError('Thread must have thread for comment'),
  // 'COMMMENTTHREAD.NOT_CONTAIN_CONTENT_PROPERTY': new InvariantError('Input Content is a must'),
  // 'COMMMENTTHREAD.NOT_CONTAIN_NEEDED_AUTHENTICATION': new AuthenticationError('Missing authentication'),
  // 'COMMENTTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Type data tidak sesuai'),
  // 'COMMENTTHREAD.CONTENT_LIMIT_CHAR': new AuthenticationError('CONTENT tidak boleh lebih dari 50 character'),

  // 'COMENTEDTHREAD.NOT_HAVE_ID_FOR_FIND_THREAD': new AuthenticationError('cannot find thread cause threadid notfound'),
  // 'COMENTEDTHREAD.NOT_HAVE_OWNER_FOR_AUTHENTICATION': new AuthenticationError('Missing authentication'),
  // 'COMENTEDTHREAD.NOT_HAVE_CONTENT_FOR_FIND_THREAD': new AuthenticationError('bad payload in added coment cause no content inserted'),
  // 'COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Type data tidak sesuai'),
  // 'DELETE_AUTHENTICATION_USE_CASE.PROHIBITED': new AuthorizationError('Delete Comment not Allowed'),

  // 'DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION': new AuthenticationError('Missing authentication'),
  // 'REFRESH_VERIFY_OWNER_USE_CASE': new AuthenticationError('Missing authentication'),
  // 'REFRESH_VERIFY_OWNER_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new AuthenticationError('forbidden for input different data type'),
};

module.exports = DomainErrorTranslator;
