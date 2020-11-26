const test = require('./test');
const server = require('./server');
const userInfo = require('./user-info');
const argsInfo = require('./args-info');
const avatar = require('./avatar');
const kick = require('./kick');
const prune = require('./prune');

module.exports = {
  test,
  server,
  'user-info': userInfo,
  'args-info': argsInfo,
  avatar,
  kick,
  prune,
};
