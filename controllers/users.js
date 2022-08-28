const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/authorisation_error_401');
const ConflictError = require('../errors/conflict_409');
const NotFoundError = require('../errors/not-found-err_404');
const ValidError = require('../errors/validation_error_400');
const { secretKey } = require('../utils/constants');

// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по _id не найден');
      }
      // return res.status(200).send({ data: user });
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidError('Некорректный id'));
      }
      return next(error);
    });
};

// POST /users — создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  // User.create({ name, about, avatar })
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Введены некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует!)'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Это чужая почта'));
      }
      return next(err);
    });
};

// Создайте контроллер login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password') // в случае аутентификации хеш пароля нужен
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }
      return Promise.all([bcrypt.compare(password, user.password), user]);
    })
    .then(([isPasswordCorrect, user]) => {
      if (!isPasswordCorrect) {
        return Promise.reject(new AuthError('Неправильная почта или пароль'));
      }
      const token = jwt.sign(
        { _id: user._id },
        secretKey,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};
