const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      description: Joi.string().required(),
      year: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/,
        ),
      trailerLink: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/,
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/,
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
); // создаёт фильм с переданными в теле /.... movieId

router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
); // удаляет карточку по идентификатору

module.exports = router;
