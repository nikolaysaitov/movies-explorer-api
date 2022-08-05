// const {
//   dataMovies = 'mongodb://localhost:27017/kino',
//   PORT = 3000,
//   NODE_ENV,
//   JWT_SECRET,
// } = process.env;
// module.exports = {
//   dataMovies,
//   PORT,
//   NODE_ENV,
//   JWT_SECRET,
// };

const {
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE = 'mongodb://localhost:27017/kino',
} = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addressMongoDB = NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/kino';

module.exports = {
  addressMongoDB,
  secretKey,
};
