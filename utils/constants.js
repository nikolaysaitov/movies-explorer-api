const {
  NODE_ENV,
  JWT_SECRET = 'some-secret-key',
  DATA_BASE = 'mongodb://localhost:27017/kino',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, DATA_BASE,
};
