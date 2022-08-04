const { NODE_ENV, BD } = process.env;
const dataBase = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/kino';

module.exports = {
  dataBase,
};
