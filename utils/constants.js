const {
  NODE_ENV,
  DATA_BASE = 'mongodb://localhost:27017/kino',
} = process.env;

const addressMongoDB = NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviedb';

module.exports = {
  addressMongoDB,
};
